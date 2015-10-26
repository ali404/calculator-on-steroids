import React from "react"

var Signup = React.createClass({
    render: function() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24">
                    <div className="">
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
                                <input type="submit" value="Signup" className="form-submit h6" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Signup
