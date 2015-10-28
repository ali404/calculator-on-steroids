import React from "react"
import {Router, Navigation, Link, RouteHandler} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var Header = React.createClass({
    mixins: [Navigation],

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
                <div onClick={this._logoutUser} className="pure-menu-link header-navigation--link color-black--20 h6">Logout</div>
            </li>)
        }
        else {
            links.push(<li className="pure-menu-item" key="signup">
                <Link to="signup" className="pure-menu-link header-navigation--link color-black--20">Signup</Link>
            </li>)

            links.push(<li className="pure-menu-item" key="login">
                <Link to="login" className="pure-menu-link header-navigation--link color-black--20">Login</Link>
            </li>
            )
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
    },

    _logoutUser: function() {
        UserActions.logout()
        this.transitionTo("calculator")
    }
})

module.exports = Header
