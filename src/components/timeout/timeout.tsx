import { FC, JSX, useContext, useEffect, useState } from "react";
import { Button } from "../button";
import styles from "./timeout.module.scss";
import { rqClient } from "src/api/instance";
import { ContextState } from "src/context/context";
import { CodeConfirmationState } from "src/utils/types";
import { handleSignIn } from "./handlers";

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

	if (isCodeConfirm === CodeConfirmationState.Confirmed) {
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
			label="Get new"
			onClick={() =>
				handleSignIn(
					user.email,
					user.password,
					setCodeConfirm,
					setIsCodeConfirm,
					setTimeLeft,
					createMutation
				)
			}
		/>
	);
};
