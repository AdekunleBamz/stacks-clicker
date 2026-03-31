import { useState, memo, useCallback, useEffect } from 'react';
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
 * Supports keyboard navigation:
 * - Tab/Shift+Tab: Navigate between interactive elements
 * - Enter/Space: Activate focused button
 * - 1: Vote Yes, 2: Vote No (when card is focused)
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
  const cardRef = useRef(null);
  const inputRef = useRef(null);

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
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNewPoll = useCallback(() => {
    if (!trimmedQuestion) {
      return;
    }

    createPoll(trimmedQuestion);
    setPollQuestion('');
    setIsCreating(false);
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

  /**
   * Handle keyboard shortcuts for quick voting
   * - '1' key: Vote Yes
   * - '2' key: Vote No
   * - 'Enter' on input: Create poll
   */
  const handleKeyDown = useCallback((e) => {
    // Only handle keyboard shortcuts when the card is focused and not in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAction(handleCreateNewPoll, 'create-poll', () => trimmedQuestion.length > 0);
      }
      return;
    }

    switch (e.key) {
      case '1':
        e.preventDefault();
        handleAction(handleVoteYes, 'vote-yes');
        break;
      case '2':
        e.preventDefault();
        handleAction(handleVoteNo, 'vote-no');
        break;
      default:
        break;
    }
  }, [handleAction, handleCreateNewPoll, handleVoteYes, handleVoteNo, trimmedQuestion.length]);

  return (
    <ActionCard
      title="🗳️ QuickPoll"
      subtitle="Vote to generate transactions."
      icon="🗳️"
      iconClass="bg-emerald-500/20 text-emerald-400"
      ref={cardRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="QuickPoll voting card. Press 1 to vote Yes, 2 to vote No."
    >
      <div className="actions" role="group" aria-label="Polling Controls">
        <div className="actions-header-row">
          <Tooltip text="Ping the QuickPoll network contract to test live connection state.">
            <ActionButton
              label="Ping Poll"
              icon="🗳️"
              cost="0.001 STX"
              className="secondary-button success"
              onClick={handlePollPing}
              isLoading={isLoading('poll-ping')}
              isError={errorField === 'poll-ping'}
              disabled={isLoading('poll-ping')}
              aria-label="Send poll network ping"
            />
          </Tooltip>

          <button
            type="button"
            className={`toggle-create-btn secondary-button btn-sm ${isCreating ? 'active' : ''}`}
            onClick={() => setIsCreating(!isCreating)}
            aria-expanded={isCreating}
            title={isCreating ? 'Cancel creating a new poll' : 'Create a new poll'}
          >
            {isCreating ? '✕ Cancel' : '➕ Create New Poll'}
          </button>
        </div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="expandable-section"
              style={{ overflow: 'hidden' }}
            >
              <div className="input-group" style={{ paddingTop: '1.5rem' }}>
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

              <Tooltip text="Create a new poll on the Stacks blockchain.">
                <ActionButton
                  label="Submit Poll"
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className="actions-row">
          <Tooltip text="Vote YES on the active community poll.">
            <ActionButton
              label="Yes"
              icon="👍"
              cost="0.001 STX"
              className="success"
              onClick={() => handleAction(handleVoteYes, 'vote-yes')}
              isLoading={isLoading('vote')}
              isError={errorField === 'vote-yes'}
              disabled={isLoading('vote')}
              aria-describedby="vote-yes-description"
              data-shortcut="1"
            />
          </Tooltip>
          <span id="vote-yes-description" className="sr-only">
            Vote yes on the current poll. Keyboard shortcut: press 1
          </span>

          <Tooltip content="Vote NO on the active community poll. Press 2 as shortcut.">
            <ActionButton
              label="No"
              icon="👎"
              cost="0.001"
              className="danger"
              onClick={() => handleAction(handleVoteNo, 'vote-no')}
              isLoading={isLoading('vote')}
              isError={errorField === 'vote-no'}
              disabled={isLoading('vote')}
              aria-describedby="vote-no-description"
              data-shortcut="2"
            />
          </Tooltip>
          <span id="vote-no-description" className="sr-only">
            Vote no on the current poll. Keyboard shortcut: press 2
          </span>
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
              if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(window.location.href);
              }
              notify.success('Results link copied to clipboard!');
            }}
          >
            ↗ Share Results
          </button>
        </div>

        {/* Keyboard shortcuts help */}
        <div className="keyboard-hints" aria-label="Keyboard shortcuts">
          <span className="hint">
            <kbd>1</kbd> Vote Yes
          </span>
          <span className="hint">
            <kbd>2</kbd> Vote No
          </span>
          <span className="hint">
            <kbd>Enter</kbd> Create Poll
          </span>
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

QuickPollCard.defaultProps = {
  address: null,
};

export default memo(QuickPollCard);
