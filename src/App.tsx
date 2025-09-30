import "./App.scss";
import { useContext } from "react";
import { Modal } from "./components/modal";
import { ValidateState } from "./context/validate";
import { AuthForm } from "./components/auth-form/auth-form";
import { AuthCodeForm } from "./components/auth-code-form/auth-code-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { worker } from "./api/mocks/browser";

const queryClient = new QueryClient();
if (process.env.NODE_ENV === "development") {
	worker.start();
}

function App() {
	const { validate } = useContext(ValidateState);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Modal>{!validate ? <AuthForm /> : <AuthCodeForm />}</Modal>
			</div>
		</QueryClientProvider>
	);
}
export default App;
