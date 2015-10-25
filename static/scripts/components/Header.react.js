import React from "react"
import Router from "react-router"

var Link = Router.Link
var RouteHandler = Router.RouteHandler

var Header = React.createClass({
    render: function() {
        return (
            <header className="hero-header pure-menu pure-menu-horizontal">
                <span className="header-logo">
                    <Link to="calculator" className="pure-menu-link color-black--05">Fx</Link>
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
        )
    }
})

module.exports = Header
