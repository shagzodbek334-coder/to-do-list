import React from 'react'
import { MdOutlineDarkMode } from 'react-icons/md'

function Nav() {
    return (
        <nav>
            <div className="logo">
                <h2>
                    Vazifalar ro'yxati
                </h2>
            </div>

            <div className="dark">
                <span><MdOutlineDarkMode /></span>

            </div>

        </nav>
    )
}

export default Nav