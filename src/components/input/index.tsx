import { useRef, ChangeEvent, JSX, useState, useEffect } from "react";
import styles from "./input.module.scss";
import { IProps } from "../../utils/types";
import { onChangeDigit, onKeyDownDigit } from "../../utils/helpers";

const createInput = ({ type }: { type: string }) => {
	return ({
		value,
		placeholder,
		maxLength,
		onChange,
		...rest
	}: IProps): JSX.Element => {
		return (
			<label
				className={!placeholder ? styles.digit_Field : styles.label}
				style={rest.style}
			>
				<input
					className={styles.input}
					type={type}
					placeholder={placeholder}
					value={!value ? "" : value}
					maxLength={maxLength}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						if (typeof onChange === "function") {
							onChange(event);
						}
					}}
					{...rest}
					style={{}}
				/>
			</label>
		);
	};
};

export const Text = createInput({
	type: "text",
});

const Password = createInput({
	type: "password",
});

const DigitCode = ({ handleConfirm }: { handleConfirm: () => void }) => {
	const [code, setCode] = useState([] as string[]);
	const codeRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	useEffect(() => {
		if (code.length === 6) {
			handleConfirm();
		}
	}, [code.length]);

	return (
		<div className={styles.digits_block}>
			{codeRefs.map((ref, index) => (
				<Text
					key={index}
					ref={ref}
					maxLength={1}
					value={code[index]}
					onInput={onChangeDigit(index, code, setCode, codeRefs)}
					onKeyDown={onKeyDownDigit(index, codeRefs)}
				/>
			))}
		</div>
	);
};

export const Input = {
	Text,
	Password,
	DigitCode,
};
