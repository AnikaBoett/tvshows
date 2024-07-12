const mongoose = require("mongoose");
mongoose.connect(process.env.DBPASSWORD);

const tvshowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "TV Show must have a title"],
    },
    seasons: {
      type: Number,
      required: [true, "TV Show must have a number of seasons"],
    },
    genre: {
      type: String,
    },
  },
  { timestamps: true }
);

const TVShow = mongoose.model("tvshowSchema", tvshowSchema);
module.exports = { TVShow: TVShow };