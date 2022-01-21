import React, { Fragment, useState } from 'react';

const EditGame = ({ games }) => {
    const [title, setTitle] = useState(games.title);

    //edit description function

    const updateTitle = async (e) => {
        e.preventDefault();
        try {
            const body = { title };
            const response = await fetch(`http://localhost:5000/games/${games.game_id}`, {
                method: "PUT",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = '/Homepage';
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${games.game_id}`}>Edit</button>

            <div className="modal fade" id={`id${games.game_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={() => setTitle(games.title)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Game Title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setTitle(games.title)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"><input type="text" className="form-control" onChange={e => setTitle(e.target.value)} /></div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setTitle(games.title)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={e => updateTitle(e)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default EditGame;