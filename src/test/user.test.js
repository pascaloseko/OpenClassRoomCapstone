const expect = require("chai").expect;
import request from 'supertest';
import app from '../index';

describe("POST /", () => {
    it("should return user when the all request body is valid", async (done) => {
        const res = await request(app)
            .post("/user")
            .send({
                firstName: "Test8",
                lastName: "Test",
                email: "test14@mail.com",
                password: "test",
                gender: "Male",
                jobRole: "Web Dev",
                department: "IT",
                address: "Nairobi 5654",
                userType: "admin"
            });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("user");
            done();
    });
});