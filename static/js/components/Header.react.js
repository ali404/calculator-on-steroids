import React from "react"
import {Router, Link, RouteHandler} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./_helpers/BaseComponent"
import AppActions from "../actions/AppActions"

export default class Header extends BaseComponent {

    constructor() {
        super()
        this._bind(
            "_logoutUser",
            "_onChange",
            "_revealNavigation",
            "_getHeaderState"
        )

        UserActions.getUserDetails()
        this.state = this._getHeaderState()
    }

    _getHeaderState() {
        return {
            isLoggedIn: UserStore.isLoggedIn(),
            isNavigationExpanded: false,
            navClass: "collapsed"
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.addChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getHeaderState())
    }

    render() {
        var pages = {
            "/profile": "Dashboard",
            "/": "Calculator",
            "/login": "Login",
            "/signup": "Signup",
            "/functions": "Shared Functions",
        }
        var links = []
        let page = "Calculator"

        links.push(
            <li className="header-list--item" key="home">
                <Link to="/" className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i className="material-icons color-blue">home</i>
                    </span>
                    <span className="header-list--item__text">Calculator</span>
                </Link>
            </li>
        )
        if(this.state.isLoggedIn) {
            links.push(
                <li className="header-list--item" key="profile">
                    <Link to="/profile" className="header-list--item__link header-navigation--link">
                        <span className="header-list--item__icon">
                            <i className="material-icons color-blue">dashboard</i>
                        </span>
                        <span className="header-list--item__text">Dashboard</span>
                    </Link>
                </li>
            )

            links.push(
                <li className="header-list--item" key="functions">
                    <Link to="/functions" className="header-list--item__link header-navigation--link">
                        <span className="header-list--item__icon">
                            <i className="material-icons color-green">functions</i>
                        </span>
                        <span className="header-list--item__text">Functions</span>
                    </Link>
                </li>
            )

            links.push(
                <li className="header-list--item" key="logout">
                    <div onClick={this._logoutUser} className="header-list--item__link header-navigation--link h6">
                        <span className="header-list--item__icon">
                            <i className="material-icons color-red">cancel</i>
                        </span>
                        <span className="header-list--item__text">Logout</span>
                    </div>
                </li>
            )
        }
        else {
            links.push(<li className="header-list--item" key="signup">
                <Link to="/signup" className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i className="material-icons color-blue">get_app</i>
                    </span>
                    <span className="header-list--item__text">Signup</span>
                </Link>
            </li>)

            links.push(<li className="header-list--item" key="login">
                <Link to="/login" className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i className="material-icons color-green">done</i>
                    </span>
                    <span className="header-list--item__text">Login</span>
                </Link>
            </li>
            )
        }

        return (
            <header className="hero-header pure-menu pure-menu-horizontal">
                <div onClick={this._revealNavigation} className="hero-header--switch">
                    <i className="material-icons md-light">menu</i>
                </div>
                <span className="header-logo">
                    {page}
                </span>
                <nav className="header-navigation">
                    <ul className="header-list">
                        {links}
                    </ul>
                </nav>
            </header>
        )
    }

    _logoutUser() {
        UserActions.logout()
        this.context.router.transitionTo("calculator")
    }

    _revealNavigation() {
        AppActions.changeNavigationState()
    }
}
