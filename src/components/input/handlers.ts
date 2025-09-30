import { ChangeEvent } from "react";
import { ErrorStyleType } from "./types";
import { KeyboardEvent } from "react";

export const onChange = (
	event: ChangeEvent<HTMLInputElement>,
	reg: RegExp,
	setInputValue: (value: string) => void,
	setStyleValue: (value: ErrorStyleType) => void
) => {
	const value = event.target.value.trim();
	setInputValue(value);
	if (!reg.test(value)) {
		setStyleValue({ error: true });
	} else {
		setStyleValue({ error: false });
	}
};

export const onBlur = (
	error: boolean,
	value: string,
	setStyle: (value: ErrorStyleType) => void
) => {
	if (error || !value) {
		setStyle({
			error: true,
			boxShadow: "0 0 1px 1px red",
		});
	} else {
		setStyle({ error: false });
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
