import { CodeConfirmationState } from "src/utils/types";

export const handleSignIn = async (
	emailValue: string,
	passwordValue: string,
	...rest: any
) => {
	const [
		setCodeConfirm,
		setIsCodeConfirm,
		setTimeLeft,
		createMutation,
	] = rest;
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
