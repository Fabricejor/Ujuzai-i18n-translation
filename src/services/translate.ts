import axios from "axios";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type CacheEntry = { value: string; expiresAt: number };
const cache = new Map<string, CacheEntry>();

const localeToMyMemory = (locale: string): string => {
	switch (locale) {
		case "fr":
			return "fr";
		case "en":
			return "en";
		case "es":
			return "es";
		case "ja":
			return "ja";
		case "zh":
			return "zh-CN";
		default:
			return "en";
	}
};

export async function translateText(
	text: string,
	targetLocale: string,
	sourceLocale: string = "en"
): Promise<string> {
	if (!text || targetLocale === sourceLocale) return text;

	const target = localeToMyMemory(targetLocale);
	const source = localeToMyMemory(sourceLocale);
	const key = `${source}|${target}|${text}`;

	const cached = cache.get(key);
	if (cached && cached.expiresAt > Date.now()) {
		return cached.value;
	}

	try {
		const url = "https://api.mymemory.translated.net/get";
		const { data } = await axios.get(url, {
			params: { q: text, langpair: `${source}|${target}` },
		});
		const translated: string = data?.responseData?.translatedText || text;

		cache.set(key, { value: translated, expiresAt: Date.now() + CACHE_TTL_MS });
		return translated;
	} catch (e) {
		return text; // graceful fallback
	}
}
