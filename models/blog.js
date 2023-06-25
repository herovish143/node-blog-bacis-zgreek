const mongoose = require("mongoose");

const blogSchema = require("./Schemas/blog.schema");

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
