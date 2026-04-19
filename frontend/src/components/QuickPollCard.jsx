import React, { useState, memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';
import { notify } from '../utils/toast';

/**
 * Component for the QuickPoll interaction card.
 * Enables users to create new polls and vote (Yes/No) on existing on-chain polls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string|null} [props.address] - Connected wallet address; required for actions
 * @param {Object} props.quickpoll - Interaction API from useQuickPoll hook
 * @param {Function} props.quickpoll.vote - Function to cast a vote (pollId: number, option: number)
 * @param {Function} props.quickpoll.createPoll - Function to create a new poll (question: string)
 * @param {Function} props.quickpoll.handlePollPing - Function to trigger a poll heartbeat ping
 * @param {Function} props.quickpoll.isLoading - Function to check loading state by action name
 * @returns {JSX.Element} The rendered QuickPoll interaction card
 */
function QuickPollCard({ address, quickpoll }) {
  const { isLoading, vote, createPoll, handlePollPing } = quickpoll;
  const [pollQuestion, setPollQuestion] = useState('');
  const { playSound } = useSound();
  const [errorField, setErrorField] = useState(null);
  const trimmedQuestion = pollQuestion.trim();
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  /**
   * Triggers a 'YES' vote transaction for the current poll.
   */
  const handleVoteYes = useCallback(() => vote(1, 1), [vote]);

  /**
   * Triggers a 'NO' vote transaction for the current poll.
   */
  const handleVoteNo = useCallback(() => vote(1, 0), [vote]);

  /**
   * Triggers a transaction to create a new poll with the entered question.
   */
  const handleCreateNewPoll = useCallback(() => {
    if (!trimmedQuestion) {
      return;
    }

    createPoll(trimmedQuestion);
    setPollQuestion('');
  }, [createPoll, trimmedQuestion]);

  /**
   * Internal wrapper to check connection and validation before executing a contract action.
   * Provides acoustic and visual feedback for errors.
   *
   * @param {Function} actionFn - The interaction function to execute
   * @param {string} fieldId - ID of the button for error highlighting
   * @param {Function} [validation=()=>true] - Optional pre-check function for action validity
   */
  const handleAction = useCallback(
    (actionFn, fieldId, validation = () => true) => {
      if (!address || !validation()) {
        playSound('error');
        setErrorField(fieldId);
        setTimeout(() => setErrorField(null), 500);
        return;
      }
      playSound('click');
      actionFn();
    },
    [address, playSound]
  );

  return (
    <ActionCard
      id="quickpoll-card"
      title="🗳️ QuickPoll"
      subtitle="Vote to generate transactions."
      icon="🗳️"
      iconClass="bg-emerald-500/20 text-emerald-400"
    >
      <div className="actions" role="group" aria-label="Polling Controls">
        <Tooltip content="Ping the QuickPoll network contract to test live connection state.">
          <ActionButton
            label="Poll Ping"
            icon="🗳️"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handlePollPing, 'poll-ping')}
            isLoading={isLoading('poll-ping')}
            isError={errorField === 'poll-ping'}
            disabled={isLoading('poll-ping')}
          />
        </Tooltip>

        <div className="input-group">
          <label className="input-label" htmlFor="poll-question-input">
            Poll Question
          </label>
          <input
            id="poll-question-input"
            type="text"
            className="poll-input"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter poll question..."
            maxLength={100}
            aria-invalid={!trimmedQuestion && errorField === 'create-poll'}
          />
          <span className="input-help-text">{trimmedQuestion.length}/100</span>
        </div>

        <Tooltip content="Create a new poll on the Stacks blockchain.">
          <ActionButton
            label="Create Poll"
            icon="📋"
            cost="0.001 STX"
            className="primary"
            onClick={() =>
              handleAction(handleCreateNewPoll, 'create-poll', () => trimmedQuestion.length > 0)
            }
            isLoading={isLoading('create-poll')}
            isError={errorField === 'create-poll'}
            disabled={isLoading('create-poll')}
          />
        </Tooltip>

        <div className="actions-row">
          <Tooltip content="Vote YES on the active community poll.">
            <ActionButton
              label="Yes"
              icon="👍"
              cost="0.001"
              className="success"
              onClick={() => handleAction(handleVoteYes, 'vote-yes')}
              isLoading={isLoading('vote')}
              isError={errorField === 'vote-yes'}
              disabled={isLoading('vote')}
            />
          </Tooltip>
        </div>

        <div className="poll-footer">
          <div className="stat" aria-live="polite">
          <span className="stat-label">Total Votes</span>
            <span className="timer-text">Ends in: {formatTime(timeLeft)}</span>
          </div>
          <button
            type="button"
            className="share-poll-btn"
            aria-label="Share Poll Results"
            title="Copy Results Link"
            onClick={() => {
              notify.success('Results link copied to clipboard!');
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            ↗ Share Results
          </button>
        </div>
      </div>
    </ActionCard>
  );
}

QuickPollCard.propTypes = {
  address: PropTypes.string,
  quickpoll: PropTypes.shape({
    vote: PropTypes.func.isRequired,
    createPoll: PropTypes.func.isRequired,
    handlePollPing: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(QuickPollCard);
