const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "CONECTION ERROR:")).once(
    "open",
    () => {
      console.log("Database connected");
    }
  );
};
