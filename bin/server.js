const app = require("../app");
<<<<<<< HEAD
const mongoDbConnect = require("../services/mongoDb");
=======
const mongoDbConnect = require("../services/mongoDB.js");
>>>>>>> master

const PORT = process.env.PORT || 3000;

mongoDbConnect
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server connection error. Error: ${error.message}`);
    process.exit(1);
  });
