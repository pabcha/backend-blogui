const SHA256 = require('crypto-js/sha256');

exports.hash = function(string) {
  const APP_SECRET = process.env.APP_SECRET;
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
}