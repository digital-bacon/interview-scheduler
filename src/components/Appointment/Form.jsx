import React from 'react';
import PropTypes from 'prop-types';

import useFormData from 'hooks/useFormData';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = ({
  student: studentName,
  interviewers,
  interviewer: interviewerId,
  onSave,
  onCancel,
  ...props
}) => {

  const initialValues = {
    name: studentName || '',
    interviewer: interviewerId || null
  };

  const validationErrors = {
    empty: {
      name: 'Student name cannot be blank',
    },
    notSelected: {
      interviewer: 'Please select an interviewer',
    },
  };

  const {
    formData,
    handleSubmit,
    cancel,
    validate,
    onChange,
    error
  } = useFormData(initialValues, validationErrors, onSave, onCancel);

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={ handleSubmit }>
          <input
            className='appointment__create-input text--semi-bold'
            value={ formData.name }
            type='text'
            placeholder='Enter Student Name'
            data-testid='student-name-input'
            data-source='input'
            name='name'
            onChange={ onChange }
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={ interviewers }
          value={ formData.interviewer }
          onChange={ onChange }
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ validate }>Save</Button>
        </section>
      </section>
    </main>
  );
};

Form.propTypes = {
  student: PropTypes.string,
  interviewers: PropTypes.array.isRequired,
  interviewer: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form;