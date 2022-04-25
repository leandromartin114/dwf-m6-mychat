export function initShortForm() {
	class Form extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		textButton = this.textContent;
		label = this.getAttribute("label");
		shadow = this.attachShadow({ mode: "open" });
		connectedCallback() {
			const form = this.shadow.querySelector(".form") as HTMLFormElement;
			form.addEventListener("submit", (e: any) => {
				e.preventDefault();
				const data = e.target;
				const myEvent = new CustomEvent("send", {
					detail: {
						value: data.name.value,
					},
				});
				this.dispatchEvent(myEvent);
				form.reset();
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
			.input {
                font-size: 18px;
				border: 2px solid black;
				border-radius: 4px;
                padding: 13px 0px;
                margin-bottom: 10px;
			}
            .label {
                font-size: 18px;
                margin-bottom: 5px;
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
            <label class="label">${this.label}</label>
            <input type="text" class="input" name="name">
            <button class="button" type="submit">${this.textButton}</button>
            </form>
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("short-form", Form);
}
