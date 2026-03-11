import React from 'react';
import PropTypes from 'prop-types';
import InteractionStreaks from './InteractionStreaks';
import ClickerCard from './ClickerCard';
import TipJarCard from './TipJarCard';
import QuickPollCard from './QuickPollCard';
import PlayerStats from './PlayerStats';
import QuickActions from './QuickActions';
import TransactionHistory from './TransactionHistory';

/**
 * Main layout grid for the application.
 * Segregates the interaction area from the statistics and history sidebar.
 */
export default function MainGrid({
  address,
  stats,
  txLog,
  clicker,
  tipjar,
  quickpoll,
  pingAll,
  setTxLog
}) {
  return (
    <main className="app-main" id="main-content" tabIndex="-1" aria-label="Main Content">
      <div className="main-grid">
        <section className="interaction-section" aria-labelledby="interactions-title">
          <h2 className="section-title" id="interactions-title">Interactions</h2>
          <InteractionStreaks totalInteractions={stats.clicks + stats.tips + stats.votes} />
          <div className="cards-container">
            <ClickerCard address={address} clicker={clicker} />
            <TipJarCard address={address} tipjar={tipjar} />
            <QuickPollCard address={address} quickpoll={quickpoll} />
          </div>
        </section>

        <aside className="stats-aside" aria-label="Statistics and History">
          <PlayerStats stats={stats} />
          <QuickActions
            address={address}
            onClearLog={() => setTxLog([])}
            onPingAll={pingAll}
          />
          <TransactionHistory txLog={txLog} />
        </aside>
      </div>
    </main>
  );
}

MainGrid.propTypes = {
  address: PropTypes.string,
  stats: PropTypes.object.isRequired,
  txLog: PropTypes.array.isRequired,
  clicker: PropTypes.object.isRequired,
  tipjar: PropTypes.object.isRequired,
  quickpoll: PropTypes.object.isRequired,
  pingAll: PropTypes.func.isRequired,
  setTxLog: PropTypes.func.isRequired
};
