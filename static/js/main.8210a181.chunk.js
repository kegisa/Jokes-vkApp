(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,a){"use strict";a.r(t);a(66),a(91);var n=a(0),c=a.n(n),s=a(38),i=a.n(s),r=a(21),o=a.n(r),l=a(9),u=a(10),d=a(12),m=a(11),h=a(13),b=a(23),f=a(1),p=(a(114),a(37),a(61)),k=a.n(p),y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement(f.Panel,{id:"send",className:"header"},c.a.createElement(f.PanelHeader,null,"\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u0442\u044c"),c.a.createElement("img",{className:"Persik",src:k.a}),c.a.createElement(f.FormLayout,null,c.a.createElement(f.Textarea,{top:"\u041c\u044b \u043f\u0440\u043e\u0441\u0438\u043c \u0442\u0435\u0431\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c \u043f\u0443\u043d\u043a\u0442\u0443\u0430\u0446\u0438\u044e \u0438 \u043e\u0448\u0438\u0431\u043a\u0438, \u043f\u0443\u0441\u0442\u044c \u0442\u0432\u043e\u0438 \u0430\u043d\u0435\u043a\u0434\u043e\u0442\u044b \u0431\u0443\u0434\u0435\u0442 \u043f\u0440\u0438\u044f\u0442\u043d\u0435\u0435 \u0447\u0438\u0442\u0430\u0442\u044c.",placeholder:"\u041d\u0430\u0440\u0434\u044b, \u0430\u0440\u043c\u044f\u043d\u0435 ....."}),c.a.createElement(f.Button,{size:"xl",level:"secondary"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))}}]),t}(c.a.Component),v=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={jokes:[],isFetching:!0,fetchedUser:null},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.loadJokes()}},{key:"loadJokes",value:function(){var e=this;fetch("https://api.icndb.com/jokes/random/10").then(function(e){return e.json()}).then(function(t){e.setState({jokes:t.value})}),this.state.isFetching=!1}},{key:"render",value:function(){var e=this.state.jokes,t=this.state.isFetching,a=this.state.fetchedUser;return c.a.createElement(f.Panel,{id:"feed"},c.a.createElement(f.PanelHeader,null,"\u041b\u0435\u043d\u0442\u0430"),a&&c.a.createElement(f.Group,{title:"User Data Fetched with VK Connect"},c.a.createElement(f.ListItem,{before:a.photo_200?c.a.createElement(f.Avatar,{src:a.photo_200}):null,description:a.city&&a.city.title?a.city.title:""},"".concat(a.first_name," ").concat(a.last_name))),t&&c.a.createElement(f.ScreenSpinner,{className:"spinner",size:"large",style:{marginTop:20}}),e.map(function(e){return c.a.createElement(f.Group,{className:"post"},e.joke)}))}}]),t}(c.a.Component),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={jokes:[],isFetching:!0},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.loadJokes()}},{key:"loadJokes",value:function(){var e=this;fetch("https://api.icndb.com/jokes/random/10").then(function(e){return e.json()}).then(function(t){e.setState({jokes:t.value})}),console.log(this.state.jokes),this.state.isFetching=!1}},{key:"render",value:function(){var e=this.state.jokes,t=this.state.isFetching;return c.a.createElement(f.Panel,{id:"like"},c.a.createElement(f.PanelHeader,null,"\u041b\u044e\u0431\u0438\u043c\u044b\u0435"),t&&c.a.createElement(f.ScreenSpinner,{className:"spinner",size:"large",style:{marginTop:20}}),e.map(function(e){return c.a.createElement(f.Group,{className:"post"},e.joke)}))}}]),t}(c.a.Component),E=a(62),g=a.n(E),O=a(63),S=a.n(O),C=a(64),w=a.n(C),P=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).go=function(e){a.setState({activePanel:e.currentTarget.dataset.to})},a.state={activeStory:"feed",fetchedUser:null},a.onStoryChange=a.onStoryChange.bind(Object(b.a)(Object(b.a)(a))),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"onStoryChange",value:function(e){this.setState({activeStory:e.currentTarget.dataset.story})}},{key:"componentDidMount",value:function(){var e=this;o.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:t.detail.data}),console.log(t.detail.data.id);break;default:console.log(t.detail.data)}}),o.a.send("VKWebAppGetUserInfo",{})}},{key:"render",value:function(){return c.a.createElement(f.Epic,{activeStory:this.state.activeStory,tabbar:c.a.createElement(f.Tabbar,null,c.a.createElement(f.TabbarItem,{className:"tb",onClick:this.onStoryChange,selected:"feed"===this.state.activeStory,"data-story":"feed",text:"\u041b\u0435\u043d\u0442\u0430"},c.a.createElement(w.a,null)),c.a.createElement(f.TabbarItem,{className:"tb",onClick:this.onStoryChange,selected:"like"===this.state.activeStory,"data-story":"like",text:"\u041b\u044e\u0431\u0438\u043c\u044b\u0435"},c.a.createElement(g.a,null)),c.a.createElement(f.TabbarItem,{className:"tb",onClick:this.onStoryChange,selected:"send"===this.state.activeStory,"data-story":"send",text:"\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u0442\u044c"},c.a.createElement(S.a,null)))},c.a.createElement(f.View,{id:"feed",activePanel:"feed"},c.a.createElement(v,{id:"feed",fetchedUser:this.state.fetchedUser})),c.a.createElement(f.View,{id:"like",activePanel:"like"},c.a.createElement(j,{id:"like"})),c.a.createElement(f.View,{id:"send",activePanel:"send"},c.a.createElement(y,{id:"send"})))}}]),t}(c.a.Component);o.a.subscribe(function(e){switch(e.detail.type){case"VKWebAppUpdateConfig":var t=document.createAttribute("scheme");t.value=e.detail.data.scheme?e.detail.data.scheme:"client_light",document.body.attributes.setNamedItem(t);break;default:console.log(e.detail.type)}}),o.a.send("VKWebAppInit",{}),i.a.render(c.a.createElement(P,null),document.getElementById("root"))},37:function(e,t,a){},61:function(e,t,a){e.exports=a.p+"static/media/9.7dca66b2.jpg"},65:function(e,t,a){e.exports=a(115)}},[[65,1,2]]]);
//# sourceMappingURL=main.8210a181.chunk.js.map