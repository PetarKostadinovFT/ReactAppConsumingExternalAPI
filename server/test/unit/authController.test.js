const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const app = require("../../server");

let appServer = "";
before(function (done) {
  let port = 6000;
  appServer = app.listen(port, () => console.log(`Listening at port ${port}`));
  done();
});

describe("User Registration", () => {
  it("should register a new user", (done) => {
    chai
      .request(app)
      .post("/api/users/register")
      .send({ email: "test@example.cos", password: "test123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("email", "test@example.cos");
        done();
      });
  });

  it("should return an error when registering an existing email", (done) => {
    chai
      .request(app)
      .post("/api/users/register")
      .send({ email: "test@example.com", password: "test123" })
      .end((err, res) => {
        expect(res.body).to.have.property("error", "Email is taken already!");
        done();
      });
  });
});

describe("User Login", () => {
  it("should log in an existing user", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "test123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("email", "test@example.com");
        expect(res).to.have.cookie("token");
        done();
      });
  });
});

describe("User Logout", () => {
  it("should clear user token cookie on logout", (done) => {
    chai
      .request(app)
      .get("/api/users/logout")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Logged out successfully");
        expect(res).to.not.have.cookie("token");
        done();
      });
  });
});

after(function (done) {
  appServer.close(function () {
    done();
  });
});
