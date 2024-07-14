const express = require("express");
const mockData = require("./MOCK_DATA.json");
const PORT = 8000;
const app = express();
const fs = require("fs");

//middleware or plugin
app.use(express.urlencoded({ extended: false }));
//Routes
app.get("/api/recipies", (req, res) => {
  return res.json(mockData);
});

app.get("/recipies", (req, res) => {
  res.setHeader("x-powered-by-custom", "Praj");
  const html = `
    <ul>
    ${mockData.map((rBlog) => `<li>${rBlog.blog_name}</li>`).join("")}
    </ul>    `;
  res.send(html);
});

app.post("/api/recipies", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body || !body.blog_name) {
    return res.status(400).json({ msg: "Something is missing" });
  }
  mockData.push({
    ...body,
    id: mockData.length + 1,
  });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), (err, data) => {
    return res.json({
      status: `added user ${mockData[mockData.length - 1].blog_name}`,
    });
  });
});
app
  .route("/api/recipies/:id")
  .get((req, res) => {
    /**
     * adding extra headers in response
     * in same way we can recive in req also
     * always add x at start in custome header as good practice
     */
    res.setHeader("x-powered-by-custom", "Praj");
    res.setHeader("wrong-powered-by-custom", "Praj"); // not good practice

    const ID = Number(req.params.id);
    const blog = mockData.find((b) => b.id === ID);
    if (!blog) {
      return res.status(404).json({ error: "User not found" });
    }
    //we can set status to reposne
    return res.status(202).json(blog);
  })

  .delete((req, res) => {
    const idTodelete = Number(req.params.id);
    const findIndexId = mockData.findIndex((a) => a.id === idTodelete);
    if (findIndexId > -1) {
      mockData.splice(findIndexId, 1);
    }
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), (err, data) => {
      return res.json({ status: `Removed ${idTodelete}` });
    });
  })
  .patch((req, res) => {
    const idTodelete = Number(req.params.id);
    const findIndexId = mockData.findIndex((a) => a.id === idTodelete);
    console.log("body ", req.body);
    mockData[findIndexId] = {
      ...mockData[findIndexId],
      ...req.body,
    };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), (err, adata) => {
      return res.json({ status: `Updated element of id ${findIndexId}` });
    });
  });
app.listen(PORT, () => console.log("Server started!!!!"));
