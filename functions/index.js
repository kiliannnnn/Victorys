/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentCreated} = require ("firebase-functions/v2/firestore");

exports.watchQueue = onDocumentCreated("queue/{user}", (event) => {
  const snapshot = event.data;
  if (!snapshot) {
      console.log("No data associated with the event");
      return;
  }
  const data = snapshot.data();
  const name = data.uid;
  console.log(`New user added to queue: ${name}`);
});