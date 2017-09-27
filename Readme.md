# WebRTC Swap Streams example

A minimal WebRTC implementation for local installations
by [@crcdng](https://twitter.com/crcdng)

1. create a self-signed SSL certificate (see for example https://devcenter.heroku.com/articles/ssl-certificate-self), put the keys into the folder `ssl`. Check that you got the correct filenames in `server\server.js`.
2. run `npm install`, then `node server.js` in the server directory
3. connect 2 clients to `https:<your-local-ip>/8080`, get past the warnings

## TODO
lots. at the moment the server needs to be restarted when clients log on and off.
clean up the code. 

uses
http://materializecss.com/

and code from
https://codelabs.developers.google.com/codelabs/webrtc-web/#7
