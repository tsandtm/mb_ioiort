# mb_ioiort
Install the latest version of the ionic cli
>npm install ionic@latest cordova -g

clone master branch

get all library
>npm install

Update the project’s package.json file’s script section to look like this:
>"scripts" : {
"ionic:build": "ionic-app-scripts build",
"ionic:serve": "ionic-app-scripts serve"
}

run app
>ionic serve

Trường hợp bị lỗi. Vào thư mục C:\Users\[user login computer]\AppData\Roaming\npm\node_modules. Xoá các module liên quan rồi install lại
