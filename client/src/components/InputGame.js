import React, { Fragment, useState } from 'react';

const InputGame = () => {

    const [title, setTitle] = useState("")

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { title };
            const response = await fetch("http://localhost:5000/games", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/Homepage";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Input Game</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type='text' className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
};

export default InputGame;