import logo from "../../assets/images/logo.png";
import { ChangeEvent, JSX, useContext, useState } from "react";
import { ErrorStyleType } from "../input/types";
import { Input } from "../input";
import { onBlur, onChange as change } from "../input/handlers";
import { Button } from "../button";
import { ContextState } from "../../context/context";
import { rqClient } from "src/api/instance";

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

	const { setValidate, setCodeConfirm, setUser } = useContext(ContextState);

	const createMutation = rqClient.useMutation("post", "/auth/signin");

	const handleSignIn = async (emailValue: string, passwordValue: string) => {
		try {
			const res = await createMutation.mutateAsync({
				body: {
					email: emailValue,
					password: passwordValue,
				},
			});

			if (res && res.confirmationCode) {
				setCodeConfirm(res.confirmationCode);
				setUser({
					email: emailValue,
					password: passwordValue,
				});
				setValidate(true);
			}
		} catch (error: any) {
			console.error("Ошибка:", error);
		}
	};

	return (
		<form>
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
				onClick={() => handleSignIn(emailValue, passwordValue)}
			/>
		</form>
	);
};
