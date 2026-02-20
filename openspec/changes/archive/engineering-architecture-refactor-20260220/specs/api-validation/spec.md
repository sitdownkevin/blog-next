## ADDED Requirements

### Requirement: Zod schema for API requests

The system SHALL define Zod schemas for all API route request payloads.

#### Scenario: Creating validation schema

- **WHEN** defining a new API endpoint
- **THEN** a Zod schema MUST be created for request body validation
- **THEN** schema is co-located with the API route or in feature-specific schemas directory

#### Scenario: Validating incoming requests

- **WHEN** API route receives a request
- **THEN** request body MUST be validated against the Zod schema
- **THEN** validation occurs before any business logic executes

### Requirement: Request validation errors

The system SHALL return standardized error responses for invalid requests.

#### Scenario: Invalid request payload

- **WHEN** API receives a request that fails Zod validation
- **THEN** system responds with 400 status code
- **THEN** response body includes validation error details in consistent format

#### Scenario: Validation error message format

- **WHEN** returning validation errors
- **THEN** response MUST include `error` field with human-readable message
- **THEN** response MAY include `details` field with field-specific errors

### Requirement: Type safety from schemas

The system SHALL use Zod schema inference to ensure TypeScript type safety.

#### Scenario: Inferring types from schemas

- **WHEN** defining a Zod schema for an API request
- **THEN** TypeScript type SHALL be inferred using `z.infer<typeof schema>`
- **THEN** validated request data is automatically typed

### Requirement: Standardized error responses

The system SHALL use consistent error response format across all API routes.

#### Scenario: Error response structure

- **WHEN** any API route returns an error
- **THEN** response MUST include `error` field with string message
- **THEN** response MUST include appropriate HTTP status code

#### Scenario: Server error responses

- **WHEN** API route encounters an internal error
- **THEN** system responds with 500 status code
- **THEN** response includes generic error message without exposing internal details

### Requirement: Success response format

The system SHALL use consistent success response format across all API routes.

#### Scenario: Successful operation

- **WHEN** API route completes successfully
- **THEN** response uses 200 status code (or appropriate 2xx code)
- **THEN** response body includes relevant data or success confirmation

### Requirement: Authentication validation

The system SHALL validate authentication requirements before processing requests.

#### Scenario: Protected endpoint validation

- **WHEN** API route requires authentication
- **THEN** system MUST verify valid session before processing
- **THEN** unauthenticated requests respond with 401 status code

#### Scenario: Authorization validation

- **WHEN** API route requires specific permissions
- **THEN** system MUST verify user has required permissions
- **THEN** unauthorized requests respond with 403 status code

### Requirement: Comments API validation

The system SHALL add Zod validation to comments creation and deletion endpoints.

#### Scenario: Comment creation validation

- **WHEN** POST request is made to comments API
- **THEN** request body MUST be validated for required fields (postId, content)
- **THEN** invalid requests are rejected with 400 error

#### Scenario: Comment deletion validation

- **WHEN** DELETE request is made to comments API
- **THEN** request parameters MUST be validated (commentId)
- **THEN** user MUST be verified as comment author or admin

### Requirement: Error logging

The system SHALL log validation and processing errors for debugging.

#### Scenario: Logging validation errors

- **WHEN** request fails validation
- **THEN** system logs validation error with sanitized details
- **THEN** log does not include sensitive user data

#### Scenario: Logging server errors

- **WHEN** API route encounters unexpected error
- **THEN** system logs full error details including stack trace
- **THEN** logged error includes request context for debugging
