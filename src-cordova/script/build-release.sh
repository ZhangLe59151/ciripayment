#!/usr/bin/env bash
cd ../..
npm run build-pro-app
cd src-cordova || exit
rm -rf platforms
rm -rf plugins
cp build/release/google-services.json .
sed -i '' 's/{{app_id}}/ai.silot.taokae/g' config.xml
cordova prepare
cordova build android --release --buildConfig=build/release/build.json
git checkout .
rm google-services.json
