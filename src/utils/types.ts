export type UserType = {
	email: string;
	password: string;
};

export enum CodeConfirmationState {
	NotEntered = "not_entered",
	Unconfirmed = "unconfirmed",
	Confirmed = "confirmed",
}
