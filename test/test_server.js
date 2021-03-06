var request         = require("supertest");
var mongoose        = require("mongoose");
var winston         = require("winston");
var configDB        = require("../config/database.js");


describe("Server Testing", function() {

    var server;

    // before each request run the server
    beforeEach(function() {
        server = require("../server");
    });

    // after each request tear down the server
    beforeEach(function() {
        server.close();
    });

    it("responds to /", function testSlash(done) {
        request(server)
            .get("/")
            .expect(200, done);
    });

    it("404 everything else", function testPath(done) {
        request(server)
            .get("/foo/bar")
            .expect(200, done);
    });

});
