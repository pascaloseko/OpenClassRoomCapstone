const expect = require("chai").expect;
import request from 'supertest';
import app from '../index';

function makeEmail() { 
    var strValues="abcdefg12345"; 
    var strEmail = ""; 
    var strTmp; 
    for (var i=0;i<10;i++) { 
    strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
    strEmail = strEmail + strTmp; 
    } 
    strTmp = ""; 
    strEmail = strEmail + "@"; 
    for (var j=0;j<8;j++) { 
    strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
    strEmail = strEmail + strTmp; 
    } 
    strEmail = strEmail + ".com" 
    return strEmail; 
 } 

describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
        const res = await request(app)
            .post("/user")
            .send({
                firstName: "Test8",
                lastName: "Test",
                email: makeEmail(),
                password: "test",
                gender: "Male",
                jobRole: "Web Dev",
                department: "IT",
                address: "Nairobi 5654",
                userType: "admin"
            });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("user");
    });
});

describe("POST /", () => {
    it("should return a sucess if user is authenticated with token", async () => {
        const res = await request(app)
            .post("/user/login")
            .send(
                {
                    email: "test@mail.com",
                    password: "test"
                }
            );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
    })
});