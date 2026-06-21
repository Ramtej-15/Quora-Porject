const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
//create id
const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//to understand url data it is parseing(data from form)
app.use(express.urlencoded({ extended: true }));

//to access views dir in index.js file
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//to access public dir in index.js file
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "rama",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "king",
    content: "I love killing",
  },
  {
    id: uuidv4(),
    username: "jon",
    content: "I love s",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//create route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts"); //by default it send get  request
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//to upate a particular content to fully replace pull request is used
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

//delete route
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("listing");
});
