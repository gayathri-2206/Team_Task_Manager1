const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.headers["authorization"];
  if(!token) return res.status(401).json("Access denied");

  try{
    req.user = jwt.verify(token,"secret");
    next();
  }catch{
    res.status(400).json("Invalid token");
  }
};