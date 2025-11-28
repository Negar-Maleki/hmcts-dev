# Testing

This project uses **Jest** for integration testing.

## Test Structure

Tests are located in the `__tests__/` directory:

- `taskRoutes.test.js` - API endpoint integration tests

## Running Tests

```bash
# Run all tests
npm test
```

## Test Coverage

The tests cover all CRUD operations and validation:

- ✅ GET `/` - Server health check
- ✅ GET `/tasks` - Fetch all tasks
- ✅ POST `/tasks` - Create task with validation
- ✅ PUT `/tasks/:id` - Update task
- ✅ DELETE `/tasks/:id` - Delete task

## Example Test Output

```
PASS  __tests__/taskRoutes.test.js
  Task Routes - Integration Tests
    GET /
      ✓ should return server info
    GET /tasks
      ✓ should return all tasks
    POST /tasks
      ✓ should create a new task with valid data
      ✓ should return 400 when required fields are missing
    PUT /tasks/:id
      ✓ should update a task
    DELETE /tasks/:id
      ✓ should delete a task

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```
