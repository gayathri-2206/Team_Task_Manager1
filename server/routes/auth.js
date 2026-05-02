const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", (req, res) => {

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, result) => {

      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // ✅ FIX: check result exists
      if (result && result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashed = password; // (or bcrypt if used)

      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
        [name, email, hashed, role],
        (err, result) => {

          if (err) {
            console.log("INSERT ERROR:", err);
            return res.status(500).json({ message: "Insert failed" });
          }

          res.json({ message: "Signup successful" });
        }
      );
    }
  );
});
// ================= GET ALL USERS =================
router.get("/users", (req, res) => {
  db.query("SELECT id, name FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Login
router.post("/login", (req,res)=>{
  const {email,password} = req.body;

  db.query("SELECT * FROM users WHERE email=?",[email],async (err,result)=>{
    if(result.length===0) return res.status(400).json("User not found");

    const user = result[0];
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign({id:user.id,role:user.role},"secret");
    res.json({token,role:user.role,id:user.id});
  });
});

module.exports = router;