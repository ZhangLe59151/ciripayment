#!/usr/bin/env bash
cd ../..
npm run build
cd src-cordova || exit
rm -rf platforms
rm -rf plugins
cp build/debug/google-services.json .
sed -i '' 's/{{app_id}}/ai.silot.taokae.test/g' config.xml
cordova prepare
cordova build android
git checkout .
rm google-services.json
