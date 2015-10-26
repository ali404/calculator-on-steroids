import React from "react"
import Router from "react-router"
import UserStore from "../stores/UserStore"

var Link = Router.Link
var RouteHandler = Router.RouteHandler

var Header = React.createClass({

    render: function() {
        var links = []
        if(UserStore.isLoggedIn()) {
            links.push(
            <li className="pure-menu-item" key="profile">
                <Link to="profile" className="pure-menu-link header-navigation--link color-black--20">Profile</Link>
            </li>)

            links.push(<li className="pure-menu-item" key="functions">
                <Link to="functions" className="pure-menu-link header-navigation--link color-black--20">Functions</Link>
            </li>)

            links.push(<li className="pure-menu-item" key="logout">
                <Link to="logout" className="pure-menu-link header-navigation--link color-black--20">Logout</Link>
            </li>)
        }
        else {
            links.push(<li className="pure-menu-item" key="signup">
                <Link to="signup" className="pure-menu-link header-navigation--link color-black--20">Signup</Link>
            </li>)

            links.push(<li className="pure-menu-item" key="login">
                <Link to="login" className="pure-menu-link header-navigation--link color-black--20">Login</Link>
            </li>)
        }

        return (
            <header className="hero-header pure-menu pure-menu-horizontal">
                <span className="header-logo">
                    <Link to="calculator" className="pure-menu-link color-black--05">Fx</Link>
                </span>
                <nav className="header-navigation">
                    <ul className="pure-menu-list">
                        {links}
                    </ul>
                </nav>
            </header>
        )
    }
})

module.exports = Header
