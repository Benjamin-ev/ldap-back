(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[508],{7555:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modify",function(){return s(7853)}])},7853:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return u}});var i=s(5893),r=s(9008),t=s.n(r),a=s(7294),o=s(4844),l=s.n(o),c=s(1163),d=s.n(c);function u(){var e=(0,a.useState)(),n=e[0],s=e[1],r=(0,a.useState)(),o=r[0],c=r[1],u=(0,a.useState)(!1),m=u[0],h=u[1],f=(0,a.useState)({mail:"",mobile:"",userPassword:""}),p=f[0],x=f[1],_=function(e){return function(n){var s=p;s[e]=n.target.value,x(s)}};return(0,i.jsxs)("div",{className:l().container,children:[(0,i.jsxs)(t(),{children:[(0,i.jsx)("meta",{name:"description",content:"User page for boquette FR"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,i.jsx)("title",{children:"A&M Angers - Utilisateur"})]}),(0,i.jsx)("header",{className:l().header,children:(0,i.jsx)("h1",{children:"Interface de gestion utilisateur"})}),(0,i.jsx)("main",{className:l().main,children:(0,i.jsxs)("form",{className:l().form,onSubmit:function(e){e.preventDefault(),console.log(p),fetch("https://utilisateur.boquette.fr/api/user",{method:"PUT",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({uid:n,password:o,user:p})}).then((function(e){200==e.status?d().push("/"):h(!0)}))},children:[m?(0,i.jsx)("p",{className:l().field,children:"Hum ? Vos identifiants ne semblent pas fonctionner..."}):void 0,(0,i.jsxs)("div",{className:l().subForm,children:[(0,i.jsx)("h1",{children:"Mes informations de v\xe9rification"}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Nom d'utilisateur"}),(0,i.jsx)("input",{type:"text",placeholder:"prenom.nom.annee",onChange:function(e){return s(e.target.value)},className:l().card,required:!0})]}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Mot de passe"}),(0,i.jsx)("input",{type:"password",onChange:function(e){return c(e.target.value)},className:l().card})]})]}),(0,i.jsx)("h1",{children:"Modifier mes informations (Ne modifiez que le n\xe9cessaire, le reste sera inchang\xe9)"}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Adresse Mail"}),(0,i.jsx)("input",{type:"text",placeholder:"prenom.nom@mail.fr",onChange:_("mail"),className:l().card})]}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Num\xe9ro de t\xe9l\xe9phone"}),(0,i.jsx)("input",{type:"text",placeholder:"06/07",onChange:_("mobile"),className:l().card})]}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Nouveau Mot de Passe"}),(0,i.jsx)("input",{type:"password",onChange:_("userPassword"),className:l().card})]}),(0,i.jsx)("div",{children:(0,i.jsx)("button",{type:"submit",className:l().bouton,children:"Modifier"})})]})})]})}},4844:function(e){e.exports={container:"modify_container__gx_te",header:"modify_header__ujClP",main:"modify_main__qfVzN",form:"modify_form__Mni1V",subForm:"modify_subForm__U9jBQ",card:"modify_card__7kgis",bouton:"modify_bouton__18nHU"}}},function(e){e.O(0,[774,888,179],(function(){return n=7555,e(e.s=n);var n}));var n=e.O();_N_E=n}]);