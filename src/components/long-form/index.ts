export function initLongForm() {
	class Form extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		textButton = this.textContent;
		shadow = this.attachShadow({ mode: "open" });
		connectedCallback() {
			const selectEl = this.shadow.querySelector(
				".select"
			) as HTMLSelectElement;
			const visibleEl = this.shadow.querySelector(".visible") as HTMLElement;
			selectEl.addEventListener("change", () => {
				if (selectEl.value == "existing") {
					visibleEl.style.display = "flex";
				}
				if (selectEl.value == "new") {
					visibleEl.style.display = "none";
				}
			});
			const formEl = this.shadow.querySelector(".form") as HTMLFormElement;
			formEl.addEventListener("submit", (e: any) => {
				e.preventDefault();
				const data = e.target;
				const myEvent = new CustomEvent("send", {
					detail: {
						email: data.email.value,
						name: data.name.value,
						room: data.room.value,
						roomid: data.roomid.value || "",
					},
				});
				this.dispatchEvent(myEvent);
				formEl.reset();
			});
		}
		render() {
			const div = document.createElement("div");
			const style = document.createElement("style");
			style.innerHTML = `
            .form {
                display: flex;
                flex-direction: column;
                max-width: 352px;
            }
			.label {
				font-size: 18px;
				margin-bottom: 5px;
			}
			.input, .select {
                font-size: 18px;
				border: 2px solid black;
				border-radius: 4px;
                padding: 13px 0px;
                margin-bottom: 10px;
			}
			.visible{
				display: none;
				flex-direction: column;
			}
            .button {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: 700;
				height: 55px;
                border: none;
				border-radius: 4px;
                background-color: #9CBBE9;
			}
            `;
			div.innerHTML = `
            <form class="form">
				<label class="label">email</label>
				<input type="text" class="input" name="email">
				<label class="label">name</label>
				<input type="text" class="input" name="name">
				<label class="label">room</label>
				<select class="select" name="room">
					<option value="new" >New room</option>
					<option value="existing" >Existing room</option>
				</select>
				<div class="visible" >
					<label class="label">room id</label>
					<input type="text" class="input" name="roomid">
				</div>
				<button class="button" type="submit">${this.textButton}</button>
            </form>
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("long-form", Form);
}
