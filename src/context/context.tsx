import { createContext, ReactNode, useState } from "react";
import { UserType } from "src/utils/types";

type ContextType = {
	validate: boolean;
	setValidate: (value: boolean) => void;
	codeConfirm: string;
	setCodeConfirm: (value: string) => void;
	isCodeConfirm: boolean | undefined;
	setIsCodeConfirm: (value: boolean | undefined) => void;
	user: UserType;
	setUser: (value: UserType) => void;
};

export const ContextState = createContext<ContextType>({
	validate: false,
	setValidate: () => {},
	codeConfirm: "",
	setCodeConfirm: () => {},
	isCodeConfirm: undefined,
	setIsCodeConfirm: () => {},
	user: { email: "", password: "" },
	setUser: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [validate, setValidate] = useState<boolean>(false);
	const [codeConfirm, setCodeConfirm] = useState<string>("");
	const [isCodeConfirm, setIsCodeConfirm] = useState<boolean | undefined>(
		undefined
	);
	const [user, setUser] = useState({ email: "", password: "" });

	return (
		<ContextState.Provider
			value={{
				validate,
				setValidate,
				codeConfirm,
				setCodeConfirm,
				isCodeConfirm,
				setIsCodeConfirm,
				user,
				setUser,
			}}
		>
			{children}
		</ContextState.Provider>
	);
};
