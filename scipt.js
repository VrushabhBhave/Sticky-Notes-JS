const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const color = document.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");
const button = document.querySelector("button");


form.addEventListener("submit", (e) => {
  if (textarea.value == "") {
    alert("Enter Some Text");
    e.preventDefault();
  } else {
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();
    console.log(formattedDateTime);

    e.preventDefault();
    const span = document.querySelector("#right span");
    span.style.display = "none";
    const content = document.createElement("div");
    const note = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const remove = document.createElement("i");
    const edit = document.createElement("i");
    const dt = document.createElement("span");

    //editable input
    const editableInput = document.createElement("textarea");
    editableInput.classList.add("edit");
    editableInput.style.display = "none";

    remove.classList.add("fa-solid");
    remove.classList.add("fa-trash");
    edit.classList.add("fa-solid");
    edit.classList.add("fa-pencil");
    content.classList.add("content");
    note.classList.add("note");
    buttonDiv.classList.add("button-Div");

    buttonDiv.style.padding = "5px";
    remove.style.color = "white";
    remove.style.cursor = "pointer";
    edit.style.color = "white";
    edit.style.cursor = "pointer";
    dt.style.color = "white";
    dt.style.fontSize = "0.8rem";

    note.innerText = textarea.value;
    content.style.backgroundColor = color.value;
    dt.innerText = formattedDateTime;

    remove.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });

    edit.addEventListener("click", () => {
        let displayValue = editableInput.style.display;
        if(displayValue === "none"){
            edit.classList.remove("fa-pencil");
            edit.classList.add("fa-floppy-disk");
            editableInput.style.display = "block";
        }else{
            edit.classList.remove("fa-floppy-disk");
            edit.classList.add("fa-pencil");
            editableInput.style.display = "none";
            note.innerText = editableInput.value;
        }
    })

    buttonDiv.append(edit);
    buttonDiv.append(dt);
    buttonDiv.append(remove);
    content.append(buttonDiv);
    note.append(editableInput);
    content.append(note);
    notesContainer.append(content);
    textarea.value = "";
  }
});