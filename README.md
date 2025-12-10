# RTK Query Demo

A Todo app demonstrating data fetching patterns with Redux Toolkit, with mock API powered by MSW (Mock Service Worker).

## Branches

- **`main`** - Base project setup
- **`with-redux`** - Implementation using Redux Toolkit with createAsyncThunk
- **`with-rtk-query`** - Implementation using RTK Query (coming soon)

## Running the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

## Features

- Todo CRUD operations (Create, Read, Update, Delete)
- Mock API with configurable latency and error rates via Leva controls
- Demonstrates race condition scenarios with async state management

## Dev Tools

The app includes Leva controls to simulate network conditions:

- **Latency**: Adjust API response delay (0ms - 10s)
- **Error Rate**: Simulate random API failures (0% - 100%)

Use these to test race conditions and error handling in your data fetching implementation.
