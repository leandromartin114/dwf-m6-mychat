export function initTextMessage() {
	class TextMessage extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		name = this.getAttribute("label");
		text = this.textContent;
		shadow = this.attachShadow({ mode: "open" });
		render() {
			const div = document.createElement("div");
			div.classList.add("root");
			const style = document.createElement("style");
			style.innerHTML = `
            .root{
                display: flex;
				flex-direction: column;
				align-items: flex-start;
                margin-bottom: 6px;
            }
			.message {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 400;
				height: 30px;
				padding: 0 6px;
                border: none;
				border-radius: 6px;
                background-color: #A5A5A5;
			}
            .label {
                font-size: 10px;
                margin-bottom: 2px;
                color: #A5A5A5;
            }
            `;
			div.innerHTML = `
            <label class="label">${this.name}</label>
            <div class="message">${this.text}</div>
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("text-message", TextMessage);
}
