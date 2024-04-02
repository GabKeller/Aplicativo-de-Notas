function popup(){
    const popupContainer = document.createElement("div");//criando um div
    popupContainer.innerHTML = `  
    <div id ="popupContainer">
        <h1>Nova Nota</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Criar Nota</button>
            <button id="closeBtn" onclick="closePopup()">Fechar</button>
        </div>
    </div>
    `;  //cria um elemento em html puro
    document.body.appendChild(popupContainer); //plota o elemento na tela

}

function closePopup(){
    const popupContainer = document.getElementById("popupContainer"); //pega o elemento pelo id
    
    if(popupContainer){ //testa se existe
        popupContainer.remove();//tira da tela
    }
}
function createNote(){
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if(noteText.trim !==''){ //trim remove os espaços em branco para ver se é vazio 
        const note = {
            id: new Date().getTime(), //criando um novo objeto com id do timestamp
            text: noteText
        };
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];//pegar as notas do local storage ou criando um array vazio
        existingNotes.push(note);
    
        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = ''; //limpando a variavel

        popupContainer.remove();//tirando o 
        displayNotes();
    }
}
function displayNotes(){
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML='';

     const notes = JSON.parse(localStorage.getItem('notes')) || [];

     notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span> 
        <div id = "noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i>
            </button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
        notesList.appendChild(listItem);
     });    
}
function editNote(noteId){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");

    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Editar Nota</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Concluir</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancelar</button>
        </div>
    </div>
    `;
    document.body.appendChild(editingPopup);
}
function closeEditPopup(){
    const editingPopup = document.getElementById("editing-container");
    if(editingPopup){
        editingPopup.remove();
    }
}
function updateNote(){
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if(noteText !==''){
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        //find the note to update
        const updatedNotes = notes.map(note=>{
            if(note.id == noteId){
                return { id:note.id, text: noteText};
            }
            return note;
        });

        //update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        //close the editing popup
        editingPopup.remove();

        //refresh the displayed notes
        displayNotes();
    }
}
function deleteNote(noteId){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note=>note.id!==noteId);

    localStorage.setItem('notes',JSON.stringify(notes));
    displayNotes();
}

displayNotes();