import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import map from "lodash/map";
import "dotenv/config";
const firebaseConfig = {
	apiKey: "BrUjCvxf53Aue7vSOEzTg0nKxqkXYMTMwbE4RrB6",
	databaseURL: "https://apx-dwf-m6-35aa5-default-rtdb.firebaseio.com",
	proyectId: "apx-dwf-m6-35aa5",
	authDomain: "apx-dwf-m6-35aa5.firebaseapp.com",
	storageBucket: "apx-dwf-m6-35aa5.appspot.com",
};
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
let API_BASE_URL = "https://dwf-m6-mychat.herokuapp.com/";
const dev = process.env.NODE_ENV == "development";
if (dev) {
	API_BASE_URL = "http://localhost:3000";
}
const state = {
	data: {
		userId: "",
		email: "",
		name: "",
		roomId: "",
		rtdbRoomId: "",
		messages: [],
	},
	listeners: [],
	initState() {
		const stateFromStorage = JSON.parse(localStorage.getItem("state"));
		if (stateFromStorage != null) {
			this.setState(stateFromStorage);
		} else {
			this.setState(this.getState());
		}
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
		localStorage.setItem("chat-state", JSON.stringify(newState));
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	setStateData(email: string, name?: string, roomId?: string) {
		const currentState = this.getState();
		currentState.email = email;
		currentState.name = name || "";
		currentState.roomId = roomId || "";
		this.setState(currentState);
	},
	authUser(callback) {
		const currentState = this.getState();
		if (currentState.email) {
			fetch(API_BASE_URL + "/auth", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email: currentState.email,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (data.id) {
						currentState.userId = data.id;
						currentState.name = data.name;
						this.setState(currentState);
						callback();
					}
				});
		} else {
			console.error("There is not email in state");
			callback(true);
		}
	},
	createUser(callback) {
		const currentState = this.getState();
		const email = currentState.email;
		const name = currentState.name;
		if (email && name) {
			fetch(API_BASE_URL + "/signup", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email,
					name,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.userId = data.id;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't data in state");
			callback(true);
		}
	},
	createRoom(callback?) {
		const currentState = this.getState();
		const userId = currentState.userId;
		if (userId) {
			fetch(API_BASE_URL + "/rooms", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					userId,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.roomId = data.id;
					this.setState(currentState);
					if (callback) {
						callback();
					}
				});
		} else {
			console.error("There isn't userId in state");
		}
	},
	getRoom(callback?) {
		const currentState = this.getState();
		const userId = currentState.userId;
		const roomId = currentState.roomId;
		fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				currentState.rtdbRoomId = data.data.rtdbRoomId;
				this.setState(currentState);
				this.listenRoom();
				if (callback) {
					callback();
				}
			});
	},
	listenRoom() {
		const currentState = this.getState();
		const rtdbRoomId = currentState.rtdbRoomId;
		console.log("listening room " + rtdbRoomId);
		const chatroomsRef = ref(rtdb, "/rooms/" + rtdbRoomId);
		onValue(chatroomsRef, (snapshot) => {
			const msjsFromServer = snapshot.val();
			const msjsList = map(msjsFromServer.messages);
			console.log(msjsList);
			currentState.messages = msjsList;
			this.setState(currentState);
		});
	},
	sendMessage(msj: string) {
		const currentState = this.getState();
		const rtdbRoomId = currentState.rtdbRoomId;
		const msjFrom = currentState.name;
		fetch(API_BASE_URL + "/messages", {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				rtdbRoomId: rtdbRoomId,
				message: msj,
				name: msjFrom,
			}),
		});
	},
};
export { state };
