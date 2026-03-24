import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';
import { useKeydown } from '../hooks/useKeydown';
import { useClipboard } from '../hooks/useClipboard';
import { useInterval } from '../hooks/useInterval';

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
  const { vote, createPoll, handlePollPing, isLoading } = quickpoll;
  const [pollQuestion, setPollQuestion] = useState('');
  const [errorField, setErrorField] = useState(null);
  const { playSound } = useSound();
  const { copyToClipboard } = useClipboard();
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  const trimmedQuestion = pollQuestion.trim();

  useInterval(() => {
    setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
  }, 1000);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  /**
   * Internal wrapper to check connection and validation before executing a contract action.
   * Provides acoustic and visual feedback for errors.
   */
  const handleAction = useCallback(
    async (actionFn, fieldId, validation = () => true) => {
      if (!address) {
        playSound('error');
        setErrorField(fieldId);
        setTimeout(() => setErrorField(null), 1000);
        return;
      }

      if (!validation()) {
        playSound('error');
        setErrorField(fieldId);
        setTimeout(() => setErrorField(null), 1000);
        return;
      }

      try {
        playSound('click');
        await actionFn();
      } catch (err) {
        setErrorField(fieldId);
        setTimeout(() => setErrorField(null), 1000);
      }
    },
    [address, playSound]
  );

  const handleVoteYes = useCallback(() => vote(1, 1), [vote]);
  const handleVoteNo = useCallback(() => vote(1, 0), [vote]);
  const handleCreateNewPoll = useCallback(() => {
    if (!trimmedQuestion) return;
    createPoll(trimmedQuestion);
    setPollQuestion('');
  }, [createPoll, trimmedQuestion]);

  // Keyboard shortcuts
  const voteYesAction = useCallback(() => handleAction(handleVoteYes, 'vote-yes'), [handleAction, handleVoteYes]);
  const pollPingAction = useCallback(() => handleAction(handlePollPing, 'poll-ping'), [handleAction, handlePollPing]);

  useKeydown('v', voteYesAction);
  useKeydown('V', voteYesAction);
  useKeydown('q', pollPingAction);
  useKeydown('Q', pollPingAction);

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
            className="secondary-button success"
            onClick={pollPingAction}
            isLoading={isLoading('poll-ping')}
            isError={errorField === 'poll-ping'}
            disabled={isLoading('poll-ping')}
            aria-label="Send poll network ping"
          />
        </Tooltip>

        <div className="input-group">
          <label className="input-label" htmlFor="poll-question-input">
            Poll Question
          </label>
          <input
            id="poll-question-input"
            type="text"
            className="poll-input input-field"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter poll question..."
            maxLength={100}
            aria-invalid={!trimmedQuestion && errorField === 'create-poll'}
            aria-required="true"
          />
          <span className="input-help-text" aria-hidden="true">{trimmedQuestion.length}/100</span>
        </div>

        <Tooltip content="Create a new poll on the Stacks blockchain.">
          <ActionButton
            label="Create Poll"
            icon="📋"
            cost="0.001 STX"
            className="primary-button"
            onClick={() =>
              handleAction(handleCreateNewPoll, 'create-poll', () => trimmedQuestion.length > 0)
            }
            isLoading={isLoading('create-poll')}
            isError={errorField === 'create-poll'}
            disabled={isLoading('create-poll')}
            aria-label="Create new poll on-chain"
          />
        </Tooltip>

        <div className="actions-row">
          <Tooltip content="Vote YES on the active community poll.">
            <ActionButton
              label="Vote Yes"
              icon="👍"
              cost="0.001 STX"
              className="secondary-button success"
              onClick={voteYesAction}
              isLoading={isLoading('vote')}
              isError={errorField === 'vote-yes'}
              disabled={isLoading('vote')}
              aria-label="Submit Yes vote"
            />
          </Tooltip>
        </div>

        <div className="poll-footer">
          <div className="poll-timer" role="timer" aria-live="off">
            <span className="timer-icon" aria-hidden="true">⏳</span>
            <span className="timer-text">Ends in: {formatTime(timeLeft)}</span>
          </div>
          <button 
            type="button" 
            className="share-poll-btn secondary-button btn-sm"
            aria-label="Share current poll results URL"
            title="Copy Results Link"
            onClick={() => {
              playSound('click');
              copyToClipboard(window.location.href);
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
