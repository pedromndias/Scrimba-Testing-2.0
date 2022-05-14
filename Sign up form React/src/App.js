import React from "react";


export default function App() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        passwordConfirmed: "",
        joinedNewsletter: true
    })
    console.log(formData)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        if(formData.password === formData.passwordConfirmed) {
            console.log("Succesfully signed up")
        } else {
            console.log("Passwords do not match")
            return
        }

        if(formData.joinedNewsletter) {
            console.log("Thanks for signing up for our newsletter!")
        }
    }
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <input 
                    type="password"
                    placeholder="Confirm password"
                    className="form--input"
                    name="passwordConfirmed"
                    onChange={handleChange}
                    value={formData.passwordConfirmed}
                />
                <div className="form--marketing">
                    <input 
                        type="checkbox"
                        id="okayToEmail"
                        name="joinedNewsletter"
                        onChange={handleChange}
                        checked={formData.joinedNewsletter}
                    />
                    <label htmlFor="okayToEmail">I want to join the newsletter</label>
                </div>
                <button>Sign up</button>

            </form>
        </div>
    )
}