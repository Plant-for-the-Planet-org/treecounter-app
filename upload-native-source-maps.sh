#/bin/bash

# Load env vars
source ./defaults.env
if test -f "./.env"; then
  source ./.env
fi

if [[ -z "$BUGSNAG_API_KEY" ]]; then
  echo "env var BUGSNAG_API_KEY is required"
  exit 1
fi

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

curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
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

curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F codeBundleId="$PACKAGE_VERSION" \
   -F dev=false \
   -F platform=ios \
   -F sourceMap=@ios-release.bundle.map \
   -F bundle=@ios-release.bundle \
   -F projectRoot=`pwd`

rm ios-release.bundle ios-release.bundle.map
