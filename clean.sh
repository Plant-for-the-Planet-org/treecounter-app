echo 'removing npm, metro and react cache'
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
watchman watch-del-all
npm cache verify

echo 'removing Xcode derived data'
rm -rf ~/Library/Developer/Xcode/DerivedData
​
echo 'removing iOS pods'
cd ios
pod deintegrate
pod cache clean --all
cd ..
​rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ios/build

echo 'removing Android cache'
cd android
./gradlew cleanBuildCache
cd ..

echo 'removing node modules'
rm -rf node_modules
rm -rf package-lock.json
​
# DO THIS IF YOU REALLY NEED
# echo 'cocoapods install'
# gem install cocoapods
​
# DO THIS IF YOU REALLY NEED
# echo 'brew'
# brew update && brew upgrade
​
echo 'installing node modules'
# watch out 13.3.0 of node does not work, use 12.13.1 LTS!
npm i
​
echo 'installing pods'
cd ios
pod update
pod install
cd ..
​
echo 'now run: react-native run-android'
echo 'now run: react-native run-ios'
