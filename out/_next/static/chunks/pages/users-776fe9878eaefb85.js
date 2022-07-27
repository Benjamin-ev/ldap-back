(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{7476:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/users",function(){return s(4211)}])},5789:function(e,n,s){"use strict";s.d(n,{Z:function(){return p}});var t=s(5893),i=s(3532),r=s.n(i),a=s(1664),l=s.n(a),o=s(9008),c=s.n(o),d=s(1163),u=s.n(d),h=s(7294);function p(e){var n=(0,h.useState)(!1),s=n[0],i=n[1];return(0,h.useEffect)((function(){s&&setTimeout((function(){alert("Les groupes ont \xe9t\xe9 mis \xe0 jour"),i(!1)}),100)}),[s]),(0,t.jsxs)("div",{className:r().container,children:[(0,t.jsxs)(c(),{children:[(0,t.jsx)("meta",{name:"description",content:"Managing page for boquette FR"}),(0,t.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,t.jsx)("title",{children:"A&M Boquette - Gestion LDAP"})]}),(0,t.jsxs)("header",{className:r().header,children:[(0,t.jsxs)("div",{className:r().subHeader,children:[(0,t.jsx)(l(),{href:"/users",passHref:!0,children:(0,t.jsx)("h2",{className:[r().bouton,"/users"==u().pathname?r().selectedBouton:void 0].join(" "),children:"Gestion des Utilisateurs"})}),(0,t.jsx)(l(),{href:"/groups",passHref:!0,children:(0,t.jsx)("h2",{className:[r().bouton,"/groups"==u().pathname?r().selectedBouton:void 0].join(" "),children:"Gestion des Groupes"})})]}),(0,t.jsxs)("div",{className:r().subHeader,children:[(0,t.jsx)(l(),{href:u().pathname,passHref:!0,children:(0,t.jsx)("h2",{className:[r().bouton,u().query.action?void 0:r().selectedBouton].join(" "),children:"Visualiser"})}),(0,t.jsx)(l(),{href:u().pathname+"?action=add",passHref:!0,children:(0,t.jsx)("h2",{className:[r().bouton,"add"==u().query.action?r().selectedBouton:void 0].join(" "),children:"Ajouter"})}),(0,t.jsx)(l(),{href:u().pathname+"?action=edit",passHref:!0,children:(0,t.jsx)("h2",{className:[r().bouton,"edit"==u().query.action?r().selectedBouton:void 0].join(" "),children:"Editer"})}),(0,t.jsx)("button",{onClick:function(e){fetch("https://utilisateur.boquette.fr/api/groups",{method:"PATCH",headers:{"Content-Type":"application/json","x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},credentials:"include"}).then((function(e){200==e.status?i(!0):(localStorage.removeItem("token"),window.location.reload())}))},children:"Actualiser les Groupes"})]})]}),(0,t.jsx)("main",{className:r().main,children:e.children}),(0,t.jsx)("footer",{className:r().footer})]})}},4211:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return m}});var t=s(5893),i=s(1163),r=s.n(i),a=s(7294),l=s(1664),o=s.n(l),c=s(5789),d=s(8658),u=s.n(d),h=s(1287),p=s(2411);function m(){var e=(0,a.useState)([]),n=e[0],s=e[1],i=(0,a.useState)({uid:"",description:"",displayName:"",sn:"",givenName:"",mail:"",mobile:"",bouls:"",isInGrps:"",gadzflix:""}),l=i[0],d=i[1];switch((0,a.useEffect)((function(){(0,p.Z)("/users").then((function(e){return s(e)}))}),[r().asPath]),(0,a.useEffect)((function(){r().query.uid&&(0,p.Z)("/users/user/"+r().query.uid).then((function(e){return d(e[0])}))}),[r().query.uid]),r().query.action){case"add":return function(e,n){var s=function(n){n.preventDefault(),(0,p.W)("/users","POST",e).then((function(e){200==e&&r().push("/users")}))},i=function(s){return function(t){var i=e;i[s]=t.target.value,n(i)}},a=function(e){var n=new FileReader;n.onload=function(e){(0,p.W)("/users/users","POST",n.result.split("\r\n")).then((function(e){200==e&&r().push("/users")}))},n.readAsText(e[0])};return(0,t.jsxs)(c.Z,{children:[(0,t.jsx)("div",{children:(0,t.jsxs)("form",{onSubmit:s,children:[(0,t.jsxs)("table",{className:u().table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:u().colonne,children:"uid=cn"}),(0,t.jsx)("th",{className:u().colonne,children:"description"}),(0,t.jsx)("th",{className:u().colonne,children:"displayName"}),(0,t.jsx)("th",{className:u().colonne,children:"sn"}),(0,t.jsx)("th",{className:u().colonne,children:"givenName"}),(0,t.jsx)("th",{className:u().colonne,children:"mail"}),(0,t.jsx)("th",{className:u().colonne,children:"mobile"}),(0,t.jsx)("th",{className:u().colonne,children:"bouls"}),(0,t.jsx)("th",{className:u().colonne,children:"isInGrps"}),(0,t.jsx)("th",{className:u().colonne,children:"gadzflix"})]})}),(0,t.jsx)("tbody",{children:(0,t.jsxs)("tr",{className:u().rowHighlight,children:[(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("uid")})},"uid"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("description")})},"description"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("displayName")})},"displayName"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("sn")})},"sn"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("givenName")})},"givenName"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("mail")})},"mail"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("mobile")})},"mobile"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("bouls")})},"bouls"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("isInGrps")})},"isInGrps"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:i("gadzflix")})},"gadzflix")]},"tr")})]}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",className:u().bouton,children:"Ajouter un utilisateur"})})]})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:"Importer un fichier .csv"}),(0,t.jsx)("p",{children:"Notez que le fichier ne doit pas comporter d'en-t\xeates mais qu'elles doivent \xeatre dans le m\xeame ordre que ci-dessus"}),(0,t.jsx)("p",{children:"Si une case est vide, mettre un espace \xe0 la place, sous peine d'annuler l'ajout"}),(0,t.jsx)(h.Z,{handleFiles:a,fileTypes:".csv",children:(0,t.jsx)("button",{className:u().bouton,children:"Importer"})})]})]})}(l,d);case"edit":return function(e,n){var s=function(s){return function(t){var i=e;i[s]=t.target.value,n(i)}},i=function(n){n.preventDefault(),(0,p.W)("/users","PUT",e).then((function(e){200==e&&r().push("/users")}))},a=function(){(0,p.W)("/users","DELETE",{dn:e.dn}).then((function(e){200==e&&r().push("/users")}))},l=function(e){var n=new FileReader;n.onload=function(e){var s=n.result.split("\r\n");(0,p.W)("/users/users","PUT",{headers:s.shift(),users:s}).then((function(e){}))},n.readAsText(e[0])};return(0,t.jsxs)(c.Z,{children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("form",{onSubmit:i,children:[(0,t.jsxs)("table",{className:u().table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:u().colonne,children:"uid=cn"}),(0,t.jsx)("th",{className:u().colonne,children:"description"}),(0,t.jsx)("th",{className:u().colonne,children:"displayName"}),(0,t.jsx)("th",{className:u().colonne,children:"sn"}),(0,t.jsx)("th",{className:u().colonne,children:"givenName"}),(0,t.jsx)("th",{className:u().colonne,children:"mail"}),(0,t.jsx)("th",{className:u().colonne,children:"mobile"}),(0,t.jsx)("th",{className:u().colonne,children:"bouls"}),(0,t.jsx)("th",{className:u().colonne,children:"isInGrps"}),(0,t.jsx)("th",{className:u().colonne,children:"gadzflix"})]})}),(0,t.jsx)("tbody",{children:""!==e.uid?(0,t.jsxs)("tr",{className:u().rowHighlight,children:[(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("uid"),placeholder:e.uid,disabled:!0})},"uid"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("description"),placeholder:e.description})},"description"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("displayName"),placeholder:e.displayName})},"displayName"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("sn"),placeholder:e.sn})},"sn"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("givenName"),placeholder:e.givenName})},"givenName"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("mail"),placeholder:e.mail})},"mail"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("mobile"),placeholder:e.mobile})},"mobile"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("bouls"),placeholder:e.bouls})},"bouls"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("isInGrps"),placeholder:e.isInGrps})},"isInGrps"),(0,t.jsx)("td",{className:u().row,children:(0,t.jsx)("input",{type:"text",onChange:s("gadzflix"),placeholder:e.gadzflix})},"gadzflix")]},"tr"):void 0})]}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",className:u().bouton,children:"Modifier"})})]}),(0,t.jsx)("button",{onClick:a,className:u().bouton,children:"Supprimer l'utilisateur"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:"Importer un fichier .csv de modification"}),(0,t.jsx)("p",{children:"Notez que le fichier doit comporter les en-t\xeates \xe0 modifier en 1\xe8re ligne, l'uid doit \xe9galement appara\xeetre en 1ere colonne"}),(0,t.jsx)(h.Z,{handleFiles:l,fileTypes:".csv",children:(0,t.jsx)("button",{className:u().bouton,children:"Importer"})})]})]})}(l,d);default:return function(e){return(0,t.jsx)(c.Z,{children:(0,t.jsxs)("table",{className:u().table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:u().colonne,children:"uid=cn"}),(0,t.jsx)("th",{className:u().colonne,children:"uidNumber"}),(0,t.jsx)("th",{className:u().colonne,children:"gidNumber"}),(0,t.jsx)("th",{className:u().colonne,children:"description"}),(0,t.jsx)("th",{className:u().colonne,children:"displayName"}),(0,t.jsx)("th",{className:u().colonne,children:"sn"}),(0,t.jsx)("th",{className:u().colonne,children:"givenName"}),(0,t.jsx)("th",{className:u().colonne,children:"mail"}),(0,t.jsx)("th",{className:u().colonne,children:"mobile"}),(0,t.jsx)("th",{className:u().colonne,children:"bouls"}),(0,t.jsx)("th",{className:u().colonne,children:"isInGrps"}),(0,t.jsx)("th",{className:u().colonne,children:"gadzflix"})]})}),(0,t.jsx)("tbody",{children:e?e.map((function(e,n){return(0,t.jsx)(o(),{href:r().pathname+"?action=edit&uid="+e.uid,passHref:!0,children:(0,t.jsxs)("tr",{className:u().rowHighlight,children:[(0,t.jsx)("td",{className:u().row,children:e.uid},n+"uid"),(0,t.jsx)("td",{className:u().row,children:e.uidNumber},n+"uidNumber"),(0,t.jsx)("td",{className:u().row,children:e.gidNumber},n+"gid"),(0,t.jsx)("td",{className:u().row,children:e.description},n+"description"),(0,t.jsx)("td",{className:u().row,children:e.displayName},n+"displayName"),(0,t.jsx)("td",{className:u().row,children:e.sn},n+"sn"),(0,t.jsx)("td",{className:u().row,children:e.givenName},n+"givenName"),(0,t.jsx)("td",{className:u().row,children:e.mail},n+"mail"),(0,t.jsx)("td",{className:u().row,children:e.mobile},n+"mobile"),(0,t.jsx)("td",{className:u().row,children:e.bouls},n+"bouls"),(0,t.jsx)("td",{className:u().row,children:e.isInGrps},n+"isInGrps"),(0,t.jsx)("td",{className:u().row,children:e.gadzflix},n+"gadzflix")]},n+"tr")},n+"link")})):void 0})]})})}(n)}}},2411:function(e,n,s){"use strict";function t(e){return fetch("https://utilisateur.boquette.fr/api"+e,{method:"GET",headers:{"x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},credentials:"include"}).then((function(e){if(200==e.status)return e.json();localStorage.removeItem("token"),window.location.reload()}))}function i(e,n,s){return fetch("https://utilisateur.boquette.fr/api"+e,{method:n,headers:{"Content-Type":"application/json","x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},body:JSON.stringify(s),credentials:"include"}).then((function(e){if(200==e.status)return e.status;localStorage.removeItem("token"),window.location.reload()}))}s.d(n,{W:function(){return i},Z:function(){return t}})},3532:function(e){e.exports={container:"Layout_container__a4TgG",main:"Layout_main__T635V",form:"Layout_form__h8n_g",header:"Layout_header__5T1Lo",subHeader:"Layout_subHeader__UEtRY",bouton:"Layout_bouton__eeQZ9",selectedBouton:"Layout_selectedBouton__kIBwc"}},8658:function(e){e.exports={table:"users_table__h0z1h",colonne:"users_colonne__Vh8oO",row:"users_row__R9_Xv",rowHighlight:"users_rowHighlight__fAyyv",bouton:"users_bouton__LVkM6"}},1287:function(e,n,s){"use strict";var t=function(){function e(e,n){for(var s=0;s<n.length;s++){var t=n[s];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,s,t){return s&&e(n.prototype,s),t&&e(n,t),n}}(),i=l(s(7294)),r=l(s(6522)),a=l(s(5697));function l(e){return e&&e.__esModule?e:{default:e}}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function c(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var d=function(e){function n(){var e,s,t;o(this,n);for(var i=arguments.length,a=Array(i),l=0;l<i;l++)a[l]=arguments[l];return s=t=c(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(a))),t.state={elementId:t.props.elementId||(0,r.default)()},t.clickInput=function(){var e=document.getElementById(t.state.elementId);e.value="",e.click()},t.handleFiles=function(e){t.props.base64?t.convertFilesToBase64(e.target.files):t.props.handleFiles(e.target.files)},t.convertFilesToBase64=function(e){var n=e;if(t.props.multipleFiles){var s,i;!function(){var e={base64:[],fileList:n},r=function(){var i=new FileReader,r=n[s];i.onloadend=function(s){e.base64.push(i.result),e.base64.length===n.length&&t.props.handleFiles(e)},i.readAsDataURL(r)};for(s=0,i=n.length;s<i;s++)r()}()}else{var r={base64:"",fileList:n},a=n[0],l=new FileReader;l.onloadend=function(e){r.base64=l.result,t.props.handleFiles(r)},l.readAsDataURL(a)}},c(t,s)}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),t(n,[{key:"render",value:function(){return i.default.createElement("div",{className:"react-file-reader"},i.default.createElement("input",{type:"file",onChange:this.handleFiles,accept:Array.isArray(this.props.fileTypes)?this.props.fileTypes.join(","):this.props.fileTypes,className:"react-file-reader-input",id:this.state.elementId,multiple:this.props.multipleFiles,style:{width:"0px",opacity:"0",position:"fixed"},disabled:this.props.disabled}),i.default.createElement("div",{className:"react-file-reader-button",onClick:this.clickInput},this.props.children))}}]),n}(i.default.Component);n.Z=d,d.defaultProps={fileTypes:"image/*",multipleFiles:!1,base64:!1,disabled:!1},d.propTypes={multipleFiles:a.default.bool,handleFiles:a.default.func.isRequired,fileTypes:a.default.oneOfType([a.default.string,a.default.array]),base64:a.default.bool,children:a.default.element.isRequired,disabled:a.default.bool}},6522:function(e,n){var s;!function(){function t(e){return(e=e.toString(16)).length<2&&(e="0"+e),e}function i(){var e=function(){try{return Array.from((window.crypto||window.msCrypto).getRandomValues(new Uint8Array(16)))}catch(n){for(var e=[];e.length<16;)e.push(256*Math.random()&255);return e}}();return e[6]=15&e[6]|64,e[8]=63&e[8]|128,(e=e.map(t).join("").match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)).shift(),e.join("-")}var r=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;i.valid=function(e){return r.test(e)},window&&(window.uuid4=i),e.exports&&(e.exports=i),void 0===(s=function(){return i}.apply(n,[]))||(e.exports=s)}()}},function(e){e.O(0,[664,774,888,179],(function(){return n=7476,e(e.s=n);var n}));var n=e.O();_N_E=n}]);