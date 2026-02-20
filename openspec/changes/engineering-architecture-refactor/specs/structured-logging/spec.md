## ADDED Requirements

### Requirement: Centralized logger utility

The system SHALL provide a centralized logging utility at `src/shared/utils/logger.ts`.

#### Scenario: Logger module structure

- **WHEN** implementing logging functionality
- **THEN** logger SHALL be defined in `src/shared/utils/logger.ts`
- **THEN** logger SHALL be imported consistently across all modules

#### Scenario: Logger API methods

- **WHEN** using the logger
- **THEN** logger SHALL provide `error()`, `warn()`, and `info()` methods
- **THEN** each method SHALL accept message and optional context object

### Requirement: Environment-aware log levels

The system SHALL adjust log levels based on NODE_ENV environment variable.

#### Scenario: Production log level

- **WHEN** NODE_ENV is set to "production"
- **THEN** only `error` level logs SHALL be output
- **THEN** `warn` and `info` logs SHALL be suppressed

#### Scenario: Development log level

- **WHEN** NODE_ENV is set to "development" or not set
- **THEN** all log levels (error, warn, info) SHALL be output
- **THEN** logs SHALL include detailed context for debugging

### Requirement: Structured log format

The system SHALL output logs in structured JSON format for machine parseability.

#### Scenario: Log entry structure

- **WHEN** logging a message
- **THEN** output SHALL be valid JSON
- **THEN** output SHALL include `level`, `message`, `timestamp`, and optional `context` fields

#### Scenario: Log parsing

- **WHEN** logs are sent to aggregation services
- **THEN** structured format SHALL be parseable by standard log tools
- **THEN** fields SHALL be queryable and indexable

### Requirement: Sensitive data exclusion

The system SHALL NOT log sensitive information in any environment.

#### Scenario: No user credentials

- **WHEN** logging user-related events
- **THEN** passwords, tokens, and API keys SHALL NOT be logged
- **THEN** user IDs MAY be logged for debugging (not email/phone)

#### Scenario: No session data

- **WHEN** logging request information
- **THEN** session tokens and cookies SHALL NOT be logged
- **THEN** sanitized session IDs MAY be logged if needed

### Requirement: Remove debug logs from production code

The system SHALL remove all `console.log` debug statements from production code.

#### Scenario: Comments API cleanup

- **WHEN** reviewing comments API code
- **THEN** all debug `console.log` statements SHALL be removed
- **THEN** necessary logging SHALL use the centralized logger

#### Scenario: All API routes cleanup

- **WHEN** reviewing all API routes
- **THEN** replace `console.log` with appropriate logger calls
- **THEN** remove unnecessary debug logging

### Requirement: Error logging with context

The system SHALL log errors with sufficient context for debugging.

#### Scenario: Logging API errors

- **WHEN** API route encounters an error
- **THEN** error SHALL be logged with error message, stack trace, and request context
- **THEN** sensitive data SHALL be sanitized from context

#### Scenario: Logging database errors

- **WHEN** database operation fails
- **THEN** error SHALL be logged with operation details and error message
- **THEN** connection strings and credentials SHALL NOT be logged

### Requirement: Request correlation IDs

The system SHALL include correlation IDs in logs for request tracing.

#### Scenario: Generating correlation ID

- **WHEN** API request is received
- **THEN** unique correlation ID SHALL be generated or extracted from headers
- **THEN** correlation ID SHALL be included in all logs for that request

#### Scenario: Tracing request flow

- **WHEN** debugging request issues
- **THEN** all logs for same request SHALL have matching correlation ID
- **THEN** request flow SHALL be traceable through log entries

### Requirement: Log level consistency

The system SHALL use appropriate log levels for different types of events.

#### Scenario: Error level usage

- **WHEN** unrecoverable errors or exceptions occur
- **THEN** use `error` level logging
- **THEN** include stack trace and error details

#### Scenario: Warn level usage

- **WHEN** recoverable issues or deprecation warnings occur
- **THEN** use `warn` level logging
- **THEN** include mitigation or resolution guidance

#### Scenario: Info level usage

- **WHEN** logging normal operational events
- **THEN** use `info` level logging
- **THEN** keep messages concise and relevant

### Requirement: Performance monitoring logs

The system SHALL log performance metrics for critical operations.

#### Scenario: Slow query logging

- **WHEN** database query exceeds threshold duration
- **THEN** log warning with query details and execution time
- **THEN** include enough context to identify optimization opportunities

#### Scenario: API response time logging

- **WHEN** API request completes
- **THEN** log response time for monitoring
- **THEN** use structured format for metric aggregation
