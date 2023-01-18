import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  it('renders without crashing', () => {
    const fn = jest.fn();
    render(
    <Form
      interviewers = {
        [
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
        ]
      }
      interviewer={ 2 }
      onSave = { fn }
      onCancel = { fn }
    />);
  });

  it('renders without student name if not provided', () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Form
      interviewers = {
        [
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
        ]
      }
      interviewer={ 2 }
      onSave = { fn }
      onCancel = { fn }
    />);
    const studentNameInputField = getByTestId('student-name-input');
    expect(studentNameInputField).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Form
      student = { 'Lydia Miller-Jones' }
      interviewers = {
        [
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
        ]
      }
      interviewer={ 2 }
      onSave = { fn }
      onCancel = { fn }
    />);
    const studentNameInputField = getByTestId('student-name-input');
    expect(studentNameInputField).toHaveValue('Lydia Miller-Jones');
  });
  
});
