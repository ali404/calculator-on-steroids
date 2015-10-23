import React from "react"
import {Link} from "react-router"

var Header = React.createClass({
    render: function() {
        return (
            <div className="hero-header">
                <header className="pure-menu pure-menu-horizontal pure-g">
                    <span className="header-logo">
                        <Link to="app" className="pure-menu-link color-black--05">Fx</Link>
                    </span>
                    <nav className="header-navigation">
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item">
                                <Link to="signup" className="pure-menu-link header-navigation--link color-black--20">Signup</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to="login" className="pure-menu-link header-navigation--link color-black--20">Login</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to="logout" className="pure-menu-link header-navigation--link color-black--20">Logout</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to="profile" className="pure-menu-link header-navigation--link color-black--20">Profile</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to="functions" className="pure-menu-link header-navigation--link color-black--20">Functions</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="below-header">

                </div>
            </div>
        )
    }
})

module.exports = Header
