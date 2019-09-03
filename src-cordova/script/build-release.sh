#!/usr/bin/env bash
cd ../..
npm run build-pro-app
cd src-cordova || exit
rm -rf platforms
rm -rf plugins
cordova prepare
cordova build android --release --buildConfig=build/build.json
