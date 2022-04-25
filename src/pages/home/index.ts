import { state } from "../../state";
export function initHomepage(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	div.innerHTML = `
                <my-text class="text" tag="h1">Welcome to MyChat</my-text>
				<div class="container">
					<div class="form-box">
						<my-text class="text" tag="h3">Do you have an account? Signin</my-text>
						<mid-form class="form-in">Enter</mid-form>
					</div>
					<div class="form-box">
						<my-text class="text" tag="h3">Or... Create an account</my-text>
						<long-form class="form-up">Enter</long-form>
					</div>
				</div>
            `;
	div.classList.add("content");
	style.innerHTML = `
                .content{
                    width: 300px;
                    padding: 30px 15px;
                    height: calc(100vh-66px);
                    display: grid;
                }
				@media(min-width: 960px){
					.content{
						width: 700px;
					}
				}
				.container{
					display: grid;
					gap: 30px;
				}
				@media(min-width: 960px){
					.container{
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
					}
					.form-box{
						width: 300px;
					}
				}
                .text{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    margin-bottom: 10px;
                }
                `;
	div.appendChild(style);
	const formInEl = div.querySelector(".form-in");
	formInEl.addEventListener("send", (e: any) => {
		const email = e.detail.email;
		const roomId = e.detail.roomid;
		const room = e.detail.room;
		state.setStateData(email, "", roomId);
		if (room == "new") {
			state.authUser((err) => {
				if (err) {
					console.error("There was a problem with the auth");
				}
				state.createRoom(() => {
					state.getRoom();
					params.goTo("/chatroom");
				});
			});
		}
		if (room == "existing") {
			state.authUser((err) => {
				if (err) {
					console.error("There was a problem with the auth");
				}
				state.getRoom();
				params.goTo("/chatroom");
			});
		}
	});
	const formUpEl = div.querySelector(".form-up");
	formUpEl.addEventListener("send", (e: any) => {
		const email = e.detail.email;
		const name = e.detail.name;
		const roomId = e.detail.roomid;
		const room = e.detail.room;
		state.setStateData(email, name, roomId);
		if (room == "new") {
			state.createUser((err) => {
				if (err) {
					console.error("There was a problem with the user");
				}
				state.createRoom(() => {
					state.getRoom();
					params.goTo("/chatroom");
				});
			});
		}
		if (room == "existing") {
			state.createUser((err) => {
				if (err) {
					console.error("There was a problem with the user");
				}
				state.getRoom();
				params.goTo("/chatroom");
			});
		}
	});
	return div;
}
