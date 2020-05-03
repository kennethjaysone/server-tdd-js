import { expect } from "chai";
import request from "supertest";
import db, { getUserByUsername } from "./db";
import sinon from "sinon";
import app from "./server";
import { setDatabaseData } from "./test-helpers";

describe("GET - /get/users/user", () => {
  it("returns the correct response when the user with the correct username is found", async () => {
    const fakeData = {
      id: "123",
      username: "abc",
      email: "abc@gmail.com",
    };

    const stub = sinon.stub(db, "getUserByUsername").resolves(fakeData);

    await request(app)
      .get("/users/abc")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(fakeData);

    expect(stub.getCall(0).args[0]).to.equal("abc");
    stub.restore();
  });

  it("sends the correct response when there is an error", async () => {
    const fakeError = { message: "Something went wrong!" };
    const stub = sinon.stub(db, "getUserByUsername").throws(fakeError);

    await request(app)
      .get("/users/abc")
      .expect(500)
      .expect("Content-Type", /json/)
      .expect(fakeError);

    stub.restore();
  });

  it("returns an appropriate response when there is no user with the username", async () => {
    const stub = sinon.stub(db, "getUserByUsername").resolves(null);

    await request(app).get("/users/def").expect(404);

    stub.restore();
  });
});
