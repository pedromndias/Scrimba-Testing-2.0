import React, {useState, useEffect} from "react"

// Create an instance of Context
const Context = React.createContext()

function ContextProvider({children}) {
    // Create state for all photos and cart items (both empty arrays in the beginning)
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"

    // Fetch the above url and set state with the photos
    // Note that fetching must be done through an Effect Hook
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])

    // Create a function ot toggle between Favorite and not Favorite (heart)
    function toggleFavorite(id) {
        // We create a new array, mapping the original and finding the item to favorite (by its id)
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                // console.log(photo.id)
                // Remember that it is an array of objects:
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        setAllPhotos(updatedArr)
    }

    // Function to add an item
    function addToCart(newItem) {
        setCartItems(prevItems => [...prevItems, newItem])
    }

    // Function to remove an item (we filter by its id)
    function removeFromCart(id) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    // Function to empty cart (just set state as an empty array)
    function emptyCart() {
        setCartItems([])
    }

    return(
        // Note how when returning, we need to provide all those variables as values, so the Context consumers can use them
        <Context.Provider value={{allPhotos, toggleFavorite, cartItems, addToCart, removeFromCart, emptyCart}}>
            {children}
        </Context.Provider>
    )
}

// Export the function and the Context itself:
export {ContextProvider, Context}