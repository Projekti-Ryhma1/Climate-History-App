const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const URL = 'http://localhost:3001'

const username = 'example';
const password = 'example';

describe('User login API Tests', function() {

before(function() { //Starts the server
server.start();
})

after(function() { //Stops the server
    server.close();
});


describe('POST /login', function() { // User login
            // send http request
            
    it('should return user '+username, function(done) {
        chai.request(URL)
        .post('/login')
        .send({
            username: username,
            password: password,
        })
        .end(function(err,res) {
            expect(err).to.be.null;
            // check response status
            expect(res).to.have.status(200);
            done();
            // check response data structure
        })
    })
})
});

