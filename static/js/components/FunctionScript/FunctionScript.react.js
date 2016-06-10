import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class FunctionScript extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <script
                id={this.props.id}
            >
                {this.props.fullBody}
            </script>
        )
    }
}
