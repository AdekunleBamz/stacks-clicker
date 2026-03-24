import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { notify } from '../utils/toast';

const INITIAL_ROADMAP_ITEMS = [
  { quarter: 'Q1 2026', title: 'Core Clicker Launch', status: 'completed', votes: 124 },
  { quarter: 'Q2 2026', title: 'PWA & Mobile Optimization', status: 'completed', votes: 89 },
  { quarter: 'Q3 2026', title: 'On-chain Milestones & Leaderboard', status: 'in-progress', votes: 256 },
  { quarter: 'Q4 2026', title: 'Social Integration & DAOs', status: 'planned', votes: 412 },
];

export default function RoadmapBoard() {
  const [items, setItems] = useState(INITIAL_ROADMAP_ITEMS);

  const handleVote = useCallback((title) => {
    setItems(prev => prev.map(item => 
      item.title === title ? { ...item, votes: item.votes + 1 } : item
    ));
    notify.success(`Voted for: ${title}`);
  }, []);

  return (
    <section className="roadmap-board" aria-labelledby="roadmap-title">
      <div className="roadmap-header">
        <h2 className="section-title" id="roadmap-title" aria-label="Upcoming Project Roadmap">🚀 Project Roadmap</h2>
        <p className="section-desc">Vote on upcoming features you want to see most.</p>
      </div>
      <div className="roadmap-items" role="feed" aria-live="polite" aria-label="Dynamically Updating Roadmap Feed">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            className={`roadmap-card ${item.status} glass-card`}
            role="article"
            aria-labelledby={`roadmap-item-title-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`status-tag ${item.status}`} aria-label={`Project status: ${item.status}`}>{item.status}</div>
            <div className="roadmap-card-body">
              <span className="q-badge">{item.quarter}</span>
              <h3 className="roadmap-card-title" id={`roadmap-item-title-${index}`}>{item.title}</h3>
            </div>
            <div className="roadmap-card-footer">
              <div className="vote-count" role="status" aria-live="polite">
                <span className="vote-icon" aria-hidden="true">🔥</span>
                {item.votes} votes
              </div>
              {item.status !== 'completed' && (
                <button 
                  type="button" 
                  className="roadmap-vote-btn"
                  onClick={() => handleVote(item.title)}
                  aria-label={`Vote for ${item.title}`}
                  title="Cast a vote for this feature"
                >
                  Vote
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
