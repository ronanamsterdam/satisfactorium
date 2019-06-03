import React, { Component } from "react";
import style            from "./style.module.less";

import Square from "./sqaure";

export default class Sqauares extends Component {
  render = () => {
    const {items} = this.props
    return (
      <div className={style.container}>
        <div className={style.content}>
          <div
              className={style.resultsContainer}
          >
              <div className={
                  [
                      style.grid,
                      style.searchResultsContainer,
                  ].join(' ')
              }>
                  {
                      Array.from({length: 231}, (v, i) => i).map((item,idx) => (
                              <Square
                                {...item}
                                key={idx}
                              />
                      ))
                  }
              </div>
          </div>
        </div>
      </div>
    )
  }
}