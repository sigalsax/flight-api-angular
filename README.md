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

- [ ] Add Reactive Forms for data validation and [Moment](https://momentjs.com/) for data formatting

- [ ] Improve UX by adding CSS to Flight component

## Open bugs to fix:

- [ ] Multiple query data should be returned, not just first

- [ ] Add mention of required input format (chart for airport acronyms and airport names)

## Areas to explore

- [ ] Reactive forms for data validation

- [ ] Moment for proper Date formatting and look into month time table pop up

- [ ] Angular elements for styling
