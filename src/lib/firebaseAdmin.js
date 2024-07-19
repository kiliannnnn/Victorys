import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'victorys-428bc-firebase-adminsdk-e3s9u-2e8690e67a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: "https://victorys-428bc-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();
export { adminAuth, adminDb };
