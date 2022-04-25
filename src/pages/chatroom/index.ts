declare function require(string): string;
const exitURL = require("url:./exit.png");
import { state } from "../../state";
export function initChatpage(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	state.subscribe(() => {
		render(state.getState().messages);
	});
	render(state.getState().messages);
	function render(arrayOfMessages) {
		div.innerHTML = `
                    <my-text class="text" tag="h1">MyChat</my-text>
					<div class="room-box">
						<my-text class="text" tag="h3">Room: ${state.getState().roomId}</my-text>
						<img src="${exitURL}" class="exit">
					</div>
                    <div class="chat-container"></div>
                    <short-form class="form" label="Message">Send</short-form>
                `;
		div.classList.add("content");
		const chatContainer = div.querySelector(".chat-container");
		for (const m of arrayOfMessages) {
			const myMessage = document.createElement("div");
			const otherMessage = document.createElement("div");
			if (m.name == state.getState().name) {
				myMessage.innerHTML = `<my-message>${m.message}</my-message>`;
				chatContainer.appendChild(myMessage);
			} else {
				otherMessage.innerHTML = `<text-message label="${m.name}">${m.message}</text-message>`;
				chatContainer.appendChild(otherMessage);
			}
		}
		style.innerHTML = `
                    .content{
                        width: 300px;
                        padding: 30px 15px;
                        height: calc(100vh-66px);
                        display: grid;
                    }
                    .text{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin-bottom: 10px;
                    }
					.room-box{
						width: 300px;
						display: flex;
						justify-content: space-between;
					}
					.exit{
						width: 30px;
                        height: 30px;
					}
                    .chat-container{
                        overflow-y: scroll;
						overflow-x: hidden;
						height: 250px;
                        border: 2px solid black;
                        border-radius: 4px;
						padding: 3px;
                    }
                    `;
		div.appendChild(style);
		chatContainer.scrollTop = 250;
		addListeners();
	}
	function addListeners() {
		const formEl = div.querySelector(".form");
		formEl.addEventListener("send", (e: any) => {
			const msj = e.detail.value;
			if (msj == "") {
				console.log("Escribe un mensaje");
			} else {
				state.sendMessage(msj);
				console.log(state.getState());
			}
		});
		const exitEl = div.querySelector(".exit");
		exitEl.addEventListener("click", () => {
			params.goTo("/home");
		});
	}
	return div;
}
