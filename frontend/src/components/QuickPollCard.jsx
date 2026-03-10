import React from 'react';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

export default function QuickPollCard({
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

  const handleAction = (fn) => {
    playSound('click');
    fn();
  };
  return (
    <ActionCard
      id="quickpoll-card"
      title="🗳️ QuickPoll"
      subtitle="Vote to generate transactions."
      icon="🗳️"
      accentColor="#10B981"
    >
      <div className="actions">
        <Tooltip text="Ping the QuickPoll contract.">
          <ActionButton
            label="Poll Ping"
            icon="🗳️"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handlePollPing)}
            isLoading={isLoading('quickpoll-poll-ping')}
            disabled={!address}
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

        <Tooltip text="Create a new poll on the blockchain.">
          <ActionButton
            label="Create Poll"
            icon="📋"
            cost="0.001 STX"
            className="primary"
            onClick={() => handleAction(handleCreatePoll)}
            isLoading={isLoading('quickpoll-create-poll')}
            disabled={!address || !pollQuestion.trim()}
          />
        </Tooltip>

        <div className="actions-row">
          <Tooltip text="Vote YES on the current poll.">
            <ActionButton
              label="Yes"
              icon="👍"
              cost="0.001"
              className="success"
              onClick={() => handleAction(handleVoteYes)}
              isLoading={isLoading('quickpoll-quick-vote-yes')}
              disabled={!address}
            />
          </Tooltip>
          <Tooltip text="Vote NO on the current poll.">
            <ActionButton
              label="No"
              icon="👎"
              cost="0.001"
              className="secondary"
              onClick={() => handleAction(handleVoteNo)}
              isLoading={isLoading('quickpoll-quick-vote-no')}
              disabled={!address}
            />
          </Tooltip>
        </div>
      </div>
    </ActionCard>
  );
}
