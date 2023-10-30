# Auto-Gmail

This is a Node.js app to continuously moniter new threads in Gmail and automatically reply to ones which have previously not been replied by the user.

This uses Google's Gmail API to query the threads.
This app will require the following permissions to function properly:
- Send emails on your behalf
- See and edit labels

It queries every 120 seconds.

# Usage

- To use this app, first clone this repository with the following commnad.

```
$ git clone github.com/spectre10/auto-gmail
```
- Then cd into the directory named auto-gmail and run the following command to install all the dependencies,
```
$ npm install
```
- Then, go to Google Cloud Console and create a new project and enable the Gmail API and specify relevant scopes.
- And then, Go to APIs and Services -> Credentials -> CREATE CREDENTIALS and then, specify that this a installed application (Desktop app). 
- Then download the OAuth 2.0 Client ID json file and store it in the src/ directory and rename it 'credentials.json'. 
- Next, to run the app,
```
$ npm run start
```
- The above command will store the account information from the first time you login via Google, and it will not ask after the first time.
To change account or app permissions or to login again, run,
```
$ npm run start-new
```
# Stack and Libraries
- Used Javascript to write the app. And Node.js to run it.
- There only two external dependencie:
  - @google-cloud/local-auth
    - Used to authenticate the user and ask for permissions and receive access token and refrersh token.
  - googleapis
    - Used to query the Gmail API.
# Architecture
![auto-gmail](https://github.com/spectre10/auto-gmail/assets/72698233/b2547fce-9bd3-4ba6-8865-c7b682b0aad0)


# Improvements
- The query to retrieve the threads which have not been replied to by me, can be improved.
  As it currently retrieves all the threads which have been replied by me and retrieves all the threads separately, and compares both to see which threads have not been replied.
- We can also improve the query by only retrieving all the threads once and then only retriving the threads which came in the past 120 seconds as previous ones would already have been dealt with.
- We can add a http server to serve a frontend and connect it to the backend via WebSockets to display which threads are being replied in real-time.

