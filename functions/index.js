/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentWritten, onDocumentCreated, onDocumentUpdated, onDocumentDeleted, Change, FirestoreEvent} = require ("firebase-functions/v2/firestore");

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.onDocumentWritten = onDocumentWritten(async (change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const document = change.after.data();
    
    // perform desired operations ...
    logger.info("Document written", {document});
    });