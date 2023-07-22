import express from "express";
import { currentUser } from "@sajal-micro-tickets/common";


const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
    console.log("current user route")
    res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter };