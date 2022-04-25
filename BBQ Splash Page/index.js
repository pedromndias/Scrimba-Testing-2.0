// create a variable witht the form itself
let emailCollectorForm = document.getElementById("Email-Collector")
// Add an event listener of submit:
emailCollectorForm.addEventListener("submit", event => {
    // Prevent the page from reloading:
    event.preventDefault()
    // Create a variable with the form data:
    let ourFormData = new FormData(event.target)
    // We can then access the value we need by passing it its "name" that we assign on the form
    let userFirstName = ourFormData.get("firstName")
    let userEmailAddress = ourFormData.get("emailAddress")
    // Let's update the HTML with a personalized message:
    let updatedHtmlContent = `
        <h2>Congratulations, ${userFirstName}!</h2>
        
        <p>You're on your way to becoming a BBQ Master!</p>
        
        <p class="fine-print">You will get weekly BBQ tips sent to: ${userEmailAddress}</p>
    `
    // And get the main content element so we can display it:
    let ourMainContent = document.getElementById("Main-Content")
    ourMainContent.innerHTML = updatedHtmlContent
})