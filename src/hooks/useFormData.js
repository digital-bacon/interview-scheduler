import { useState } from "react";

/**
 * React hook to retrieve data from form and manage form state
 * @param {Object} initialFormData - pre-configured in the component
 * @param {Object} validationData - pre-configured error messages to use in the error state
 * @param {Function} onSave - callback that receives data from formData state
 * @param {Function} onCancel - callback to be called when cancel() is executed
 * @returns {Object} with properties:
 *  formData (Object) the current formData state ||
 *  handleSubmit (Function) ||
 *  cancel (Function) ||
 *  validate (Function) ||
 *  onChange (Function) ||
 *  error (Object) the current error state
 */
const useFormData = (initialFormData, validationData, onSave, onCancel) => {
	const initialError = "";
	const [formData, setFormData] = useState(initialFormData || {});
	const [error, setError] = useState(initialError);

	/**
	 * Validates the form data and conditionally sets error or formData state
	 */
	const validate = () => {
		for (const propertyName in formData) {
			if (validationData?.[propertyName]?.required && !formData[propertyName]) {
				setError(validationData[propertyName].requiredError);
				return;
			}
		}

		onSave(formData);
	};

	/**
	 * When a form is submitted, prevent default behaviour and validate the inputs
	 * @param {Object} event - expects an event object
	 */
	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
		}

		validate();
	};

	/**
	 * Handles a change on a form element
	 * @param {Object} event - expects an event object
	 */
	const onChange = (event) => {
		resetError();
		const target = event.target;
		const newData = getDataFrom(target);
		setFormData((prev) => (prev = { ...prev, [newData.name]: newData.value }));
	};

	/**
	 * Gets data from a targetted element
	 * @param {Object} target - can be any target from an event
	 * @returns {Object} with the data retrieved as properties name and value
	 */
	const getDataFrom = (target) => {
		const initial = {
			name: "",
			value: "",
		};

		if (typeof target === "undefined") {
			return initial;
		}

		const dataSource = target.getAttribute("data-source");
		if (dataSource === "input") {
			const dataFromInput = getDataFromInput(target);
			const data = { ...initial, ...dataFromInput };
			return data;
		}

		if (dataSource === "element") {
			const dataFromAttributes = getDataFromAttributes(target);
			const data = { ...initial, ...dataFromAttributes };
			return data;
		}

		return initial;
	};

	/**
	 * Gets data from an input element
	 * @param {Object} input - can be any input element with attributes name and value
	 * @returns {Object} with the data retrieved as properties name and value
	 */
	const getDataFromInput = (input) => {
		const data = {
			name: "",
			value: "",
		};

		data.name = input && input.name ? input.name : data.name;
		data.value = input && input.value ? input.value : data.value;

		return data;
	};

	/**
	 * Gets data from an html element with data attributes
	 * @param {Object} input - can be any element with attributes data-name and data-value
	 * @returns {Object} with the data retrieved as properties name and value
	 */
	const getDataFromAttributes = (element) => {
		const data = {
			name: "",
			value: "",
		};

		const dataName = element.getAttribute("data-name");
		const dataValue = element.getAttribute("data-value");
		data.name = dataName ? dataName : data.name;
		data.value = dataValue ? dataValue : data.value;

		const dataType = element.getAttribute("data-type");
		if (dataType === "number") {
			data.value = Number(data.value);
		}

		return data;
	};

	/**
	 * Invoked when a user presses the cancel button on the form
	 */
	const cancel = () => {
		resetForm();
		onCancel();
	};

	/**
	 * Calls the resetError callback to clear error state, and sets the formData state back to initial values
	 */
	const resetForm = () => {
		resetError();
		resetFormData();
	};

	/**
	 * Resets formData state to initial state
	 */
	const resetFormData = () =>
		setFormData((prev) => (prev = { ...initialFormData }));

	/**
	 * Resets error state to initial state
	 */
	const resetError = () => setError((prev) => (prev = initialError));

	return {
		formData,
		error,
		handleSubmit,
		cancel,
		validate,
		onChange,
	};
};

export default useFormData;
