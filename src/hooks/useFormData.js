import { useState } from "react";

const useFormData = (initialValues, validationErrors, onSave, onCancel) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState('');

  const validate = () => {
    
    if (formData.name === '') {
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
    const input = {
      name: target.name,
      value: target.value,
      type: null,
    }

    const isInputElement = target.getAttribute('data-form');
    if (isInputElement === 'false') {
      input.value = target.getAttribute('data-value');
      input.name = target.getAttribute('data-name');
      input.type = target.getAttribute('data-type');
    }

    if (input.type === 'number') {
      input.value = Number(input.value);
    }

    setFormData({ ...formData, [input.name]: input.value });
  };

  const cancel = () => {
    resetForm();
    onCancel();
  };

  const resetForm = () => {
    resetError();
    setFormData({ ...initialValues });
  };

  const resetError = () => setError('');

  return { formData, handleSubmit, cancel, validate, onChange, error };

}

export default useFormData;