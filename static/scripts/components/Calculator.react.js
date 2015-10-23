import React from "react"
import Header from "Header.react"
import Footer from "Footer.react"

var Calculator = React.createClass({

    render: function() {
        <div>
            <Header />
                <Calculator />
            <Footer />
        </div>
    }
})

module.exports = Calculator
