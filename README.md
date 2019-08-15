# Plant-for-the-Planet App


## Directory Structure

`ios` houses the iOS project files, `web` houses the web configuration, assets and index.html, and `android` contains Android project files.The `app` contains the react code base for all platform i.e components, reducers, containers etc.

`index.web.js` is the entry point of web platform build, `index.js` is the entry point of both iOS and android platform build process.

## Configuration

Copy `app/config/index.js.dist` to `app/config/index.js`.

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

### Running into iOS simulator

Build and run the app in development mode deployed from Metro Bundler in an iOS simulator (starts Metro Bundler automatically if not already running, also starts iOS simulator):

```bash
react-native run-ios
```

If you have problems with a cached version of the bundle, you can stop the Metro Bundler and manually start it with the reset cache option:

```
react-native start --reset-cache
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

### Running into Android emulator

Build and run the app in development mode deployed from Metro Bundler (starts Metro Bundler automatically if not already running) on an emulator or device. You need to start an Android emulator or attach a device manually before:

```bash
react-native run-android
```

If you have problems with a cached version of the bundle, you can stop the Metro Bundler and manually start it with the reset cache option:

```
react-native start --reset-cache
```

## Development process

This project uses GitFlow (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) with Master-Branch `master` and Development-Branch `develop`. The Master-Branch will be automatically released by CircleCI to the production system. There are currently some more protected branches (`staging` with mockup data, `test` and `devel` with test data) also build by CircleCI automatically and mapped to test backends using the branch name as subdomain.

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


## License

Plant-for-the-Planet App is free software, and is released under the terms of the <abbr title="GNU General Public License">GPL</abbr> version 3 or (at your option) any later version. See <a href="license.txt">license.txt</a>.</p>

