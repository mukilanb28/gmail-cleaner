Introduction
This Gmail Cleaner application is built using Node.js, Express.js, React.js, and Material UI. It connects to the Gmail API to help you manage your inbox by reading emails, grouping them by either email address or domain name, and displaying the count of emails found. You can then delete emails by email ID or domain name.

Features
Connect to Gmail API: Authenticate and access your Gmail account.
Paginated Email Fetching: Read emails in batches to efficiently handle large inboxes.
Group Emails: Group emails by individual addresses or domain names.
Delete Emails: Option to delete by email ID or domain name.
Material UI Interface: User-friendly interface built with Material UI.
Prerequisites
Node.js (v12.x or higher)

Gmail API credentials (OAuth2 setup)

npm (Node package manager)

Create a Google Cloud Project:

Go to the Google Cloud Console.
Create a new project.
Enable the Gmail API for your project.
Create OAuth2 credentials (OAuth consent screen and credentials setup).
Download the credentials.json file and place it in the root directory of the project.
Note: For OAuth consent, ensure you configure scopes for accessing Gmail data.

Update .env: Create a .env file with the following variables and update them based on your Google Cloud project:

bash
Copy code
CLIENT_ID=<Your_Google_Client_ID>
CLIENT_SECRET=<Your_Google_Client_Secret>
REDIRECT_URI=<Your_Google_Redirect_URI>
REFRESH_TOKEN=<Your_Gmail_Refresh_Token>
Installation
Backend (Node.js & Express.js)
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/gmail-cleaner.git
cd gmail-cleaner
Install backend dependencies:

bash
Copy code
npm install
Frontend (React.js & Material UI)
Navigate to the client directory:

bash
Copy code
cd client
Install frontend dependencies:

bash
Copy code
npm install
Running the Application
Backend: Run the following command in the root directory to start the server:

bash
Copy code
npm run dev
Frontend: Open a new terminal, navigate to the client directory, and start the frontend server:

bash
Copy code
npm start
Access the app at http://localhost:3000.

Usage
Authenticate with Gmail: Log in using OAuth2 to grant the app access to your Gmail account.

Fetch Emails: The application will fetch your emails in batches, displayed in a paginated manner.

Group Emails: Emails are grouped by either the email address or domain name.

Delete Emails: You can delete emails by email ID or delete all emails from a particular domain.

