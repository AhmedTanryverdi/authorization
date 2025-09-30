import { ChangeEvent } from "react";

export type ErrorStyleType = {
	email: {
		style: {
			boxShadow?: string;
		};
		error: boolean;
	};
	password: {
		style: {
			boxShadow?: string;
		};
		error: boolean;
	};
};

export interface IProps {
	value?: string;
	placeholder?: string;
	maxLength?: number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	style?: any;
	inputStatus?: string;
	[key: string]: any;
}
