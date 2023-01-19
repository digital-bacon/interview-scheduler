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
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(
      <Form
      student=''
      interviewers={ interviewers }
      onSave={ onSave }
      onCancel={ onCancel }
    />
    );
  
    fireEvent.click(getByText('Save'));

    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={ interviewers }
        interviewer={ interviewers[0].id }
        onSave={ onSave }
        onCancel={ onCancel }
      />
    );
  
    fireEvent.click(getByText('Save'));
    
    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' }
    });
  
    fireEvent.click(getByText('Save'));
    
    expect(queryByText(/Student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });
  
  it("calls onCancel and resets the input field", () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        student={ 'Lydia Miller-Jones' }
        interviewers={ interviewers }
        onSave={ onSave }
        onCancel={ onCancel }
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/Student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("Lydia Miller-Jones");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});
