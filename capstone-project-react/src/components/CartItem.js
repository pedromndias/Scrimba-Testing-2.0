import React, {useContext} from "react";
import PropTypes from "prop-types"
import {Context} from "../Context"
import useHover from "../hooks/useHover";

function CartItem({item}) {
    const [hovered, ref] = useHover()
    const {removeFromCart} = useContext(Context)

    // The delete button will display different depending on the hovered state:
    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return(
        <div className="cart-item">
            <i 
                className={iconClassName}

                onClick={() => removeFromCart(item.id)}
                // Note the ref here so we can add those event listeners to the delete button:
                ref={ref}
            >
            </i>

            <img src={item.url} width="130px" alt=""/>
            <p>$5.99</p>
        </div>
    )
}

// PropTypes will make sure we are passing a string as the url and it is required:
CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem