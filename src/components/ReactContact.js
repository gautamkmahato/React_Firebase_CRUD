import React, { useState } from 'react'

function ReactContact() {
    const [user, setUser] = useState({name: "", contact: ""});

    const getHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user, [name]: value})
    }
    
    const submitData = async (e) => {
        e.preventDefault();
        const {name, contact} = user;

        const res = await fetch(`https://reactcontact-3cc12-default-rtdb.firebaseio.com/reactFormData.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    contact: contact
                })
            }
        );
        if(res){
            setUser({
                name: "",
                contact: ""
            });
        }
    
    }

    return (
        <>
            <div>React Contact Form</div>

            <form method='POST'>
                Name: <input type="text" value={user.name} onChange={getHandler} name='name' />
                Contact: <input type="text" value={user.contact} onChange={getHandler} name='contact' />
                <button onClick={submitData}>Submit</button>
            </form>
        </>
    )
}

export default ReactContact;