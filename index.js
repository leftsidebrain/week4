const express = require("express");
const app = express();
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
async function home(req, res) {
  const query = `SELECT * FROM "tb_projects"`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  res.render("index", { data: obj });
  console.log("🚀 ~ home ~ obj:", obj);
}

app.get("/add-blog", viewblog);
function viewblog(req, res) {
  res.render("add-blog");
}

// meminta data inputan dari add-blog
app.post("/add-blog", addContent);
async function addContent(req, res) {
  const { name, startDate, endDate, content, nodeJs, reactJs, nextJs, typescript, image } = req.body;
  const checkbox1Value = nodeJs === "on" ? "true" : "false";
  const checkbox2Value = reactJs === "on" ? "true" : "false";
  const checkbox3Value = nextJs === "on" ? "true" : "false";
  const checkbox4Value = typescript === "on" ? "true" : "false";

  const query = `INSERT INTO "tb_projects"(name, start_date, end_date, description, technologies, image) VALUES ('${name}','${startDate}','${endDate}','${content}','{"${checkbox1Value}","${checkbox2Value}","${checkbox3Value}","${checkbox4Value}"}','${image}')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });
  res.redirect("/add-blog");
}

// data blog detail

app.get("/blog-detail/:id", blogDetail);
async function blogDetail(req, res) {
  const { id } = req.params;
  // const detail = data[id];
  const query = `SELECT * FROM "tb_projects" WHERE "id" = ${id}`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  res.render("blog-detail", { data: obj[0] });
}

// Edit blog

app.get("/edit-blog/:id", editBlog);
async function editBlog(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM "tb_projects" WHERE "id" = ${id}`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  res.render("edit-blog", { data: obj[0] });
}

// update data edit blog

app.post("/edit-blog", updateBlog);
async function updateBlog(req, res) {
  const { id, title, content } = req.body;
  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");
  const query = `UPDATE "tb_projects" SET title='${title}',content='${content}',"createdAt"='${dateString}',"updatedAt"='${dateString}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/");
}

// delete blog conten

app.get("/delete/:id", deleteBlog);
async function deleteBlog(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM "tb_projects" WHERE id = ${id}`;
  await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
  res.redirect("/");
}
app.get("/contact", contact);
function contact(req, res) {
  res.render("contact");
}
app.get("/testimonial", testimonial);
function testimonial(req, res) {
  res.render("testimonial");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
