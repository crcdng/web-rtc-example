# Local WebRTC example

A minimal WebRTC implementation for local installations
by [@crcdng](https://twitter.com/crcdng)

1. Create a self-signed SSL certificate (see for example https://devcenter.heroku.com/articles/ssl-certificate-self), put the keys into the `ssl` folder. Check the path and filenames in `server\server.js`.
2. Run `npm install`, then `node server.js` in the server directory
3. Connect 2 clients to `https:<your-local-ip>/8080`, get past the warnings

Tested with Chrome 61 / Mac and Chrome 61 / Android.

## What this does

Currently all public WebRTC examples that I am aware of, including Googles' own codelab, are broken in Chrome over HTTP. This is because some time ago, Google removed the capability to access audio/video (`navigator.mediaDevices.getUserMedia()`) "from insecure origins". This creates a problem especially when you want to stream in a LAN installation setting, and your DNS expert person that would wrestle a public HTTPS certificate into your local machine is on holidays. Mine is (permanently).   

This example shows how to run WebRTC locally over HTTPS with self-signed certificates.

## TODO

Lots. At the moment the server needs to be restarted when clients log on and off.
Clean up the code. Check if it runs without the fallback stun/turn servers. And there is this CSS filter you might want to remove / play with.

uses
http://materializecss.com/

https://github.com/webrtc/adapter

and code from
https://codelabs.developers.google.com/codelabs/webrtc-web/#7
