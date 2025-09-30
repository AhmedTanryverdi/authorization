import "./index.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ValidateProvider } from "./context/validate";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ValidateProvider>
			<App />
		</ValidateProvider>
	</React.StrictMode>
);
