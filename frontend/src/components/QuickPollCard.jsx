import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

/**
 * Component for the QuickPoll interaction card.
 * @param {Object} props - Component props.
 * @param {string} props.address - Connected wallet address.
 * @param {Function} props.isLoading - Function to check if an action is loading.
 * @param {string} props.pollQuestion - Current poll question text.
 * @param {Function} props.setPollQuestion - Setter for poll question text.
 * @param {Function} props.handlePollPing - Handler for poll ping action.
 * @param {Function} props.handleCreatePoll - Handler for creating a new poll.
 * @param {Function} props.handleVoteYes - Handler for voting YES.
 * @param {Function} props.handleVoteNo - Handler for voting NO.
 */
function QuickPollCard({
  address,
  isLoading,
  pollQuestion,
  setPollQuestion,
  handlePollPing,
  handleCreatePoll,
  handleVoteYes,
  handleVoteNo,
}) {
  const { playSound } = useSound();
  const [errorField, setErrorField] = useState(null);

  const handleAction = useCallback((fn, fieldId, validation = () => true) => {
    if (!address || !validation()) {
      playSound('error');
      setErrorField(fieldId);
      setTimeout(() => setErrorField(null), 500);
      return;
    }
    playSound('click');
    fn();
  }, [address, playSound]);

  return (
    <ActionCard
      id="quickpoll-card"
      title="🗳️ QuickPoll"
      subtitle="Vote to generate transactions."
      icon="🗳️"
      accentColor="#10B981"
    >
      <div className="actions">
        <Tooltip content="Ping the QuickPoll contract.">
          <ActionButton
            label="Poll Ping"
            icon="🗳️"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handlePollPing, 'poll-ping')}
            isLoading={isLoading('quickpoll-poll-ping')}
            isError={errorField === 'poll-ping'}
            disabled={isLoading('quickpoll-poll-ping')}
          />
        </Tooltip>

        <div className="input-group">
          <label className="input-label">Poll Question</label>
          <input
            type="text"
            className="poll-input"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter poll question..."
            maxLength={100}
          />
        </div>

        <Tooltip content="Create a new poll on the blockchain.">
          <ActionButton
            label="Create Poll"
            icon="📋"
            cost="0.001 STX"
            className="primary"
            onClick={() => handleAction(handleCreatePoll, 'create-poll', () => pollQuestion.trim().length > 0)}
            isLoading={isLoading('quickpoll-create-poll')}
            isError={errorField === 'create-poll'}
            disabled={isLoading('quickpoll-create-poll')}
          />
        </Tooltip>

        <div className="actions-row">
          <Tooltip content="Vote YES on the current poll.">
            <ActionButton
              label="Yes"
              icon="👍"
              cost="0.001"
              className="success"
              onClick={() => handleAction(handleVoteYes, 'vote-yes')}
              isLoading={isLoading('quickpoll-quick-vote-yes')}
              isError={errorField === 'vote-yes'}
              disabled={isLoading('quickpoll-quick-vote-yes')}
            />
          </Tooltip>
          <Tooltip content="Vote NO on the current poll.">
            <ActionButton
              label="No"
              icon="👎"
              cost="0.001"
              className="secondary"
              onClick={() => handleAction(handleVoteNo, 'vote-no')}
              isLoading={isLoading('quickpoll-quick-vote-no')}
              isError={errorField === 'vote-no'}
              disabled={isLoading('quickpoll-quick-vote-no')}
            />
          </Tooltip>
        </div>
      </div>
    </ActionCard>
  );
}

QuickPollCard.propTypes = {
  address: PropTypes.string,
  isLoading: PropTypes.func.isRequired,
  pollQuestion: PropTypes.string.isRequired,
  setPollQuestion: PropTypes.func.isRequired,
  handlePollPing: PropTypes.func.isRequired,
  handleCreatePoll: PropTypes.func.isRequired,
  handleVoteYes: PropTypes.func.isRequired,
  handleVoteNo: PropTypes.func.isRequired,
};

export default memo(QuickPollCard);
