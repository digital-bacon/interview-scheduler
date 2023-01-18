import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {  
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png'
    },
    {
      id: 2,
      name: 'Tori Malcolm',
      avatar: 'https://i.imgur.com/Nmx0Qxo.png'
    }
  ];
  
  it('renders without crashing', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    render(
    <Form
      interviewers={ interviewers }
      interviewer={ interviewers[0].id }
      onSave={ onSave }
      onCancel={ onCancel }
    />);
  });

  it('renders without student name if not provided', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByPlaceholderText } = render(<Form
      interviewers={ interviewers }
      interviewer={ interviewers[0].id }
      onSave={ onSave }
      onCancel={ onCancel }
    />);
    const studentNameInputField = getByPlaceholderText('Enter Student Name');
    expect(studentNameInputField).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByTestId } = render(<Form
      student={ 'Lydia Miller-Jones' }
      interviewers={ interviewers }
      interviewer={ interviewers[0].id }
      onSave={ onSave }
      onCancel={ onCancel }
    />);
    const studentNameInputField = getByTestId('student-name-input');
    expect(studentNameInputField).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    const onCancel = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form
      interviewers={ interviewers }
      onSave={ onSave }
      onCancel={ onCancel }
    />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it('validates that the interviewer cannot be null', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    const onCancel = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form
      student={ 'Lydia Miller-Jones' }
      interviewers={ interviewers }
      onSave={ onSave }
      onCancel={ onCancel }
    />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it('calls onSave function when the name and interviewer is defined', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    const onCancel = jest.fn();
    /* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        student={ 'Lydia Miller-Jones' }
        interviewers={ interviewers }
        interviewer={ interviewers[0].id }
        onSave={ onSave }
        onCancel={ onCancel }
      />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  it('submits the name entered by the user', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form
        interviewers={ interviewers }
        interviewer={ interviewers[0].id }
        onSave={ onSave }
        onCancel={ onCancel }
      />
    );
  
    const input = getByPlaceholderText('Enter Student Name');
  
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    fireEvent.click(getByText('Save'));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });
  
});
