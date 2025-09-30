import React, { JSX, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { Input } from "../input";
import { Timeout } from "../timeout";
import { rqClient } from "src/api/instance";
import { ContextState } from "src/context/context";

export const AuthCodeForm: React.FC = (): JSX.Element => {
	const { codeConfirm, isCodeConfirm, setIsCodeConfirm } =
		useContext(ContextState);
	const createMutation = rqClient.useMutation("post", "/auth/confirm");
	const handleConfirm = async (code: string) => {
		try {
			await createMutation.mutateAsync({
				body: { confirmationCode: code },
			});
			setIsCodeConfirm(true);
		} catch (error) {
			console.log("код введен неверно!");
			setIsCodeConfirm(false);
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
			{!isCodeConfirm && isCodeConfirm !== undefined && (
				<span className="errorconfirm">Invalid code</span>
			)}

			<Timeout timeLeft={45000} isCodeConfirm={isCodeConfirm} />

			<div className="codeconfirm">
				<h2>enter the code: {codeConfirm}</h2>
			</div>
		</form>
	);
};
