import React from 'react'
import { useSpring, animated } from 'react-spring'

export default function SlideDown(Component) {
    let propSpring = useSpring({
        from: {
            marginTop: '-100px'
        },
        to: {
            marginTop: '0'
        },
        config: {
            duration: 500
        }
    })
    return (
        <animated.div style={propSpring}>
            <Component />
        </animated.div>
    )
}
