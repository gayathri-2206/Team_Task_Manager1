const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");

// ================= CREATE TASK =================
router.post("/", auth, (req,res)=>{
  const {title,description,projectId,assignedTo,deadline} = req.body;

  db.query(
    "INSERT INTO tasks (title,description,projectId,assignedTo,deadline) VALUES (?,?,?,?,?)",
    [title,description,projectId,assignedTo,deadline],
    (err,result)=>{
      if(err){
        console.log("TASK ERROR:", err);
        return res.status(400).json(err);
      }
      res.json(result);
    }
  );
});
// ================= GET TASKS =================
router.get("/", auth, (req,res)=>{
  db.query(
    `SELECT tasks.*, projects.name AS projectName
     FROM tasks
     LEFT JOIN projects ON tasks.projectId = projects.id`,
    (err,result)=>{
      if(err){
        console.log("FETCH ERROR:", err);
        return res.status(400).json(err);
      }
      res.json(result);
    }
  );
});

// ================= UPDATE STATUS =================
router.put("/:id", auth, (req,res)=>{
  db.query(
    "UPDATE tasks SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    (err,result)=>{
      if(err){
        console.log("UPDATE ERROR:", err);
        return res.status(400).json(err);
      }
      res.json(result);
    }
  );
});

module.exports = router;