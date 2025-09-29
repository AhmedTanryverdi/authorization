import "./App.scss";
import { useContext } from "react";
import { Modal } from "./components/modal";
import { ValidateState } from "./context/validate";
import { AuthForm } from "./components/auth-form/auth_form";
import { AuthCodeInput } from "./components/auth-code-input/auth_code_input";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	const { validate } = useContext(ValidateState);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Modal>{!validate ? <AuthForm /> : <AuthCodeInput />}</Modal>
			</div>
		</QueryClientProvider>
	);
}
export default App;
