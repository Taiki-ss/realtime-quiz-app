(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(5075)}])},6362:function(e,n,i){"use strict";i.d(n,{db:function(){return o}});var t=i(9739);try{t.Z.initializeApp({apiKey:"AIzaSyBC-StbzkUqLBGu0V4J3vjUuDbLbdL4yp4",authDomain:"steamship-gcp.firebaseapp.com",projectId:"steamship-gcp",storageBucket:"steamship-gcp.appspot.com",messagingSenderId:"129710370400",appId:"1:129710370400:web:e53f7415f3bbe73095dd05"})}catch(a){}var o=t.Z.firestore()},5075:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return u}});var t=i(5893),o=i(7294),a=i(1673),c=i.n(a),r=i(1163),s=i.n(r),l=i(6362),d="testUsers";function u(){var e=(0,o.useState)(""),n=e[0],i=e[1],a=(0,o.useState)(""),r=a[0],u=a[1],p=(0,o.useState)(""),h=p[0],_=p[1],m=(0,o.useState)(""),v=(m[0],m[1]),x=function(e,n){s().push({pathname:"/quiz",query:{username:e,userId:n}})};return(0,t.jsx)("div",{className:c().container,children:(0,t.jsxs)("main",{className:c().main,children:[(0,t.jsxs)("h1",{className:c().title,children:["\u30a8\u30f3\u30b8\u30cb\u30a2\u738b\u306f",(0,t.jsx)("br",{}),"\u304d\u307f\u3060\uff01"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:"\u3055\u3042\u3001\u30a8\u30f3\u30c8\u30ea\u30fc\u3057\u3066\u304f\u308c\uff01"}),(0,t.jsxs)("div",{className:"input-container",children:[(0,t.jsx)("p",{children:"\u308f\u304b\u308a\u3084\u3059\u3044\u540d\u524d\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}),(0,t.jsx)("div",{className:"input-name",children:(0,t.jsx)("input",{placeholder:"\u7a7a\u767d\u306a\u3057\u30d5\u30eb\u30cd\u30fc\u30e0",value:n,onChange:function(e){i(e.target.value),v("")}})}),(0,t.jsx)("div",{className:"input-porto",children:(0,t.jsxs)("select",{onChange:function(e){u(e.target.value),v("")},children:[(0,t.jsx)("option",{value:"",children:"\u6240\u5c5e\u30dd\u30eb\u30c8"}),(0,t.jsx)("option",{value:"\u306f\u3055\u307d\u308b",children:"\u306f\u3055\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3042\u308a\u307d\u308b",children:"\u3042\u308a\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3088\u3057\u307d\u308b",children:"\u3088\u3057\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3067\u3058\u307d\u308b",children:"\u3067\u3058\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3044\u3068\u307d\u308b",children:"\u3044\u3068\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3068\u304d\u307d\u308b",children:"\u3068\u304d\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3044\u3048\u307d\u308b",children:"\u3044\u3048\u307d\u308b"}),(0,t.jsx)("option",{value:"\u3069\u3053\u307d\u308b\uff1f",children:"\u3069\u3053\u307d\u308b\uff1f"})]})}),(0,t.jsx)("div",{className:"input-role",children:(0,t.jsxs)("select",{onChange:function(e){_(e.target.value),v("")},children:[(0,t.jsx)("option",{value:"",children:"\u8077\u7a2e"}),(0,t.jsx)("option",{value:"\u30ad\u30e3\u30d7\u30c6\u30f3",children:"\u30ad\u30e3\u30d7\u30c6\u30f3"}),(0,t.jsx)("option",{value:"\u30ad\u30e3\u30d7\u30c6\u30f3\u30eb\u30fc\u30e0",children:"\u30ad\u30e3\u30d7\u30c6\u30f3\u30eb\u30fc\u30e0"}),(0,t.jsx)("option",{value:"\u30c7\u30a3\u30ec\u30af\u30bf\u30fc",children:"\u30c7\u30a3\u30ec\u30af\u30bf\u30fc"}),(0,t.jsx)("option",{value:"\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\u30b5\u30dd\u30fc\u30c8",children:"\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\u30b5\u30dd\u30fc\u30c8"}),(0,t.jsx)("option",{value:"\u30ab\u30b9\u30bf\u30de\u30fc\u30b5\u30dd\u30fc\u30c8",children:"\u30ab\u30b9\u30bf\u30de\u30fc\u30b5\u30dd\u30fc\u30c8"}),(0,t.jsx)("option",{value:"\u30c7\u30b6\u30a4\u30ca\u30fc",children:"\u30c7\u30b6\u30a4\u30ca\u30fc"})]})})]}),(0,t.jsx)("button",{onClick:function(){""!==n&&""!==r&&""!==h?l.db.collection(d).get().then((function(e){var t=e.docs.map((function(e){return e.data().name==n&&e.data().porto==r&&e.data().role===h&&e})).filter(Boolean);if(t.length)v(t[0].id),i(t[0].data().name),x(t[0].data().name,t[0].id);else{if(!confirm("\u30e6\u30fc\u30b6\u30fc\u672a\u767b\u9332\u3067\u3059\u3002\n\u3053\u306e\u540d\u524d\u300c".concat(n,"\u300d\u3067\u65b0\u898f\u767b\u9332\u3057\u307e\u3059\u304b\uff1f")))return;l.db.collection(d).add({name:n,porto:r,role:h,point:0,time:0,answered:{q1:"F",q2:"F",q3:"F",q4:"F",q5:"F",q6:"F",q7:"F",q8:"F",q9:"F",q10:"F",q11:"F"}}).then((function(e){console.log(e.id),v(e.id),x(n,e.id)}))}})).catch((function(e){return console.log(e)})):alert("\u540d\u524d\u3001\u30dd\u30eb\u30c8\u3001\u8077\u7a2e\u3092\u9078\u629e\u3057\u3066\u304b\u3089\u518d\u5ea6\u6c7a\u5b9a\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002")},style:{margin:"0 auto",width:"100%"},children:"\u6c7a\u5b9a"})]})]})})}},1673:function(e){e.exports={container:"Home_container__97eC3",main:"Home_main__OVLM4",footer:"Home_footer__zed0_",title:"Home_title__q0Qg4",description:"Home_description__JhekB",code:"Home_code__2i1pD",grid:"Home_grid__npx0i",card:"Home_card__K7aTN",logo:"Home_logo__FLQOc"}},1163:function(e,n,i){e.exports=i(387)}},function(e){e.O(0,[929,724,834,299,774,888,179],(function(){return n=8312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);