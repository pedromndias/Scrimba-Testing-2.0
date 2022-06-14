import React, {useContext} from "react"
import PropTypes from "prop-types"
import {Context} from "../Context"
import useHover from "../hooks/useHover"

function Image({className, img}) {
    // We import the state and ref from the usHover function (from the hooks folder)
    const [hovered, ref] = useHover()
    // We also import all the parameters we need from Context
    const {toggleFavorite, addToCart, cartItems, removeFromCart} = useContext(Context)

    // Note how the following functions use the variables from Context:
    function heartIcon() {
        
        if(img.isFavorite) {
            // Note how the function on onClick must be a callback (because we have parameters on toggleFavorite, and onClick has the event parameter)
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    }

    function cartIcon() {
        // Here, we check if the photo is on the cart already, using the some method with the img.id:
        const alreadyInCart = cartItems.some(item => item.id === img.id)
        if(alreadyInCart) {
            return <i className="ri-shopping-cart-fill cart"  onClick={() => removeFromCart(img.id)}></i>
        } else if (hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
        }
    }    

    return(
        <div
            className={`${className} image-container`}
            // Note how we use ref on this div, so we will add those event listeners here (on each image). Very important workflow between Context, Image and useHover!
            ref={ref}
        >
            <img src={img.url} className="image-grid" alt="" />
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

// We set propTypes so we get a warning if some wrong value type is passed:
Image.propTypes = {
    img: PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    }),
    className: PropTypes.string
}

export default Image