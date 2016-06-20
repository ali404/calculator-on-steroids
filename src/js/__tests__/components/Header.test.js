import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import Header from '../../components/Header.react'

describe('Header', () => {
    let location
    let header
    let loginMenu
    let signupMenu
    let homeMenu
    let profileMenu
    let logoutMenu

    let menuTitle

    let initMenu = () => {
        loginMenu = header.find('#header-item-login')
        signupMenu = header.find('#header-item-signup')
        homeMenu = header.find('#header-item-home')
        profileMenu = header.find('#header-item-profile')
        logoutMenu = header.find('#header-item-logout')

        menuTitle = header.find('#header-title').first()
    }

    beforeEach(() => {
        location = {
            pathname: '/'
        }

        header = mount(<Header location={location} />)
        initMenu()
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

        expect(logoutMenu).to.have.length(0)
        expect(profileMenu).to.have.length(0)

        header.setState({
            'isLoggedIn': true
        })

        initMenu()

        expect(logoutMenu).to.exist
        expect(logoutMenu).to.have.length(1)
        logoutMenu = logoutMenu.first()
        expect(logoutMenu.text()).to.equal('Logout')

        expect(profileMenu).to.exist
        expect(profileMenu).to.have.length(1)
        profileMenu = profileMenu.first()
        expect(profileMenu.text()).to.equal('Profile')

        expect(homeMenu).to.exist
        expect(homeMenu).to.have.length(1)
        homeMenu = homeMenu.first()
        expect(homeMenu.text()).to.equal('Calculator')

        expect(loginMenu).to.have.length(0)
        expect(signupMenu).to.have.length(0)
    })

    it('should render the correct title', () => {
        expect(menuTitle.text()).to.equal('Calculator')

        header = mount(<Header location={{pathname: '/profile'}} />)
        initMenu()
        expect(menuTitle.text()).to.equal('Profile')

        header = mount(<Header location={{pathname: '/login'}} />)
        initMenu()
        expect(menuTitle.text()).to.equal('Login')

        header = mount(<Header location={{pathname: '/signup'}} />)
        initMenu()
        expect(menuTitle.text()).to.equal('Signup')
    })
})
