.PHONY: check test console deploy-devnet deploy-mainnet clean help

# Default target
help:
	@echo "StacksClicker v2j - Available commands:"
	@echo ""
	@echo "  make check          - Check contract syntax"
	@echo "  make test           - Run all Clarinet tests"
	@echo "  make coverage       - Run tests with coverage"
	@echo "  make console        - Open Clarinet console"
	@echo "  make deploy-devnet  - Deploy to devnet"
	@echo "  make deploy-mainnet - Deploy to mainnet"
	@echo "  make clean          - Clean build artifacts"
	@echo ""

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
