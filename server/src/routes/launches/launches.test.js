const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    const endpoint = "/v1/launches";

    it("It should respond with 200 success", async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 27, 2027",
    };

    const launchWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler 101",
      launchDate: "what",
    };

    const launchWithInvalidTarget = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 x",
      launchDate: "January 27, 2027",
    };

    const endpoint = "/v1/launches";

    it("It should respond with 201 created", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject({
        ...launchWithoutDate,
      });
    });
    it("It should catch missing required properties", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(launchWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    it("It should catch invalid dates", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
