import logo from "../../assets/images/logo.png";
import { ChangeEvent, JSX, useContext, useState } from "react";
import { Input } from "../input";
import { onBlur, onChange as change } from "../input/handlers";
import { Button } from "../button";
import { ContextState } from "../../context/context";
import { rqClient } from "src/api/instance";
import { ErrorStyleType } from "../input/types";
import { handleSignIn } from "./handlers";

const messageStyle: any = {
	display: "block",
	padding: "4px 0",
	color: "red",
	textAlign: "left",
	fontSize: "14px",
};
export const AuthForm = (): JSX.Element => {
	const [errorStyle, setErrorStyle] = useState<ErrorStyleType>({
		email: {
			style: { boxShadow: "" },
			error: false,
		},
		password: {
			style: { boxShadow: "" },
			error: false,
		},
	});

	const [errorRequest, setErrorRequest] = useState<string>("");
	const { setValidate, setCodeConfirm, user, setUser } =
		useContext(ContextState);
	const createMutation = rqClient.useMutation("post", "/auth/signin");

	return (
		<form>
			<img src={logo} alt="logo" />
			<h1 className="App-title">
				Sign in to your account to
				<br />
				continue
			</h1>

			<Input.Text
				value={user.email}
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					change(
						event,
						/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						setUser,
						setErrorStyle,
						user,
						errorStyle,
						"email"
					)
				}
				onBlur={() =>
					onBlur(user.email, errorStyle, setErrorStyle, "email")
				}
				style={errorStyle.email.style}
				placeholder="Email"
			/>
			{errorStyle.email.style?.boxShadow && (
				<span style={messageStyle}>
					символы "@" и "." обязательны для email!{" "}
				</span>
			)}

			<Input.Password
				value={user.password}
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					change(
						event,
						/^.{6,}$/,
						setUser,
						setErrorStyle,
						user,
						errorStyle,
						"password"
					)
				}
				onBlur={() =>
					onBlur(user.password, errorStyle, setErrorStyle, "password")
				}
				style={errorStyle.password.style}
				placeholder="Password"
			/>
			{errorStyle.password.style?.boxShadow && (
				<span style={messageStyle}>
					Пароль должен содержать не менее 6-ти символов!
				</span>
			)}

			<Button
				label="Log in"
				disabled={
					errorStyle.email.error ||
					errorStyle.password.error ||
					!Boolean(user.email) ||
					!Boolean(user.password)
				}
				onClick={() =>
					handleSignIn(
						user.email,
						user.password,
						setCodeConfirm,
						setValidate,
						setUser,
						setErrorRequest,
						createMutation
					)
				}
			/>
			<span style={messageStyle}>{errorRequest}</span>
		</form>
	);
};
