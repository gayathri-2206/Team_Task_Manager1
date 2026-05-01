const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Create Project (Admin only)
router.post("/", auth, role("Admin"), (req,res)=>{
  db.query(
    "INSERT INTO projects (name,createdBy) VALUES (?,?)",
    [req.body.name, req.user.id],
    (err,result)=>{
      if(err) return res.status(400).json(err);
      res.json(result);
    }
  );
});

// Get Projects
router.get("/", auth, (req,res)=>{
  db.query("SELECT * FROM projects",(err,result)=>{
    res.json(result);
  });
});

module.exports = router;