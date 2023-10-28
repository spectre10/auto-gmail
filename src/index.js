import { google } from 'googleapis';
import { queryThreads } from './helper.js'
import { checkExistingLabels } from './handleLabels.js';
import { authorize } from './auth.js';
import fs from 'fs/promises';



// initiallizes the gmail client and start to poll for emails every 120 seconds.
async function startPolling(auth) {

  // initiallize gmail client.
  const gmail = google.gmail({ version: 'v1', auth });

  //query for all labels.
  const res_labels = await gmail.users.labels.list({
    userId: 'me'
  })

  const labels = res_labels.data.labels

  //check if AUTO_REPLIED label already exists.
  checkExistingLabels(labels)

  // poll every 120 seconds.
  setInterval(() => {
    queryThreads(gmail)
  }, 120 * 1000)
}

authorize().then(startPolling).catch(console.error);
