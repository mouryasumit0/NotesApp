const notes = document.getElementById("notes-list");
let notesArr =[];
let howNote = {id: 0 ,heading: "How?", desc: "Click on plus icon in your right hand side and get started creating your daily notes."};
let count = 100;
let store = -1;

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let currentDate = new Date().toLocaleString("en-IN", options);
if (localStorage.getItem("note") && JSON.parse(localStorage.getItem("note")!==[])) {
  notesArr = JSON.parse(localStorage.getItem("note"));
  notesArr.forEach((note) => {
    createNote(note, note.color);
  });
  console.log(notesArr);
}else {
    createNote(howNote)
}

const searchbar = document.querySelector("input[name=search]")
searchbar.addEventListener("input", ()=>{
    let searchTerm = searchbar.value;
    let token = searchTerm
    .toLowerCase()
    .split(' ')
    .filter(function(token){
      return token.trim() !== '';
    });
    let searchTermRegex = new RegExp(token.join('|'));
    console.log(searchTermRegex)
    let newArr = [] 
    notesArr.forEach((n)=>{
        if(n.heading.search(searchTermRegex)>-1){
            newArr.push(n)
        } 
    })
    notes.innerHTML="";
    newArr.forEach((note) => {
        createNote(note, note.color);
      });
    
})


function createNote(n, mycolor) {
  const note = document.createElement("form");
  note.classList.add("note");
  if(n.id===undefined){
    note.classList.add("note-" + count);
    count = count + 1;
  }else{
    note.classList.add("note-"+n.id)
  }
  
  
  const color = ["#f5972c", "#f3542a", "#7049f0", "#0aa4f6", "#c6d947"];

  let randomcolor = Math.floor(Math.random() * 5);
//   let x = true;
//   while (x) {
//     if (randomcolor !== store) {
//       store = randomcolor;
//       x = false;
//     } else {
//       randomcolor = Math.floor(Math.random() * 5);
//     }
//   }
  store = randomcolor;
  console.log("mycolor",mycolor)
  if(mycolor){
    note.style.backgroundColor=mycolor;
  } else {
    note.style.backgroundColor = color[store]
  }

  console.log("note",note)
  note.innerHTML = `<div class="items item1">
    <h3 class="title"><input name="heading" type="text" onfocus="this.select()" class="textarea" placeholder="Heading..." value="${
      n.heading === undefined ? "Heading..." : n.heading
    }"></h3>
    <button class="btn delete-btn icon-btn"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="content hidden visibility">
    <p class="desc"><textarea name="text" type="text" class="textarea" placeholder="Enter note here..." cols="35" rows="7">${
        n.desc === undefined ? "" : n.desc}</textarea>
    </p>
</div>
<div class="items item2 hidden visibility">
    <time>${n.currentDate === undefined ? currentDate : n.currentDate}</time>
    <button class="save-btn btn icon-btn">
        <!-- <i class="fas fa-pen-square"></i> -->
        <i class="fas fa-save"></i>
    </button>
</div>`;

  notes.prepend(note);

  const saveBtn = note.getElementsByClassName("save-btn");
  saveBtn[0].addEventListener("click", (e) => {
    e.preventDefault();
    const key = note.className.slice(-3);
    save(note, key, color[store]);
    console.log(notesArr);
  });

  const remove = note.getElementsByClassName("delete-btn");
  remove[0].addEventListener("click", () => {
    const key = note.className.slice(-3);
    deleteNote(note, key);
  });

  const input = note.querySelector("input[name=heading]")
    input.addEventListener("focus",()=>{
    const hidden = note.querySelectorAll(".visibility")
    hidden[0].classList.remove("hidden")
    hidden[1].classList.remove("hidden")
})

}

const deleteNote = (note, key) => {
  notesArr = notesArr.filter((n) => {
    return n.id != key;
  });
  note.remove();
  console.log(notesArr);
  localStorage.setItem("note", JSON.stringify(notesArr));
};

const save = (note, key, color) => {
  const heading = note.querySelector("input[name=heading]").value;
  const desc = note.querySelector("textarea[name=text]").value;
  let noteData = {
    id: Number,
    heading: String,
    desc: String,
    time: String,
    color: String
  };
  let bool = true;

  notesArr.forEach((n) => {
    if (n.id === key) {
      bool = false;
      n.heading = heading;
      n.desc = desc;
      n.time = currentDate
    }
  });
  if (bool) {
    noteData = {
      id: key,
      heading: heading,
      desc: desc,
      time: currentDate,
      color: color
    };
    notesArr.push(noteData);
  }
  localStorage.setItem("note", JSON.stringify(notesArr));
  const input = note.querySelector("input[name=heading]")
    const hidden = note.querySelectorAll(".visibility")
    hidden[0].classList.add("hidden")
    hidden[1].classList.add("hidden")
};

