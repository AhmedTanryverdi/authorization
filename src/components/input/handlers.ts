import { ChangeEvent } from "react";
import { KeyboardEvent } from "react";
import { UserType } from "src/utils/types";
import { ErrorStyleType } from "./types";

export const onChange = (
	event: ChangeEvent<HTMLInputElement>,
	reg: RegExp,
	setUser: (param: UserType) => void,
	setErrorStyle: (param: ErrorStyleType) => void,
	user: UserType,
	errorStyle: ErrorStyleType,
	type: string
) => {
	const value = event.target.value.trim();
	switch (type) {
		case "email":
			setUser({ ...user, email: value });
			if (!reg.test(value)) {
				setErrorStyle({
					...errorStyle,
					email: { ...errorStyle.email, error: true },
				});
			} else {
				setErrorStyle({
					...errorStyle,
					email: { ...errorStyle.email, error: false },
				});
			}
			break;
		case "password":
			setUser({ ...user, password: value });
			if (!reg.test(value)) {
				setErrorStyle({
					...errorStyle,
					password: { ...errorStyle.password, error: true },
				});
			} else {
				setErrorStyle({
					...errorStyle,
					password: { ...errorStyle.password, error: false },
				});
			}
			break;
	}
};

export const onBlur = (
	inputValue: string,
	style: ErrorStyleType,
	setStyle: (param: ErrorStyleType) => void,
	type: string
) => {
	switch (type) {
		case "email": {
			if (style.email.error || !inputValue) {
				setStyle({
					...style,
					email: {
						style: { boxShadow: "0 0 1px 1px red" },
						error: true,
					},
				});
			} else {
				setStyle({
					...style,
					email: {
						style: {},
						error: false,
					},
				});
			}
			break;
		}
		case "password": {
			if (style.password.error || !inputValue) {
				setStyle({
					...style,
					password: {
						style: { boxShadow: "0 0 1px 1px red" },
						error: true,
					},
				});
			} else {
				setStyle({
					...style,
					password: {
						style: {},
						error: false,
					},
				});
			}
			break;
		}
	}
};

export const onChangeDigit =
	(
		index: number,
		code: string[],
		setCode: (value: string[]) => void,
		codeRefs: any
	) =>
	(event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();

		if (!value || /\d/.test(value)) {
			const updatedCode: string[] = [...code];
			updatedCode[index] = value;
			setCode(updatedCode);
			if (index < 5 && updatedCode[index].length) {
				codeRefs[index + 1].current?.focus();
			}
		}
	};

export const onKeyDownDigit =
	(index: number, codeRefs: any) =>
	(event: KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key === "Backspace" &&
			!codeRefs[index].current?.value?.trim() &&
			index > 0
		) {
			codeRefs[index - 1].current?.focus();
		}
	};
