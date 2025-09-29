import logo from "../../assets/images/logo.png";
import { ChangeEvent, FormEvent, JSX, useContext, useState } from "react";
import { ErrorStyleType } from "../../utils/types";
import { Input } from "../input";
import { onBlur, onChange as change } from "../../utils/helpers";
import { Button } from "../button";
import { ValidateState } from "../../context/validate";

export const AuthForm = (): JSX.Element => {
	const [emailValue, setEmailValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const [errorStyleEmail, setErrorStyleEmail] = useState<ErrorStyleType>({
		error: false,
	});
	const [errorStylePassword, setErrorStylePassword] =
		useState<ErrorStyleType>({
			error: false,
		});

	const { setValidate } = useContext(ValidateState);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const res = await fetch("/auth/signin", {
				method: "POST",
				body: JSON.stringify({
					email: emailValue,
					password: passwordValue,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				console.log("Успешная авторизация!");
				setValidate(true);
			} else {
				console.log("[error]", await res.text());
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<img src={logo} alt="logo" />
			<h1 className="App-title">
				Sign in to your account to
				<br />
				continue
			</h1>

			<Input.Text
				value={emailValue}
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					change(
						event,
						/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						setEmailValue,
						setErrorStyleEmail
					)
				}
				onBlur={() =>
					onBlur(
						errorStyleEmail.error,
						emailValue,
						setErrorStyleEmail
					)
				}
				style={errorStyleEmail}
				placeholder="Email"
			/>

			<Input.Password
				value={passwordValue}
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					change(
						event,
						/^.{6,}$/,
						setPasswordValue,
						setErrorStylePassword
					)
				}
				onBlur={() =>
					onBlur(
						errorStylePassword.error,
						passwordValue,
						setErrorStylePassword
					)
				}
				style={errorStylePassword}
				placeholder="Password"
			/>

			<Button
				label="Log in"
				disabled={
					errorStyleEmail.error ||
					errorStylePassword.error ||
					!Boolean(emailValue) ||
					!Boolean(passwordValue)
				}
				onClick={handleSubmit}
			/>
		</form>
	);
};
