import { ChangeEvent } from "react";

export type ErrorStyleType = {
	error: boolean;
	boxShadow?: string;
};

export interface IProps {
	value?: string;
	placeholder?: string;
	maxLength?: number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	style?: any;
	[key: string]: any;
}
