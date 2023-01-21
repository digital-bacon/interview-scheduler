# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## React Components

<dl>
<dt><a href="#components_Button">Button</a></dt>
<dd><p><code>src/components/Button.jsx</code></dd>
<dt><a href="#components_DayList">DayList</a></dt>
<dd><p><code>src/components/DayList.jsx</code></dd>
<dt><a href="#components_DayListItem">DayListItem</a></dt>
<dd><p><code>src/components/DayListItem.jsx</code></dd>
<dt><a href="#components_InterviewerList">InterviewerList</a></dt>
<dd><p><code>src/components/InterviewerList.jsx</code></dd>
<dt><a href="#components_InterviewerListItem">InterviewerListItem</a></dt>
<dd><p><code>src/components/InterviewerListItem.jsx</code></dd>
<dt><a href="#components__Appointment">Appointment</a></dt>
<dd><p>Depending on the task the user is completing, will display a different child component.</p>
<p><code>src/components/Appointment</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Confirm">Confirm</a></dt>
<dd><p><code>src/components/Appointment/Confirm</code></p>
</dd>
</dl>

<a name="components_Button"></a>

### Button

```js
<Button
  confirm   // bool: when true, use class "button--confirm"
  danger    // bool: when true, use class "button--danger"
  disabled  // bool: when true, applies attribute "disabled"
  onClick   // func.isRequired: callback to execute when button is clicked
/>
```
<a name="components_DayList"></a>

### DayList

```js
<DayList
  days      // array.isRequired: state.days by reference
  onChange  // func.isRequired: callback to execute when a day is clicked
  value     // string.isRequired: state.day value
/>
```
<a name="components_DayListItem"></a>

### DayListItem

```js
<DayListItem
  name      // string.isRequired: state.days by reference
  setDay    // func.isRequired: callback to execute when a day is clicked
  selected  // bool.isRequired: if true, use class "day-list__item--selected"
  spots     // number.isRequired: total interview spots available for the day
/>
```
<a name="components_InterviewerList"></a>

### InterviewerList

```js
<InterviewerList
  interviewers  // array.isRequired: copy of state.interviewers
  onChange      // func.isRequired: id of currently interviewer
  value         // number: callback to execute when an interviewer is clicked
/>
```
<a name="components_InterviewerListItem"></a>

### InterviewerListItem

```js
<InterviewerListItem
  avatar          // string: interviewer image url
  id              // number.isRequired: interviewer id
  name            // string.isRequired: name of interviewer 
  selected        // bool.isRequired: Boolean: if true, use class "interviewers__item--selected"
  setInterviewer  // func.isRequired: callback to execute when an interviewer is clicked
/>
```
<a name="components__Appointment"></a>

### Appointment

```js
<Appointment
  bookInterview   // func: updates an appointment with a new interview
  cancelInterview // func: cancels an interview
  id              // number: the appointment id from state
  interview       // object: a copy of state.interview data
  interviewers    // array: a copy of state.interviewers data
  time            // string: the appointment time from state
/>
```
<a name="components__Appointment_Confirm"></a>

### Appointment ⇒ Confirm

```js
<Confirm
  message     //string: message to display to user
  onConfirm   //func: callback to execute on confirm button click
  onCancel    //func: callback to execute on cancel button click  
/>
```