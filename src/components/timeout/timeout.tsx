import React, { FC, JSX, useEffect, useState } from "react";
import { Button } from "../button";
import styles from "./timeout.module.scss";

interface IProps {
	timeLeft: number;
}

export const Timeout: FC<IProps> = ({ timeLeft }: IProps): JSX.Element => {
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

	return isTimerVisible ? (
		<div className={styles.timeout}>
			{`Get a new code in ${formattedTimer}`}
		</div>
	) : (
		<Button label="Get new" onClick={() => console.log("[Get new]")} />
	);
};
