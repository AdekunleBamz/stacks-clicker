import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N';

/**
 * QuickPoll Component
 * Create and vote on community polls
 */
export default function QuickPoll({ onTxSubmit }) {
  const { address, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollId, setPollId] = useState(1);
  const [votes, setVotes] = useState({ yes: 0, no: 0 });

  const handleCreatePoll = async () => {
    if (!isConnected || !pollQuestion.trim()) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'create-poll',
        functionArgs: [{ type: 'string-ascii', value: pollQuestion }]
      });

      setPollQuestion('');
      onTxSubmit?.('create-poll', result.txId);
    } catch (err) {
      console.error('Create poll failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoteYes = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'vote-yes',
        functionArgs: [{ type: 'uint128', value: pollId.toString() }]
      });

      setVotes(prev => ({ ...prev, yes: prev.yes + 1 }));
      onTxSubmit?.('vote-yes', result.txId);
    } catch (err) {
      console.error('Vote yes failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoteNo = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'vote-no',
        functionArgs: [{ type: 'uint128', value: pollId.toString() }]
      });

      setVotes(prev => ({ ...prev, no: prev.no + 1 }));
      onTxSubmit?.('vote-no', result.txId);
    } catch (err) {
      console.error('Vote no failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickVoteYes = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'quick-vote-yes',
        functionArgs: []
      });

      setVotes(prev => ({ ...prev, yes: prev.yes + 1 }));
      onTxSubmit?.('quick-vote-yes', result.txId);
    } catch (err) {
      console.error('Quick vote yes failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickVoteNo = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'quick-vote-no',
        functionArgs: []
      });

      setVotes(prev => ({ ...prev, no: prev.no + 1 }));
      onTxSubmit?.('quick-vote-no', result.txId);
    } catch (err) {
      console.error('Quick vote no failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePollPing = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll',
        functionName: 'poll-ping',
        functionArgs: []
      });

      onTxSubmit?.('poll-ping', result.txId);
    } catch (err) {
      console.error('Poll ping failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card quickpoll">
      <div className="game-header">
        <h2>🗳️ QuickPoll</h2>
        <span className="game-badge">Community Voting</span>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-value">{votes.yes}</span>
          <span className="stat-label">Yes Votes</span>
        </div>
        <div className="stat">
          <span className="stat-value">{votes.no}</span>
          <span className="stat-label">No Votes</span>
        </div>
      </div>

      <div className="game-actions">
        <div className="poll-create">
          <input
            type="text"
            placeholder="Enter poll question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            className="poll-input"
            maxLength={200}
          />
          <button
            className="action-btn primary"
            onClick={handleCreatePoll}
            disabled={!isConnected || loading || !pollQuestion.trim()}
          >
            Create Poll
          </button>
        </div>

        <div className="vote-buttons">
          <button
            className="action-btn vote-yes"
            onClick={handleQuickVoteYes}
            disabled={!isConnected || loading}
          >
            👍 Quick Yes
          </button>
          <button
            className="action-btn vote-no"
            onClick={handleQuickVoteNo}
            disabled={!isConnected || loading}
          >
            👎 Quick No
          </button>
        </div>

        <div className="poll-specific">
          <input
            type="number"
            min="1"
            value={pollId}
            onChange={(e) => setPollId(parseInt(e.target.value) || 1)}
            className="poll-id-input"
            placeholder="Poll ID"
            aria-label="Target Poll ID"
          />
          <button
            className="action-btn secondary"
            onClick={handleVoteYes}
            disabled={!isConnected || loading}
          >
            Vote Yes #{pollId}
          </button>
          <button
            className="action-btn secondary"
            onClick={handleVoteNo}
            disabled={!isConnected || loading}
          >
            Vote No #{pollId}
          </button>
        </div>

        <button
          className="action-btn outline"
          onClick={handlePollPing}
          disabled={!isConnected || loading}
        >
          📡 Poll Ping
        </button>
      </div>

      <p className="game-fee">Fee: 0.001 STX per action</p>
    </div>
  );
}
