import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'

import SignupContainer from '../../components/Signup/SignupContainer.react'

describe('Signup', () => {
    let signup
    let username
    let password
    let repeatPassword
    let message
    let signupButton
    let disabledButton

    let initFields = () => {
        username = signup.find('#signup-username')
        password = signup.find('#signup-password')
        repeatPassword = signup.find('#signup-repeat-password')
        message = signup.find('#signup-message')
        signupButton = signup.find('#signup-button')
        disabledButton = signup.find('#signup-button[disabled]')
    }

    beforeEach(() => {
        if(signup) {
            signup.unmount()
        }
        signup = mount(<SignupContainer />)
        initFields()
    })

    it('should initialise default state', () => {
        expect(signup.state().username).to.equal('')
        expect(signup.state().password).to.equal('')
        expect(signup.state().repeatPassword).to.equal('')
        expect(signup.state().validUsername).to.equal(undefined)
        expect(signup.state().validPassword).to.equal(undefined)
        expect(signup.state().validRepeatPassword).to.equal(undefined)
        expect(signup.state().shouldMessageShow).to.equal(undefined)
        expect(signup.state().isSignupSuccessful).to.equal(undefined)
    })

    it('should render the fields', () => {
        expect(username).to.exist
        expect(password).to.exist
        expect(repeatPassword).to.exist
        expect(message).to.exist
        expect(signupButton).to.exist
        expect(disabledButton).to.have.length(1)
    })

    it('should validate username', () => {
        username.simulate('change', {
            target: {
                value: '--123.',
                name: 'username'
            }
        })
        expect(signup.state().validUsername).to.equal(false)

        username.simulate('change', {
            target: {
                value: '   asd',
                name: 'username'
            }
        })
        expect(signup.state().validUsername).to.equal(false)

        username.simulate('change', {
            target: {
                value: 'ali',
                name: 'username'
            }
        })
        expect(signup.state().validUsername).to.equal(true)
    })

    it('should validate password', () => {
        password.simulate('change', {
            target: {
                value: '--  123_',
                name: 'password'
            }
        })
        expect(signup.state().validPassword).to.equal(false)

        password.simulate('change', {
            target: {
                value: '    asdd 12',
                name: 'password'
            }
        })
        expect(signup.state().validPassword).to.equal(false)

        password.simulate('change', {
            target: {
                value: 'test',
                name: 'password'
            }
        })
        expect(signup.state().validPassword).to.equal(true)
    })

    it('should validate repeat password', () => {
        repeatPassword.simulate('change', {
            target: {
                value: '  asd ll12',
                name: 'repeatPassword'
            }
        })
        expect(signup.state().validRepeatPassword).to.equal(false)

        repeatPassword.simulate('change', {
            target: {
                value: '--_123',
                name: 'repeatPassword'
            }
        })
        expect(signup.state().validRepeatPassword).to.equal(false)

        repeatPassword.simulate('change', {
            target: {
                value: '',
                name: 'repeatPassword'
            }
        })
        expect(signup.state().validRepeatPassword).to.equal(false)

        repeatPassword.simulate('change', {
            target: {
                value: 'test',
                name: 'repeatPassword'
            }
        })
        expect(signup.state().validRepeatPassword).to.equal(true)
    })

    it('should disable button on invalid fields', () => {
        // wrong username
        username.simulate('change', {
            target: {
                value: 'ali 12',
                name: 'username'
            }
        })
        initFields()
        expect(disabledButton).to.have.length(1)

        //good username and matching passwords, but invalid passwords
        username.simulate('change', {
            target: {
                value: 'ali',
                name: 'username'
            }
        })
        password.simulate('change', {
            target: {
                value: 'll',
                name: 'password'
            }
        })
        repeatPassword.simulate('change', {
            target: {
                value: 'll',
                name: 'repeatPassword'
            }
        })
        initFields()
        expect(disabledButton).to.have.length(1)

        //valid username, passwords, but unmatching
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
        repeatPassword.simulate('change', {
            target: {
                value: 'test2',
                name: 'repeatPassword'
            }
        })
        initFields()
        expect(disabledButton).to.have.length(1)
    })

    it('should enable button on valid fields', () => {
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
        repeatPassword.simulate('change', {
            target: {
                value: 'test',
                name: 'repeatPassword'
            }
        })
        initFields()
        expect(disabledButton).to.have.length(0)
    })

    it('should render the correct message', () => {
        signup.setState({
            username: 'ali',
            password: 'test',
            repeatPassword: 'test',
            validUsername: true,
            validPassword: true,
            validRepeatPassword: true,
            isSignupSuccessful: false,
            shouldMessageShow: true
        })
        initFields()
        expect(message.text()).to.equal('Something went wrong, please try again')

        signup.setState({
            isSignupSuccessful: true,
            shouldMessageShow: true
        })
        initFields()
        expect(message.text()).to.equal('Account created, go to login')
    })
})
