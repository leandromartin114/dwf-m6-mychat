export function initMyMessage() {
	class MyMessage extends HTMLElement {
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
                display: flex;
                flex-direction: column;
                align-items: flex-end;
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
                background-color: #B9E97C;
			}
            `;
			div.innerHTML = `
            <div class="message">${this.text}</div>
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("my-message", MyMessage);
}
