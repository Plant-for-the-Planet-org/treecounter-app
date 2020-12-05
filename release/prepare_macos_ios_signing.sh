#!/bin/sh

echo "Preparing iOS build"

# Decrypt the files
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$PROVISIONING_PASSWORD" --output release/AppStoreCertificates.p12 release/AppStoreCertificates.p12.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$PROVISIONING_PASSWORD" --output release/d7eac000-9967-4d71-b570-0262a5c3fb21.mobileprovision release/d7eac000-9967-4d71-b570-0262a5c3fb21.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$PROVISIONING_PASSWORD" --output release/36898aad-d25b-4d4a-bc71-05faedd579f1.mobileprovision release/36898aad-d25b-4d4a-bc71-05faedd579f1.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$PROVISIONING_PASSWORD" --output release/4aedc09f-4a34-45f1-92f2-55d3bbb7ac89.mobileprovision release/4aedc09f-4a34-45f1-92f2-55d3bbb7ac89.mobileprovision.gpg

echo "Release folder:"
ls -l release/*

# Install the provisioning profiles
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
echo "List profiles"
ls ~/Library/MobileDevice/Provisioning\ Profiles/
echo "Move profiles"
cp release/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/
echo "List profiles"
ls ~/Library/MobileDevice/Provisioning\ Profiles/

security create-keychain -p "" build.keychain
security import release/AppStoreCertificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "$PROVISIONING_PASSWORD" -A
security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain
security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
security set-keychain-settings ~/Library/Keychains/build.keychain
security show-keychain-info ~/Library/Keychains/build.keychain
