import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";

const serviceAccount = {
	type: "service_account",
	project_id: process.env.PROJECT_ID,
	private_key_id: process.env.PRIVATE_KEY_ID,
	private_key: process.env.PRIVATE_KEY,
	client_email: process.env.CLIENT_EMAIL,
	client_id: "113446551335372713288",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x4dwf%40apx-dwf-m6-35aa5.iam.gserviceaccount.com",
};
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://apx-dwf-m6-35aa5-default-rtdb.firebaseio.com",

	// "firebase-adminsdk-x4dwf@apx-dwf-m6-35aa5.iam.gserviceaccount.com",
});

const rtdb = admin.database();
const firestore = admin.firestore();
export { rtdb, firestore };
