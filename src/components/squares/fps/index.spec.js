import React from 'react'

import Fps from './index'

describe(`fps meter`, () => {
  test(`renders fps`, () => {
    expect(shallow(<Fps />)).toMatchSnapshot();
  })
})
