const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const URL = 'http://localhost:3001'

describe('Climatedata API Tests', function () {

    /*
    before(function() { //Starts the server
    server.start();
    })
    after(function() { //Stops the server
        server.close();
    });*/


    describe('GET /data/global_monthly', function () {
        // send http request
        it('should return global_monthly data', function (done) {
            chai.request(URL)
                .get('/data/global_monthly')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    // check response status
                    expect(res).to.have.status(200);
                    done();
                    // check response data structure
                })
        })
    })
});