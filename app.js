const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
require("./src/libs/hbs-helper");
const config = require("./src/config/config.json")
const {Sequelize, QueryTypes} = require("sequelize")
const sequelize = new Sequelize(config.development)



app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"))
app.use("/assets", express.static(path.join(__dirname, "./src/assets")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.post('/your-api-endpoint', projectPost);


// BLOG
app.get("/project", project);
app.post("/project", projectPost);
app.post("/delete-project/:index", projectDelete);
app.get("/edit-project/:index", editProject);
app.post("/edit-blog/:index", editProjectPost);

app.get("/project-detail/:id", projectDetail);

const projects = [];
function home(req, res) {
  res.render("index");
}
function contact(req, res) {
  res.render("contact");
 
}
 async function projectDetail(req,res) {
 
  const { id } = req.params;

const query = `SELECT * FROM projects WHERE id = ${id}`;
const project = await sequelize.query(query, { type: QueryTypes.SELECT});

project[0].author = "Veni Vansurya";

  res.render("project-detail", { project: project[0]});
}


function testimonial(req, res) {
  res.render("testimonial");
}
async function project(req, res) {
  const query = `SELECT * FROM projects`
  let projects = await sequelize.query(query,{type : QueryTypes.SELECT})

projects = projects.map((project) => {
  return {
    ...project,
    author: "Veni Vansurya"
  }
})

  res.render("project", {projects})
 

}
async function projectPost(req, res) {
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;
  
  // Debugging: Cek input dari request body
  console.log('Request Body:', req.body);

  // Pastikan technologies adalah array
  if (!Array.isArray(technologies)) {
    return res.status(400).send("Technologies must be an array.");
  }

  // Mengonversi array technologies menjadi format PostgreSQL
  const technologiesArray = technologies; // Menggunakan array langsung

  try {
    // Menggunakan model Sequelize untuk membuat project baru
    const project = await projectPost({
      project_name: projectName,
      start_date: startDate,
      end_date: endDate,
      description: description,
      technologies: technologiesArray,
      image: 'https://cognizant.scene7.com/is/image/cognizant/decision-making-the-new-frontier-manufacturing-tl-1?fmt=png-alpha&wid=238&op_sharpen=1&dpr=on,2',
      author_id: '101'
    });

    res.redirect("/project");
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("An error occurred while creating the project.");
  }
}


function projectDelete(req, res) {
const { index } = req.params;
projects.splice(index, 1);
res.redirect("/project")
}

function editProject(req, res) {
  const { index } = req.params;

  const project = projects.find((_, idx) => idx == index);

  res.render("edit-project", { project, index });
}


function editProjectPost(req, res) {
  const { index } = req.params;

  const { projectName,
    startDate,
    endDate,
    description,
    nodejs,
    nextjs,
    reactjs,
    typescript, } = req.body;

    projects[index] = {
      projectName,
    startDate,
    endDate,
    description,
    nodejs,
    nextjs,
    reactjs,
    typescript,
    created_at : new Date(),
    author : "Veni Vansurya" 
    };
  
    res.redirect("/project")
  }



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
