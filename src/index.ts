import { initRouter } from "./router";
import { initButton } from "./components/button";
import { initHeader } from "./components/header";
import { initInputText } from "./components/input-text";
import { initLongForm } from "./components/long-form";
import { initMidForm } from "./components/mid-form";
import { initMyMessage } from "./components/my-message";
import { initShortForm } from "./components/short-form";
import { initText } from "./components/text";
import { initTextMessage } from "./components/text-message";
import { state } from "./state";
function main() {
	initButton();
	initHeader();
	initInputText();
	initLongForm();
	initMidForm();
	initMyMessage();
	initShortForm();
	initText();
	initTextMessage();
	state.initState();
	const root = document.querySelector(".root");
	initRouter(root);
}
main();
