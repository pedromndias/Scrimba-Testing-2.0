import React, {useContext, useState} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"

function Cart() {
    const [buttonText, setButtonText] = useState("Place Order")

    const {cartItems, emptyCart} = useContext(Context)
    // We calculate the total based on the length of the cart array:
    const totalCost = 5.99 * cartItems.length
    // Then use the toLocaleStrig to display the price in US Dollars
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})

    // We will map the cart array to then render the CartItem component:
    const cartItemElements = cartItems.map(item => (
        // Note how we pass the item as parameter (besides thew key because of console warning)
        <CartItem key={item.id} item={item}/>
    ))

    // The following function will change the button's state when we "place" an order:
    function placeOrder() {
        setButtonText("Ordering...")
        setTimeout(() => {
            setButtonText("Place Order")
            console.log("Order Placed!")
            // We then empty the cart, which will change the logos on the Photos page, since they get its value from the cartItems array:
            emptyCart()
        }, 3000)
    }

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            {
                // We only show the button if there are any items on the cart array:
                cartItems.length > 0 ?
                <div className="order-button">
                    <button onClick={placeOrder}>{buttonText}</button>
                </div> :
                <p>You have no items in your cart</p>

            }
            
        </main>
    )
}

export default Cart