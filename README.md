# Ticket-management-system (Zendesk-coding-challenge)

## Installation Steps
1. Firstly, install node and npm in your local machine, for that refer the [link](https://nodejs.org/en/download/package-manager/)
2. Clone the github repo
3. Once cloned, you will find two directories: ticket-management(front-end) and ticket-managemet-server(back-end)

## Starting the Application
1. Go to ticket-management-server and run the commands ``` npm install```
This will install necesary modules and packages in your local as per package.json

2. To start the backend server run ```npm run start```
3. Repeat Step 1 Step 2 for ticket-management to install front end dependencies and server

## Operating the application
1. Once you start the front-end service a tab will open up in browser, if it does not, manually navigate to localhost:3000

2. You will find a list of tickets with maximum 25 records per page and pagination in the bottom
![alt text](/images/zendesk-assessmenet-1.png)

3. On clicking the subject you will be redirected to ticket details page where in you will find description and other details of the ticket
![alt text](/images/zendesk-assessment-3.png)

## Running Tests
1. Navigate to ticket-management-server, and run the command ```npm run test``` and you will see 8 tests pass
2. Do the same for ticket-management-server
