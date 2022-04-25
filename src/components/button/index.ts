export function initButton() {
	class Button extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		text = this.textContent;
		shadow = this.attachShadow({ mode: "open" });
		render() {
			const div = document.createElement("div");
			const style = document.createElement("style");
			style.innerHTML = `
            .button {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: 700;
				height: 55px;
				width: 100%;
                border: none;
				border-radius: 4px;
                background-color: #9CBBE9;
			}
            `;
			div.innerHTML = `
            <button class="button" type="submit">${this.text}</button>
            `;
			this.shadow.appendChild(div);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("my-button", Button);
}
