import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class FunctionScript extends Base {
    constructor() {
        super()
    }

    // A VERY BAD HACK
    // I hate myself for doing this. if you, dear the reader
    // have a better way to do this, the react way, please message ali404
    render() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.id = this.props.id;
        script.defer = true;
        script.async = true;
        script.text = this.props.fullBody

        head.appendChild(script)

        return (
            <div></div>
        )
    }
}
