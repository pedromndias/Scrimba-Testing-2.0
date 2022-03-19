// Create empty array for the leads
let myLeads = []
// Get the elements and buttons from HTML
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
// Get leads from local storage and parse them
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)
// If there are any leads in local storage, assign them to the array and call render() function
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// When clicking the tab button, push the site's URL to the array, add it to the local storage and call render() function
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})
// Create function to render all the leads as an unordered list
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`
    }
    ulEL.innerHTML = listItems
}
// When double clicking on the delete button, clear the storage, set myLeads to an empty array and call render() function
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
// When clicking on the input button, push the input value to myLeads, store it in storage, set the input to an empty string and call the render() function
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
    render(myLeads)

    console.log( localStorage.getItem("myLeads") )
})





