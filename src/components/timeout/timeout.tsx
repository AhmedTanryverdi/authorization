import { FC, JSX, useContext, useEffect, useState } from "react";
import { Button } from "../button";
import styles from "./timeout.module.scss";
import { rqClient } from "src/api/instance";
import { ContextState } from "src/context/context";
import { CodeConfirmationState } from "src/utils/types";

interface IProps {
	timeLeft: number;
	isCodeConfirm: CodeConfirmationState;
}

export const Timeout: FC<IProps> = ({
	timeLeft,
	isCodeConfirm,
}: IProps): JSX.Element => {
	const [ms, setTimeLeft] = useState(timeLeft);

	useEffect(() => {
		let intervalId: any;

		if (ms > 0) {
			intervalId = setInterval(() => {
				setTimeLeft((prev) => Math.max(prev - 1000, 0));
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [ms]);

	const isTimerVisible = ms > 0;
	const formattedTimer = new Date(ms).toLocaleTimeString([], {
		minute: "2-digit",
		second: "2-digit",
	});

	const { user, setCodeConfirm, setIsCodeConfirm } = useContext(ContextState);
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
				setIsCodeConfirm(CodeConfirmationState.Unconfirmed);
				setTimeLeft(45000);
			}
		} catch (error: any) {
			console.error("Ошибка:", error);
		}
	};

	if (isCodeConfirm) {
		return (
			<Button
				label={"Сontinue"}
				onClick={() => console.log("[Сontinue]")}
			/>
		);
	}

	return isTimerVisible ? (
		<div className={styles.timeout}>
			{`Get a new code in ${formattedTimer}`}
		</div>
	) : (
		<Button
			label={isCodeConfirm ? "continue" : "Get new"}
			onClick={() => handleSignIn(user.email, user.password)}
		/>
	);
};
