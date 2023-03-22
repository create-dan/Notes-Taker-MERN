const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const notes = require("./data/notes");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddlewares");

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

// app.get("/api/notes", (req, res) => {
//   res.send(notes);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// app.get("/api/notes/:id", (req, res) => {
//   res.send(notes.find((note) => note._id == req.params.id));
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is listening on port ${PORT}`));
