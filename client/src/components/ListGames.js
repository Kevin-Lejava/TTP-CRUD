import React, { Fragment, useEffect, useState } from 'react';
import EditGame from './EditGame'

const ListGames = () => {

    const [games, setGames] = useState([]);

    //delete function
    const deleteGame = async (id) => {
        try {
            const deleteGame = await fetch(`http://localhost:5000/games/${id}`, {
                method: "DELETE"
            });
            setGames(games.filter(game => games.game_id !== id));
            window.location = "/Homepage";
        } catch (err) {
            console.error(err.message)
        }
    }

    const getGames = async () => {
        try {
            const response = await fetch("http://localhost:5000/games")
            const jsonData = await response.json();
            setGames(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getGames();
    }, []);

    console.log(games);

    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.game_id}>
                            <td>{game.title}</td>
                            <td><EditGame games={game} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteGame(game.game_id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </Fragment>
    )
}

export default ListGames;