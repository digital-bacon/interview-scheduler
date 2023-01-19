import { useState } from "react";

const useFormData = (initialValues, validationErrors, onSave, onCancel) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");

  const validate = () => {
    if (formData.name === "") {
      setError(validationErrors.empty.name);
      return;
    }

    if (formData.interviewer === null) {
      setError(validationErrors.notSelected.interviewer);
      return;
    }

    onSave(formData.name, formData.interviewer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
  };

  const onChange = (event) => {
    resetError();
    const target = event.target;
    const newData = getDataFrom(target);
    setFormData({ ...formData, [newData.name]: newData.value });
  };

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

  const getDataFromInput = (input) => {
    const data = {
      name: "",
      value: "",
    };

    data.name = input && input.name ? input.name : data.name;
    data.value = input && input.value ? input.value : data.value;

    return data;
  };

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

  const cancel = () => {
    resetForm();
    onCancel();
  };

  const resetForm = () => {
    resetError();
    setFormData({ ...initialValues });
  };

  const resetError = () => setError("");

  return { formData, handleSubmit, cancel, validate, onChange, error };
};

export default useFormData;
