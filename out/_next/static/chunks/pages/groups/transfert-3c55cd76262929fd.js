(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[675],{1550:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/groups/transfert",function(){return t(4131)}])},4131:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var o=t(5893),r=t(1163),s=t.n(r),u=t(7294),c=t(4542),i=t.n(c),a=t(2411),l=t(1678);function d(){var e=(0,u.useState)([]),n=e[0],t=e[1],r=(0,u.useState)(""),c=r[0],d=r[1],_=(0,u.useState)(""),p=_[0],f=_[1],h=(0,u.useState)(!0),g=h[0],m=h[1];(0,u.useEffect)((function(){(0,a.Z)("/groups").then((function(e){t(e),d(e[0].cn)}))}),[]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:i().subHeader,children:[(0,o.jsx)("button",{className:[i().choice,g?i().selectedBouton:void 0].join(" "),onClick:function(){return m(!0)},children:"Copier le Groupe"}),(0,o.jsx)("button",{className:[i().choice,g?void 0:i().selectedBouton].join(" "),onClick:function(){return m(!1)},children:"Couper le Groupe"})]}),(0,o.jsxs)("form",{onSubmit:function(){(0,a.W)("/groups/transfert","PATCH",{oldGroup:c,newGroup:p,action:g}).then((function(e){200==e?(s().push("/groups"),l.Notify.success("Transfert r\xe9ussi !")):l.Notify.failure("Erreur lors du transfert")}))},className:i().subHeader,children:[(0,o.jsxs)("div",{className:i().partHeader,children:[(0,o.jsx)("h3",{children:"Ancien Groupe"}),(0,o.jsx)("select",{className:i().choice,onChange:function(e){return d(e.target.value)},children:null===n||void 0===n?void 0:n.map((function(e){return e.cn!==p?(0,o.jsx)("option",{value:e.cn,children:e.cn},e.cn):void 0}))})]}),(0,o.jsxs)("div",{className:i().partHeader,children:[(0,o.jsx)("h3",{children:"Nouveau Groupe"}),(0,o.jsx)("select",{className:i().choice,onChange:function(e){return f(e.target.value)},children:null===n||void 0===n?void 0:n.map((function(e){return e.cn!==c?(0,o.jsx)("option",{value:e.cn,children:e.cn},e.cn):void 0}))})]}),(0,o.jsx)("div",{className:i().partHeader,children:(0,o.jsx)("button",{type:"submit",className:i().choice,children:"Transf\xe9rer"})})]})]})}},2411:function(e,n,t){"use strict";function o(e){return fetch("https://admin.boquette.fr/api"+e,{method:"GET",headers:{"x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},credentials:"include"}).then((function(e){if(402!=e.status)return e.json();localStorage.removeItem("token"),window.location.reload()}))}function r(e,n,t){return fetch("https://admin.boquette.fr/api"+e,{method:n,headers:{"Content-Type":"application/json","x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},body:JSON.stringify(t),credentials:"include"}).then((function(e){if(402!=e.status)return e.status;localStorage.removeItem("token"),window.location.reload()}))}t.d(n,{W:function(){return r},Z:function(){return o}})},4542:function(e){e.exports={table:"groups_table__m45hf",colonne:"groups_colonne__oH7uo",row:"groups_row__aHhwl",rowHighlight:"groups_rowHighlight__wRgXT",bouton:"groups_bouton__EbIZJ",list:"groups_list__ZcniW",eltLi:"groups_eltLi__0h699",groupManage:"groups_groupManage__BkZrQ",groupMembers:"groups_groupMembers__XqAHX",defaultButton:"groups_defaultButton__HxCZq",input:"groups_input__JZbuX",subHeader:"groups_subHeader__ujTtY",choice:"groups_choice___C86Y",selectedBouton:"groups_selectedBouton__5RGMq",partHeader:"groups_partHeader__PsDPX",tableForm:"groups_tableForm__HLqvd"}}},function(e){e.O(0,[678,774,888,179],(function(){return n=1550,e(e.s=n);var n}));var n=e.O();_N_E=n}]);