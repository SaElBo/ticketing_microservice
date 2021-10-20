import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("it workds");
});

export { router as currentUserRouter };
