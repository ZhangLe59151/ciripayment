#!/usr/bin/env bash
cd ..
rm -rf platforms
rm -rf plugins
cordova prepare
cordova build android --release --buildConfig=build/build.json
