

/* NAV SWITCH */
function show(id,el){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));
    document.getElementById(id).classList.add("active-section");

    document.querySelectorAll(".nav-links a").forEach(a=>a.classList.remove("active"));
    el.classList.add("active");
}

/* LOGOUT */
function logout(){
    localStorage.removeItem("role");
    window.location.href="login.html";
}

/* STATS */
function loadStats(){
let p=JSON.parse(localStorage.getItem("patients"))||[];
let a=JSON.parse(localStorage.getItem("appointments"))||[];
let m=JSON.parse(localStorage.getItem("pharmacy"))||[];
let t=JSON.parse(localStorage.getItem("tips"))||[];

pCount.innerText=p.length;
aCount.innerText=a.length;
mCount.innerText=m.length;
tCount.innerText=t.length;
}

/* PATIENTS */
function loadPatients(){
let data=JSON.parse(localStorage.getItem("patients"))||[];
patientsTable.innerHTML=data.map((p,i)=>`
<tr>
<td>${p.name}</td>
<td>${p.condition}</td>
<td>${p.status}</td>
<td><button class="delete" onclick="delPatient(${i})">Delete</button></td>
</tr>`).join("");
}

function delPatient(i){
let d=JSON.parse(localStorage.getItem("patients"))||[];
d.splice(i,1);
localStorage.setItem("patients",JSON.stringify(d));
loadPatients();loadStats();
}

/* APPOINTMENTS */
function loadAppointments(){
let data=JSON.parse(localStorage.getItem("appointments"))||[];
appointmentsTable.innerHTML=data.map((a,i)=>`
<tr>
<td>${a.name}</td>
<td>${a.phone}</td>
<td>${a.status}</td>
<td>
<button class="approve" onclick="approve(${i})">Approve</button>
<button class="delete" onclick="delApp(${i})">Delete</button>
</td>
</tr>`).join("");
}

function approve(i){
let d=JSON.parse(localStorage.getItem("appointments"));
d[i].status="Approved";
localStorage.setItem("appointments",JSON.stringify(d));
loadAppointments();
}

function delApp(i){
let d=JSON.parse(localStorage.getItem("appointments"));
d.splice(i,1);
localStorage.setItem("appointments",JSON.stringify(d));
loadAppointments();loadStats();
}

/* PHARMACY */
function loadPharmacy(){
let data=JSON.parse(localStorage.getItem("pharmacy"))||[];
pharmacyTable.innerHTML=data.map((m,i)=>{
let status=m.qty<=0?"OUT":m.qty<5?"LOW":"OK";
return `
<tr>
<td>${m.name}</td>
<td>${m.qty}</td>
<td>${status}</td>
<td><button class="delete" onclick="delMed(${i})">Delete</button></td>
</tr>`;
}).join("");
}

function delMed(i){
let d=JSON.parse(localStorage.getItem("pharmacy"))||[];
d.splice(i,1);
localStorage.setItem("pharmacy",JSON.stringify(d));
loadPharmacy();loadStats();
}

/* TIPS */
document.getElementById("tipForm").addEventListener("submit",function(e){
e.preventDefault();

let data=JSON.parse(localStorage.getItem("tips"))||[];
data.push({
title:title.value,
author:author.value,
image:image.value,
content:content.value
});

localStorage.setItem("tips",JSON.stringify(data));
this.reset();
loadTips();loadStats();
});

function loadTips(){
let data=JSON.parse(localStorage.getItem("tips"))||[];
tipsList.innerHTML=data.map((t,i)=>`
<div class="tip-card">
<h3>${t.title}</h3>
<p><b>By:</b> ${t.author}</p>
<p>${t.content}</p>
${t.image?`<img src="${t.image}">`:""}
<button class="delete" onclick="delTip(${i})">Delete</button>
</div>`).join("");
}

function delTip(i){
let d=JSON.parse(localStorage.getItem("tips"))||[];
d.splice(i,1);
localStorage.setItem("tips",JSON.stringify(d));
loadTips();loadStats();
}

/* SAMPLE DATA */
if(!localStorage.getItem("patients")){
localStorage.setItem("patients",JSON.stringify([{name:"Patrick",condition:"Flu",status:"OK"}]));
localStorage.setItem("appointments",JSON.stringify([{name:"John",phone:"0788",status:"Pending"}]));
localStorage.setItem("pharmacy",JSON.stringify([{name:"Paracetamol",qty:3}]));
}

/* LOAD */
loadStats();
loadPatients();
loadAppointments();
loadPharmacy();
loadTips();
/* to logout on login*/
function logout(){
    localStorage.removeItem("role"); // gusiba session
    window.location.replace("login-admin.html"); // ihita igusubiza inyuma instantly
}
 /* admin login*/
 // ===============================
// ADMIN AUTH CHECK
// ===============================
if(localStorage.getItem("role") !== "admin"){
    window.location.href = "admin.html";
}

// ===============================
// LOGOUT
// ===============================
function logout(){
    localStorage.removeItem("role");
    window.location.href = "login-admin.html";
}

// ===============================
// LOAD COUNTS (DASHBOARD CARDS)
// ===============================
function loadCounts(){

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let medicines = JSON.parse(localStorage.getItem("pharmacy")) || [];
    let tips = JSON.parse(localStorage.getItem("tips")) || [];

    document.getElementById("pCount").innerText = patients.length;
    document.getElementById("aCount").innerText = appointments.length;
    document.getElementById("mCount").innerText = medicines.length;
    document.getElementById("tCount").innerText = tips.length;
}

// ===============================
// LOAD PATIENTS
// ===============================
function loadPatients(){
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let table = document.getElementById("patientsTable");

    table.innerHTML = "";

    patients.forEach((p, index) => {
        table.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.condition}</td>
            <td>${p.status || "Pending"}</td>
            <td>
                <button class="approve" onclick="approvePatient(${index})">Approve</button>
                <button class="delete" onclick="deletePatient(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deletePatient(i){
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.splice(i,1);
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatients();
    loadCounts();
}

function approvePatient(i){
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients[i].status = "Approved";
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatients();
}

// ===============================
// LOAD APPOINTMENTS
// ===============================
function loadAppointments(){
    let data = JSON.parse(localStorage.getItem("appointments")) || [];
    let table = document.getElementById("appointmentsTable");

    table.innerHTML = "";

    data.forEach((a,i)=>{
        table.innerHTML += `
        <tr>
            <td>${a.name}</td>
            <td>${a.phone}</td>
            <td>${a.status || "Pending"}</td>
            <td>
                <button class="approve" onclick="approveApp(${i})">Approve</button>
                <button class="delete" onclick="deleteApp(${i})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteApp(i){
    let data = JSON.parse(localStorage.getItem("appointments")) || [];
    data.splice(i,1);
    localStorage.setItem("appointments", JSON.stringify(data));
    loadAppointments();
    loadCounts();
}

function approveApp(i){
    let data = JSON.parse(localStorage.getItem("appointments")) || [];
    data[i].status = "Approved";
    localStorage.setItem("appointments", JSON.stringify(data));
    loadAppointments();
}

// ===============================
// LOAD PHARMACY
// ===============================
function loadPharmacy(){
    let data = JSON.parse(localStorage.getItem("pharmacy")) || [];
    let table = document.getElementById("pharmacyTable");

    table.innerHTML = "";

    data.forEach((m,i)=>{
        table.innerHTML += `
        <tr>
            <td>${m.name}</td>
            <td>${m.qty}</td>
            <td>${m.status || "Available"}</td>
            <td>
                <button class="delete" onclick="deleteMed(${i})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteMed(i){
    let data = JSON.parse(localStorage.getItem("pharmacy")) || [];
    data.splice(i,1);
    localStorage.setItem("pharmacy", JSON.stringify(data));
    loadPharmacy();
    loadCounts();
}

// ===============================
// LOAD TIPS
// ===============================
document.getElementById("tipForm").addEventListener("submit", function(e){
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let image = document.getElementById("image").value;
    let content = document.getElementById("content").value;

    let tips = JSON.parse(localStorage.getItem("tips")) || [];

    tips.push({title,author,image,content});

    localStorage.setItem("tips", JSON.stringify(tips));

    alert("Tip added!");

    this.reset();
    loadCounts();
});

// ===============================
// INIT ALL
// ===============================
loadCounts();
loadPatients();
loadAppointments();
loadPharmacy();