import { addLabel } from './handleLabels.js';

// send automated reply to a thread.
async function sendReply(gmail, thread) {
  let res = await gmail.users.threads.get({
    userId: 'me',
    id: thread.id,
    format: 'metadata',
    metadataHeaders: ['subject', 'from', 'to'],
  });
  const size = res.data.messages.length;
  const subject = 'Re: ' + res.data.messages[0].payload.headers[1].value;
  const from = res.data.messages[0].payload.headers[0].value;
  const replyto = res.data.messages[size - 1].id;
  const message = 'Thanks for messaging - asdasdas';

  var rawMessage = [
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    'Content-Transfer-Encoding: 7bit',
    'to: ' + from,
    'subject: ' + subject,
    'In-Reply-To: <' + replyto + '@mail.gmail.com>',
    'References: <' + replyto + '@mail.gmail.com>',
    '',
    message,
  ].join('\n');

  // encode message to base64.
  const encodedMessage = Buffer.from(rawMessage).toString('base64');
  let res_send = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId: thread.id,
    },
  });
  // add AUTO_REPLIED label to the sent email.
  addLabel(gmail, res_send.data.id);
}

// query the non-replied threads.
export async function queryThreads(gmail) {
  //query all the replied or initiated threads by me.
  const res_rep = await gmail.users.threads.list({
    userId: 'me',
    q: '{subject:"re:" AND from:me} OR from:me',
  });

  //query all threads.
  const res = await gmail.users.threads.list({
    userId: 'me',
  });

  const threadsWithReplies =
    res_rep.data.threads === undefined ? [] : res_rep.data.threads;
  const allThreads = res.data.threads === undefined ? [] : res.data.threads;

  // do not reply to threads common in both threadsWithReplies and allThreads list.
  let j = 0;
  for (let i = 0; i < allThreads.length; i++) {
    if (j > threadsWithReplies.length - 1) {
      sendReply(gmail, allThreads[i]);
      continue;
    }
    if (allThreads[i].id != threadsWithReplies[j].id) {
      sendReply(gmail, allThreads[i]);
    } else {
      j++;
    }
  }
}
