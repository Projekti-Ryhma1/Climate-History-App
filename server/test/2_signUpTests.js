const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const URL = 'http://localhost:3001'

const username = 'testUser9';
const password = '1234';
const cryptedPassword = bcrypt.hashSync(password, 10);
const email = username+'@'+username;

describe('User API Tests', function () {

    describe('POST /signUp', function () { // Create new user

        it('should create new user: ' + username, function (done) {
            chai.request(URL)
                .post('/signup')
                .send({
                    username: username,
                    password: cryptedPassword,
                    email: email,
                    selectedPreference: '1',
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();

                })
        });
    });

    describe('POST /login', function () { // User login

        it('should return user ' + username, function (done) {
            chai.request(URL)
                .post('/login')
                .send({
                    username: username,
                    password: password,
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();

                })
        })
    })

    describe('DEL /deleteuser', function () { // Delete user

        it('should delete user: ' + username, function (done) {
            chai.request(URL)
                .del('/deleteuser')
                .send({
                    username: username
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();

                })
        });
    });

});