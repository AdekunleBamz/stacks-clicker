import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InteractionStreaks from './InteractionStreaks';
import ClickerCard from './ClickerCard';
import TipJarCard from './TipJarCard';
import QuickPollCard from './QuickPollCard';

/**
 * Main layout grid for the application.
 * Focused on the interaction cards section.
 */
function MainGrid({
  address,
  stats,
  clicker,
  tipjar,
  quickpoll
}) {
  return (
    <section className="interaction-section" aria-labelledby="interactions-title">
      <h2 className="section-title" id="interactions-title" aria-label="Available Interactions Dashboard">Interactions</h2>
      <InteractionStreaks totalInteractions={stats.clicks + stats.tips + stats.votes} />
      <div className="cards-container" role="group" aria-label="Available Interaction Panels">
        <ClickerCard address={address} clicker={clicker} />
        <TipJarCard address={address} tipjar={tipjar} />
        <QuickPollCard address={address} quickpoll={quickpoll} />
      </div>
    </section>
  );
}

MainGrid.propTypes = {
  address: PropTypes.string,
  stats: PropTypes.shape({
    clicks: PropTypes.number.isRequired,
    tips: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  clicker: PropTypes.shape({
    click: PropTypes.func.isRequired,
    multiClick: PropTypes.func.isRequired,
    ping: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
  }).isRequired,
  tipjar: PropTypes.shape({
    tip: PropTypes.func.isRequired,
    handleSelfPing: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
  }).isRequired,
  quickpoll: PropTypes.shape({
    vote: PropTypes.func.isRequired,
    createPoll: PropTypes.func.isRequired,
    handlePollPing: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
  }).isRequired
};

export default memo(MainGrid);
