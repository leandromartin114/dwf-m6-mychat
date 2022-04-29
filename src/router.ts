import { initHomepage } from "./pages/home";
import { initChatpage } from "./pages/chatroom";
export function initRouter(container: Element) {
	const routes = [
		{ path: /\/home/, component: initHomepage },
		{ path: /\/chatroom/, component: initChatpage },
	];
	function goTo(path) {
		history.pushState({}, "", path);
		handleRoute(path);
	}
	function handleRoute(route) {
		for (const r of routes) {
			if (r.path.test(route)) {
				const element = r.component({ goTo: goTo });
				container.firstChild?.remove();
				container.appendChild(element);
			}
		}
	}
	if (location.pathname == "/") {
		goTo("/home");
	} else {
		handleRoute(location.pathname);
	}
}
