export APPIUM_VERSION=$(jq -r ".dependencies.appium" ./package.json)
npm i -g appium@$APPIUM_VERSION
npm i