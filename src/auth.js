import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import fs from 'fs'



// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.labels', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'src/token.json');

// The file credentials.json is credentials file downloaded from Google Cloud Console.
const CREDENTIALS_PATH = path.join(process.cwd(), 'src/credentials.json');

// check if token.json already exist.
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.promises.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

// save the payload to token.json file
async function saveCredentials(client) {
  const content = await fs.promises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.promises.writeFile(TOKEN_PATH, payload);
}

export async function authorize() {
  //if we want to continue with new account or new permissions.
  if (process.argv[2] === '-reset') {
    if (fs.existsSync("./src/token.json")) {
      await fs.promises.rm("./src/token.json")
    }
  }
  
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  // authenticate the user with credentials.json file.
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}
