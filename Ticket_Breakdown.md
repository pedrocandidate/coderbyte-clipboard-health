# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1. Add a new column to the Agents table

#### Acceptance Criteria
  - The new column should be called `external_id`
  - The new column should be a string
  - The new column should be nullable
  - Tests should be added to ensure that the new column is added to the table
  - Tests should be added to ensure that the new column is nullable

#### Time Estimate
    - 1 hour
      - 30 minutes for implementation
      - 30 minutes for new tests

#### Implementation Details
  - Add a new migration file to the `migrations` folder
  - Add a new column to the `Agents` table

### 2. Accept the new `external_id` field in the `POST /agents` API endpoint

#### Acceptance Criteria
  - The new field should be optional
  - The new field should be a string
  - The new field should be nullable
  - Tests should be added to ensure that the new field is accepted
  - Tests should be added to ensure that the new field can be ignored

#### Time Estimate
    - 1 hour
      - 30 minutes for implementation
      - 30 minutes for new tests

#### Implementation Details
  - Add new field to the `Agent` payload

### 3. Accept the new `external_id` field in the `PUT /agents/:id` API endpoint

#### Acceptance Criteria
  - The new field should be optional
  - The new field should be a string
  - The new field should be nullable
  - Tests should be added to ensure that the new field is accepted
  - Tests should be added to ensure that the new field can be ignored

#### Time Estimate
    - 1 hour
      - 30 minutes for implementation
      - 30 minutes for new tests

#### Implementation Details
  - Add new field to the `Agent` payload

### 4. Update function `getShiftsByFacility` to return the agent `external_id` field

#### Acceptance Criteria
  - The function should return the `external_id` in the `agent` object
  - Tests should be added to ensure that the `external_id` is returned
  - Tests should be added to ensure that the `external_id` is nullable if the agent doesn't have one

#### Time Estimate
    - 2 hours
      - 1 hour for implementation
      - 1 hour for new tests

#### Implementation Details
  - Update the `getShiftsByFacility` function to return the `external_id` field
  - Example:

```json
[{
  "id": 1,
  "facility_id": 1,
  "start_time": "2019-01-01T00:00:00.000Z",
  "end_time": "2019-01-01T08:00:00.000Z",
  "agent": {
    "id": 1,
    "external_id": "own_123456789",
    "name": "John Doe",
  }
}]
```

### 5. Update function `generateReport` to generate PDF's containing the `external_id` field

#### Acceptance Criteria
  - The function should use the `external_id` field
  - Tests should be added to ensure that the `external_id` is shown in the PDF
  - Tests should be added to ensure that the `external_id` is nullable if the agent doesn't have one

#### Time Estimate
    - 2.5 hours
      - 0.5 hour for new PDF design
      - 1 hour for implementation
      - 1 hour for new tests

#### Implementation Details
  - Update the `generateReport` function to generate PDF reports containing the `external_id` field
```