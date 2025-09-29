import { FC, JSX, ReactNode } from "react";
import styles from "./modal.module.scss";

interface IProps {
	children: ReactNode;
}

export const Modal: FC<IProps> = ({ children }: IProps): JSX.Element => (
	<div className={styles.container}>
		<div className={styles.content}>{children}</div>
	</div>
);
