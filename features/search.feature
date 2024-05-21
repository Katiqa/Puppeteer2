Feature: Ticket cinema
Scenario: The one ticket
Given User on "https://qamid.tmweb.ru/client/index.php"
When user select time movie
When user select place and click button
Then we get ticket

Scenario: Booking some ticket
Given User on "https://qamid.tmweb.ru/client/index.php"
When user select time movie
When user select places and click button
Then we get ticket

Scenario: Disabled button place
Given User on "https://qamid.tmweb.ru/client/index.php"
When user select other time movie 
When user select disabled places and click button
Then we can`t click

