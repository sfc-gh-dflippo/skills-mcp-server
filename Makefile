.PHONY: help install install-dev clean test test-py test-ts lint format type-check pre-commit build

help:  ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install:  ## Install production dependencies
	npm install
	pip install python-frontmatter

install-dev:  ## Install development dependencies
	npm install
	pip install -r requirements-dev.txt
	pre-commit install

clean:  ## Clean build artifacts and caches
	rm -rf dist/
	rm -rf .pytest_cache/
	rm -rf .ruff_cache/
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete

build:  ## Build the project
	npm run build

test:  ## Run all tests (parallel)
	npm test

test-serial:  ## Run all tests (serial, for debugging)
	npm run test:serial

test-py:  ## Run Python tests only
	pytest tests/test_sync_script.py -v -n auto

test-ts:  ## Run TypeScript tests only
	npm run test:server
	npm run test:ts-script

lint:  ## Run linters
	ruff check src/ tests/
	npm run lint

format:  ## Format code
	ruff format src/ tests/
	ruff check --fix src/ tests/
	npm run format

type-check:  ## Run type checkers
	basedpyright src/ tests/
	npm run type-check

pre-commit:  ## Run pre-commit hooks on all files
	pre-commit run --all-files

coverage:  ## Run tests with coverage
	pytest tests/test_sync_script.py --cov=src --cov-report=html --cov-report=term

dev:  ## Start development server
	npm run dev

inspect:  ## Open MCP inspector
	npm run inspect
