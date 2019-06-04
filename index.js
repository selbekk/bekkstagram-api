import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import defaultRoutes from "./routes/defaultRoutes";
import commentRoutes from "./routes/commentRoutes";
import mediaRoutes from "./routes/mediaRoutes";

const app = express();
const port = process.env.PORT || 8080;
const options = {
  swaggerDefinition: {
    info: {
      title: "Bekkstagram API",
      version: "1.0.0",
      description: "Test Express API with autogenerated swagger doc"
    },
    basePath: "/api"
  },
  apis: ["./routes/*.js"]
};
const swaggerSpec = swaggerJsdoc(options);

mongoose.connect(
  "mongodb://admin:bekkstagram4ever@ds129536.mlab.com:29536/heroku_5vb136zc",
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Application-Level Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Routes
app.use("/api", defaultRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/media", mediaRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, function() {
  console.log("Running bekstagram-api on port " + port);
});
