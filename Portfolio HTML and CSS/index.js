// Let's grab the hamburger toggle button:
const navToggle = document.querySelector('.nav-toggle')

// Let's grab all the nav links and store it into a Nodelist (array-like object):
const navLinks = document.querySelectorAll('.nav__link')

// We now add a click event listener that toggles a nav-open class to the body
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open')
})

// Let's add a click event listener to all the nav links that removes the nav-open class
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open')
    })
})