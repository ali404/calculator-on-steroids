import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'

import LoginContainer from '../../components/Login/LoginContainer.react'

describe('Login', () => {
    let login
    let username
    let password
    let loginButton
    let message

    let initFields = () => {
        username = login.find('#login-username')
        password = login.find('#login-password')
        loginButton = login.find('#login-button')
        message = login.find('#login-message')
    }

    beforeEach(() => {
        if(login) {
            login.unmount()
        }

        login = mount(<LoginContainer />)
        initFields()
    })

    it('should initialise default state', () => {
        expect(login.state().username).to.equal('')
        expect(login.state().password).to.equal('')
        expect(login.state().validUsername).to.equal(undefined)
        expect(login.state().validPassword).to.equal(undefined)
        expect(login.state().isLoginSuccessful).to.equal(undefined)
        expect(login.state().shouldMessageShow).to.equal(undefined)
    })

    it('should render expected fields', () => {
        expect(username).to.exist
        expect(password).to.exist
        expect(loginButton).to.exist
        expect(message).to.exist
    })

    it('should validate username', () => {
        username.simulate('change', {
            target: {
                value: 'a-12312nja',
                name: 'username'
            }
        })
        expect(login.state().validUsername).to.equal(false)

        username.simulate('change', {
            target: {
                value: 'ali',
                name: 'username'
            }
        })
        expect(login.state().validUsername).to.equal(true)
    })

    it('should validate password', () => {
        password.simulate('change', {
            target: {
                value: 'hkjnk..../,',
                name: 'password'
            }
        })
        expect(login.state().validPassword).to.equal(false)

        password.simulate('change', {
            target: {
                value: 'password_for_the_win',
                name: 'password'
            }
        })
        expect(login.state().validPassword).to.equal(true)
    })

    it('should disable button on invalid fields', () => {
        username.simulate('change', {
            target: {
                value: '--../asd',
                name: 'username'
            }
        })
        expect(login.find('#login-button[disabled]')).to.have.length(1)

        username.simulate('change', {
            target: {
                value: 'ali',
                name: 'username'
            }
        })
        password.simulate('change', {
            target: {
                value: '0..321/',
                name: 'password'
            }
        })
        expect(login.find('#login-button[disabled]')).to.have.length(1)

        username.simulate('change', {
            target: {
                value: '',
                name: 'username'
            }
        })
        password.simulate('change', {
            target: {
                value: '',
                name: 'password'
            }
        })
        expect(login.find('#login-button[disabled]')).to.have.length(1)

        username.simulate('change', {
            target: {
                value: 'ali',
                name: 'username'
            }
        })
        password.simulate('change', {
            target: {
                value: 'test',
                name: 'password'
            }
        })
        expect(login.find('#logind-button[disabled]')).to.have.length(0)
    })

    it('should render the correct message', () => {
        login.setState({
            isLoginSuccessful: true,
            shouldMessageShow: true,
            username: 'ali',
            validUsername: true,
            password: 'test',
            validPassword: true
        })
        initFields()
        expect(message.text()).to.equal('You are now logged in!')

        login.setState({
            isLoginSuccessful: false,
            shouldMessageShow: true
        })
        initFields()
        expect(message.text())
            .to.equal('Something went wrong, please try again')

    })
})
