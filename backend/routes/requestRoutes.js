const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createRequest, getOpenRequests, acceptRequest } = require("../controllers/requestController");

// POST /api/requests
router.post("/", auth, createRequest);

// GET /api/requests/open
router.get("/open", auth, getOpenRequests);

// PUT /api/requests/accept/:id
router.put("/accept/:id", auth, acceptRequest);

module.exports = router;
