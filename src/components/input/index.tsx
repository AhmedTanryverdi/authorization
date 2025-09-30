import styles from "./input.module.scss";
import { IProps } from "./types";
import {
	useRef,
	ChangeEvent,
	JSX,
	useState,
	useEffect,
	useContext,
} from "react";
import { onChangeDigit, onKeyDownDigit } from "./handlers";
import { ContextState } from "src/context/context";
import { CodeConfirmationState } from "src/utils/types";

const createInput = ({ type }: { type: string }) => {
	return ({
		value,
		placeholder,
		maxLength,
		onChange,
		inputStatus,
		...rest
	}: IProps): JSX.Element => {
		return (
			<label
				className={!placeholder ? styles.digit_Field : styles.label}
				style={rest.style}
			>
				<input
					className={styles.input}
					data-status={inputStatus}
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

const DigitCode = ({
	handleConfirm,
}: {
	handleConfirm: (code: string) => void;
}) => {
	const [code, setCode] = useState([] as string[]);
	const codeRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const { isCodeConfirm, codeConfirm, setIsCodeConfirm } =
		useContext(ContextState);

	useEffect(() => {
		if (code.length === 6) {
			handleConfirm(code.join(""));
		}
	}, [code.length, code]);
	useEffect(() => {
		setCode([]);
		setIsCodeConfirm(CodeConfirmationState.NotEntered);
	}, [codeConfirm]);

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
					inputStatus={
						isCodeConfirm === CodeConfirmationState.Unconfirmed
							? "error"
							: ""
					}
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
