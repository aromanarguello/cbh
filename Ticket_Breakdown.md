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

### Ticket 1

- Title: Refactor Agent tables to include custom_facility_id 

- Description: As a facility I should have the ability to save a custom id for each agent, so that when the report is generated I can match the custom ID with our internal records. This ticket will require database migration
- Estimation: 1 hour

- Acceptance Criteria:

    - Nullable (if optional) varchar custom_facility_id column should be included in the Agent's table.

### Ticket 2

- Title: Add input for Facility to add custom agent ID
- Description: As a facility user I should be able to enter a custom id via the front end, so that it can be saved to the database
- Estimation 2 hours
- Acceptance Criteria:

    - Frontend should have an input that accepts alphanumerical values
    - After input entry, request should be successfulyl made to backend
    - Custom ID should be entered successfully into database

### Ticket 3

- Title: Update getShiftsByFacility to include custom ID
- Description: As a facility user retrieving reports I should be able to see the custom ID that I previously entered into the Database for agents. This ticket requires refactoring an existing function that when it's called by the front end or generating reports, it will should include the custom ID entered by the facility of any particular agent.
- Estimation: 2 hours
- Acceptance Criteria:

    - `getShiftsByFacility` should include the custom facility id on the agent object

### Ticket 4

- Title: Update `generateReport` to include custom facility ID on it's return value
- Description: As a facility user generating reports I should be able to see the custom facility id created so that I can match it to my internal database and the facility can be compliant. This ticket requires to refactor the `generateReport` function so that when it retrieves shift and agent metadata, it includes the custom facility id previously saved.
- Estimation: 1 hour
- Acceptance Criteria:
    
    - `generateReport` should return custom facility id on the agent object
    - PDF should include the custom facility id