import {useState, useEffect, useRef} from "react"

// This Ref Hook will allow us to interact with some event listeners depending on the "hovered" state
function useHover() {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)

    function enter() {
        setHovered(true)
    }

    function leave() {
        setHovered(false)
    }

    // Event listeners must be placed inside an Effect Hook.
    useEffect(() => {
        // We can use the .current key on our ref and add event listeners to it.
        // In this case we save it as a variable: target (to avoid console warning)
        // Each event will call a different function (declared above)
        const target = ref.current
        target.addEventListener("mouseenter", enter)
        target.addEventListener("mouseleave", leave)

        // Cleaning function for when the component unmounts:
        return () => {
            target.removeEventListener("mouseenter", enter)
            target.removeEventListener("mouseleave", leave)
        }

    }, [])

    // We return the state (hovered) and ref (so we can reference the item we want on the component and add those event listeners)
    return [hovered, ref]
}

export default useHover