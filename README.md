# TreeCounter-app

## Directory Structure

`ios` houses the iOS project files, `web` houses the web configuration, assets and index.html, and `android` contains Android project files.The `app` contains the react code base for all platform i.e components, reducers, containers etc.

`index.web.js` is the entry point of web platform build, `index.js` is the entry point of both iOS and android platform build process.

## Web Setup

Run following commands

```bash
npm install
npm start
```

## iOS Setup

* Install xcode greater then 9.0.
* Run following commands
  ```bash
  brew install node
  brew install watchman
  npm install -g react-native-cli
  npm install
  ```

### Running into ios simulator

* Uncomment first line in .babelrc.
To make it look something like this.

```
{
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

```bash
react-native run-ios
```

## Android Setup

Steps for setting up Dev Env for android on MAC is as follows:

* Install Latest Android Studio.
* From Android studio’s SDK Manager add SDK 23, 27 and Build tool Version 23.0.1
* Install JDK 8 if not already there and set JAVA_HOME specific to your JDK Version.
* Create .bash_profile if not already there and add following variables in it:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home
```
* Uncomment first line in .babelrc.
To make it look something like this.

```
{
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

After completion of these steps run following command in VSCode Terminal:

```bash
react-native run-android
```

## Versioning

*App Versioning Guide*

eg: Version M.F.B
V 1.1.10

M = Major Changes
F = Feature Addition
B = Critical Bug Fixes and Additions

Release candidate can have the target version number
V 1.1.`11` RC `1`

Beta and Alpha builds can also have target version number
V 1.1.`11` B `12`
V 1.1.`11` A `12` [increment per release]
