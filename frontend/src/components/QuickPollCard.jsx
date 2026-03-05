import React from 'react';

export default function QuickPollCard({
  address,
  isLoading,
  pollQuestion,
  setPollQuestion,
  handlePollPing,
  handleCreatePoll,
  handleVoteYes,
  handleVoteNo
}) {
  return (
    <div className="contract-card">
      <div className="contract-header">
        <div className="contract-icon poll">🗳️</div>
        <div>
          <div className="contract-title">QuickPoll</div>
          <div className="contract-subtitle">Vote to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <button
          className="action-btn success"
          onClick={handlePollPing}
          disabled={!address || isLoading('quickpoll-poll-ping')}
        >
          {isLoading('quickpoll-poll-ping') ? <span className="spinner"></span> : '🗳️'}
          Poll Ping
          <span className="cost">0.001 STX</span>
        </button>
        <div className="input-group">
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter poll question..."
            maxLength={100}
          />
        </div>
        <button
          className="action-btn primary"
          onClick={handleCreatePoll}
          disabled={!address || !pollQuestion.trim() || isLoading('quickpoll-create-poll')}
        >
          {isLoading('quickpoll-create-poll') ? <span className="spinner"></span> : '📋'}
          Create Poll
          <span className="cost">0.001 STX</span>
        </button>
        <div className="actions-row">
          <button
            className="action-btn success"
            onClick={handleVoteYes}
            disabled={!address || isLoading('quickpoll-quick-vote-yes')}
          >
            {isLoading('quickpoll-quick-vote-yes') ? <span className="spinner"></span> : '👍'}
            Yes
            <span className="cost">0.001</span>
          </button>
          <button
            className="action-btn secondary"
            onClick={handleVoteNo}
            disabled={!address || isLoading('quickpoll-quick-vote-no')}
          >
            {isLoading('quickpoll-quick-vote-no') ? <span className="spinner"></span> : '👎'}
            No
            <span className="cost">0.001</span>
          </button>
        </div>
      </div>
    </div>
  );
}
