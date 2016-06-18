import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'

import App from '../../components/App.react'

describe('App', () => {
    it('should render', () => {
        let location = {
            pathname: '/'
        }

        let app = mount(
            <App
                children={null}
                location={location} />
        )
        expect(app).to.exist
    })
})
