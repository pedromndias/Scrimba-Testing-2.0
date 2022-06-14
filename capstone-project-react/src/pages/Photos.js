import React, {useContext} from "react"

import Image from "../components/Image"
import {Context} from "../Context"
import {getClass} from "../utils"

function Photos() {
    // We will import allPhotos from Context so we can map through the array and render the component Image for each one:
    const {allPhotos} = useContext(Context)

    // Note how the Image component takes 2 parameters (besides the key): The image object itself (img) and a className so we call the getClass from the utils folder (for display organization purposes)
    const imagesElements = allPhotos.map((img, i) => (
        <Image key={img.id} img={img} className={getClass(i)}/>
    ))
    // We then return the result of the array mapping (to App):
    return(
        <main className="photos">
            {imagesElements}
        </main>
    )
}

export default Photos