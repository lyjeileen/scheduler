# Interview Scheduler

A React application that allows users to book and cancel interviews.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Go to [Scheduler-API](https://github.com/lyjeileen/scheduler-api), fork and clone the repository. Follow README.md to setup scheduler API.

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

## Running Cypress

```sh
npm run cypress
```

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- @storybook/react
- jest
- classnames


## Screenshots
- On the side bar, user can see how many spots are available for each day. On the main section, user can see the booked interviews and add/edit/delete an interview.
!["Main page"](https://github.com/lyjeileen/scheduler/blob/master/docs/application.png?raw=true)

- User can edit an interview.
!["Create/Edit an interview"](https://github.com/lyjeileen/scheduler/blob/master/docs/appointment-form.png?raw=true)

- User need to confirm in order to delete an interview.
!["Delete an interview"](https://github.com/lyjeileen/scheduler/blob/master/docs/confirm.png?raw=true)
