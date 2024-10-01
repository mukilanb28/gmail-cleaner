# Getting Started with Gmail Cleaner App

This application is built using [Node.js](https://nodejs.org/en), [React.js](https://react.dev/), and [Material UI](https://mui.com/material-ui/). It connects to the Gmail API to help you manage your inbox by reading emails, grouping them by either email address or domain name, and displaying the count of emails found. You can then delete emails by email ID or domain name.

## 🧐 Features
 - **Connect to Gmail API: Authenticate and access your Gmail account.**

 - **Paginated Email Fetching: Read emails in batches to efficiently handle large inboxes.**

 - **Group Emails: Group emails by individual addresses or domain names.**

 - **Delete Emails: Option to delete by email ID or domain name.**

 - **Material UI Interface: User-friendly interface built with Material UI.**

## 📜 Prerequisites

 1. Node.js (v12.x or higher)

 2. npm (Node package manager)

 3. Gmail API credentials (OAuth2 setup)


# Create a Google Cloud Project:

1. Go to the Google Cloud Console.
2. Create a new project.
3. Enable the Gmail API for your project.
4. Create OAuth2 credentials (OAuth consent screen and credentials setup).
5. Download the credentials.json file and place it in the root directory of the project.

 **Note: For OAuth consent, ensure you configure scopes for accessing Gmail data.**

Update credentials.json: Create a credentials.json(webapp/src.credentials.json) file with the following variables and update them based on your Google Cloud project:

```
{
	"installed": {
		"client_id": <GOOGLE_CLIENT_ID>,
		"client_secret": "<GOOGLE_CLIENT_SECRET>,
		"project_id": <GOOGLE_PROJECT_ID>,
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"redirect_uris": <REDIRECT_URI>
	}
}

```

## 🛠️ Installation Steps

Clone the repository

```bash
git clone https://github.com/mukilanb28/gmail-cleaner.git
```

# Backend (Node.js)
Navigate to webapi directory:

```bash
npm install
```
```bash
node src/index.js
```

# Frontend (React.js & Material UI)
Navigate to the webapp directory:

 ```bash
npm install
```

```bash
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
