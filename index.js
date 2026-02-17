import express from "express";

const PORT = 4000;
const server = express();

server.get("/", (req, res) => {
  res.json({ message: "Hello from my app" });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
