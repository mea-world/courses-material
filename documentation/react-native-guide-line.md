# Expo Project Guideline

This guide provides the essential steps to start a React Native project using **Expo**, with a base template and integration of reusable components via `@react-native-reusables/cli`.

---

## Project Creation

To get started, run the command:

```bash
yarn create expo-app -t expo-template-blank-typescript
```

## Project Structure

The base template will create a structure like this:

```
my-app/
├── App.tsx
├── package.json
├── node_modules/
├── assets/
├── babel.config.js
└── app.json
```

---

## Adding Reusable Components

Use the dedicated CLI to generate ready-to-use components:

```bash
npx @react-native-reusables/cli@latest add ComponentName
```

Documentation: [rnr-docs.vercel.app/components/label](http://rnr-docs.vercel.app/components/label/)

This command:

- Creates a component following modern design system patterns
- Applies best practices for structure and naming

---

## Adding Libraries

To add a library compatible with Expo:

```bash
npx expo add library-name
```

This command checks compatibility with the Expo SDK and installs any required native dependencies.

> Alternatively, you can use `yarn add` or `npm install`, but **expo add** is preferred for supported libraries.

---

## Recommended Practices

- Keep components modular in `/components`
- Use `StyleSheet.create` for defining styles
- Test frequently on real devices using the **Expo Go** app
- Use `npx expo start --clear` to start the dev server and clear cache

---

## Testing

Expo supports testing with Jest:

```bash
yarn add --dev jest react-test-renderer
```

Add a script to `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

---

## Additional Resources

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Awesome React Native](https://github.com/jondot/awesome-react-native)

---

Happy coding! 🎉
