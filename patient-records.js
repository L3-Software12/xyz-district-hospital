let patients = JSON.parse(localStorage.getItem("patients")) || [];
let editIndex = null;

/* ELEMENTS */
let name = document.getElementById("name");
let dob = document.getElementById("dob");
let gender = document.getElementById("gender");
let blood = document.getElementById("blood");
let phone = document.getElementById("phone");
let condition = document.getElementById("condition");
let admission = document.getElementById("admission");
let doctor = document.getElementById("doctor");
let locationSelect = document.getElementById("location");

/* ================= LOCATION DATA ================= */
const data = {
    Bushoki:{
        Gasiza:["Village 1","Village 2"],
        Nyirangarama:["Village 3","Village 4"]
    },
    Cyinzuzi:{
        Rudogo:["Village 5","Village 6"]
    },
    Base:{
        Gitare:["Village 7","Village 8"]
    }
};

let step = "sector";
let sector = "";
let cell = "";
let finalLocation = "";

/* SAVE TO LOCALSTORAGE */
function saveData(){
    localStorage.setItem("patients", JSON.stringify(patients));
}

/* LOAD SECTORS */
function loadSectors(){
    locationSelect.innerHTML = '<option value="">-- Select Sector --</option>';
    for(let s in data){
        locationSelect.innerHTML += `<option value="${s}">${s}</option>`;
    }
    step = "sector";
}
loadSectors();

/* LOCATION FLOW */
locationSelect.addEventListener("change", function(){

    if(step === "sector"){
        sector = this.value;

        if(sector){
            locationSelect.innerHTML = '<option value="">-- Select Cell --</option>';
            Object.keys(data[sector]).forEach(c=>{
                locationSelect.innerHTML += `<option value="${c}">${c}</option>`;
            });
            step = "cell";
        }

    } else if(step === "cell"){
        cell = this.value;

        if(cell){
            locationSelect.innerHTML = '<option value="">-- Select Village --</option>';
            data[sector][cell].forEach(v=>{
                locationSelect.innerHTML += `<option value="${v}">${v}</option>`;
            });
            step = "village";
        }

    } else if(step === "village"){
        finalLocation = sector + " → " + cell + " → " + this.value;

        locationSelect.innerHTML = `<option selected>${finalLocation}</option>`;
        step = "done";
    }
});

/* ================= CREATE / UPDATE (CRUD - CREATE + UPDATE) ================= */
function addPatient(){

    if(!name.value || !dob.value || !gender.value || !blood.value || !condition.value || !admission.value || !doctor.value || !finalLocation){
        alert("Please fill all fields");
        return;
    }

    let patient = {
        id: editIndex === null ? Date.now() : patients[editIndex].id,
        name: name.value,
        dob: dob.value,
        gender: gender.value,
        blood: blood.value,
        phone: phone.value,
        location: finalLocation,
        condition: condition.value,
        admission: admission.value,
        doctor: doctor.value,
        status: editIndex === null ? "Admitted" : patients[editIndex].status
    };

    if(editIndex === null){
        patients.push(patient); // CREATE
    }else{
        patients[editIndex] = patient; // UPDATE
        editIndex = null;
    }

    saveData();
    clearForm();
    display();
}

/* ================= READ ================= */
function display(){

    let table = document.getElementById("table");
    table.innerHTML = "";

    patients.forEach((p,i)=>{

        let age = p.dob ? new Date().getFullYear() - new Date(p.dob).getFullYear() : "";

        table.innerHTML += `
        <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${age}</td>
        <td>${p.gender}</td>
        <td>${p.blood}</td>
        <td>${p.location}</td>
        <td>${p.condition}</td>
        <td>${p.admission}</td>
        <td>${p.doctor}</td>
        <td>${p.status}</td>
        <td>
            <button onclick="editPatient(${i})">Edit</button>
            <button onclick="deletePatient(${i})">Delete</button>
            <button onclick="toggleStatus(${i})">Status</button>
        </td>
        </tr>
        `;
    });
}

/* ================= UPDATE (EDIT) ================= */
function editPatient(i){

    let p = patients[i];

    name.value = p.name;
    dob.value = p.dob;
    gender.value = p.gender;
    blood.value = p.blood;
    phone.value = p.phone;
    condition.value = p.condition;
    admission.value = p.admission;
    doctor.value = p.doctor;

    finalLocation = p.location;

    editIndex = i;
}

/* ================= DELETE ================= */
function deletePatient(i){
    patients.splice(i,1); // DELETE
    saveData();
    display();
}

/* ================= STATUS UPDATE ================= */
function toggleStatus(i){

    patients[i].status =
        patients[i].status === "Admitted"
        ? "Discharged"
        : "Admitted";

    saveData();
    display();
}

/* ================= CLEAR FORM ================= */
function clearForm(){

    name.value = "";
    dob.value = "";
    gender.value = "";
    blood.value = "";
    phone.value = "";
    condition.value = "";
    admission.value = "";
    doctor.value = "";

    finalLocation = "";
    loadSectors();
    step = "sector";
}

/* ================= INIT (READ ON LOAD) ================= */
display();