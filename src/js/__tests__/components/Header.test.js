import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import Header from '../../components/Header.react'

describe('Header', () => {
    let location
    let header

    beforeEach(() => {
        location = {
            pathname: '/'
        }

        header = mount(<Header location={location} />)
    })

    it('should render', () => {
        expect(header).to.exist
    })

    it('should initialise state', () => {
        expect(header.state().isLoggedIn).to.equal(false)
        expect(header.state().isNavigationExpanded).to.equal(false)
        expect(header.state().navClass).to.equal('collapsed')
    })

    it('should render the correct menu',  () => {
        let loginMenu = header.find('#header-item-login')
        let signupMenu = header.find('#header-item-signup')
        let homeMenu = header.find('#header-item-home')

        expect(loginMenu).to.exist
        expect(loginMenu).to.have.length(1)
        loginMenu = loginMenu.first()
        expect(loginMenu.text()).to.equal('Login')

        expect(signupMenu).to.exist
        expect(signupMenu).to.have.length(1)
        signupMenu = signupMenu.first()
        expect(signupMenu.text()).to.equal('Signup')

        expect(homeMenu).to.exist
        expect(homeMenu).to.have.length(1)
        homeMenu = homeMenu.first()
        expect(homeMenu.text()).to.equal('Calculator')
    })
})
