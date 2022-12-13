const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const URL = 'http://localhost:3001'

const username = 'testUser9';
const password = bcrypt.hashSync(username, 10);
const email = username+'@'+username;

describe('User login API Tests', function() {

before(function() { //Starts the server
server.start();
})

after(function() { //Stops the server
    server.close();
});


describe('POST /signUp', function() { // User login
            // send http request
            
    it('should create new user: '+username, function(done) {
        chai.request(URL)
        .post('/signup')
        .send({
            username: username,
            password: password,
            email: email,
            selectedPreference: '1',
        })
        .end(function(err,res) {
            expect(err).to.be.null;
            // check response status
            expect(res).to.have.status(200);
            done();
            // check response data structure
        })
    });
})



describe('GET /deleteuser', function() { // User login
    // send http request
const delRoute = URL+'/deleteuser/'+username;
it('should delete user: '+username, function(done) {
chai.request(URL)
.del('/deleteuser/'+username)
.end(function(err,res) {
    console.log(delRoute);
    expect(err).to.be.null;
    // check response status
    expect(res).to.have.status(200);
    done();
    // check response data structure
})
});
});

});