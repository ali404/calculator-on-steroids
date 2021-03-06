import React from "react"
import {Router, Link, RouteHandler, browserHistory} from "react-router"


import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./_helpers/BaseComponent"
import AppActions from "../actions/AppActions"

export default class Header extends BaseComponent {

    constructor() {
        super()
        this._bind(
            '_logoutUser',
            '_onChange',
            '_revealNavigation',
            '_getHeaderState',
            '_getRouteNameFromLocation',
            '_getClassNameFromLocation'
        )

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
        var links = []
        let page = this._getRouteNameFromLocation(this.props.location.pathname)
        let headerClass = "hero-header "
            + this._getClassNameFromLocation(this.props.location.pathname)

        links.push(
            <li className="header-list--item" key="home">
                <Link
                    to="/"
                    activeClassName="active"
                    className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i
                            className="material-icons color-blue">
                            bubble_chart
                        </i>
                    </span>
                    <span
                        className="header-list--item__text"
                        id="header-item-home">
                        Calculator
                    </span>
                </Link>
            </li>
        )
        if(this.state.isLoggedIn) {
            links.push(
                <li className="header-list--item" key="profile">
                    <Link
                        to="/profile"
                        activeClassName="active"
                        className="header-list--item__link header-navigation--link">
                        <span className="header-list--item__icon">
                            <i
                                className="material-icons color-orange">
                                person
                            </i>
                        </span>
                        <span
                            className="header-list--item__text"
                            id="header-item-profile">
                            Profile
                        </span>
                    </Link>
                </li>
            )

            links.push(
                <li className="header-list--item" key="logout">
                    <div
                        onClick={this._logoutUser}
                        className="header-list--item__link header-navigation--link h6">
                        <span
                            className="header-list--item__icon">
                            <i
                                className="material-icons color-red">
                                exit_to_app
                            </i>
                        </span>
                        <span
                            className="header-list--item__text"
                            id="header-item-logout">
                            Logout
                        </span>
                    </div>
                </li>
            )
        }
        else {
            links.push(<li className="header-list--item" key="signup">
                <Link
                    to="/signup"
                    activeClassName="active"
                    className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i
                            className="material-icons color-purple">
                            person_add
                        </i>
                    </span>
                    <span
                        className="header-list--item__text"
                        id="header-item-signup">
                        Signup
                    </span>
                </Link>
            </li>)

            links.push(<li className="header-list--item" key="login">
                <Link
                    to="/login"
                    activeClassName="active"
                    className="header-list--item__link header-navigation--link">
                    <span className="header-list--item__icon">
                        <i
                            className="material-icons color-green">
                            keyboard_arrow_right
                        </i>
                    </span>
                    <span
                        className="header-list--item__text"
                        id="header-item-login">
                        Login
                    </span>
                </Link>
            </li>
            )
        }

        return (
            <header className={headerClass}>
                <div
                    onClick={this._revealNavigation}
                    className="hero-header--switch">
                    <i className="material-icons md-light">menu</i>
                </div>
                <span
                    className="header-logo"
                    id="header-title">
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
        this.props.router.replace('/')
        UserActions.logout()
    }

    _revealNavigation() {
        AppActions.changeNavigationState()
    }

    _getRouteNameFromLocation(location) {
        return {
            '/': 'Calculator',
            '/login': 'Login',
            '/signup': 'Signup',
            '/profile': 'Profile',
        }[location]
    }

    _getClassNameFromLocation(location) {
        return {
            '/': 'color-bg-blue',
            '/login': 'color-bg-green',
            '/signup': 'color-bg-purple',
            '/profile': 'color-bg-orange',
        }[location]
    }
}
