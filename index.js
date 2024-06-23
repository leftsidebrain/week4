const express = require("express");
const app = express();
const { Sequelize, QueryTypes, json } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");

app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    name: "data",
    secret: "rahasiabgtcui",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", home);
async function home(req, res) {
  const query = `SELECT * FROM "tb_projects"`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  console.log("🚀 ~ home ~ obj:", obj);

  res.render("index", { isLogin, user, data: obj });
}
app.get("/add-blog", viewblog);
function viewblog(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("add-blog", { isLogin, user });
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
  const { id, name, start } = req.body;
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
  const query = `DELETE FROM "tb_projects" WHERE id = '${id}'`;
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

app.get("/register", registerView);
function registerView(req, res) {
  res.render("register");
}

app.post("/register", register);
async function register(req, res) {
  const { name, email, password } = req.body;

  const query = `SELECT * FROM "users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  // if (obj[0].email === email) {
  //   req.flash("danger", "Register Failed: Email Already Use!");
  //   return res.redirect("/register");
  // }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash("danger", "Register Failed : Password failde to be encyptionsss!");
      return res.redirect("/register");
    }

    const query = `INSERT INTO "users"(name, email, password) VALUES ('${name}','${email}','${hash}')`;
    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Register Success!");
    res.redirect("/login");
  });
}

app.get("/login", loginView);
function loginView(req, res) {
  res.render("login");
}
app.post("/login", login);
async function login(req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM "users" WHERE "email" = '${email}'`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  if (!obj) {
    req.flash("login Fail");
  }
  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash("danger", "Server Error");
      return res.redirect("/login");
    }

    if (result == false) {
      req.flash("danger", "Password or Email Wrong");
      return res.redirect("/login");
    }

    req.flash("success", "login success");
    req.session.isLogin = true;
    req.session.user = {
      name: obj[0].name,
      email: obj[0].email,
    };
    res.redirect("/");
  });
}

app.get("/logout", logout);
function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
}

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
