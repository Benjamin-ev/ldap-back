(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[260],{419:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/users/add",function(){return n(8359)}])},8359:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(5893),i=n(1163),s=n.n(i),o=n(7294),a=n(8658),l=n.n(a),u=n(1287),c=n(2411),d=n(1678);function p(){var e=(0,o.useState)({uid:"",description:"",displayName:"",sn:"",givenName:"",mail:"",mobile:""}),t=e[0],n=e[1];(0,o.useEffect)((function(){s().query.uid&&(0,c.Z)("/users/user/"+s().query.uid).then((function(e){return n(e[0])}))}),[s().query.uid]);var i=function(e){return function(r){var i=t;i[e]=r.target.value,n(i)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:(0,r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),(0,c.W)("/users","POST",t).then((function(e){200==e?(s().push("/"),d.Notify.success("Utilisateur ajout\xe9 !")):d.Notify.failure("Erreur lors de l'ajout")}))},children:[(0,r.jsxs)("table",{className:l().tableForm,children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"uid=cn"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("uid"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"description"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("description"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"displayName"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("displayName"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"sn"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("sn"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"givenName"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("givenName"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"mail"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("mail"),className:l().input})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"mobile"}),(0,r.jsx)("td",{children:(0,r.jsx)("input",{type:"text",onChange:i("mobile"),className:l().input})})]})]}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{type:"submit",className:l().bouton,children:"Ajouter un utilisateur"})})]})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"Importer un fichier .csv"}),(0,r.jsx)("p",{children:"Notez que le fichier ne doit pas comporter d'en-t\xeates mais qu'elles doivent \xeatre dans le m\xeame ordre que ci-dessus"}),(0,r.jsx)("p",{children:"Si une case est vide, mettre un espace \xe0 la place, sous peine d'annuler l'ajout"}),(0,r.jsx)(u.Z,{handleFiles:function(e){var t=new FileReader;t.onload=function(e){(0,c.W)("/users/users","POST",t.result.split("\r\n")).then((function(e){200==e?(s().push("/"),d.Notify.success("Utilisateurs ajout\xe9s !")):d.Notify.failure("Erreur lors de l'ajout")}))},t.readAsText(e[0])},fileTypes:".csv",children:(0,r.jsx)("button",{className:l().bouton,children:"Importer"})})]})]})}},2411:function(e,t,n){"use strict";function r(e){return fetch("https://admin.boquette.fr/api"+e,{method:"GET",headers:{"x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},credentials:"include"}).then((function(e){if(402!=e.status)return e.json();localStorage.removeItem("token"),window.location.reload()}))}function i(e,t,n){return fetch("https://admin.boquette.fr/api"+e,{method:t,headers:{"Content-Type":"application/json","x-xsrf-token":JSON.parse(localStorage.getItem("token")),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true"},body:JSON.stringify(n),credentials:"include"}).then((function(e){if(402!=e.status)return e.status;localStorage.removeItem("token"),window.location.reload()}))}n.d(t,{W:function(){return i},Z:function(){return r}})},8658:function(e){e.exports={table:"users_table__h0z1h",colonne:"users_colonne__Vh8oO",row:"users_row__R9_Xv",rowHighlight:"users_rowHighlight__fAyyv",bouton:"users_bouton__LVkM6",tableForm:"users_tableForm__yd_uw"}},1287:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=a(n(7294)),s=a(n(6522)),o=a(n(5697));function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var c=function(e){function t(){var e,n,r;l(this,t);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),r.state={elementId:r.props.elementId||(0,s.default)()},r.clickInput=function(){var e=document.getElementById(r.state.elementId);e.value="",e.click()},r.handleFiles=function(e){r.props.base64?r.convertFilesToBase64(e.target.files):r.props.handleFiles(e.target.files)},r.convertFilesToBase64=function(e){var t=e;if(r.props.multipleFiles){var n,i;!function(){var e={base64:[],fileList:t},s=function(){var i=new FileReader,s=t[n];i.onloadend=function(n){e.base64.push(i.result),e.base64.length===t.length&&r.props.handleFiles(e)},i.readAsDataURL(s)};for(n=0,i=t.length;n<i;n++)s()}()}else{var s={base64:"",fileList:t},o=t[0],a=new FileReader;a.onloadend=function(e){s.base64=a.result,r.props.handleFiles(s)},a.readAsDataURL(o)}},u(r,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){return i.default.createElement("div",{className:"react-file-reader"},i.default.createElement("input",{type:"file",onChange:this.handleFiles,accept:Array.isArray(this.props.fileTypes)?this.props.fileTypes.join(","):this.props.fileTypes,className:"react-file-reader-input",id:this.state.elementId,multiple:this.props.multipleFiles,style:{width:"0px",opacity:"0",position:"fixed"},disabled:this.props.disabled}),i.default.createElement("div",{className:"react-file-reader-button",onClick:this.clickInput},this.props.children))}}]),t}(i.default.Component);t.Z=c,c.defaultProps={fileTypes:"image/*",multipleFiles:!1,base64:!1,disabled:!1},c.propTypes={multipleFiles:o.default.bool,handleFiles:o.default.func.isRequired,fileTypes:o.default.oneOfType([o.default.string,o.default.array]),base64:o.default.bool,children:o.default.element.isRequired,disabled:o.default.bool}},6522:function(e,t){var n;!function(){function r(e){return(e=e.toString(16)).length<2&&(e="0"+e),e}function i(){var e=function(){try{return Array.from((window.crypto||window.msCrypto).getRandomValues(new Uint8Array(16)))}catch(t){for(var e=[];e.length<16;)e.push(256*Math.random()&255);return e}}();return e[6]=15&e[6]|64,e[8]=63&e[8]|128,(e=e.map(r).join("").match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)).shift(),e.join("-")}var s=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;i.valid=function(e){return s.test(e)},window&&(window.uuid4=i),e.exports&&(e.exports=i),void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()}},function(e){e.O(0,[678,774,888,179],(function(){return t=419,e(e.s=t);var t}));var t=e.O();_N_E=t}]);