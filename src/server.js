require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

//Import express
const express = require("express");

//Import routes
const routes = require("./routes");

migrationsRun();

//Initialize express and turn into json
const app = express();
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
   if (error instanceof AppError) {
      return res.status(error.statusCode).json({
         status: "error",
         message: error.message,
      });
   }

   console.error(error);

   return res.status(500).json({
      status: "error",
      message: "Internal server error",
   });
});

//What port should we listen on
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
