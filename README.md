SampleCalc
=====================
SampleCalc is my university project. It can calculate entropy of text, frequency, quantity of chars and etc.
### Dependencies for building
Install these packages via npm.
For Linux-based OS:
```
npm install electron --save-dev && sudo npm install electron-packager --save-dev -g --allow-root --unsafe-perm=true
```
For Windows:
```
npm install electron --save-dev
```
```
npm install electron-packager --save-dev -g
```
### Building
First of all you need clone this repo:
```
git clone https://github.com/Shtraikher/SampleCalc
```
Then change directory:
```
cd ./SampleCalc
```
And build it with electron-packager.
For Linux-based OS:
```
electron-packager ./ SampleCalc --platform=linux --arch=x64
```
Or for Windows:
```
electron-packager ./ SampleCalc --platform=win32 --arch=x64
```
***
***Created using Node.js and Electron***
