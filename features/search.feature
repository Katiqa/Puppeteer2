Feature: Ticket cinema
Scenario: The one ticket
Given User on website
When user select time movie
When user select place and click button
Then we get ticket

Scenario: Booking some ticket
Given User on website
When user select time movie
When user select places and click button
Then we get ticket

Scenario: Disabled button place
Given User on website
When user select other time movie 
When user select disabled places
Then we can`t click
