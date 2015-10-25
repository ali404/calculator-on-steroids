import React from "react"

var Signup = React.createClass({
    render: function() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-12-24 pure-u-center">
                    <div className="pure-u-14-24">
                        <div className="hero-form--title">
                            <h1 className="h2">Signup</h1>
                        </div>
                        <form action="/signup" method="post">
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
                                <input type="submit" value="Signup" className="form-submit h5" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Signup
