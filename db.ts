import * as admin from "firebase-admin";
import "dotenv/config";

// import * as serviceAccount from "./key.json";

const serviceAccount = {
	type: "service_account",
	project_id: "apx-dwf-m6-35aa5",
	private_key_id: "5a0f4280cfb54b9d81b843bff6ce7972fdd76b11",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtyXdpTklc34wS\ngcLxFka3aC7F0/1s3Jc4LUpKgYuLkoCXlYeGXE8L0DbQrn5yoTTiEM+AZ/eyTm+0\niwlUnXNsTvz3I/mhdRo1TprqTMkBRluk0H3NMMn5dQdASDhYzMSQTb/h9ZfuQmcc\nFRT+bxeCqCDSv8A4C/wC2uspeSIvsh+G6KIPy99j4+E6eaiNVdouTlBmfIWGUMSL\naQWwwrZ7F11PX3I5Ae8WkXDTt923j673lDiclkM+cL2PTMyIv7oDtnMUchIKNXXk\n3F6oSRfCo2NB7saRIrwzbbqGIc+ZkkmRcbkr8iRrWIA0rMIS1QkPp/0X+8bqyqz9\nOfHHgVBbAgMBAAECggEAJtOmHB7jgR5ouxHGrfpeHkfme0hbjGDUYDauLGs49Bvt\nIvDDcJ9bAbapKIJzucSOfhtnYLbZvjqL9nhBw2fSC9ax6b1d3la9Xj+LmOFC30gK\n3Y2/LYLC/TrKPfBktmI5YEwenKs0IIUxaDLFl/rV89kATFWO6nay/ShP9docay8w\nS8AZN7A4+yxqmwJTB+81hgXYB6ZzgWfINHIIWfsYnYhFu0uXwrVTlgiI4ZFtGu06\nbA/DQD79fW5gD7S7mtr+0Xhbs+kMx/94vLLszxwjlHtFjMZbTPdAIoo7hrP94h2o\ntpK/IU/BIHYt8qXCiGpaGmPH9J/eSDT71p/v0oY1EQKBgQDbxok0E1wKG8CLOntu\nf1PEpU+giHGZvKTR5P2e5FqndgjNSR6AiGLXt2x47LEkHqGNuov/VpuCcgH9vmby\nSuA+haG43b9tN/Ie/PBahuPW1f2s9V3x1/N6APrOhyMNQF6KaTDxqSbpzfZDxXt1\nFT+GEaDDniSa3BVhx6KzbqnSxwKBgQDKbm+jR+hJLQxmnqlBCzTd8xk6CMzMP85C\nF9nr0O1PmC+wqDOsPQiVlP4sSFYpCK6I3Fe3wImr6lUgbk85C/+NvNPpT4v+AZH4\nLMeWk03q/1cajR49ZOb+4zSJuExpogxbvUuxy3oGnR26Dz7q5wyacVq4yXcrW1Xv\nftFITglBzQKBgDwaoL04KiytiEvLU6RVeBBIcW1iw0abG6w3ZtEEfHJdymxx+cCH\nDBkYlbbAbHWHVwFOqijLg7359edyIe9TYN5YZ3EKW+a/rRyiag0n5LmFTln1xJp2\nR6TvDahbts9R8kkCGZuNehHo/Ndt86SCihvdSE0XO8WKOOLD2RAfTJxTAoGBAMRI\n31EI+ZBy8PJUaDOcpS+Nd+mQ/NwUBnCJ5hHFrUYfgCaggjJBoCBCr07K+ViihXJJ\njXisZhHfj5l5vLHJE4whC63QJyMt7Jci/Ijh3oy9+HzTVv4a5+1A7AGaReWrbqZJ\n36rPbUwabuepvs1RKiRbQ6eoGjhdQO+QHWgp2soFAoGBAMPbuXY2ums9/kWJbyt9\n8LfAUWFQTHY1LKJSSszB0979af49Y3yhbJWUeC8KFgU4JDagBSljMFwCR60tYN3T\nk3qv3P6iBrRYQkD+HbI3QYw1kfIC7vQn8ALLWJb7W5n3xpj9rnF0Ag+LdcGlg3az\n0OrGkEzqNZAuSfQLrh5kTEQY\n-----END PRIVATE KEY-----\n",
	client_email:
		"firebase-adminsdk-x4dwf@apx-dwf-m6-35aa5.iam.gserviceaccount.com",
	client_id: "113446551335372713288",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x4dwf%40apx-dwf-m6-35aa5.iam.gserviceaccount.com",
};

// const projectId = process.env.PROJECT_ID;
// const privateKeyId = process.env.PRIVATE_KEY_ID;
// const privateKey = process.env.PRIVATE_KEY.toString();
// const clientEmail = process.env.CLIENT_EMAIL;
// const serviceAccount = {
// 	type: "service_account",
// 	project_id: projectId,
// 	private_key_id: privateKeyId,
// 	private_key: privateKey,
// 	client_email: clientEmail,
// 	client_id: "113446551335372713288",
// 	auth_uri: "https://accounts.google.com/o/oauth2/auth",
// 	token_uri: "https://oauth2.googleapis.com/token",
// 	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
// 	client_x509_cert_url:
// 		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x4dwf%40apx-dwf-m6-35aa5.iam.gserviceaccount.com",
// };

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://apx-dwf-m6-35aa5-default-rtdb.firebaseio.com",

	// "firebase-adminsdk-x4dwf@apx-dwf-m6-35aa5.iam.gserviceaccount.com",
});

const rtdb = admin.database();
const firestore = admin.firestore();
export { rtdb, firestore };
