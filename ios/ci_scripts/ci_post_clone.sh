#!/bin/sh

echo "Xcode version:"
xcodebuild -version
echo "Brew version:"
brew --version
echo "PATH:"
echo $PATH

# Install CocoaPods and npm using Homebrew.
echo "Install CocoaPods"
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
echo "Install npm"
brew install npm
echo "Install gettext for envsubst command"
brew reinstall gettext

echo "Pod version:"
pod --version
echo "Node version:"
node --version
echo "NPM version:"
npm --version
echo "PATH:"
echo $PATH

# Setting Environment Variables
cd ../..
envsubst < .env.deploy > .env.staging
cp .env.staging .env

# Install dependencies
echo "Running npm install"
npm install
echo "Running pod install"
cd ios
pod install
