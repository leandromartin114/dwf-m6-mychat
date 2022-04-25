import * as express from "express";
import { rtdb, firestore } from "./db";
import * as cors from "cors";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

const usersCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	usersCollection
		.where("email", "==", email)
		.get()
		.then((searchResp) => {
			if (searchResp.empty) {
				usersCollection
					.add({
						name,
						email,
					})
					.then((newUserRef) => {
						res.json({
							id: newUserRef.id,
							new: true,
						});
					});
			} else {
				res.status(400).json({
					message: "user already exist",
				});
			}
		});
});

app.post("/auth", (req, res) => {
	const { email } = req.body;
	usersCollection
		.where("email", "==", email)
		.get()
		.then((searchResp) => {
			if (searchResp.empty) {
				res.status(404).json({
					message: "email not found",
				});
			} else {
				res.json({
					id: searchResp.docs[0].id,
					name: searchResp.docs[0].data().name,
				});
			}
		});
});

app.post("/rooms", (req, res) => {
	const { userId } = req.body;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((doc) => {
			if (doc.exists) {
				const roomRef = rtdb.ref("rooms/" + nanoid());
				roomRef
					.set({
						messages: [],
						owner: userId,
					})
					.then(() => {
						const roomLongId = roomRef.key;
						const roomId = Math.floor(Math.random() * 9999 + 999);
						roomsCollection
							.doc(roomId.toString())
							.set({
								rtdbRoomId: roomLongId,
							})
							.then(() => {
								res.json({
									id: roomId.toString(),
								});
							});
					});
			} else {
				res.status(401).json({
					message: "you don't exist",
				});
			}
		});
});

app.get("/rooms/:roomId", (req, res) => {
	const { userId } = req.query;
	const { roomId } = req.params;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((doc) => {
			if (doc.exists) {
				roomsCollection
					.doc(roomId.toString())
					.get()
					.then((snap) => {
						const data = snap.data();
						res.json({
							data,
						});
					});
			} else {
				res.status(401).json({
					message: "you don't exist",
				});
			}
		});
});

app.post("/messages", (req, res) => {
	const { rtdbRoomId } = req.body;
	const { message } = req.body;
	const { name } = req.body;
	const chatroomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/messages");
	chatroomRef.push({ name: name, message: message }, () => {
		res.json("message recived");
	});
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});
