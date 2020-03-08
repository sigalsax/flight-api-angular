# FlightAPI

This project evokes the SkyScanner Flight API (with the help of RapidAPI wrapper to check the lowest price available for travel between two locations for a specific date.

## Design

The following defines the sequence diagram for this project.   

<img src="./design/flightAPIActivity.png" width="350">

## Milestones

- [x] Use LucidChart to create a Activity Diagram

- [x] Create basic backend that has initial hardcoded values, but receives correct data using the [Skyscanner API](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)

  - [x] Add capability to receive, consolidate, format, and package data before sending response

- [x] Add a front end and add functionality to accept user input to build the Flight query

- [x] Add Reactive Forms for data validation

- [ ] Front-end design created in Adobe Photoshop of SOAP layout

  - [ ] Design should include a table of required input format (chart for airport acronyms and airport names). Ex: MIA -> Miami

- [ ] Improve UX by adding CSS to Flight component

- [ ] Add security measures on input and in code to prevent against malicious code execution

## Open bugs to fix:

- [x] Multiple query data should be returned, not just last

- [x] Check if Quotes array is empty and if so, render message to View

- [ ] Fix toggling bug when empty query/query with results, the messages disappear accordingly

## Areas to explore

- [ ] Reactive forms for data validation

- [ ] Look into Angular Elements for Date Picker

- [ ] Angular elements for styling
