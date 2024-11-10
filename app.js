const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
require("./src/libs/hbs-helper");
const config = require("./config/config");
const {Sequelize, QueryTypes} = require("sequelize");

const bcrypt = require ("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middlewares/upload-file");

require("dotenv").config()
  const environment = process.env.NODE_ENV

const sequelize = new Sequelize(config[environment]);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"))
app.use("/assets", express.static(path.join(__dirname, "./src/assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
name: "my-session",
secret: "sangatrahasia",
resave: false,
saveUninitialized: true,
cookie: {
  secure : false,
  maxAge : 1000 * 60 * 60 * 24, 
},
}));
app.use(flash());
// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);


// LOGIN
app.get("/login", login);
app.post("/login", loginPost);
app.post("/logout", logoutPost);
// REGISTER
app.get("/register", register);
app.post("/register", registerPost);
// BLOG
app.get("/project", project);
app.post("/project", upload.single("image"), projectPost);
app.post("/delete-project/:id", projectDelete);
app.get("/edit-project/:id", editProject);
app.post("/edit-project/:id", editProjectPost);

app.get("/project-detail/:id", projectDetail);


async function home(req, res) {
  const user = req.session.user;


  const query = `SELECT projects.*, users.name AS author FROM projects LEFT JOIN users ON projects.author_id = users.id`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });


  res.render("index", { user, projects });
}


function contact(req, res) {
  res.render("contact");
 
}
async function projectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM projects WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log('Project Image Path:', project[0].image); // Log image path yang disimpan

  project[0].author = "Veni Vansurya";
  res.render("project-detail", { project: project[0] });
}



function testimonial(req, res) {
  res.render("testimonial");
}

function login(req,res) {
  res.render("login");
}
async function loginPost(req,res) {
  const {email, password} = req.body;



const query = `SELECT *  FROM users WHERE email='${email}'`;
const user = await  sequelize.query(query, {type: QueryTypes.SELECT});

if(!user.length) {
req.flash("error", "Email / Password Salah");
return res.redirect("/login")
}


const isVerifiedPassword = await bcrypt.compare(password, user[0].password)

if(!isVerifiedPassword) {
  req.flash("error", "Email / Password Salah");
  return res.redirect("/login")
}


req.flash("success", "Berhail Login");
req.session.user = user[0]
res.redirect("/")
}

function logoutPost(req, res) {
req.session.destroy((err) => {
 if(err)return  console.error("Logout gagal!");

console.log("Logout Berhasil");

res.redirect("/login");
});
}


function register(req,res) {
  res.render("register");
}



async function registerPost(req,res) {
  const {name, email, password} = req.body
  const salt = 10;



  const hashedPassword = await bcrypt.hash(password, salt)

  const query = `INSERT INTO users(name, email, password) VALUES('${name}','${email}','${hashedPassword}')`
 await sequelize.query(query, {type: QueryTypes.INSERT})

 res.redirect("login")
}

async function project(req, res) {
  const query = `SELECT projects.*, users.name AS author FROM projects LEFT JOIN users ON projects.author_id = users.id`;
  let projects = await sequelize.query(query,{type : QueryTypes.SELECT})

const user = req.session.user




  res.render("project", {projects, user});
 

}
async function projectPost(req, res) {
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies,
    
  } = req.body;
  
  const {id} = req.session.user;
  const imagePath = req.file.filename;
  console.log("Saved file path:", imagePath);  // pastikan ini hanya nama file

  if (typeof technologies === 'string') {
    technologies = technologies.split(',').map(item => item.trim());
}
      const technologiesArray = `{${technologies.join(', ')}}`;
 
   
    const query = `INSERT INTO projects(
      project_name,
      start_date,
      end_date,
      description,
      technologies,
     image,
     author_id) VALUES('${projectName}','${startDate}','${endDate}','${description}','${technologiesArray}','${imagePath}','${id}')`

     const project = await sequelize.query(query, {type: QueryTypes.INSERT})

 res.redirect("/project");
}
  

async function projectDelete(req, res) {
const { id } = req.params;
const query = `DELETE FROM projects WHERE id=${id}`
await sequelize.query(query, {type: QueryTypes.DELETE})

res.redirect("/project")
}

async function editProject(req, res) {
  const user = req.session.user

  if(!user) {
return res.redirect("/login")
  }
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id=${id}`
const project = await sequelize.query(query, {type: QueryTypes.SELECT})
project[0].author = "Veni Vansurya";

  res.render("edit-project", { project: project[0] });
}


async function editProjectPost(req, res) {
  const { id } = req.params;
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies,

  } = req.body;
   
  if (typeof technologies === 'string') {
    technologies = technologies.split(', ').map(item => item.trim());
}
      const technologiesArray = `{${technologies.join(', ')}}`;
     
 
const query = `UPDATE projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}',description='${description}', technologies='${technologiesArray}' WHERE id=${id}`;
  await sequelize.query(query, {type:QueryTypes.UPDATE}) 
  
    res.redirect("/project")
  }



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
