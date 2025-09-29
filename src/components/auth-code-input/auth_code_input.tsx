import React, { JSX } from "react";
import logo from "../../assets/images/logo.png";
import { Input } from "../input";
import { Timeout } from "../timeout";
import { rqClient } from "src/api/instance";

const codeValue = "123456";

export const AuthCodeInput: React.FC = (): JSX.Element => {
	const createMutation = rqClient.useMutation("post", "/auth/confirm");
	const handleConfirm = async () => {
		try {
			await createMutation.mutateAsync({
				body: { confirmationCode: codeValue },
			});
			console.log("код подтвержден!");
		} catch (error) {
			console.log("код введен неверно!");
		}
	};

	return (
		<form>
			<img src={logo} alt="logo" />
			<h1 className="App-title">Two-Factor Authentication</h1>
			<p className="App-subtitle">
				Enter the 6-digit code from the Google
				<br /> Authenticator app
			</p>

			<Input.DigitCode handleConfirm={handleConfirm} />

			<Timeout timeLeft={45000} />
		</form>
	);
};
