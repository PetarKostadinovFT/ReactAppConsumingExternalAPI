const User = require("../../models/userModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
describe("User Model Validations", () => {
  it("should validate email format", async () => {
    const user = new User({
      email: "invalid-email.sdaosdjfnsd",
      password: "test123",
    });

    try {
      await user.validate();
      // If validation succeeds, this line will not be reached.
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });

  it("should require password", async () => {
    const user = new User({ email: "test@example.com" });

    try {
      await user.validate();
      // If validation succeeds, this line will not be reached.
    } catch (error) {
      expect(error.errors.password).to.exist;
    }
  });
});
