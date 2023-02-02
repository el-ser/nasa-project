const { Schema, model } = require("mongoose");

const planetsSchema = new Schema({
  keplerName: {
    type: String,
    require: true,
  },
});

module.exports = model("Planet", planetsSchema);
