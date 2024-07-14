const express = require("express");
const mockData = require("./MOCK_DATA.json");
const PORT = 8000;
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
//connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/reciBlogAppDB")
  .then(() => {
    console.log("Connected to reciBlogAppDB");
  })
  .catch((err) => console.log("Opps! you have some problem", err));
//define schema and start using mongoDB
const blogSchema = new mongoose.Schema(
  {
    blog_name: {
      type: String,
      required: true,
    },
    blog_code: {
      type: String,
    },
    content: {
      tyype: String,
    },
    email: {
      type: String,
      unique: true,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

// define model using above schema
const SingleBlog = mongoose.model("reciBlog", blogSchema);

//middleware or plugin
app.use(express.urlencoded({ extended: false }));
//Routes
app.get("/api/recipies", async (req, res) => {
  const listBlogs = await SingleBlog.find({});
  return res.status(200).json(listBlogs);
});

app.get("/recipies", async (req, res) => {
  res.setHeader("x-powered-by-custom", "Praj");
  const listBlogs = await SingleBlog.find({});

  const html = `
    <ul>
    ${listBlogs.map((rBlog) => `<li>${rBlog.blog_name}</li>`).join("")}
    </ul>    `;
  res.send(html);
});

app.post("/api/recipies", async (req, res) => {
  const body = req.body;
  if (!body || !body.blog_name) {
    return res.status(400).json({ msg: "Something is missing" });
  } else {
    const result = await SingleBlog.create({ ...body });
    return res.status(200).json(`You have added below entry:\n ${result}`);
  }
});
app
  .route("/api/recipies/:id")
  .get(async (req, res) => {
    /**
     * adding extra headers in response
     * in same way we can recive in req also
     * always add "x" at start in custome header as good practice
     */
    res.setHeader("x-powered-by-custom", "Praj");
    res.setHeader("wrong-powered-by-custom", "Praj"); // not good practice

    const blog = await SingleBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "User not found" });
    }
    //we can set status to reposne
    return res.status(202).json(blog);
  })

  .delete(async (req, res) => {
    await SingleBlog.findByIdAndDelete(req.params.id);

    return res.json({ status: `Removed ${req.params.id}` });
  })
  .patch(async (req, res) => {
    await SingleBlog.findByIdAndUpdate(req.params.id, {
      comments: "Updated in DB",
    });

    return res
      .status(200)
      .json({ status: `Updated element of id ${req.params.id}` });
  });
app.listen(PORT, () => console.log("Server started!!!!"));
