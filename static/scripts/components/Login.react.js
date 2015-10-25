import React from "react"

var Login = React.createClass({
    render: function() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-12-24 pure-u-center">
                    <div className="pure-u-14-24">
                        <div className="hero-form--title pure-u-center">
                            <h1 className="h2">Login</h1>
                        </div>
                        <form action="/login" method="post">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <input className="form-input h5" type="text" id="username" name="username" placeholder="Username..." />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <input className="form-input h5" type="password" id="password" name="password" placeholder="Password..." />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="submit" value="Login" className="form-submit h5" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Login
