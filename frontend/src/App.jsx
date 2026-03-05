import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import toast, { Toaster } from 'react-hot-toast'
import { StacksMainnet } from '@stacks/network'
import {
  uintCV,
  stringAsciiCV,
  principalCV,
  PostConditionMode
} from '@stacks/transactions'
import PlayerStats from './components/PlayerStats'
import TransactionHistory from './components/TransactionHistory'
import ClickerCard from './components/ClickerCard'
import TipJarCard from './components/TipJarCard'
import QuickPollCard from './components/QuickPollCard'
import { useWallet } from './context/WalletContext'

// ============================================
// CONFIGURATION - UPDATE THESE AFTER DEPLOYING
// ============================================
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''
const DEPLOYER = 'SP_YOUR_ADDRESS_HERE' // ⚠️ Replace with your deployed address
const NETWORK = new StacksMainnet()

// Contract addresses
const CONTRACTS = {
  clicker: `${DEPLOYER}.clicker`,
  tipjar: `${DEPLOYER}.tipjar`,
  quickpoll: `${DEPLOYER}.quickpoll`
}

export default function App() {
  // Global Wallet State
  const { address, connectWallet, disconnectWallet, appDetails } = useWallet()

  // App State
  const [txLog, setTxLog] = useState([])
  const [loading, setLoading] = useState({})
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 })
  const [pollQuestion, setPollQuestion] = useState('')
  const [tipAmount, setTipAmount] = useState('0.001')

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
      toast.error('Connect wallet first!')
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
          toast.success(`${actionName} submitted! TX: ${txId.slice(0, 10)}...`)
          if (onSuccess) onSuccess()
          setLoading(prev => ({ ...prev, [loadingKey]: false }))
        },
        onCancel: () => {
          toast.error('Transaction cancelled')
          setLoading(prev => ({ ...prev, [loadingKey]: false }))
        }
      })
    } catch (err) {
      console.error(err)
      toast.error(`Error: ${err.message}`)
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
      toast.error('Invalid tip amount')
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
      toast.error('Enter a poll question!')
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
      <Toaster position="top-right" />

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
      <PlayerStats stats={stats} txCount={txLog.length} />

      {/* Contract Cards */}
      <section className="contracts-grid">
        {/* CLICKER CONTRACT */}
        <ClickerCard
          address={address}
          isLoading={isLoading}
          handleClick={handleClick}
          handleMultiClick={handleMultiClick}
          handlePing={handlePing}
        />

        {/* TIPJAR CONTRACT */}
        <TipJarCard
          address={address}
          isLoading={isLoading}
          tipAmount={tipAmount}
          setTipAmount={setTipAmount}
          handleSelfPing={handleSelfPing}
          handleQuickTip={handleQuickTip}
          handleCustomTip={handleCustomTip}
        />

        {/* QUICKPOLL CONTRACT */}
        <QuickPollCard
          address={address}
          isLoading={isLoading}
          pollQuestion={pollQuestion}
          setPollQuestion={setPollQuestion}
          handlePollPing={handlePollPing}
          handleCreatePoll={handleCreatePoll}
          handleVoteYes={handleVoteYes}
          handleVoteNo={handleVoteNo}
        />
      </section>

      {/* Transaction Log */}
      <TransactionHistory txLog={txLog} />

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
