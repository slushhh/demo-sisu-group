# SISU GROUP

### Test assignment for the role of Front-end developer in SISU GROUP company

### Company [LinkedIn](https://www.linkedin.com/company/thesisugroup)

**Line of business:** iGaming startup. From the founders of well-known European iGaming platforms Coolbet, NordicBet and Triobet.

## To run

```
npm i
npm run dev
```

## Tech assignment specifications

Please create React app that has functionality like

* Possibility to log in or create a new user. For simplicity do it like this that login and registration is same view/modal. In this view/modal you would ask from user email and password. When there is not user with this email you would create new user and logged it in, but when there is this user with this email validate password when not matching password then do not let user in and show error.
* Possibility to log out user.
* View where is displayed user first name, last name, gender, user created date and
phone number.
* Possibility to update user first name, last name, gender and phone number.
* Possibility to see logs about user field changes. There we can see what was fields value
before, after and date when update was made.

## Technical requirements

* App should be created using React and written in TypeScript.
* **Do not use** any component library like `MUI` or CSS framework like `Boostrap`. You should
make your own reusable components what you need to create this app.
* Use some global state solution and you can use any framework for it (jotai, redux etc).
* Use local-storage to save all the data.
* App should have routing and you can use any framework for it.

## Details of implementation

- Registering, logging in, logging out of the account
- The data structure in `localStorage` supports multiple users
- Account registration check. Cannot create a user with an existing email address
- View user information, the route is protected and the page is accessible only to the logged in user
- Changes to user data are logged and saved. The user can view them
- Display required notifications in response to user actions
- Used lazy page loading to improve performance and reduce the size of the final bundle
- Emulation of server communication with random response delay
- Component libraries are not used. Animations are implemented using keyframes
- In the `ui` subfolder self-contained components that can be used in your own component library
- All components contain styles within them (in the style of Vue components), as an experiment in stylization in this way. No separate style files (syntax highlighting requires a corresponding plugin)