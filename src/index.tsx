import "./index.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/context";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>
);
