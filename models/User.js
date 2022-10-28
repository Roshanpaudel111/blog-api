const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);
UsersSchema.post("findOneAndDelete", async function (document) {
  if (document) {
    await Review.deleteMany({ _id: { $in: document.posts } });
  }
});

module.exports = mongoose.model("User", UsersSchema);
