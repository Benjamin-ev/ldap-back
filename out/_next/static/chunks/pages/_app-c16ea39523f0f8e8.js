(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1118:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return t(3824)}])},3824:function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),o.forEach((function(n){r(e,n,t[n])}))}return e}function i(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}t.r(n),t.d(n,{default:function(){return O}});var s=t(5893);t(906);function c(e,n,t,r,o,i,s){try{var c=e[i](s),a=c.value}catch(u){return void t(u)}c.done?n(a):Promise.resolve(a).then(r,o)}var a=t(4051),u=t.n(a),p=t(887),f=t.n(p),l=t(7294),d=t(5697),h=t.n(d),m=t(9008),b=t.n(m);function y(e){var n=e.setToken,t=(0,l.useState)(),r=t[0],o=t[1],i=(0,l.useState)(),a=i[0],p=i[1],d=(0,l.useState)(!1),h=d[0],m=d[1],y=function(){var e,t=(e=u().mark((function e(t){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),fetch("https://utilisateur.boquette.fr/api/auth",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},body:JSON.stringify({username:r,password:a}),credentials:"include"}).then((function(e){if(200==e.status)return e.json();m(!0)})).then((function(e){e&&n(e.xsrfToken)}));case 2:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function s(e){c(i,r,o,s,a,"next",e)}function a(e){c(i,r,o,s,a,"throw",e)}s(void 0)}))});return function(e){return t.apply(this,arguments)}}();return(0,s.jsxs)("div",{className:f().container,children:[(0,s.jsxs)(b(),{children:[(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,s.jsx)("title",{children:"A&M Boquette - Connexion"})]}),(0,s.jsx)("header",{className:f().header,children:(0,s.jsx)("h1",{children:"Interface de gestion utilisateur"})}),(0,s.jsxs)("main",{className:f().main,children:[h?(0,s.jsx)("p",{className:f().field,children:"Hum ? Vos identifiants ne semblent pas fonctionner..."}):void 0,(0,s.jsxs)("form",{className:f().form,onSubmit:y,children:[(0,s.jsx)("h1",{children:"Connectez-vous"}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Nom d'utilisateur"}),(0,s.jsx)("input",{type:"text",onChange:function(e){return o(e.target.value)},className:f().card,required:!0})]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Mot de passe"}),(0,s.jsx)("input",{type:"password",onChange:function(e){return p(e.target.value)},className:f().card,required:!0})]}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{type:"submit",className:f().bouton,children:"Connexion"})})]})]})]})}y.propTypes={setToken:h().func.isRequired};var j=t(1163);function O(e){var n=e.Component,t=e.pageProps,r=(0,l.useState)(!1),c=r[0],a=r[1],u=function(){var e=(0,l.useState)(function(){var e=localStorage.getItem("token");if("undefined"!==e)return JSON.parse(e)}()),n=e[0],t=e[1];return{setToken:function(e){localStorage.setItem("token",JSON.stringify(e)),t(e)},token:n}}(),p=u.token,f=u.setToken,d=(0,j.useRouter)();return(0,l.useEffect)((function(){a(!0)}),[]),c?["/users","/groups"].includes(d.pathname)?p?(0,s.jsx)(n,o({},t)):(0,s.jsx)(y,i(o({},t),{setToken:f})):(0,s.jsx)(n,o({},t)):null}},887:function(e){e.exports={container:"Login_container__948hg",header:"Login_header__new92",main:"Login_main__evomJ",form:"Login_form__uAztA",card:"Login_card__ZjoqK",bouton:"Login_bouton__dmoqp"}},906:function(){},9008:function(e,n,t){e.exports=t(5443)},1163:function(e,n,t){e.exports=t(387)},2703:function(e,n,t){"use strict";var r=t(414);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,n,t,o,i,s){if(s!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:i,resetWarningCache:o};return t.PropTypes=t,t}},5697:function(e,n,t){e.exports=t(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},function(e){var n=function(n){return e(e.s=n)};e.O(0,[774,179],(function(){return n(1118),n(387)}));var t=e.O();_N_E=t}]);