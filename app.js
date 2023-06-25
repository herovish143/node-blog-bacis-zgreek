const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect("mongodb://0.0.0.0:27017/blogZgreek", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/blogs", (req, res) => {
  console.log(Blog);
  Blog.find({})
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/blogs/:blogTitle", (req, res) => {
  const blogTitle = req.params.blogTitle;

  Blog.find({ title: blogTitle })
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/blogs", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;

  const blog = new Blog({
    title: title,
    content: content,
  });

  blog
    .save()
    .then(() => {
      res.send("Blog created");
    })
    .catch((err) => {
      console.log("vis", err);
      res.send(err);
    });
});

app.delete("blogs", (req, res) => {
  const title = req.body.title;
  Blog.deleteOne({ title: title })
    .then((blog) => {
      res.send("blog deleted!");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
