# Getting Started with Gmail Cleaner App

This application is built using [Node.js](https://nodejs.org/en), [React.js](https://react.dev/), and [Material UI](https://mui.com/material-ui/). It connects to the Gmail API to help you manage your inbox by reading emails, grouping them by either email address or domain name, and displaying the count of emails found. You can then delete emails by email ID or domain name.

## Features
Connect to Gmail API: Authenticate and access your Gmail account.
Paginated Email Fetching: Read emails in batches to efficiently handle large inboxes.
Group Emails: Group emails by individual addresses or domain names.
Delete Emails: Option to delete by email ID or domain name.
Material UI Interface: User-friendly interface built with Material UI.

## Prerequisites

Node.js (v12.x or higher)

Gmail API credentials (OAuth2 setup)

npm (Node package manager)

# Create a Google Cloud Project:

Go to the Google Cloud Console.
Create a new project.
Enable the Gmail API for your project.
Create OAuth2 credentials (OAuth consent screen and credentials setup).
Download the credentials.json file and place it in the root directory of the project.
Note: For OAuth consent, ensure you configure scopes for accessing Gmail data.

Update .env: Create a .env file with the following variables and update them based on your Google Cloud project:

CLIENT_ID=<Your_Google_Client_ID> \n
CLIENT_SECRET=<Your_Google_Client_Secret>\n
REDIRECT_URI=<Your_Google_Redirect_URI>\n
REFRESH_TOKEN=<Your_Gmail_Refresh_Token>\n

## Installation
# Backend (Node.js)
Navigate to webapi directory:
### `npm install`
### `node index.js`

# Frontend (React.js & Material UI)
Navigate to the webapp directory:
 ### `npm install`
 ### `npm run start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
