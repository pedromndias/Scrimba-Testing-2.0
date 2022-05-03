import Story from "../components/Story.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js"
import Comment from "../components/Comment.js";

export default async function Item() {
    let story = null
    let hasComments = false
    let hasError = false
    
    try {
        story = await getStory()
        hasComments = story.comments.length > 0
    } catch(error) {
        hasError = true
        console.error(error)
    }

    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story</div>`
    }

    view.innerHTML = `
    <div>
        ${Story(story)}
    </div>
    <hr>
    ${hasComments ? story.comments.map(comment => Comment(comment)).join("") : "No comments"}
    `
}

async function getStory() {
    /* Note that to get id from the URL we can access the window location' hash (#) 
    and use the split function to get the second part of the returned array 
    (ex: ["#/item", "21702424"]) */
    const storyId = window.location.hash.split('?id=')[1];
    // Then we can use the storyId on /item/:itemId to get the specific story
    const response = await fetch(`${baseUrl}/item/${storyId}`)
    const story = await response.json()
    return story
}