#!/usr/bin/env bash

environment=$1
PACKAGE_NAME="com.qrcodereader"
PROJECT_ROOT=$(pwd)
ANDROID_DIR="${PROJECT_ROOT}/android"
ANDROID_RELEASES_DIR="${ANDROID_DIR}/app/build/outputs/apk/release"

BLUE='\033[1;34m'
NC='\033[0m' # No Color

# Uninstall previous APK
echo "Uninstalling ${PACKAGE_NAME}... apk from device"
adb shell pm uninstall ${PACKAGE_NAME}

cd "${ANDROID_DIR}" || exit

echo -e "${BLUE}Bundling app...${NC}"
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output app/src/main/assets/index.android.bundle

#  # This is to delete duplicates file that break the build
#  rm -rf app/src/main/res/drawable-xxxhdpi app/src/main/res/drawable-xxhdpi app/src/main/res/drawable-xhdpi app/src/main/res/drawable-mdpi app/src/main/res/drawable-hdpi

# Build the APK
echo -e "${BLUE}Will start building release apk...${NC}"
./gradlew clean assembleRelease

# Install apk on the device
echo -e "${BLUE}Installing release apk on device...${NC}"
adb install "${ANDROID_RELEASES_DIR}"/app-release.apk

cd "${PROJECT_ROOT}" || exit