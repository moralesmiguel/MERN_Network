let expect = require('chai').expect;
let request = require('request');

describe('Status and content', function() {
  describe ('Users page', function() {
    it('status', function(done){
      request('http://localhost:8080/users', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe ('Posts page', function() {
    it('status', function(done){
      request('http://localhost:8080/posts', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
