'use strict';
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const sign = crypto.createSign('RSA-SHA256');
const base64url = require('base64url');

// Replace All
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

// Base64 converter
var signature = "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ=";
console.log("Signature: " + signature);
var result = base64url.fromBase64(signature);
console.log("Base64 Conveted: " + result);

console.log(" ");

// JWT Example

var jwtHash = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkNDOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3Ovtd1Ghyo4IbqKKSy6J9mTniYJPenn5HIirE";
var jwtParts = jwtHash.split('.');
var jwtNoSig = jwtParts[0] + '.' + jwtParts[1];
var jwtSig   = jwtParts[2];

console.log("Just the token, no hash: " + jwtNoSig);
console.log("The original hash:  " + jwtSig);

sign.write(jwtNoSig);
sign.end();

var privateKey = fs.readFileSync('./private.key');

var signature = sign.sign(privateKey, 'base64');
signature = signature.replaceAll("+","");
signature = signature.replaceAll("/","_");

console.log("Computed Signature: " + signature);

var match = signature.includes(jwtSig);

console.log("Match: " + match);

process.exitCode = 1;