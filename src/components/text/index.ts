export function initText() {
	class Text extends HTMLElement {
		shadow = this.attachShadow({ mode: "open" });
		text = this.textContent;
		tags: string[] = ["h1", "h3", "p"];
		tag: string = "p";
		constructor() {
			super();
			if (this.tags.includes(this.getAttribute("tag"))) {
				this.tag = this.getAttribute("tag") || this.tag;
			}
			this.render();
		}
		render() {
			const textEl = document.createElement(this.tag);
			textEl.textContent = this.text;
			const style = document.createElement("style");
			style.innerHTML = `
				h1{
					font-size: 34px;
					font-weight: 700;
					display: flex;
					align-items: center;
					margin: 10px;
				}
				h3{
					font-size: 22px;
					font-weight: 500;
					display: flex;
					align-items: center;
					margin: 0;
				}
				p{
					font-size: 18px;
					font-weight: 400;
					display: flex;
					align-items: center;
					margin: 0;
				}
			`;
			this.shadow.appendChild(textEl);
			this.shadow.appendChild(style);
		}
	}
	customElements.define("my-text", Text);
}
