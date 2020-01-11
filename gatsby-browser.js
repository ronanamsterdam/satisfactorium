/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  if(window !== 'undefined') window.onload = () => {
    // this will remove the initial loading div
    var parent=document.body;var child=document.getElementById('initial');if(child!==null){child.style.opacity=0;setTimeout(function(){parent && child && parent.removeChild(child) && document.body.removeAttribute('onload') && (document.body.onload=null);},500);}
   }
}