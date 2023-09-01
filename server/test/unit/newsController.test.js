const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const jwt = require("jsonwebtoken");

chai.use(chaiHttp);
const app = require("../../server");

describe("Fetching News Catalog", () => {
  it("should fetch news catalog without authentication", (done) => {
    chai
      .request(app)
      .get("/api/articles/home")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should fetch news catalog with valid authentication", (done) => {
    const payload = {
      userId: "64f1a46f6d0752884b953338",
      email: "test@example.com",
      isOwner: false,
    };

    const validToken = jwt.sign(payload, "secret", { expiresIn: "1h" });
    const token = validToken;
    chai
      .request(app)
      .get("/api/articles/home")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should fetch limited news catalog with expired authentication", (done) => {
    const payload = {
      userId: "64f1a46f6d0752884b953338",
      email: "test@example.com",
      isOwner: false,
    };

    const expiredToken = jwt.sign(payload, "secret", { expiresIn: "1s" });
    const token = expiredToken;

    chai
      .request(app)
      .get("/api/articles/home")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").with.lengthOf.at.most(3);
        done();
      });
  });
});
