(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{9344:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return s(8812)}])},8812:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return c}});var i=s(5893),t=s(9008),r=s.n(t),o=s(7294),a=s(4844),d=s.n(a);function c(){var e=(0,o.useState)(),n=e[0],s=e[1],t=(0,o.useState)(),a=t[0],c=t[1],l=(0,o.useState)(!1),u=l[0],m=l[1],h=(0,o.useState)(),f=h[0],p=h[1];return(0,i.jsxs)("div",{className:d().container,children:[(0,i.jsxs)(r(),{children:[(0,i.jsx)("meta",{name:"description",content:"User page for boquette FR"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,i.jsx)("title",{children:"A&M Angers - Utilisateur"})]}),(0,i.jsx)("header",{className:d().header,children:(0,i.jsx)("h1",{children:"Interface de gestion utilisateur"})}),(0,i.jsxs)("main",{className:d().main,children:[(0,i.jsxs)("form",{className:d().form,onSubmit:function(e){e.preventDefault(),fetch("https://utilisateur.boquette.fr/api/user",{method:"GET",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*",uid:n,password:a}}).then((function(e){if(200==e.status)return e.json();m(!0)})).then((function(e){return p(e[0])}))},children:[u?(0,i.jsx)("p",{className:d().field,children:"Hum ? Vos identifiants ne semblent pas fonctionner..."}):void 0,(0,i.jsxs)("div",{className:d().subForm,children:[(0,i.jsx)("h1",{children:"Connectez-vous pour voir vos informations"}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Nom d'utilisateur"}),(0,i.jsx)("input",{type:"text",placeholder:"prenom.nom.annee",onChange:function(e){return s(e.target.value)},className:d().card,required:!0})]}),(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{children:"Mot de passe"}),(0,i.jsx)("input",{type:"password",onChange:function(e){return c(e.target.value)},className:d().card})]})]}),(0,i.jsx)("div",{children:(0,i.jsx)("button",{type:"submit",className:d().bouton,children:"Voir mes informations"})})]}),f?(0,i.jsxs)("div",{children:[(0,i.jsxs)("p",{children:["Nom d'utilisateur : ",f.uid]}),(0,i.jsxs)("p",{children:["Nom : ",f.sn]}),(0,i.jsxs)("p",{children:["Pr\xe9nom : ",f.givenName]}),(0,i.jsxs)("p",{children:["Mail : ",f.mail]}),(0,i.jsxs)("p",{children:["Mobile : ",f.mobile]}),f.description?(0,i.jsxs)("p",{children:["Identifiant Gadz : ",f.description]}):void 0,f.displayName?(0,i.jsxs)("p",{children:["Bucque : ",f.displayName]}):void 0,f.bouls?(0,i.jsxs)("p",{children:["Boul'ss : ",f.bouls]}):void 0]}):void 0]})]})}},4844:function(e){e.exports={container:"modify_container__gx_te",header:"modify_header__ujClP",main:"modify_main__qfVzN",form:"modify_form__Mni1V",subForm:"modify_subForm__U9jBQ",card:"modify_card__7kgis",bouton:"modify_bouton__18nHU"}}},function(e){e.O(0,[774,888,179],(function(){return n=9344,e(e.s=n);var n}));var n=e.O();_N_E=n}]);