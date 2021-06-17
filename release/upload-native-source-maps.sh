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

bugsnag-source-maps upload-react-native \
   --api-key "$BUGSNAG_API_KEY" \
   --app-version "$PACKAGE_VERSION" \
   --platform android \
   --source-map android-release.bundle.map \
   --bundle android-release.bundle

# also upload Android source maps for package version as code-bundle-id
bugsnag-source-maps upload-react-native \
   --api-key "$BUGSNAG_API_KEY" \
   --code-bundle-id "$PACKAGE_VERSION" \
   --platform android \
   --source-map android-release.bundle.map \
   --bundle android-release.bundle

rm android-release.bundle android-release.bundle.map

react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map

# Change app-bundle-version once we set it back to package version
#   --app-bundle-version "$PACKAGE_VERSION" \
# For now we have to set this manually here with every release :-(
bugsnag-source-maps upload-react-native \
   --api-key "$BUGSNAG_API_KEY" \
   --app-version "1.49.52" \
   --platform ios \
   --source-map ios-release.bundle.map \
   --bundle ios-release.bundle

# also upload iOS source maps for package version as code-bundle-id
bugsnag-source-maps upload-react-native \
   --api-key "$BUGSNAG_API_KEY" \
   --code-bundle-id "$PACKAGE_VERSION" \
   --platform ios \
   --source-map ios-release.bundle.map \
   --bundle ios-release.bundle

rm ios-release.bundle ios-release.bundle.map

# deprecated
# upload the dSYMs you can download from AppStore Connect
# curl --http1.1 https://upload.bugsnag.com/ \
#  -F apiKey="$BUGSNAG_API_KEY" \
#  -F dsym=@~/Downloads/appDsyms.zip \
#  -F projectRoot=`pwd`
