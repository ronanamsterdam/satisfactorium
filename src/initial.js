import React from 'react'

export default function() {
  return  <div id="initial" className="fade-on-load">
    {/* this element here is waiting for the whole page to load gracefully providing better UX */}
    <style dangerouslySetInnerHTML={{__html: `
          .fade-on-load {
            bottom:     0;
            left:       0;
            position:   fixed;
            right:      0;
            opacity:    1;
            top:        0;
            transition: all ease .5s;
            z-index:    10000;
        }
        .initial-content {
            align-items:       center;
            background:        #FAFAFA;
            display:           flex;
            height:            100%;
            justify-content:   center;
        }
    `}}/>
    <div className="initial-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f14ac2">
        <path d="M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="360 12 12"
              to="0 12 12"
              begin="0s"
              dur="1.5s"
              repeatCount="indefinite" />
        </path>
      </svg>
      <noscript key="noscript" id="gatsby-noscript">
            This app works best with JavaScript enabled. No seriously, just enable it.
      </noscript>
    </div>
  </div>
}