## ADDED Requirements

### Requirement: Centralized MongoDB connection

The system SHALL provide a centralized MongoDB connection manager at `src/server/db/mongo.ts` that maintains a singleton connection.

#### Scenario: First connection request

- **WHEN** application requests MongoDB client for the first time
- **THEN** connection manager creates and returns a new connection
- **THEN** connection is cached for subsequent requests

#### Scenario: Subsequent connection requests

- **WHEN** application requests MongoDB client after initial connection
- **THEN** connection manager returns the cached connection
- **THEN** no new connection is created

### Requirement: Connection reuse across requests

The system SHALL reuse MongoDB connections across multiple API requests in the same serverless function instance.

#### Scenario: Multiple API calls in warm instance

- **WHEN** multiple API requests are handled by the same warm serverless instance
- **THEN** all requests SHALL use the same MongoDB connection
- **THEN** connection count does not increase

### Requirement: Connection configuration

The system SHALL read MongoDB connection URI from `MONGODB_URI` environment variable.

#### Scenario: Valid connection URI

- **WHEN** MONGODB_URI environment variable is set with valid URI
- **THEN** connection manager uses the URI to establish connection

#### Scenario: Missing connection URI

- **WHEN** MONGODB_URI environment variable is not set
- **THEN** connection manager SHALL throw an error with clear message

### Requirement: Database and collection access

The system SHALL provide helper functions to access specific databases and collections.

#### Scenario: Getting database instance

- **WHEN** code needs to access a specific database
- **THEN** connection manager provides a `getDatabase(name)` function
- **THEN** function returns the requested database instance

#### Scenario: Getting collection instance

- **WHEN** code needs to access a specific collection
- **THEN** connection manager provides a `getCollection(dbName, collectionName)` function
- **THEN** function returns the requested collection instance

### Requirement: Connection health monitoring

The system SHALL provide a mechanism to verify connection health.

#### Scenario: Checking connection status

- **WHEN** application needs to verify database connectivity
- **THEN** connection manager provides a `ping()` function
- **THEN** function returns true if connection is healthy

#### Scenario: Handling connection failures

- **WHEN** database connection is lost or unhealthy
- **THEN** connection manager SHALL attempt to reconnect
- **THEN** subsequent requests SHALL use the new connection

### Requirement: Graceful error handling

The system SHALL handle connection errors gracefully without crashing the application.

#### Scenario: Connection failure during initialization

- **WHEN** MongoDB connection fails during initial setup
- **THEN** connection manager SHALL throw a descriptive error
- **THEN** error includes connection details (sanitized URI)

#### Scenario: Connection failure during operation

- **WHEN** MongoDB operation fails due to connection issues
- **THEN** connection manager SHALL log the error
- **THEN** error is propagated to calling code with clear message

### Requirement: Migration from per-request pattern

The system SHALL replace all per-request `connect()` and `close()` calls with centralized connection manager.

#### Scenario: Comments API uses centralized connection

- **WHEN** comments API routes need database access
- **THEN** they MUST use the centralized connection manager
- **THEN** they MUST NOT call connect/close per request

#### Scenario: All API routes use centralized connection

- **WHEN** any API route needs database access
- **THEN** it MUST import from `src/server/db/mongo.ts`
- **THEN** it MUST NOT create its own connection instances
