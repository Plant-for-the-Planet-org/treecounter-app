# TreeCounter-app

## Directory Structure
`ios` houses the iOS project files, `web` houses the web configuration, assets and index.html, and `android` contains Android project files.The `app` contains the react code base for all platform  i.e components, reducers, containers etc.

`index.web.js` is the entry point of web platform build, `index.js` is the entry point of both iOS and android platform build process.

## Web Setup
Run following commands
```bash
npm install
npm start
```

## iOS Setup

- Install xcode greater then 9.0.
- Run following commands
+ ```bash
  brew install node
  brew install watchman
  npm install -g react-native-cli
  npm install
  ```
### Running into ios simulator
```bash
react-native run-ios
```

## Android Setup
