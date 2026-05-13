let tips = JSON.parse(localStorage.getItem("healthTips")) || [];
let editIndex = null;

const form = document.getElementById("tipForm");
const title = document.getElementById("title");
const author = document.getElementById("author");
const image = document.getElementById("image");
const content = document.getElementById("content");

const adminContainer = document.getElementById("adminTips");

/* SAVE */
function save(){
    localStorage.setItem("healthTips", JSON.stringify(tips));
}

/* DISPLAY ADMIN */
function displayAdmin(){

    adminContainer.innerHTML = "";

    tips.forEach((t,i)=>{
        adminContainer.innerHTML += `
        <div class="card">
            <img src="${t.image}" onerror="this.src='https://images.unsplash.com/photo-1576091160550-2173dba999ef'">

            <h3>${t.title}</h3>
            <p>${t.content}</p>
            <p><b>${t.author}</b></p>

            <button onclick="editTip(${i})">✏ Edit</button>
            <button onclick="deleteTip(${i})">🗑 Delete</button>
        </div>
        `;
    });
}

/* ADD + UPDATE */
form.addEventListener("submit", function(e){
    e.preventDefault();

    let tip = {
        title: title.value,
        author: author.value,
        image: image.value || "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        content: content.value,
        likes: editIndex === null ? 0 : tips[editIndex].likes
    };

    if(editIndex === null){
        tips.push(tip); // CREATE
    }else{
        tips[editIndex] = tip; // UPDATE
        editIndex = null;
    }

    save();
    displayAdmin();
    displayUserSync(); // optional sync preview
    form.reset();
});

/* EDIT */
function editTip(i){
    let t = tips[i];

    title.value = t.title;
    author.value = t.author;
    image.value = t.image;
    content.value = t.content;

    editIndex = i;
}

/* DELETE */
function deleteTip(i){
    tips.splice(i,1);
    save();
    displayAdmin();
    displayUserSync();
}

/* INIT */
displayAdmin();