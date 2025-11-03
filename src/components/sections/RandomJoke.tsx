"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { fetchRandomJoke, type Joke } from "../../services/jokes";
import { useTranslation } from "../../hooks/useTranslation";
import { translateText } from "../../services/translate";

export const RandomJoke: React.FC = () => {
	const { t, loading: tLoading, locale } = useTranslation();
	const [joke, setJoke] = useState<Joke | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [translatedSetup, setTranslatedSetup] = useState<string>("");
	const [translatedPunchline, setTranslatedPunchline] = useState<string>("");

	const translateCurrentJoke = async (current: Joke, targetLocale: string) => {
		// The API returns English content; translate into targetLocale when needed
		if (!current) return;
		try {
			const [ts, tp] = await Promise.all([
				translateText(current.setup, targetLocale, "en"),
				translateText(current.punchline, targetLocale, "en"),
			]);
			setTranslatedSetup(ts);
			setTranslatedPunchline(tp);
		} catch {
			setTranslatedSetup(current.setup);
			setTranslatedPunchline(current.punchline);
		}
	};

	const loadJoke = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchRandomJoke();
			setJoke(data);
			await translateCurrentJoke(data, locale);
		} catch (e) {
			setError(t("jokes.labels.error", "Unable to load a joke. Please try again."));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadJoke();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Re-translate current joke when locale changes
		if (joke) {
			translateCurrentJoke(joke, locale);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locale]);

	const translatedType = joke ? t(`jokes.types.${joke.type}`, joke.type) : "";

	return (
		<section className="relative py-16">
			<div className="max-w-2xl mx-auto px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold">{t("jokes.labels.title", "Random Joke")}</h2>
					<button
						onClick={loadJoke}
						className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
						disabled={loading}
					>
						<RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
						{loading ? t("jokes.labels.loading", "Loading") : t("jokes.labels.refresh", "Refresh")}
					</button>
				</div>

				{loading && (
					<div className="space-y-3 animate-pulse">
						<div className="h-4 bg-gray-300/40 dark:bg-gray-700/40 rounded w-24" />
						<div className="h-6 bg-gray-300/40 dark:bg-gray-700/40 rounded w-3/4" />
						<div className="h-6 bg-gray-300/40 dark:bg-gray-700/40 rounded w-2/3" />
					</div>
				)}

				{error && (
					<div className="text-red-500 text-sm mb-3">{error}</div>
				)}

				{!loading && !error && joke && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="rounded-xl border border-black/10 dark:border-white/10 p-6 bg-white/50 dark:bg-black/50 backdrop-blur"
					>
						<div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{translatedType}</div>
						<div className="text-lg font-medium mb-2">{translatedSetup || joke.setup}</div>
						<div className="text-gray-600 dark:text-gray-400">{translatedPunchline || joke.punchline}</div>
					</motion.div>
				)}
			</div>
		</section>
	);
};
