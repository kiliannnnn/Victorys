import admin from 'firebase-admin';

const serviceAccount = "/$lib/victorys-428bc-firebase-adminsdk-e3s9u-2e8690e67a.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://victorys-428bc-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

export const adminAuth = admin.auth();
