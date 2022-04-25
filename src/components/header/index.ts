export function initHeader() {
	class Header extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		shadow = this.attachShadow({ mode: "open" });
		render() {
			this.shadow.innerHTML = `
            <header class="header"></header>
            <style>
            .header{
                height: 66px;
                background-color: #ff8282;
            }
            </style>
            `;
		}
	}
	customElements.define("my-header", Header);
}
