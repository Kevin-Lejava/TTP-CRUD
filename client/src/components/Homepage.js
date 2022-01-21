import React, { Fragment } from 'react';
import '../App.css';
import InputGame from './InputGame';
import ListGames from './ListGames';

function Homepage() {
    return (
        <Fragment>
            <div className='container'>
                <h1>Welcome!</h1>
                <InputGame />
                <ListGames />
            </div>
        </Fragment>
    );
}

export default Homepage;
