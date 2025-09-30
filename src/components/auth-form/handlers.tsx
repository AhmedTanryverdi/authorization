import { UserType } from "src/utils/types";

export const handleSignIn = async (
	emailValue: string,
	passwordValue: string,
	setCodeConfirm: (param: string) => void,
	setValidate: (param: boolean) => void,
	setUser: (param: UserType) => void,
	setErrorRequest: (param: string) => void,
	createMutation: any
) => {
	try {
		const res = await createMutation.mutateAsync({
			body: {
				email: emailValue,
				password: passwordValue,
			},
		});

		if (res && res.confirmationCode) {
			setCodeConfirm(res.confirmationCode);
			setUser({
				email: emailValue,
				password: passwordValue,
			});
			setValidate(true);
			setErrorRequest("");
		}
	} catch (message: any) {
		setErrorRequest(`${message.error}`);
	}
};
