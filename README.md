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

### Button

```javascript
<Button
  confirm   // bool: when true, will apply class "button--confirm"
  danger    // bool: when true, will apply class "button--danger"
  disabled  // bool: when true, applies attribute "disabled"
  onClick   // func.isRequired: callback to execute when button is clicked
/>
```

### DayList

```javascript
<DayList
  days      // array.isRequired: state.days by reference
  onChange  // func.isRequired: callback to execute when a day is clicked
  value     // string.isRequired: state.day value
/>
```
