import React from 'react';
import { motion } from 'framer-motion';

const ROADMAP_ITEMS = [
  { quarter: 'Q1 2026', title: 'Core Clicker Launch', status: 'completed' },
  { quarter: 'Q2 2026', title: 'PWA & Mobile Optimization', status: 'completed' },
  { quarter: 'Q3 2026', title: 'On-chain Milestones & Leaderboard', status: 'in-progress' },
  { quarter: 'Q4 2026', title: 'Social Integration & DAOs', status: 'planned' },
];

export default function RoadmapBoard() {
  return (
    <section className="roadmap-board">
      <h2 className="section-title">🚀 Project Roadmap</h2>
      <div className="roadmap-items">
        {ROADMAP_ITEMS.map((item, index) => (
          <motion.div
            key={item.title}
            className={`roadmap-item ${item.status}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="roadmap-quarter">{item.quarter}</div>
            <div className="roadmap-title">{item.title}</div>
            <div className="roadmap-status-badge">{item.status}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
