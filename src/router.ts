import { initHomepage } from "./pages/home";
import { initChatpage } from "./pages/chatroom";

const BASE_PATH = "/dwf-m6-mychat.herokuapp.com";

function isHerokuPage() {
	return location.host.includes("dwf-m6-mychat.herokuapp.com");
}

export function initRouter(container: Element) {
	const routes = [
		{ path: /\/home/, component: initHomepage },
		{ path: /\/chatroom/, component: initChatpage },
	];
	function goTo(path) {
		const completePath = isHerokuPage() ? BASE_PATH + path : path;
		history.pushState({}, "", completePath);
		handleRoute(path);
	}
	function handleRoute(route) {
		const newRoute = isHerokuPage() ? route.replace(BASE_PATH, "") : route;
		for (const r of routes) {
			if (r.path.test(newRoute)) {
				const element = r.component({ goTo: goTo });
				container.firstChild?.remove();
				container.appendChild(element);
			}
		}
	}
	if (
		location.pathname == "/" ||
		location.pathname == "/dwf-m6-mychat.herokuapp.com/"
	) {
		goTo("/home");
	} else {
		handleRoute(location.pathname);
	}
	window.onpopstate = () => {
		handleRoute(location.pathname);
	};
}
