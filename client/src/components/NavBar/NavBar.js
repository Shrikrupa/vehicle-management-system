import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/view'>View</NavLink>
                <NavLink to='/'>About</NavLink>
                <NavLink to='/'>Contact</NavLink>
                <b style={{ fontSize: "2rem", paddingLeft: "50rem", color: "#0ace27" }}>
                    MotorQ
                </b>
            </nav>
        </>
    );
}
export default NavBar;