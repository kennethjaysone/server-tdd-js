import {
  getDatabaseData,
  resetDatabase,
  setDatabaseData,
} from "./test-helpers";
import { expect } from "chai";
import { getUserByUsername } from "./db";

describe("getUserByUsername", () => {
  afterEach("reset the database", async () => {
    resetDatabase();
  });

  it("returns the correct username from the databse given a username", async () => {
    // Test cases

    //setup db
    const fakeData = [
      {
        id: "123",
        username: "abc",
        email: "abc@gmail.com",
      },
      {
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
    ];

    await setDatabaseData("users", fakeData);

    const actual = await getUserByUsername("abc");
    const finalDBstate = await getDatabaseData("users");

    const expected = {
      id: "123",
      username: "abc",
      email: "abc@gmail.com",
    };

    expect(actual).excludingEvery("_id").to.deep.equal(expected);
    expect(finalDBstate).excludingEvery("_id").to.deep.equal(fakeData);
  });

  it("returns null when a user is not found in the database", async () => {
    const user = [{ id: "999", username: "XYZ", email: "nobody@email.com" }];
    await setDatabaseData("users", user);

    const actual = await getUserByUsername("def");

    expect(actual).to.be.null;
  });
});
