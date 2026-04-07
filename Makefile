.PHONY: help check test coverage console deploy-devnet deploy-mainnet clean security-audit lint:all lint:fix install dev build test:frontend format:check

# Default target
help:
	@echo "StacksClicker v2p - Available commands:"
	@echo ""
	@echo "  make check          - Check contract syntax"
	@echo "  make test           - Run all Clarinet tests"
	@echo "  make coverage       - Run tests with coverage"
	@echo "  make console        - Open Clarinet console"
	@echo "  make deploy-devnet  - Deploy to devnet"
	@echo "  make deploy-mainnet - Deploy to mainnet"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make lint:all       - Run linting for root and frontend"
	@echo "  make security-audit - Run npm audit for frontend"
	@echo ""

# Security
security-audit:
	cd frontend && npm audit

# Testing
test:frontend:
	cd frontend && npm run test:run

# Linting
lint:all:
	cd frontend && npm run lint

lint:fix:
	cd frontend && npm run lint:fix

format:check:
	cd frontend && npm run format:check


# Check contract syntax
check:
	clarinet check

# Run tests
test:
	clarinet test

# Run tests with coverage
coverage:
	clarinet test --coverage

# Open Clarinet console for interactive testing
console:
	clarinet console

# Deploy to devnet
deploy-devnet:
	clarinet deployments apply -p deployments/default.devnet-plan.yaml

# Deploy to mainnet (requires confirmation)
deploy-mainnet:
	@echo "⚠️  WARNING: This will deploy to MAINNET!"
	@echo "Make sure you have:"
	@echo "  1. Configured settings/Mainnet.toml with your mnemonic"
	@echo "  2. Sufficient STX in your deployer wallet"
	@echo ""
	@read -p "Continue? [y/N] " confirm && [ "$$confirm" = "y" ] && \
		clarinet deployments apply -p deployments/default.mainnet-plan.yaml || \
		echo "Deployment cancelled."

# Clean build artifacts
clean:
	rm -rf .cache
	rm -rf node_modules
	rm -rf coverage

# Install dependencies (for frontend)
install:
	npm install
	cd frontend && npm install

# Run frontend dev server
dev:
	cd frontend && npm run dev

# Build frontend for production
build:
	cd frontend && npm run build

# Preview production build
preview:
	cd frontend && npm run preview

# Run frontend tests with coverage
test:coverage:
	cd frontend && npm run test:coverage

# Install clarinet
install:clarinet:
	curl -LsSf https://github.com/hirosystems/clarinet/releases/latest/download/clarinet-installer.sh | sh

# Verify environment setup
env:check:
	@echo "Checking environment..."
	@node --version
	@npm --version
	@clarinet --version 2>/dev/null || echo "Clarinet not installed"
