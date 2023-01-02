# Online Exam System - FE


npm install http-server -g

http-server

If you're using NPM 5.2.0 or newer, you can use http-server without installing it with npx. This isn't recommended for use in production but is a great way to quickly get a server running on localhost.

$ npx http-server
Or, you can try this, which opens your web browser and enables CORS requests:

$ http-server -o --cors

Light Server: An Auto Refreshing Alternative

A nice alternative to http-server is light-server. It supports file watching and auto-refreshing and many other features.

$ npm install -g light-server 
$ light-server
Add to your directory context menu in Windows Explorer

 reg.exe add HKCR\Directory\shell\LightServer\command /ve /t REG_EXPAND_SZ /f /d "\"C:\nodejs\light-server.cmd\" \"-o\" \"-s\" \"%V\""
