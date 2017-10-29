import React from 'react'
import { render } from 'react-dom'

import './css/example.css'

debugger;

render(
    <p>Hello world!</p>,
    document.getElementById('app')
)

var someIgnoredFunction = () => {
    const does = "nothing",
        but = "increases bundle size!"
}