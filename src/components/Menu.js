import React from 'react';
import './Menu.css';

const Menu = ({functions}) => {
    return (
        <div className="top-bar">
            <div onClick={functions.F}>F</div>
            <div onClick={functions.Nc}>Nc</div>
        </div>
    )
}

export default Menu;