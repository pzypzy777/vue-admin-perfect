import{_ as y,o as u,c as r,F as w,D as v,W as _,t as x,z as b,q as C,g as k,i as p,u as S,r as d,n as E,w as h,b as f,d as F}from"./index.8ab1f836.js";const N={props:{data:{type:Array,default:()=>[]},left:{type:Number,default:0},type:{type:Number,default:1},dataInfo:{type:Object,default:()=>{}},top:{type:Number,default:0},isViewInfo:{type:Boolean,default:!0}},watch:{left:{handler(e,t){e&&(this.isShow=!0)}}},computed:{style(){let e=document.body.clientHeight,t=this.top;return e-t<100?`left:${this.left}px;bottom:${e-t}px`:`left:${this.left}px;top:${this.top}px`}},data(){return{isShow:!1}},methods:{operatingRightAction(e,t){this.$emit("ok",e,t),this.isShow=!1}},mounted(){let e=this;window.addEventListener("click",function(){e.isShow=!1}),window.addEventListener("mousedown",function(t){t.which===3&&(e.isShow=!1)})}};const $=["onClick"];function A(e,t,n,c,i,l){return i.isShow?(u(),r("div",{key:0,class:"g-right-click-menu",style:b(l.style),ref:"rightMenu"},[(u(!0),r(w,null,v(n.data,(s,o)=>(u(),r("div",{key:o,class:"operating",onClick:_(a=>l.operatingRightAction(a,s),["stop"])},x(s.label),9,$))),128))],4)):C("",!0)}const D=y(N,[["render",A],["__scopeId","data-v-f9c1d2d8"]]),L=k({__name:"index",setup(e){const t=p(0),n=p(0),c=[{label:"\u6253\u5370",value:1,path:"/other/print"},{label:"\u5934\u50CF\u88C1\u526A",value:2,path:"/other/cropper"},{label:"\u5361\u7247\u62D6\u62FD",value:3,path:"/other/grid-sorter"},{label:"\u5206\u5272\u6A21\u5757",value:4,path:"/other/splitpane"},{label:"\u751F\u6210\u4E8C\u7EF4\u7801",value:5,path:"/other/qrcode"}],i=o=>{t.value=o.clientX,n.value=o.clientY},l=S(),s=(o,a)=>{console.log("\u83B7\u53D6\u6570\u636E",a),l.push({path:a.path})};return(o,a)=>{const m=d("el-button"),g=d("PageWrapLayout");return u(),E(g,{style:{"min-height":"300px"}},{default:h(()=>[f(m,{onContextmenu:_(i,["prevent"]),style:{width:"200px"}},{default:h(()=>[F("\u53F3\u952E\u83DC\u5355")]),_:1},8,["onContextmenu"]),f(D,{left:t.value,top:n.value,onOk:s,data:c},null,8,["left","top"])]),_:1})}}});export{L as default};