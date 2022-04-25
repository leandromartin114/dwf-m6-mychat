import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://apx-dwf-m6-35aa5-default-rtdb.firebaseio.com",

	// "firebase-adminsdk-x4dwf@apx-dwf-m6-35aa5.iam.gserviceaccount.com",
});

const rtdb = admin.database();
const firestore = admin.firestore();
export { rtdb, firestore };
