# Testing Guide

This project uses **Vitest** and **React Testing Library** for unit testing.

## Running Tests

```bash
# Run tests in watch mode
npm test
```

## Test Structure

Tests are located in `src/test/` directory:

```
src/test/
├── setup.js              # Test configuration and globals
├── Table.test.jsx        # Table component tests
```

## Test Environment

- **Test Runner**: Vitest 4.x
- **Assertion Library**: @testing-library/jest-dom
- **React Testing**: @testing-library/react
