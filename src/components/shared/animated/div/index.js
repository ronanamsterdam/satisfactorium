import React from 'react'
import posed from 'react-pose';

const AnimatedView = posed.div({
  enter: { opacity: 1,  y: 0, transition: { duration: 500 } },
  exit: { opacity: 0, y: -30, transition: { duration: 500 } },
});

export default ({children, ...props}) => <AnimatedView pose="enter" initialPose="exit" {...props}>{children}</AnimatedView>
