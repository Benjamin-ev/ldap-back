(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{1757:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/new",function(){return r(2974)}])},2974:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return u}});var s=r(5893),t=r(7294),a=r(9008),i=r.n(a),o=r(1163),l=r.n(o),c=r(5543),d=r.n(c);function u(){var e=(0,t.useState)({sn:"",givenName:"",mail:"",mobile:"",password:""}),n=e[0],r=e[1],a=function(e){return function(s){var t=n;t[e]=s.target.value,r(t)}};return(0,s.jsxs)("div",{className:d().container,children:[(0,s.jsxs)(i(),{children:[(0,s.jsx)("meta",{name:"description",content:"User page for boquette FR"}),(0,s.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,s.jsx)("title",{children:"A&M Angers - Utilisateur"})]}),(0,s.jsx)("header",{className:d().header,children:(0,s.jsx)("h1",{children:"Interface de gestion utilisateur"})}),(0,s.jsx)("main",{className:d().main,children:(0,s.jsxs)("form",{className:d().form,onSubmit:function(e){e.preventDefault(),fetch("https://utilisateur.boquette.fr/api/user",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify(n)}).then((function(e){200==e.status&&l().push("/")}))},children:[(0,s.jsx)("h1",{children:"Cr\xe9ation de compte"}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Nom"}),(0,s.jsx)("input",{type:"text",placeholder:"Nom",onChange:a("sn"),className:d().card,required:!0})]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Pr\xe9nom"}),(0,s.jsx)("input",{type:"text",placeholder:"Pr\xe9nom",onChange:a("givenName"),className:d().card,required:!0})]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Mot de passe"}),(0,s.jsx)("input",{type:"password",onChange:a("password"),className:d().card,required:!0})]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Adresse Mail"}),(0,s.jsx)("input",{type:"text",placeholder:"prenom.nom@mail.fr",onChange:a("mail"),className:d().card,required:!0})]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{children:"Num\xe9ro de t\xe9l\xe9phone"}),(0,s.jsx)("input",{type:"text",placeholder:"06/07",onChange:a("mobile"),className:d().card,required:!0})]}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{type:"submit",className:d().bouton,children:"Cr\xe9er mon compte Boquette"})})]})})]})}},5543:function(e){e.exports={container:"new_container__NJufV",header:"new_header__vlqOh",main:"new_main__Uz9d_",form:"new_form___CuO6",card:"new_card__Fj1Oj",bouton:"new_bouton__YUmNV"}}},function(e){e.O(0,[774,888,179],(function(){return n=1757,e(e.s=n);var n}));var n=e.O();_N_E=n}]);