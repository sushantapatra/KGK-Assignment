export function truncateText(text, wordLimit = 10) {
	const words = text.split(" ");

	if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(" ") + " ...";
	}

	return text; // Return original text if it's within the limit
}
