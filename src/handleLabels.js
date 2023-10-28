//stores the immutable labelId of AUTO_REPLIED label.
let LABEL_ID = '';

// creates the AUTO_REPLIED label.
async function createLabel(gmail, name) {
  const res = gmail.users.labels.create({
    userId: 'me',
    requestBody: {
      // to show the AUTO_REPLIED label in Gmail Web Interface.
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show',
      name: name,
    },
  });

  LABEL_ID = res.data.id;
  console.log('label: ' + res.data.id);
}

// add the AUTO_REPLIED label to a message.
export async function addLabel(gmail, messageId) {
  const r = await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      addLabelIds: [LABEL_ID],
    },
  });
  console.log(r.data);
}

// check if AUTO_REPLIED already exists. If it does, assign it to LABEL_ID.
export async function checkExistingLabels(labels) {
  let sig = 0;
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].name === 'AUTO_REPLIED') {
      LABEL_ID = labels[i].id;
      sig = 1;
    }
  }
  if (sig == 0) {
    await createLabel(gmail, 'AUTO_REPLIED', false);
  }
}
