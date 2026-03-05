import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className="contract-card"
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(85, 70, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="contract-header">
        <div className="contract-icon poll">🗳️</div>
        <div>
          <div className="contract-title">QuickPoll</div>
          <div className="contract-subtitle">Vote to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <motion.button
          className="action-btn success"
          onClick={handlePollPing}
          disabled={!address || isLoading('quickpoll-poll-ping')}
          whileHover={address && !isLoading('quickpoll-poll-ping') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('quickpoll-poll-ping') ? { scale: 0.95 } : {}}
        >
          {isLoading('quickpoll-poll-ping') ? <span className="spinner"></span> : '🗳️'}
          Poll Ping
          <span className="cost">0.001 STX</span>
        </motion.button>
        <div className="input-group">
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Enter poll question..."
            maxLength={100}
          />
        </div>
        <motion.button
          className="action-btn primary"
          onClick={handleCreatePoll}
          disabled={!address || !pollQuestion.trim() || isLoading('quickpoll-create-poll')}
          whileHover={
            address && pollQuestion.trim() && !isLoading('quickpoll-create-poll')
              ? { scale: 1.02 }
              : {}
          }
          whileTap={
            address && pollQuestion.trim() && !isLoading('quickpoll-create-poll')
              ? { scale: 0.95 }
              : {}
          }
        >
          {isLoading('quickpoll-create-poll') ? <span className="spinner"></span> : '📋'}
          Create Poll
          <span className="cost">0.001 STX</span>
        </motion.button>
        <div className="actions-row">
          <motion.button
            className="action-btn success"
            onClick={handleVoteYes}
            disabled={!address || isLoading('quickpoll-quick-vote-yes')}
            whileHover={address && !isLoading('quickpoll-quick-vote-yes') ? { scale: 1.02 } : {}}
            whileTap={address && !isLoading('quickpoll-quick-vote-yes') ? { scale: 0.95 } : {}}
          >
            {isLoading('quickpoll-quick-vote-yes') ? <span className="spinner"></span> : '👍'}
            Yes
            <span className="cost">0.001</span>
          </motion.button>
          <motion.button
            className="action-btn secondary"
            onClick={handleVoteNo}
            disabled={!address || isLoading('quickpoll-quick-vote-no')}
            whileHover={address && !isLoading('quickpoll-quick-vote-no') ? { scale: 1.02 } : {}}
            whileTap={address && !isLoading('quickpoll-quick-vote-no') ? { scale: 0.95 } : {}}
          >
            {isLoading('quickpoll-quick-vote-no') ? <span className="spinner"></span> : '👎'}
            No
            <span className="cost">0.001</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
