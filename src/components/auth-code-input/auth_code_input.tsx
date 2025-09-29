import React, { JSX } from "react";
import logo from "../../assets/images/logo.png";
import { Input } from "../input";
import { Timeout } from "../timeout";

export const AuthCodeInput: React.FC = (): JSX.Element => {
	return (
		<form>
			<img src={logo} alt="logo" />
			<h1 className="App-title">Two-Factor Authentication</h1>
			<p className="App-subtitle">
				Enter the 6-digit code from the Google
				<br /> Authenticator app
			</p>

			<Input.DigitCode />

			<Timeout timeLeft={45000} />
		</form>
	);
};
