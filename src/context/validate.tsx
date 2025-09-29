import { createContext, ReactNode, useState } from "react";

type ValidateType = {
	validate: boolean;
	setValidate: (value: boolean) => void;
};

export const ValidateState = createContext<ValidateType>({
	validate: false,
	setValidate: () => {},
});

export const ValidateProvider = ({ children }: { children: ReactNode }) => {
	const [validate, setValidate] = useState(false);

	return (
		<ValidateState.Provider
			value={{
				validate,
				setValidate,
			}}
		>
			{children}
		</ValidateState.Provider>
	);
};
