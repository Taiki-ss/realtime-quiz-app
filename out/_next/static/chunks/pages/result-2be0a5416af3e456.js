(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[968],{39:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/result",function(){return n(6214)}])},6362:function(e,t,n){"use strict";n.d(t,{db:function(){return r}});var o=n(9739);try{o.Z.initializeApp({apiKey:"AIzaSyBC-StbzkUqLBGu0V4J3vjUuDbLbdL4yp4",authDomain:"steamship-gcp.firebaseapp.com",projectId:"steamship-gcp",storageBucket:"steamship-gcp.appspot.com",messagingSenderId:"129710370400",appId:"1:129710370400:web:e53f7415f3bbe73095dd05"})}catch(a){}var r=o.Z.firestore()},6214:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var o=n(7568),r=n(4051),a=n.n(r),i=n(5893),c=n(7294),l=n(1673),s=n.n(l),u=n(6362);function d(){var e=(0,c.useState)(!1),t=e[0],n=e[1],r=(0,c.useState)([]),l=r[0],d=r[1],m=(0,c.useState)(0),p=m[0],f=m[1],h=(0,c.useState)(!1),g=h[0],b=h[1],y=(0,c.useState)(!1),_=y[0],x=y[1],v=(0,c.useState)(5),w=v[0],k=v[1],j=(0,c.useState)(0),S=j[0],N=j[1];(0,c.useEffect)((function(){u.db.collection("result").doc("status").onSnapshot(function(){var e=(0,o.Z)(a().mark((function e(o){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n(o.data().show),console.log(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),(0,c.useEffect)((function(){!1!==t&&(0,o.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.db.collection("testUsers").orderBy("point","desc").get().then((function(e){var t=[],n=1,o=0,r=0,a=0;e.docs.forEach((function(e,i){e.data().point!==r?(0!==i&&o++,r=e.data().point,t[o]={lank:n,point:r,member:[{name:e.data().name,porto:e.data().porto,role:e.data().role,time:e.data().time,count:a}]},n++,a++):(t[o].member.push({name:e.data().name,porto:e.data().porto,role:e.data().role,time:e.data().time,count:a}),n++,a++)})),console.log(t),d(t)}));case 2:case"end":return e.stop()}}),e)})))()}),[t]);var q=l.map((function(e){return e.member.map((function(t){return(0,i.jsxs)("tr",{className:1===e.lank?"late rank1":"late","data-count":t.count,children:[(0,i.jsxs)("td",{children:[e.lank,"\u4f4d"]}),(0,i.jsx)("td",{children:t.name}),(0,i.jsx)("td",{children:t.porto}),(0,i.jsx)("td",{children:t.role}),(0,i.jsxs)("td",{children:[e.point,"\u70b9"," ",(0,i.jsx)("span",{style:{display:"none"},children:1===e.lank?"(".concat(110-t.time,"\u79d2)"):""})]})]},t.count)}))}));return(0,i.jsxs)("div",{className:s().container,children:[(0,i.jsxs)("div",{children:["\u3042\u3068",S,"\u56de"]}),(0,i.jsx)("button",{onClick:function(){var e=15;document.querySelectorAll(".late").forEach((function(e){e.style.display="none"}));var t=document.querySelectorAll(".late").length,n=Math.floor(t/e),o=t%e;if(k(document.querySelectorAll(".rank1").length),g||0===o)if(n-p>1){var r=function(e){setTimeout((function(){document.querySelector('.late[data-count="'.concat(e,'"]')).style.display="table-row"}),100*i),i++},a=l[0].member.length>15&&n-p===2?l[0].member.length-15:0;N(n-p);for(var i=0,c=e*(n-p)-1;c>=e*(n-p-1)+a;c--)r(c);f(p+1)}else if(n-p!==1);else{var s=function(e){setTimeout((function(){document.querySelector('.late[data-count="'.concat(e,'"]')).style.display="table-row"}),100*u),u++};N(n-p);for(var u=0,d=e*(n-p)-1;d>=e*(n-p-1)+w;d--)s(d);x(!0)}else{for(var m=function(e){setTimeout((function(){document.querySelector('.late[data-count="'.concat(e,'"]')).style.display="table-row"}),100*h),h++},h=0,y=e*n+o-1;y>=e*n;y--)m(y);b(!0)}},style:{display:t&&!_?"inline-block":"none",padding:"8px",margin:0},children:(0,i.jsx)("p",{style:{writingMode:"vertical-rl",margin:0},children:"\u30e9\u30f3\u30ad\u30f3\u30b0\u8868\u793a"})}),(0,i.jsx)("button",{onClick:function(){N(0);for(var e=w;e>0;e--)document.querySelector('.late[data-count="'.concat(e-1,'"]')).style.backgroundColor="blue",document.querySelector('.late[data-count="'.concat(e-1,'"]')).style.display="table-row"},style:{display:t&&_?"block":"none",backgroundColor:"blue",color:"white",padding:"8px",margin:0},children:(0,i.jsx)("p",{style:{writingMode:"vertical-rl",margin:0},children:"\uff11\u4f4d\u8868\u793a"})}),(0,i.jsx)("button",{onClick:function(){if(void 0!==l[0].member){for(var e=0,t=0;t<l[0].member.length;t++)e<l[0].member[t].time&&(e=l[0].member[t].time);console.log(e),document.querySelectorAll(".rank1>td>span").forEach((function(t){Number(t.innerText.replace(/[^0-9$]/g,""))===110-e&&t.classList.add("No1"),t.style.display="inline-block"})),setTimeout((function(){document.querySelectorAll(".No1").forEach((function(e){e.parentNode.parentNode.style.backgroundColor="red",e.scrollIntoView({behavior:"smooth",block:"center"})}))}),2e3)}},style:{display:t&&_?"block":"none",backgroundColor:"red",color:"white",padding:"8px",margin:0},children:(0,i.jsx)("p",{style:{writingMode:"vertical-rl",margin:0},children:"\u771f\u306e\uff11\u4f4d"})}),(0,i.jsxs)("main",{children:[(0,i.jsx)("h1",{className:s().title,style:{writingMode:"vertical-rl",position:"absolute",right:0,fontSize:"80px",top:"50%",transform:"translate(0,-50%)",color:"#dab300",background:"linear-gradient(#05FBFF, #1D62F0 ) fixed",height:"100%",padding:"0 8px"},children:"\u7d50\u679c\u767a\u8868"}),(0,i.jsx)("figure",{style:{position:"absolute",top:"0",right:"0",width:"200px"},children:(0,i.jsx)("img",{src:"/engineer-king/images/logo.png",alt:""})}),(0,i.jsx)("p",{style:{fontSize:"60px",fontWeight:"bold",color:"white",textAlign:"center"},children:t?"\u898b\u4e8b\u30a8\u30f3\u30b8\u30cb\u30a2\u738b\u306b\u8f1d\u3044\u305f\u306e\u306f\uff1f\uff1f":"\u307e\u3060\u6559\u3048\u306a\u3044\u3088\u301c\u3093"}),(0,i.jsx)("div",{className:"member-list-wrapper",children:(0,i.jsx)("table",{className:"member-list",children:(0,i.jsx)("tbody",{children:q})})})]})]})}},1673:function(e){e.exports={container:"Home_container__97eC3",main:"Home_main__OVLM4",footer:"Home_footer__zed0_",title:"Home_title__q0Qg4",description:"Home_description__JhekB",countdown:"Home_countdown__chwDV",countdownno:"Home_countdownno__OOQln",code:"Home_code__2i1pD",grid:"Home_grid__npx0i",card:"Home_card__K7aTN",logo:"Home_logo__FLQOc"}},7568:function(e,t,n){"use strict";function o(e,t,n,o,r,a,i){try{var c=e[a](i),l=c.value}catch(s){return void n(s)}c.done?t(l):Promise.resolve(l).then(o,r)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function c(e){o(i,r,a,c,l,"next",e)}function l(e){o(i,r,a,c,l,"throw",e)}c(void 0)}))}}n.d(t,{Z:function(){return r}})}},function(e){e.O(0,[929,724,834,967,774,888,179],(function(){return t=39,e(e.s=t);var t}));var t=e.O();_N_E=t}]);