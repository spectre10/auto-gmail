# Auto-Gmail

This is a Node.js app to continuously moniter new threads in Gmail and automatically reply to ones which have previously not been replied by the user.

This uses Google's Gmail API to query the threads.
This app will require the following permissions to function properly:
- Send emails on your behalf
- See and edit labels

It queries every 120 seconds.

# Usage

To use this app, first clone this repository with the following commnad.

```
$ git clone github.com/spectre10/auto-gmail
```
Then cd into the directory named auto-gmail and run the following command to install all the dependencies,
```
$ npm install
```
Then 
Next, to run the app,
```
$ npm run start
```
The above command will store the account information from the first time you login via Google, and it will not ask after the first time.
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
![auto-gmail](https://github.com/spectre10/auto-gmail/assets/72698233/7f429078-74ff-428e-adbf-aac266efe344)


# Improvements
- The query to retrieve the threads which have not been replied to by me, can be improved.
  As it currently retrieves all the threads which have been replied by me and retrieves all the threads separately, and compares both to see which threads have not been replied.
- We can also improve the query by only retrieving all the threads once and then only retriving the threads which came in the past 120 seconds as previous ones would already have been dealt with.
- We can add a http server to serve a frontend and connect it to the backend via WebSockets to display which threads are being replied in real-time.

