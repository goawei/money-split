(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{195:function(e,t,a){e.exports=a(405)},200:function(e,t,a){},405:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(9),c=a.n(o),i=(a(200),a(69)),l=a(70),d=a(53),u=a(54),m=a(58),s=a(55),h=a(59),p=a(407),g=a(35),w=a(63),v=a(23),f=a(408),y=a(409),D=a(406),E=a(44),b=a(90),x=a.n(b),O=a(122),R=a.n(O),S=a(95),j=a(10),k=a(191),H=-1,C=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isOver,a=e.connectDragSource,n=e.connectDropTarget,o=(e.moveRow,Object(k.a)(e,["isOver","connectDragSource","connectDropTarget","moveRow"])),c=Object(l.a)({},o.style,{cursor:"move"}),i=o.className;return t&&(o.index>H&&(i+=" drop-over-downward"),o.index<H&&(i+=" drop-over-upward")),a(n(r.a.createElement("tr",Object.assign({},o,{className:i,style:c}))))}}]),t}(r.a.Component),K={beginDrag:function(e){return H=e.index,{index:e.index}}},T=Object(E.DropTarget)("row",{drop:function(e,t){var a=t.getItem().index,n=e.index;a!==n&&(e.moveRow(a,n),t.getItem().index=n)}},function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver()}})(Object(E.DragSource)("row",K,function(e){return{connectDragSource:e.dragSource()}})(C)),I=S.a.Group,N={display:"block",height:"30px",lineHeight:"30px"},A=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={isEdit:!1},a.toggleEdit=function(){a.setState({isEdit:!a.state.isEdit})},a.components={body:{row:T}},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state.isEdit,t=this.props,a=t.data,n=t.moveRow,o=t.handleAddRow,c=t.title,i=t.handleUpdateData,l=t.handleDeleteRow,d=[{title:"Item",dataIndex:"item",key:"item",width:"30%",render:function(t,a){return e?r.a.createElement(f.a,{onChange:function(e){i(a.id,"item",e.currentTarget.value)},value:t}):t}},{title:"Amount",dataIndex:"amount",key:"amount",width:"25%",render:function(t,a){return e?r.a.createElement(y.a,{onChange:function(e){i(a.id,"amount",e)},value:t}):t}},{title:"Currency",dataIndex:"currency",key:"currency",width:"25%",render:function(t,a){return e?r.a.createElement(I,{onChange:function(e){i(a.id,"currency",e.target.value)},value:t},r.a.createElement(S.a,{style:N,value:"HKD"},"HKD"),r.a.createElement(S.a,{style:N,value:"THB"},"THB")):t}},{title:"Delete",dataIndex:"delete",key:"delete",width:"20%",render:function(e,t){return r.a.createElement(g.a,{type:"danger",onClick:function(){l(t.id)}},r.a.createElement(j.a,{type:"delete"}))}}];return r.a.createElement(p.a,{title:c,extra:r.a.createElement("div",null,r.a.createElement(g.a,{style:{marginRight:"12px"},onClick:this.toggleEdit},e?"Save":"Edit"),r.a.createElement(g.a,{type:"primary",onClick:o},"New Row"))},r.a.createElement(D.a,{size:"small",bordered:!0,rowKey:"id",columns:d,dataSource:a,components:this.components,onRow:function(e,t){return{index:t,moveRow:n}},pagination:!1}))}}]),t}(r.a.Component),U=Object(E.DragDropContext)(x.a)(A),B=[{title:"Person",dataIndex:"name",key:"name"},{title:"HKD",dataIndex:"HKD",key:"HKD"},{title:"Baht",dataIndex:"THB",key:"THB"},{title:"HKD Total",dataIndex:"total",key:"total"},{title:"Owe",dataIndex:"owe",key:"owe",render:function(e){return r.a.createElement("span",{style:{color:e>0?"red":"black"}},"".concat(e,"HKD"))}}],M=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={data1:[],data2:[],exchangeRate:4,name1:"Person 1",name2:"Person 2",isWideView:!1},a.moveRow1=function(e,t){var n=a.state.data1[e];a.setState(R()(a.state,{data1:{$splice:[[e,1],[t,0,n]]}}))},a.moveRow2=function(e,t){var n=a.state.data2[e];a.setState(R()(a.state,{data2:{$splice:[[e,1],[t,0,n]]}}))},a.handleAddRow1=function(){var e=a.state.data1,t=e.map(function(e){return e.id}).reduce(function(e,t){return t>=e?t:e},0)+1,n=[{id:t,item:"Item ".concat(t),amount:0,currency:"HKD"}];a.setState({data1:e.concat(n)})},a.handleAddRow2=function(){var e=a.state.data2,t=e.map(function(e){return e.id}).reduce(function(e,t){return t>=e?t:e},0)+1,n=[{id:t,item:"Item ".concat(t),amount:0,currency:"HKD"}];a.setState({data2:e.concat(n)})},a.handleDeleteRow1=function(e){var t=a.state.data1;a.setState({data1:t.filter(function(t){return t.id!==e})})},a.handleDeleteRow2=function(e){var t=a.state.data2;a.setState({data2:t.filter(function(t){return t.id!==e})})},a.getCalculationData=function(){var e=a.state,t=e.data1,n=e.data2,r=e.exchangeRate,o=e.name1,c=e.name2,i={name:o,HKD:0,THB:0,total:0,owe:0},l={name:c,HKD:0,THB:0,total:0,owe:0};t.forEach(function(e){i[e.currency]+=e.amount,i.total+="HKD"===e.currency?e.amount:Math.round(100*e.amount/r)/100}),n.forEach(function(e){l[e.currency]+=e.amount,l.total+="HKD"===e.currency?e.amount:Math.round(100*e.amount/r)/100}),i.total=Math.round(100*i.total)/100,l.total=Math.round(100*l.total)/100;var d=Math.round(100*(i.total+l.total))/100,u=Math.round(50*d)/100;return i.owe=Math.round(100*(d/2-i.total))/100,l.owe=Math.round(100*(d/2-l.total))/100,{tableData:[i,l],total:d,each:u}},a.handleUpdateData1=function(e,t,n){var r=a.state.data1.map(function(a){return a.id===e?Object(l.a)({},a,Object(i.a)({},t,n)):a});a.setState({data1:r})},a.handleUpdateData2=function(e,t,n){var r=a.state.data2.map(function(a){return a.id===e?Object(l.a)({},a,Object(i.a)({},t,n)):a});a.setState({data2:r})},a.updateExchangeRate=function(e){a.setState({exchangeRate:e})},a.handleUpdateName1=function(e){a.setState({name1:e.target.value})},a.handleUpdateName2=function(e){a.setState({name2:e.target.value})},a.handleSaveData=function(){var e=a.state,t={data1:e.data1,data2:e.data2,name1:e.name1,name2:e.name2,exchangeRate:e.exchangeRate};localStorage.setItem("moneySplit",JSON.stringify(t))},a.toggleView=function(){a.setState({isWideView:!a.state.isWideView})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("moneySplit");this.setState(JSON.parse(e))}},{key:"render",value:function(){var e=this.state,t=e.data1,a=e.data2,n=e.exchangeRate,o=e.name1,c=e.name2,i=e.isWideView,l=this.getCalculationData();return console.log(l),r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{title:r.a.createElement("div",null,r.a.createElement(g.a,{type:"primary",onClick:this.handleSaveData},"Save Data"),r.a.createElement(g.a,{style:{marginLeft:"12px"},onClick:this.toggleView},"Toggle View"))},r.a.createElement(w.a,{gutter:16},r.a.createElement(v.a,{md:24},"Person 1 Name: ",r.a.createElement(f.a,{value:o,onChange:this.handleUpdateName1}),"Person 2 Name: ",r.a.createElement(f.a,{value:c,onChange:this.handleUpdateName2})))),r.a.createElement(w.a,{gutter:16},r.a.createElement(v.a,{md:i?24:12,style:{marginTop:"20px"}},r.a.createElement(U,{title:o,data:t,moveRow:this.moveRow1,handleAddRow:this.handleAddRow1,handleUpdateData:this.handleUpdateData1,handleDeleteRow:this.handleDeleteRow1})),r.a.createElement(v.a,{md:i?24:12,style:{marginTop:"20px"}},r.a.createElement(U,{title:c,data:a,moveRow:this.moveRow2,handleAddRow:this.handleAddRow2,handleUpdateData:this.handleUpdateData2,handleDeleteRow:this.handleDeleteRow2})),r.a.createElement(v.a,{span:24},r.a.createElement(p.a,{title:"Total: ".concat(l.total," HKD (each: ").concat(l.each," HKD)"),style:{marginTop:"20px"}},r.a.createElement("p",null,"Currency Conversion HKD:Baht"),r.a.createElement(y.a,{value:n,placeholder:"4.00",style:{width:"25%"},onChange:this.updateExchangeRate}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(D.a,{rowKey:"name",bordered:!0,size:"small",dataSource:l.tableData,columns:B,pagination:!1})))))}}]),t}(r.a.Component),V=Object(E.DragDropContext)(x.a)(M),W=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(V,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var P=a(190),J=a(62),$=a(189),z=Object(J.c)({}),F=Object(J.d)(z,{},Object(J.a)($.a));c.a.render(r.a.createElement(P.a,{store:F},r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[195,1,2]]]);
//# sourceMappingURL=main.f82f1750.chunk.js.map