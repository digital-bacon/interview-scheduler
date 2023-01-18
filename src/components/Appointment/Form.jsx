import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  const [student, setStudentName] = useState(studentName || '');
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const [error, setError] = useState('');
  const onStudentNameInput = (event) => setStudentName(event.target.value);
  
  const onChange = (event) => {
    resetError();
    if (event.target?.name === 'name') {
      onStudentNameInput(event);
      return;
    }

    setInterviewer(event);
    return;
  } 

  const reset = () => {
    setStudentName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const resetError = () => setError('');

  const handleSubmit = (event) => event.preventDefault();

  const validationErrors = {
    empty: {
      name: 'Student name cannot be blank',
    },
    notSelected: {
      interviewer: 'Please select an interviewer',
    },
  }

  const validate = () => {
    if (student === '') {
      setError(validationErrors.empty.name);
      return;
    }

    if (interviewer === null) {
      setError(validationErrors.notSelected.interviewer);
      return;
    }
  
    onSave(student, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={ handleSubmit }>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={ student }
            data-testid='student-name-input'
            onChange={ onChange }
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={ interviewers }
          value={ interviewer }
          onChange={ onChange }
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button
            danger
            onClick={ cancel }
          >
            Cancel
          </Button>

          <Button
            confirm
            onClick={ validate }
          >
            Save
          </Button>
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