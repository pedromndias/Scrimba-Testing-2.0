import React, {useState} from "react"

function App() {
    const [inputData, setInputData] = useState({firstName: "", lastName: ""})
    const [contactsData, setContactsData] = useState([])

    function handleChange(e) {
        const {name, value} = e.target
        setInputData(prevStat => ({...prevStat, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        setContactsData(prevStat => [...prevStat, inputData])
    }

    const contacts = contactsData.map(item => <h2 key={item.firstName+item.lastName}> {item.firstName} {item.lastName}</h2>)

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="First Name"
                    name="firstName"
                    value={inputData.firstName}
                    onChange={handleChange}
                />
                <input 
                    placeholder="Last Name"
                    name="lastName"
                    value={inputData.lastName}
                    onChange={handleChange}
                />
                <br />
                <button>Add Contact</button>
                {contacts}
            </form>
        </>
    )
}

export default App