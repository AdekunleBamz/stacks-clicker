import { useState, useEffect, useCallback } from 'react'
import { openContractCall, showConnect, disconnect } from '@stacks/connect'
import { StacksMainnet } from '@stacks/network'
import { 
  uintCV, 
  stringAsciiCV,
  principalCV,
  PostConditionMode 
} from '@stacks/transactions'

// ============================================
// CONFIGURATION - UPDATE THESE AFTER DEPLOYING
// ============================================
const WALLETCONNECT_PROJECT_ID = '99294a66fb85e17fb60238acc703f724'
const DEPLOYER = 'SP_YOUR_ADDRESS_HERE' // ⚠️ Replace with your deployed address
const NETWORK = new StacksMainnet()

// Contract addresses
const CONTRACTS = {
  clicker: `${DEPLOYER}.clicker`,
  tipjar: `${DEPLOYER}.tipjar`,
  quickpoll: `${DEPLOYER}.quickpoll`
}

// App metadata for wallet connection
const appDetails = {
  name: 'StacksClicker',
  icon: window.location.origin + '/favicon.svg',
}

export default function App() {
  // State
  const [address, setAddress] = useState(null)
  const [txLog, setTxLog] = useState([])
  const [loading, setLoading] = useState({})
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 })
  const [toasts, setToasts] = useState([])
  const [pollQuestion, setPollQuestion] = useState('')
  const [tipAmount, setTipAmount] = useState('0.001')

  // Check existing connection on mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = () => {
    try {
      const stored = localStorage.getItem('stacks-session')
      if (stored) {
        const userData = JSON.parse(stored)
        if (userData?.addresses?.mainnet) {
          setAddress(userData.addresses.mainnet)
        }
      }
    } catch (e) {
      console.log('No existing connection')
    }
  }

  // Toast notifications
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  // Connect wallet using Stacks Connect
  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => {
        checkConnection()
        showToast('Wallet connected! 🎉', 'success')
      },
      onCancel: () => {
        showToast('Connection cancelled', 'error')
      },
    })
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    disconnect()
    setAddress(null)
    showToast('Wallet disconnected', 'info')
  }

  // Add transaction to log
  const addTxToLog = (action, txId, status = 'pending') => {
    const tx = {
      id: txId || `pending-${Date.now()}`,
      action,
      status,
      time: new Date().toLocaleTimeString()
    }
    setTxLog(prev => [tx, ...prev.slice(0, 49)])
    return tx
  }

  // Generic contract call handler
  const callContract = async (contract, functionName, args = [], actionName, onSuccess) => {
    if (!address) {
      showToast('Connect wallet first!', 'error')
      return
    }

    const loadingKey = `${contract}-${functionName}`
    setLoading(prev => ({ ...prev, [loadingKey]: true }))

    try {
      await openContractCall({
        network: NETWORK,
        contractAddress: DEPLOYER,
        contractName: contract,
        functionName,
        functionArgs: args,
        postConditionMode: PostConditionMode.Allow,
        appDetails,
        onFinish: (data) => {
          const txId = data.txId
          addTxToLog(actionName, txId, 'success')
          showToast(`${actionName} submitted! TX: ${txId.slice(0, 10)}...`, 'success')
          if (onSuccess) onSuccess()
          setLoading(prev => ({ ...prev, [loadingKey]: false }))
        },
        onCancel: () => {
          showToast('Transaction cancelled', 'error')
          setLoading(prev => ({ ...prev, [loadingKey]: false }))
        }
      })
    } catch (err) {
      console.error(err)
      showToast(`Error: ${err.message}`, 'error')
      setLoading(prev => ({ ...prev, [loadingKey]: false }))
    }
  }

  // ===============================
  // CLICKER CONTRACT ACTIONS
  // ===============================
  const handleClick = () => {
    callContract('clicker', 'click', [], '🎯 Click', () => {
      setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }))
    })
  }

  const handleMultiClick = () => {
    callContract('clicker', 'multi-click', [uintCV(10)], '🔥 10x Click', () => {
      setStats(prev => ({ ...prev, clicks: prev.clicks + 10 }))
    })
  }

  const handlePing = () => {
    callContract('clicker', 'ping', [], '📡 Ping')
  }

  // ===============================
  // TIPJAR CONTRACT ACTIONS
  // ===============================
  const handleSelfPing = () => {
    callContract('tipjar', 'self-ping', [], '🏓 Self Ping')
  }

  const handleQuickTip = () => {
    callContract('tipjar', 'quick-tip', [], '💰 Quick Tip (0.001 STX)', () => {
      setStats(prev => ({ ...prev, tips: prev.tips + 1 }))
    })
  }

  const handleCustomTip = () => {
    const microStx = Math.floor(parseFloat(tipAmount) * 1000000)
    if (microStx < 1) {
      showToast('Invalid tip amount', 'error')
      return
    }
    callContract('tipjar', 'tip-jar', [uintCV(microStx)], `💎 Tip ${tipAmount} STX`, () => {
      setStats(prev => ({ ...prev, tips: prev.tips + 1 }))
    })
  }

  // ===============================
  // QUICKPOLL CONTRACT ACTIONS
  // ===============================
  const handlePollPing = () => {
    callContract('quickpoll', 'poll-ping', [], '🗳️ Poll Ping')
  }

  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) {
      showToast('Enter a poll question!', 'error')
      return
    }
    callContract('quickpoll', 'create-poll', [stringAsciiCV(pollQuestion.slice(0, 100))], '📋 Create Poll', () => {
      setPollQuestion('')
    })
  }

  const handleVoteYes = () => {
    callContract('quickpoll', 'quick-vote-yes', [], '👍 Vote Yes', () => {
      setStats(prev => ({ ...prev, votes: prev.votes + 1 }))
    })
  }

  const handleVoteNo = () => {
    callContract('quickpoll', 'quick-vote-no', [], '👎 Vote No', () => {
      setStats(prev => ({ ...prev, votes: prev.votes + 1 }))
    })
  }

  const isLoading = (key) => loading[key] || false

  return (
    <div className="app">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <h1>⚡ Stacks Transaction Hub</h1>
        <p>Seamless blockchain interactions on the Stacks network</p>
      </header>

      {/* Wallet Section */}
      <section className="wallet-section">
        {!address ? (
          <button className="wallet-btn connect" onClick={connectWallet}>
            🔗 Connect Wallet
          </button>
        ) : (
          <>
            <div className="wallet-info">
              <span>🟢</span>
              <span className="wallet-address">
                {address.slice(0, 8)}...{address.slice(-6)}
              </span>
            </div>
            <button className="wallet-btn disconnect" onClick={disconnectWallet}>
              Disconnect
            </button>
          </>
        )}
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-card">
          <div className="value">{stats.clicks}</div>
          <div className="label">Clicks</div>
        </div>
        <div className="stat-card">
          <div className="value">{stats.tips}</div>
          <div className="label">Tips Sent</div>
        </div>
        <div className="stat-card">
          <div className="value">{stats.votes}</div>
          <div className="label">Votes Cast</div>
        </div>
        <div className="stat-card">
          <div className="value">{txLog.length}</div>
          <div className="label">Transactions</div>
        </div>
      </section>

      {/* Contract Cards */}
      <section className="contracts-grid">
        {/* CLICKER CONTRACT */}
        <div className="contract-card">
          <div className="contract-header">
            <div className="contract-icon clicker">🎯</div>
            <div>
              <div className="contract-title">Clicker</div>
              <div className="contract-subtitle">Click to generate transactions</div>
            </div>
          </div>
          <div className="actions">
            <button 
              className="action-btn primary" 
              onClick={handleClick}
              disabled={!address || isLoading('clicker-click')}
            >
              {isLoading('clicker-click') ? <span className="spinner"></span> : '🎯'}
              Click
              <span className="cost">0.001 STX</span>
            </button>
            <button 
              className="action-btn secondary" 
              onClick={handleMultiClick}
              disabled={!address || isLoading('clicker-multi-click')}
            >
              {isLoading('clicker-multi-click') ? <span className="spinner"></span> : '🔥'}
              10x Click
              <span className="cost">0.001 STX</span>
            </button>
            <button 
              className="action-btn success" 
              onClick={handlePing}
              disabled={!address || isLoading('clicker-ping')}
            >
              {isLoading('clicker-ping') ? <span className="spinner"></span> : '📡'}
              Ping
              <span className="cost">0.001 STX</span>
            </button>
          </div>
        </div>

        {/* TIPJAR CONTRACT */}
        <div className="contract-card">
          <div className="contract-header">
            <div className="contract-icon tipjar">💰</div>
            <div>
              <div className="contract-title">TipJar</div>
              <div className="contract-subtitle">Send tips to generate transactions</div>
            </div>
          </div>
          <div className="actions">
            <button 
              className="action-btn success" 
              onClick={handleSelfPing}
              disabled={!address || isLoading('tipjar-self-ping')}
            >
              {isLoading('tipjar-self-ping') ? <span className="spinner"></span> : '🏓'}
              Self Ping
              <span className="cost">0.001 STX</span>
            </button>
            <button 
              className="action-btn warning" 
              onClick={handleQuickTip}
              disabled={!address || isLoading('tipjar-quick-tip')}
            >
              {isLoading('tipjar-quick-tip') ? <span className="spinner"></span> : '💰'}
              Quick Tip
              <span className="cost">0.002 STX</span>
            </button>
            <div className="input-group">
              <input 
                type="number" 
                step="0.001"
                min="0.001"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="Amount in STX"
              />
            </div>
            <button 
              className="action-btn secondary" 
              onClick={handleCustomTip}
              disabled={!address || isLoading('tipjar-tip-jar')}
            >
              {isLoading('tipjar-tip-jar') ? <span className="spinner"></span> : '💎'}
              Custom Tip
              <span className="cost">{(parseFloat(tipAmount) + 0.001).toFixed(3)} STX</span>
            </button>
          </div>
        </div>

        {/* QUICKPOLL CONTRACT */}
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
      </section>

      {/* Transaction Log */}
      <section className="tx-log">
        <h3>📜 Transaction History</h3>
        <div className="tx-list">
          {txLog.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet. Start clicking! ⚡</p>
            </div>
          ) : (
            txLog.map((tx, idx) => (
              <div key={tx.id + idx} className="tx-item">
                <div className={`tx-status ${tx.status}`}></div>
                <div className="tx-info">
                  <div className="tx-action">{tx.action}</div>
                  <div className="tx-id">
                    {tx.id.startsWith('pending') ? 'Awaiting...' : (
                      <a 
                        href={`https://explorer.hiro.so/txid/${tx.id}?chain=mainnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#00D4AA' }}
                      >
                        {tx.id.slice(0, 20)}...
                      </a>
                    )}
                  </div>
                </div>
                <div className="tx-time">{tx.time}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 40, color: '#a0a0a0' }}>
        <p>Powered by Stacks Blockchain • Secure & Decentralized</p>
        <p style={{ marginTop: 10, fontSize: '0.9rem' }}>
          All transactions are recorded on-chain for transparency and immutability
        </p>
      </footer>
    </div>
  )
}
