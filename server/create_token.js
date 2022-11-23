//const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const co = require('co');

function spawnTokenBuf() {
    return function(callback) {
        //crypto.randomBytes(64, callback);
        bcrypt.randomBytes(64,callback);
    };
}

co(function* () {
    console.log((yield spawnTokenBuf()).toString('base64'));
});