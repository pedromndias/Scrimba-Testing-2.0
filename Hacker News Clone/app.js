// Remember to Go Live on VSCode so the JS Modules work


import RouterHandler from "./router.js"

// the global window has a method to detect when the "#" router is different on the url:
window.onhashchange = () => {
    setActiveLink();
  }
  
  function setActiveLink() {
     const links = document.querySelectorAll('.header-link');
     links.forEach(link => {
        const linkPath = link.getAttribute('href');
        const currentPath = window.location.hash;
        if (currentPath === linkPath) {
          link.classList.add('active');  
        } else {
          link.classList.remove('active');         
        }
     });
  }
  
  class App {
    constructor() {
      new RouterHandler();
    }  
  }
  
  new App();