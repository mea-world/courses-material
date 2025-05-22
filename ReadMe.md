To start the project, you need to have Node.js installed.

1. Clone the repository
2. Run `cd todo-strapi-app`
3. Run `yarn` to install the dependencies
4. Run `yarn dev` to start the development server
5. Open the browser and go to `http://localhost:1337`
6. Open another terminal and run `cd ../react-router-app`
7. Run `yarn` to install the dependencies
8. Run `yarn dev` to start the development server
9. Open the browser and go to `http://localhost:5173`
10. Register a new user with email and password in the strapi admin panel and login.
11. Visit the `http://localhost:1337/admin/settings/api-tokens/2`to retrieve the _full access token_ to use in the react-router-app.
