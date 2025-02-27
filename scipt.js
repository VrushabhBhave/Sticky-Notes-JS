const form = document.querySelector("form");
const textarea = form.querySelector("textarea");
const color = form.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");
const undo = document.querySelector(".undo");
const createdNotes = [];
const deletedNotes = [];

window.addEventListener("load", undoButtonStatus());

form.addEventListener("submit", (e) => {
    if(textarea.value === ""){
        alert("Enter Some Text");
    }else{
        e.preventDefault();
        const newNote = {
            text: textarea.value,
            color: color.value,
            timestamp: new Date().toLocaleString(),
            position: Date.now(),
        };

        createdNotes.push(newNote);
        // console.log(createdNotes);
        displayNotes();

        textarea.value = "";
        textarea.focus();
    }
});

function displayNotes(){
    notesContainer.innerHTML = "";
    const fregment = document.createDocumentFragment();
    createdNotes.forEach((note) => {
        const content = document.createElement("div");
        content.classList.add("content");
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button-Div");
        const remove = document.createElement("i");
        remove.classList.add("fa-solid");
        remove.classList.add("fa-trash");
        const edit = document.createElement("i");
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pencil");
        const dt = document.createElement("span");
        const p = document.querySelector("#right .span");
        p.innerText = "";
        

        // action for remove ele 
        remove.addEventListener("click", (e) => {
            const indexToDelete = createdNotes.findIndex((n) => {
                return n.position === note.position;
            });
            deletedNotes.push(...createdNotes.splice(indexToDelete, 1));
            
            e.target.parentElement.parentElement.remove();
            undoButtonStatus()
        })

        //action for edit ele
        const editableText = document.createElement("textarea");
        editableText.classList.add("edit");
        editableText.style.display = "none";
        content.append(editableText);
        editableText.value = note.text;
        edit.addEventListener("click", () => {
            if(editableText.style.display === "none"){
                edit.classList.remove("fa-pencil");
                edit.classList.add("fa-floppy-disk");
                editableText.style.display = "block";
            }else{
                edit.classList.remove("fa-floppy-disk");
                edit.classList.add("fa-pencil");
                note.text = editableText.value;
                console.log(editableText.value);
                noteDiv.innerHTML = note.text;
                editableText.style.display = "none";
            }
        })
        


        buttonDiv.style.padding = "5px";
        remove.style.color = "white";
        remove.style.cursor = "pointer";
        edit.style.color = "white";
        edit.style.cursor = "pointer";
        dt.style.color = "white";
        dt.style.fontSize = "0.8rem";

        noteDiv.innerText = note.text;
        dt.innerText = note.timestamp;
        content.style.backgroundColor = note.color;

        buttonDiv.append(edit, dt, remove);
        content.append(buttonDiv, noteDiv);
        fregment.append(content);
    })
    notesContainer.append(fregment);
}

undo.addEventListener("click", (e) => {
    const lastDeletetedNote = deletedNotes.pop();
    createdNotes.push(lastDeletetedNote);

    createdNotes.sort((a,b) => {return a.position - b.position})
    
    displayNotes();
    undoButtonStatus()
});

function undoButtonStatus(){
    undo.disabled = deletedNotes.length === 0 ? true : false;
    if(undo.disabled == true){
        undo.classList.remove("background");
    }else{
        undo.classList.add("background");
    }
}