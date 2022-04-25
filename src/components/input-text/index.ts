export function initInputText() {
	class InputText extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		text = this.textContent;
		shadow = this.attachShadow({ mode: "open" });
		render() {
			const div = document.createElement("div");
			div.classList.add("root");
			const style = document.createElement("style");
			style.innerHTML = `
            .root{
                display: grid;
                margin-bottom: 10px;
            }
			.input {
                font-size: 18px;
				border: 2px solid black;
				border-radius: 4px;
                height: 55px;
                margin: 0;
			}
            .label {
                font-size: 18px;
                margin-bottom: 5px;
            }
            `;
			div.innerHTML = `
            <label class="label">${this.text}</label>
            <input type="text" class="input" name="title">
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("input-text", InputText);
}
