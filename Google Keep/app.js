/* Classes serve as templates to create new objects. The most important 
thing to remember: Classes are just normal JavaScript functions and could 
be completely replicated without using the class syntax. It is special 
syntactic sugar added in ES6 to make it easier to declare and inherit 
complex objects.
The class is a blueprint that defines a nature of a future object.
An instance is a specific object created from a particular class.
Classes are used to create and manage new objects and support inheritance—a
key ingredient in object-oriented programming and a mechanism of reusing code.
*/

class App {
    constructor() {
        /* Create an array for our notes. It will be filled with objects with all
        the data properties. Initially it would be an empty array but with app 
        usage we will get the data from local storage. Note the JSON.parse
        to turn it into an array (was a string): */
        this.notes = JSON.parse(localStorage.getItem("notes")) || []

        // Let's create the variables for the title,text and id of each note, so we can access them globaly:
        this.title = ""
        this.text = ""
        this.id = ""

        // Let's grab the elements of our HTML and save them into variables.
        // Note that "$" means it is an element and not data.
        this.$placeholder = document.querySelector("#placeholder")
        this.$form = document.querySelector("#form")
        this.$notes = document.querySelector("#notes")
        this.$noteTitle = document.querySelector("#note-title")
        this.$noteText = document.querySelector("#note-text")
        this.$formButtons = document.querySelector("#form-buttons")
        this.$formCloseButton = document.querySelector('#form-close-button')
        this.$modal = document.querySelector(".modal")
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector(".modal-text");
        this.$modalCloseButton = document.querySelector(".modal-close-button")
        this.$colorTooltip = document.querySelector("#color-tooltip")

        // Let's call the render() function so that the existing notes are display when opening our app:
        this.render()

        // Let's also make sure the next method runs when we open our app:
        this.addEventListeners()
    }

    // Let's create a function to register the event listeners in our app:
    addEventListeners() {
        // We want to create an event listener on our body:
        document.body.addEventListener("click", event => {
            // Let's handle the case we click on the form:
            this.handleFormClick(event)
            // And another function to get access to the data of the selected note:
            this.selectNote(event)
            // Another method that will receive our event is the openModel:
            this.openModal(event)
            // Note that selectNote must be called before openModal so we set the title, text and id values that openModal will use.

            // The next function deletes a specific:
            this.deleteNote(event)
        })

        // Let's craete a mouse over event to edit the color of the note:
        document.body.addEventListener("mouseover", event => {
            this.openTooltip(event)
        })

        // We also need a mouseout event:
        document.body.addEventListener("mouseout", event => {
            this.closeTooltip(event)
        })

        // Let's add a mouseover event for the color tooltip:
        this.$colorTooltip.addEventListener("mouseover", function() {
            this.style.display = "flex"
        })

        // And a mouseout event:
        this.$colorTooltip.addEventListener("mouseout", function() {
            this.style.display = "none"
        })

        // Finally, we add an event listener to change the note's background:
        this.$colorTooltip.addEventListener("click", event => {
            // We get the color from the data set of the target:
            const color = event.target.dataset.color
            if (color) {
                // if there is a color, we call the editNoteColor function:
                this.editNoteColor(color)
            }
        })

        // Let's listen for a submit event on the form (Submit button or "Enter" key)
        this.$form.addEventListener("submit", event => {
            event.preventDefault()
            //  Let's get the values from the form:
            const title = this.$noteTitle.value
            const text = this.$noteText.value
            // We make sure there is at least one input value on the form:
            const hasNote = title || text
            // If there is a note, we call a function to add it to the HTML
            if (hasNote) {
                // We call addNote and as an argument we send an object shorthand with the values { title: title, text: text }
                this.addNote( {title, text} )
            }
            
        })

        // Let's create and click event listener for our close button:
        this.$formCloseButton.addEventListener("click", event => {
            // We need to stop th e handleFormClick() function from running otherwise the form will stay open (Remember: if (isFormClicked) {this.openForm())} ):
            event.stopPropagation()
            // Then we close the form:
            this.closeForm()
        })

        // Let's add an event listener for the modal close button:
        this.$modalCloseButton.addEventListener("click", event => {
            // It will call the closeModal function:
            this.closeModal(event)
        })

    }

    // This next function handles form clicks:
    handleFormClick(event) {
        // Note the contains() method that specifies if the form contains the target of the click event
        const isFormClicked = this.$form.contains(event.target)

        //  Let's get the values from the form:
        const title = this.$noteTitle.value
        const text = this.$noteText.value
        // We make sure there is at least one input value on the form:
        const hasNote = title || text

        // If the form is clicked, we call openForm() function
        if (isFormClicked) {
            this.openForm()
        } else if (hasNote) {
            // Else if there is a note on the form but the user clicks else where, we add the note:
            this.addNote( {title, text} )
        } else { 
            // Other wise we call closeForm()
            this.closeForm()
        }
    }

    // The openForm function shows the elements
    openForm() {
        this.$form.classList.add("form-open");
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }

    // The closeForm function hides the elements
    closeForm() {
        this.$form.classList.remove("form-open")
        this.$noteTitle.style.display = "none"
        this.$formButtons.style.display = "none"
        // And it also clears the values on the input:
        this.$noteTitle.value = ""
        this.$noteText.value = ""
    }

    // We create the openModal function:
    openModal(event) {
        // First we need to prevent the modal from opening if we click on the delete button:
        if (event.target.matches('.toolbar-delete')) return; 

        // We check if the target of the event has ".note" or any of the parent elements (.closest). If so, we open our modal:
        if (event.target.closest(".note")) {
            this.$modal.classList.toggle("open-modal")
            // And we populate the title and text:
            this.$modalTitle.value = this.title
            this.$modalText.value = this.text
        }
    }

    // This is the function to close the modal:
    closeModal(event) {
        // This function will call the editNote function:
        this.editNote()
        // Then we toggle the display of the modal:
        this.$modal.classList.toggle("open-modal")
    }

    // Let's create a function that opens the tooltip to edit the color:
    openTooltip(event) {
        // If the target event does not match the toolbar.color image, we return out of this function:
        if (!event.target.matches(".toolbar-color")) return
        // We can access the id with the dataset:
        this.id = event.target.dataset.id
        // Then we need to get the exact coordinates or where the user is mouse overing:
        const noteCoords = event.target.getBoundingClientRect()
        // We also need to find out where in the page has the user scrolled to:
        const horizontal = noteCoords.left + window.scrollX
        const vertical = window.scrollY -25
        // Now that we have these values, we will display the tooltip on those coordinates:
        this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`
        this.$colorTooltip.style.display = "flex"
    }

    // And the next function will close the tooltip:
    closeTooltip(event) {
        // If the target event does not match the toolbar.color image, we return out of this function:
        if (!event.target.matches(".toolbar-color")) return
        // We will hide the tooltip when the mouseout event fires:
        this.$colorTooltip.style.display = "none"

    }

    // The following function adds a note:
    // Note how the object as argument is destructured so we can then use the variables "title" and "text"
    addNote( {title, text} ) {
        // Each note will be an object with some properties (title, text, color, id)
        const newNote = {
            title,
            text,
            color: "white",
            // For the id we check if the array is empty (set id = 1). If not, we increment by 1
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        // Now we add the object to the notes array, using the spread operator:
        this.notes = [...this.notes, newNote]
        // We call a function that will display the note on our HTML and save it to local storage:
        this.render()
        // And we also call the closeForm function:
        this.closeForm()
    }

    // This function will edit the code, when the modal is open:
    editNote() {
        // First, we get the title and text values from the modal:
        const title = this.$modalTitle.value
        const text = this.$modalText.value
        // To edit an element on the array we will use the .map method:
        this.notes = this.notes.map(note => 
            // if the id matches, we will update the title and text on the object (remember to turn the id to a number before comparing them)
            note.id === Number(this.id) ? { ...note, title, text} : note
        )
        // Finally, we display our notes and save it to local storage:
        this.render()
    }

    // The next function edits the background color of a note:
    editNoteColor(color) {
        // First we itertate on our array to find the specific object:
        this.notes = this.notes.map(note => 
            // if the id matches, we will update the color on the object:
            note.id === Number(this.id) ? { ...note, color} : note
        )
        // Finally, we display the notes and save them to local storage:
        this.render()
    }

    // The next function accesses the data of a selected note:
    selectNote(event) {
        // Once again we use .closest to search for matches of the class .note:
        const $selectedNote = event.target.closest(".note")
        
        
        /* $selectedNote is a HTML collection and we can access its children to get the values, by destructuring the array.
        But first we need a return statement in case there is no selected note, so the rest of the function does not run: */
        if(!$selectedNote) return

        const [$noteTitle, $noteText] = $selectedNote.children
        // And we assign its innerText to the title and text variables:
        this.title = $noteTitle.innerText
        this.text = $noteText.innerText
        // We can also access the dataset of the element to get the id (data-id):
        this.id = $selectedNote.dataset.id

    }

    // The next funciont deletes a specific note:
    deleteNote(event) {
        // To prevent the modal from opening when we click the delete button, we will also use stopPropagation:
        event.stopPropagation()
        // Let's check if we are not clicking on the toolbar-delete image:
        if (!event.target.matches(".toolbar-delete")) return
        // And to delete it, we need to get the id of the specific note:
        const id = event.target.dataset.id
        // To delete from the array we will use the filter method:
        this.notes = this.notes.filter(note => note.id !== Number(id))
        

        // And finally we display the notes and save them with the render function:
        this.render()
    }

    // render() will be a function with both saveNotes and displayNotes:
    render() {
        this.saveNotes()
        this.displayNotes()
    }

    // This next function will save the notes on the browser's local storage:
    saveNotes() {
        // Note how localStorage is made of key-value pairs and they need to be strings:
        localStorage.setItem("notes", JSON.stringify(this.notes))
    }


    // The next function will display the notes on the HTML:
    displayNotes() {
        // If there are any notes, we should hide the placeholder:
        const hasNotes = this.notes.length > 0
        this.$placeholder.style.display = hasNotes ? "none" : "flex"

        // Then iterate on our array to return the HTML to the $notes section:
        this.$notes.innerHTML = this.notes.map(note => `
            <div style="background: ${note.color};" class="note" data-id="${note.id}">
                <div class="${note.title && "note-title"}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" data-id="${note.id}" src="img/palette-icon.png">
                        <img class="toolbar-delete" data-id="${note.id}" src="img/delete-icon.png">
                    </div>
                </div>
            </div>
            
        
        `).join("")
    }

}

new App();