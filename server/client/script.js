const API = "/api";   // ✅ FIXED (removed localhost)

// ✅ STORE USERS FOR NAME MAPPING
let usersList = [];

async function signup(){

  console.log("Signup clicked");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if(!name || !email || !password){
    alert("Fill all fields");
    return;
  }

  const res = await fetch(API + "/auth/signup",{   // ✅ FIXED
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name,email,password,role})
  });

  const data = await res.json();

  if(!res.ok){
    alert(data.message || "Signup failed");
    return;
  }

  alert("Signup success");
  window.location="login.html";   // ✅ FIXED
}


// ================= LOGIN =================
async function login(){

  const res = await fetch(API+"/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if(!res.ok){
    alert(data.message || "Invalid email or password");
    return;
  }

  localStorage.setItem("token",data.token);
  localStorage.setItem("role",data.role);
  localStorage.setItem("id",data.id);

  window.location="dashboard.html";
}


// ================= LOAD USERS =================
async function loadUsers(){
  const res = await fetch(API+"/auth/users");
  const users = await res.json();

  usersList = users;

  const select = document.getElementById("assignedTo");
  if(!select) return;

  select.innerHTML = `<option value="">Select User</option>`;

  users.forEach(u=>{
    const name = u.name || "User"+u.id;
    select.innerHTML += `<option value="${u.id}">${name}</option>`;
  });
}


// ================= LOAD PROJECTS =================
async function loadProjects(){
  const res = await fetch(API+"/projects",{
    headers:{ Authorization: localStorage.getItem("token") }
  });

  const projects = await res.json();

  const select = document.getElementById("projectId");
  if(!select) return;

  select.innerHTML = `<option value="">Select Project</option>`;

  projects.forEach(p=>{
    const name = p.name || "Project"+p.id;
    select.innerHTML += `<option value="${p.id}">${name}</option>`;
  });
}


// ================= CREATE PROJECT =================
async function createProject(){
  const name = document.getElementById("projectName").value;

  if(!name){
    alert("Enter project name");
    return;
  }

  await fetch(API+"/projects",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    },
    body: JSON.stringify({name})
  });

  alert("Project created");
  loadProjects();
}


// ================= CREATE TASK =================
async function createTask(){

  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("description").value;
  const projectId = document.getElementById("projectId").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const deadline = document.getElementById("deadline").value;

  if(!title || projectId === "" || !assignedTo || !deadline){
    alert("Fill all fields");
    return;
  }

  await fetch(API+"/tasks",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    },
    body: JSON.stringify({
      title,
      description,
      projectId: Number(projectId),
      assignedTo: Number(assignedTo),
      deadline
    })
  });

  alert("Task created");
  loadTasks();
}


// ================= LOAD TASKS =================
async function loadTasks(){

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  const res = await fetch(API+"/tasks",{
    headers:{ Authorization: localStorage.getItem("token") }
  });

  const data = await res.json();
  const today = new Date();

  const filtered = data.filter(t=>{
    if(role === "Admin") return true;
    return Number(t.assignedTo) === Number(userId);
  });

  let pending = 0, progress = 0, done = 0, overdue = 0;
  let userTasks = {};

  filtered.forEach(t=>{
    if(t.status === "Pending") pending++;
    if(t.status === "In Progress") progress++;
    if(t.status === "Completed") done++;

    if(new Date(t.deadline) < today && t.status !== "Completed"){
      overdue++;
    }

    userTasks[t.assignedTo] = (userTasks[t.assignedTo] || 0) + 1;
  });

  const statsDiv = document.getElementById("stats");

  if(statsDiv){
    statsDiv.innerHTML = `
      <h3>Dashboard Stats</h3>
      <p><b>Total Tasks:</b> ${filtered.length}</p>
      <p><b>Pending:</b> ${pending}</p>
      <p><b>In Progress:</b> ${progress}</p>
      <p><b>Completed:</b> ${done}</p>
      <p style="color:red;"><b>Overdue Tasks:</b> ${overdue}</p>

      <h4>Tasks per User</h4>
      ${Object.keys(userTasks).map(u=>{
        const user = usersList.find(user => user.id == u);
        const name = user ? user.name : "User " + u;
        return `<p>${name}: ${userTasks[u]}</p>`;
      }).join("")}
    `;
  }

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = filtered.map(t=>{

    const isOverdue =
      new Date(t.deadline) < today && t.status !== "Completed"
      ? "🔴 Overdue" : "";

    return `
      <li>
        <b>[${t.projectName || "No Project"}] ${t.title}</b> - ${t.status} ${isOverdue}
        <br>
        <small>${t.description || "No description"}</small>
        <br>
        <button onclick="updateStatus(${t.id},'Pending')">To Do</button>
        <button onclick="updateStatus(${t.id},'In Progress')">Start</button>
        <button onclick="updateStatus(${t.id},'Completed')">Done</button>
      </li>
    `;
  }).join("");
}


// ================= UPDATE STATUS =================
async function updateStatus(id,status){
  await fetch(API+"/tasks/"+id,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    },
    body: JSON.stringify({status})
  });

  loadTasks();
}


// ================= INIT =================
window.onload = ()=>{

  const role = localStorage.getItem("role");

  if(document.getElementById("roleDisplay")){
    document.getElementById("roleDisplay").innerHTML =
      "<b>Logged in as:</b> " + role;
  }

  const adminPanel = document.getElementById("adminPanel");
  const memberPanel = document.getElementById("memberPanel");

  if(role === "Admin"){
    if(memberPanel) memberPanel.style.display = "none";
  }

  if(role === "Member"){
    if(adminPanel) adminPanel.style.display = "none";
  }

  loadUsers();
  loadProjects();
  loadTasks();
};