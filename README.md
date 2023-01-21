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
<dd><p><code>src/components/Appointment/Confirm</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Empty">Empty</a></dt>
<dd><p><code>src/components/Appointment/Empty</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Error">Error</a></dt>
<dd><p><code>src/components/Appointment/Error</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Form">Form</a></dt>
<dd><p><code>src/components/Appointment/Form</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Header">Header</a></dt>
<dd><p><code>src/components/Appointment/Header</code></p></dd>
<dt>Appointment ⇒ <a href="#components__Appointment_Show">Show</a></dt>
<dd><p><code>src/components/Appointment/Show</code></p></dd>
</dl>

<a name="components_Button"></a>

### Button

```js
<Button
  confirm         // bool: is a confirm button
  danger          // bool: is a danger button
  disabled        // bool: is a disabled button
  onClick         // func.isRequired: onClick callback
/>
```
<a name="components_DayList"></a>

### DayList

```js
<DayList
  days            // array.isRequired: list of days
  onChange        // func.isRequired: callback passed to <DayListItem>
  value           // string.isRequired: day name
/>
```
<a name="components_DayListItem"></a>

### DayListItem

```js
<DayListItem
  name            // string.isRequired: day name
  setDay          // func.isRequired: onClick callback for <li>
  selected        // bool.isRequired: if the day is selected
  spots           // number.isRequired: interview spots available for the day
/>
```
<a name="components_InterviewerList"></a>

### InterviewerList

```js
<InterviewerList
  interviewers    // array.isRequired: list of interviewers
  onChange        // func.isRequired: id of currently interviewer
  value           // number: callback passed to <InterviewerListItem>
/>
```
<a name="components_InterviewerListItem"></a>

### InterviewerListItem

```js
<InterviewerListItem
  avatar          // string: interviewer image url
  id              // number.isRequired: interviewer id
  name            // string.isRequired: name of interviewer 
  selected        // bool.isRequired: if the interviewer is selected
  setInterviewer  // func.isRequired: onClick callback for interviewer <img>
/>
```
<a name="components__Appointment"></a>

### Appointment

```js
<Appointment
  bookInterview   // func: updates an appointment with a new interview
  cancelInterview // func: cancels an interview
  id              // number: the appointment id
  interview       // object: interview information
  interviewers    // array: list of available interviewers
  time            // string: the appointment time from state
/>
```
<a name="components__Appointment_Confirm"></a>

### Appointment ⇒ Confirm

```js
<Confirm
  message         // string: message to display to user
  onConfirm       // func: onClick callback for confirm <Button>
  onCancel        // func: onClick callback for cancel <Button> 
/>
```
<a name="components__Appointment_Empty"></a>

### Appointment ⇒ Empty

```js
<Empty
  onAdd           // func.isRequired: onClick callback for <img>
/>
```
<a name="components__Appointment_Error"></a>

### Appointment ⇒ Error

```js
<Error
  message         // string.isRequired: error message to display
	onClose         // func.isRequired: onClick callback for <img>
/>
```
<a name="components__Appointment_Form"></a>

### Appointment ⇒ Form

```js
<Form
  interviewer     // number: id of the interviewer in this appointment
  interviewers    // array.isRequired: list of available interviewers
  onCancel        // func.isRequired: onClick callback for cancel <Button>
  onSave          // func.isRequired: onClick callback for save <Button>
  student         // string: name of the student
/>
```
<a name="components__Appointment_Header"></a>

### Appointment ⇒ Header

```js
<Header
  time            // string.isRequired: the appointment time
/>
```
<a name="components__Appointment_Show"></a>

### Appointment ⇒ Show

```js
<Show
  interviewer     // string.isRequired: name of the interviewer
  onDelete        // func.isRequired: onClick callback for delete <img>
  onEdit          // func.isRequired: onClick callback for edit <img>
  student         // string.isRequired: name of the student
/>
```

