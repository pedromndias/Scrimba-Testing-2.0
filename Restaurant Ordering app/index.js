// Let's import the data from data.js.
// It's important to add "type="module"" on the script tag at the HTML file. Then, on VSCode we use the Live Server feature to see the website live.
import { menuArray } from "./data.js";


// And let's grab the checkout section on from the HTML:
let checkoutSection = document.getElementById("checkout")
// And the products chekcout section:
let checkoutProducts = document.getElementById("checkout-items")
// Let's get the total value of the checkout products:
let totalPurchaseEl = document.getElementById("total-purchase")
// Let's grab the payment modal
let paymentEl = document.getElementById("payment")
// Let's also grab the final section when the order is complete:
let orderCompleted = document.getElementById("order-completed")


// Let's create an array form the checkout products:
let selectedProducts = []


// This function will get the products from the data array and return HTML:
function getMainHtml() {
    let productsHtml = ``
    menuArray.forEach(function(product){
        productsHtml += `
            <div class="product">
                <div class="product-emoji">${product.emoji}</div>
                <div class="product-description">
                    <p class="product-name">${product.name}</p>
                    <p class="product-details">${product.ingredients}</p>
                    <p class="product-price">$${product.price}</p>
                </div>
                <button class="add-btn" id="add-btn" data-add=${product.id}>+</button>
            </div>
        `
    })

    return productsHtml
}

// Let's create an event listener on the document, for the add and remove buttons and the purchase button:
document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        // If we click on one of the add buttons, we will add that matched item to the selectedProducts array:
        selectedProducts.push(menuArray[e.target.dataset.add])
        // Then we call the displayCheckout function:
        displayCheckout(selectedProducts)
        // When we are adding products, the order message should not be displayed:
        orderCompleted.style.display = "none"
    } 
    // If we click on the remove buttons we need to remove that item from the selectedProducts array:
    else if (e.target.dataset.remove) {
        const index = e.target.dataset.remove
        selectedProducts.splice(index, 1)
        // Then we call the displayCheckout function:
        displayCheckout(selectedProducts)
    } 
    // If we click the "Complete order" button, the modal with the payment should appear:
    else if(e.target.id === "checkout-btn") {
        paymentEl.style.display = "block"
    }
    // When we click the "Pay" button the modal and checkout should disappear, and a final message should be shown:
    else if(e.target.id === "pay-btn") {
        e.preventDefault()
        paymentEl.style.display = "none"
        checkoutSection.style.display = "none"
        // Let's grab the name from the input:
        let name = document.getElementById("form-name")
        // And display the final message with that name:
        orderCompleted.textContent = `Thanks, ${name.value}! Your order is on its way!`
        orderCompleted.style.display = "flex"
        // The array should be cleared:
        selectedProducts = []
        // And also the values from the input:
        document.getElementById("form-name").value = ""
        document.getElementById("form-card").value = ""
        document.getElementById("form-cv").value = ""
    }
})




// The next function will put the items on the checkout area:
function displayCheckout(arr){
    // First we need to clean the HTML of the section:
    checkoutProducts.innerHTML = ""

    // Then we iterate each item:
    arr.forEach(function(item){
        checkoutProducts.innerHTML += `
        <div class="checkout-item">
        <div class="checkout-item-together">
            <span>${item.name}</span>
            <button class="checkout-remove-item" id="checkout-remove-item" data-remove=${arr.indexOf(item)}>remove</button>
        </div>
        <span>$${item.price}</span>
    </div>
        `
    })
    
    // Now we calculate the total of the purchase:
    let totalPurchase = 0
    for (let item of arr) {
        totalPurchase += item.price
    }
    

    totalPurchaseEl.textContent = `$${totalPurchase}`
    
    // If there are items on the checkout, we will show that section:
    if(selectedProducts.length){
        checkoutSection.style.display = "block"
    } else {
        checkoutSection.style.display = "none"
    }
}

// This function will render all the products on the HTML:
function render() {
    document.getElementById("main").innerHTML = getMainHtml()
}

render()