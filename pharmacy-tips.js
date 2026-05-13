let meds = JSON.parse(localStorage.getItem("pharmacy")) || [];
let editIndex = null;

const form = document.getElementById("medForm");
const tableBody = document.getElementById("tableBody");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const stockInput = document.getElementById("stock");
const unitInput = document.getElementById("unit");
const expiryInput = document.getElementById("expiry");
const priceInput = document.getElementById("price");
const supplierInput = document.getElementById("supplier");

/* SAVE */
function save(){
localStorage.setItem("pharmacy", JSON.stringify(meds));
}

/* STATUS */
function getStatus(m){
let today = new Date();
let exp = new Date(m.expiry);

if(m.stock <= 0) return {text:"Out", class:"out-row"};
if(exp < today) return {text:"Expired", class:"expired-row"};
if(m.stock < 10) return {text:"Low", class:"low-row"};
return {text:"OK", class:""};
}

/* DISPLAY */
function display(filter=""){
tableBody.innerHTML = "";

let low=0, out=0;

meds
.filter(m => m.name.toLowerCase().includes(filter.toLowerCase()))
.forEach((m,i)=>{

let status = getStatus(m);

if(status.text=="Low") low++;
if(status.text=="Out") out++;

tableBody.innerHTML += `
<tr>
<td>${m.name}</td>
<td>${m.stock}</td>
<td>${m.expiry}</td>
<td>${status.text}</td>
<td>
<button onclick="editMed(${i})">Edit</button>
<button onclick="removeMed(${i})">Delete</button>
</td>
</tr>`;
});

document.getElementById("total").textContent = meds.length;
document.getElementById("lowCount").textContent = low;
document.getElementById("outCount").textContent = out;
}

/* ADD / UPDATE */
form.addEventListener("submit", function(e){
e.preventDefault();

let med = {
name: nameInput.value,
category: categoryInput.value,
stock: parseInt(stockInput.value),
unit: unitInput.value,
expiry: expiryInput.value,
price: priceInput.value,
supplier: supplierInput.value
};

if(editIndex === null){
meds.push(med);
}else{
meds[editIndex] = med;
editIndex = null;
}

save();
display();
form.reset();

// 🔥 SYNC ADMIN LIVE
if(typeof loadPharmacy === "function"){
loadPharmacy();
}
});

/* DELETE */
function removeMed(i){
meds.splice(i,1);
save();
display();

// 🔥 SYNC ADMIN LIVE
if(typeof loadPharmacy === "function"){
loadPharmacy();
}
}

/* EDIT */
function editMed(i){
let m = meds[i];

nameInput.value = m.name;
categoryInput.value = m.category;
stockInput.value = m.stock;
unitInput.value = m.unit;
expiryInput.value = m.expiry;
priceInput.value = m.price;
supplierInput.value = m.supplier;

editIndex = i;
}

/* SEARCH */
function doSearch(){
let value = document.getElementById("search").value;
display(value);
}

document.getElementById("search").addEventListener("input", function(){
display(this.value);
});

/* INIT */
display();