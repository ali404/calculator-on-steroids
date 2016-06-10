import React from 'react'
import Base from '../_helpers/BaseComponent'

import Header from '../Header.react'

import classnames from 'classnames'

export default class App extends Base {
    constructor() {
        super()
    }

    render() {
        let appClassnames = classnames({
            'app': true,
            'nav-expanded': this.isNavigationExpanded,
            'nav-collapsed': !this.isNavigationExpanded
        })

        return (
            <div className={appClassnames}>
                <Header />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
