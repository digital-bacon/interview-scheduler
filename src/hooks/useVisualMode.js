import { useState } from "react";

/**
 * React hook to retrieve data from form and manage form state
 * @param {String} initial - from app state
 * @returns {Object} Object
 * @property {String} formData - the current mode state
 * @property {Function} transition - called when transitioning to a new mode
 * @property {Function} back - called when transitioning to the previous mode
 */
const useVisualMode = (initial) => {
	const [mode, setMode] = useState(initial || "");
	const [history, setHistory] = useState([initial] || []);

	/**
	 * Applies a new mode to history and mode states
	 * @param {String} newMode
	 * @param {Boolean} [replaceLastMode=false] - if true, the last mode in
	 * history state will be replaced
	 */
	const transition = (newMode, replaceLastMode = false) => {
		addToHistory(newMode, replaceLastMode);
		setMode(newMode);
	};

	/**
	 * Retrieves the last mode from history state and transitions to it
	 */
	const back = () => {
		const newMode = getPreviousMode();
		transition(newMode, true);
	};

	/**
	 * Adds a new mode to history state
	 * @param {String} newMode
	 * @param {Boolean} [replaceLastMode=false] - if true, the last mode in
	 * history state will be replaced
	 * @param {Array} [newBaseHistoryArray] - optional array to replace the
	 * exisitng history state before adding the new mode
	 * @returns
	 */
	const addToHistory = (
		newMode,
		replaceLastMode = false,
		newBaseHistoryArray
	) => {
		if (replaceLastMode) {
			return replaceLastHistory(newMode);
		}

		const historyBuffer = !newBaseHistoryArray
			? copyHistory()
			: [...newBaseHistoryArray];
		const isUniqueNewMode = newMode !== historyBuffer[historyBuffer.length - 1];
		const newHistory = isUniqueNewMode
			? [...historyBuffer, newMode]
			: [...historyBuffer];
		setHistory(newHistory);
	};

	/**
	 * Replaces the last mode in history state with the provided new mode
	 * @param {String} newMode
	 */
	const replaceLastHistory = (newMode) => {
		const historyBuffer = copyHistory(dropLastIndex);
		addToHistory(newMode, false, historyBuffer);
	};

	/**
	 * Retrieves the previous (most recently added) mode from history state
	 * @returns {String} the mode value
	 */
	const getPreviousMode = () => {
		if (history.length >= 2) {
			return history[history.length - 2];
		}

		return history[history.length - 1];
	};

	/**
	 * Verbose function to create a shallow copy of the history state array
	 * @param {Function} [callback] - called if provided with copied history array
	 * as an argument
	 * @returns {(Array|*)} return value from provided callback. If no callback
	 * provided, then
	 * returns copied history array
	 */
	const copyHistory = (callback) =>
		callback ? callback([...history]) : [...history];

	/**
	 * Verbose function to return a shallow copy of an array without the last
	 * element
	 * @param {Array} array - the array to copy
	 * @returns shallow copy of an array without the last element
	 */
	const dropLastIndex = (array) => array.slice(0, -1);

	return {
		mode,
		transition,
		back,
	};
};

export default useVisualMode;
