import { HttpResponse } from "msw";
import { http } from "../mocks/http";
import { components } from "../../utils/generated";

export type ApiSchemas = components["schemas"];

// Шестизначный код
let expectedConfirmationCode: string;

const mockUsers = [
	{
		email: "ahmed@yandex.ru",
		password: "123456",
	},
];

export const authHandlers = [
	http.post("/auth/signin", async ({ request }: any) => {
		const body = await request.json();
		const user = mockUsers.find(
			(u) => u.email === body.email && u.password === body.password
		);

		if (!user) {
			return HttpResponse.json(
				{
					error: "Пользователь не найден!",
				},
				{ status: 401 }
			);
		}

		const confirmCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		expectedConfirmationCode = confirmCode;
		return HttpResponse.json(
			{
				message: "Авторизация прошла успешно!",
				confirmationCode: expectedConfirmationCode,
			},
			{ status: 200 }
		);
	}),

	http.post("/auth/confirm", async ({ request }) => {
		const body = await request.json();
		const providedCode = body.confirmationCode;

		if (providedCode !== expectedConfirmationCode) {
			return HttpResponse.json(
				{
					error: "Неверный код подтверждения",
				},
				{ status: 400 }
			);
		}

		return HttpResponse.json(
			{
				message: "Аккаунт подтвержден успешно!",
			},
			{ status: 200 }
		);
	}),
];
