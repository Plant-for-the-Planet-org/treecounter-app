#/bin/bash

source .env.production
BUGSNAG_API_KEY=$bugsnagApiKey
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android-release.bundle \
    --sourcemap-output android-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$PACKAGE_VERSION" \
   -F codeBundleId="$PACKAGE_VERSION" \
   -F dev=false \
   -F platform=android \
   -F sourceMap=@android-release.bundle.map \
   -F bundle=@android-release.bundle \
   -F projectRoot=`pwd`

rm android-release.bundle android-release.bundle.map

react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$PACKAGE_VERSION" \
   -F codeBundleId="$PACKAGE_VERSION" \
   -F dev=false \
   -F platform=ios \
   -F sourceMap=@ios-release.bundle.map \
   -F bundle=@ios-release.bundle \
   -F projectRoot=`pwd`

rm ios-release.bundle ios-release.bundle.map
