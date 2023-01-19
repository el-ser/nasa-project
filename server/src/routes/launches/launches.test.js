const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  it("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launch", () => {
  it("It should respond with 200 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler 101",
        launchDate: "January 27, 2027",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
  it("It should catch missing required properties", () => {});
  it("It should catch invalid dates", () => {});
});
