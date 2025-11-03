import axios from "axios";

export type Joke = {
	type: string;
	setup: string;
	punchline: string;
};

const api = axios.create({
	baseURL: "https://official-joke-api.appspot.com",
	timeout: 10000,
});

export async function fetchRandomJoke(): Promise<Joke> {
	const { data } = await api.get<Joke>("/random_joke");
	return data;
}
