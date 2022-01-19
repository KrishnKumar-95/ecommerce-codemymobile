const express = require("express");
const path = require("path");
const hbs = require("hbs");

require("../src/db/connection")


const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE TO RECIEVE DATA AS JSON DOCUMENT
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TEMPLATE-ENGINE-PATH
const TemplateEnginePath = path.join(__dirname,"../../frontend/templates/views");
app.set("views",TemplateEnginePath);
app.set("view engine","hbs");

// STATIC FILES
const StaticFiles = path.join(__dirname,"../public");
app.use(express.static(StaticFiles));

// PARTIALS / COMPONENTS
const PartialsPath = path.join(__dirname,"../../frontend/templates/partials");
hbs.registerPartials(PartialsPath);

// ROUTES
const RoutesPath = path.join(__dirname,"../routes/routes")
app.use("/",require(RoutesPath));

app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})