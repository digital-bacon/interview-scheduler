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

```js
<Button
  confirm   // bool: when true, use class "button--confirm"
  danger    // bool: when true, use class "button--danger"
  disabled  // bool: when true, applies attribute "disabled"
  onClick   // func.isRequired: callback to execute when button is clicked
/>
```

### DayList

```js
<DayList
  days      // array.isRequired: state.days by reference
  onChange  // func.isRequired: callback to execute when a day is clicked
  value     // string.isRequired: state.day value
/>
```

### DayListItem

```js
<DayListItem
  name      // string.isRequired: state.days by reference
  setDay    // func.isRequired: callback to execute when a day is clicked
  selected  // bool.isRequired: if true, use class "day-list__item--selected"
  spots     // number.isRequired: total interview spots available for the day
/>
```
