import{x,y as D,A as k,a as L,d as $}from"./index-7f531408-1153aee2.js";import{K,w as M,P as j,G as A,e as z,r as C,i as Q,s as W,t as Z,a as q,R as O,v as N}from"./edges-69864166-9b991cbc.js";import{M as n,u as E,$ as S,X as B}from"./mermaid.esm.min-08cb9c57.js";var H=4;function U(r){return $(r,H)}function v(r){var e={options:{directed:r.isDirected(),multigraph:r.isMultigraph(),compound:r.isCompound()},nodes:V(r),edges:Y(r)};return x(r.graph())||(e.value=U(r.graph())),e}function V(r){return D(r.nodes(),function(e){var t=r.node(e),d=r.parent(e),i={v:e};return x(t)||(i.value=t),x(d)||(i.parent=d),i})}function Y(r){return D(r.edges(),function(e){var t=r.edge(e),d={v:e.v,w:e.w};return x(e.name)||(d.name=e.name),x(t)||(d.value=t),d})}let c={},p={},J={};const _=()=>{p={},J={},c={}},b=(r,e)=>(n.trace("In isDecendant",e," ",r," = ",p[e].includes(r)),!!p[e].includes(r)),ee=(r,e)=>(n.info("Decendants of ",e," is ",p[e]),n.info("Edge is ",r),r.v===e||r.w===e?!1:p[e]?p[e].includes(r.v)||b(r.v,e)||b(r.w,e)||p[e].includes(r.w):(n.debug("Tilt, ",e,",not in decendants"),!1)),T=(r,e,t,d)=>{n.warn("Copying children of ",r,"root",d,"data",e.node(r),d);const i=e.children(r)||[];r!==d&&i.push(r),n.warn("Copying (nodes) clusterId",r,"nodes",i),i.forEach(o=>{if(e.children(o).length>0)T(o,e,t,d);else{const h=e.node(o);n.info("cp ",o," to ",d," with parent ",r),t.setNode(o,h),d!==e.parent(o)&&(n.warn("Setting parent",o,e.parent(o)),t.setParent(o,e.parent(o))),r!==d&&o!==r?(n.debug("Setting parent",o,r),t.setParent(o,r)):(n.info("In copy ",r,"root",d,"data",e.node(r),d),n.debug("Not Setting parent for node=",o,"cluster!==rootId",r!==d,"node!==clusterId",o!==r));const l=e.edges(o);n.debug("Copying Edges",l),l.forEach(g=>{n.info("Edge",g);const f=e.edge(g.v,g.w,g.name);n.info("Edge data",f,d);try{ee(g,d)?(n.info("Copying as ",g.v,g.w,f,g.name),t.setEdge(g.v,g.w,f,g.name),n.info("newGraph edges ",t.edges(),t.edge(t.edges()[0]))):n.info("Skipping copy of edge ",g.v,"-->",g.w," rootId: ",d," clusterId:",r)}catch(u){n.error(u)}})}n.debug("Removing node",o),e.removeNode(o)})},R=(r,e)=>{const t=e.children(r);let d=[...t];for(const i of t)J[i]=r,d=[...d,...R(i,e)];return d},y=(r,e)=>{n.trace("Searching",r);const t=e.children(r);if(n.trace("Searching children of id ",r,t),t.length<1)return n.trace("This is a valid node",r),r;for(const d of t){const i=y(d,e);if(i)return n.trace("Found replacement for",r," => ",i),i}},m=r=>!c[r]||!c[r].externalConnections?r:c[r]?c[r].id:r,re=(r,e)=>{if(!r||e>10){n.debug("Opting out, no graph ");return}else n.debug("Opting in, graph ");r.nodes().forEach(function(t){r.children(t).length>0&&(n.warn("Cluster identified",t," Replacement id in edges: ",y(t,r)),p[t]=R(t,r),c[t]={id:y(t,r),clusterData:r.node(t)})}),r.nodes().forEach(function(t){const d=r.children(t),i=r.edges();d.length>0?(n.debug("Cluster identified",t,p),i.forEach(o=>{if(o.v!==t&&o.w!==t){const h=b(o.v,t),l=b(o.w,t);h^l&&(n.warn("Edge: ",o," leaves cluster ",t),n.warn("Decendants of XXX ",t,": ",p[t]),c[t].externalConnections=!0)}})):n.debug("Not a cluster ",t,p)}),r.edges().forEach(function(t){const d=r.edge(t);n.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(t)),n.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(r.edge(t)));let i=t.v,o=t.w;if(n.warn("Fix XXX",c,"ids:",t.v,t.w,"Translating: ",c[t.v]," --- ",c[t.w]),c[t.v]&&c[t.w]&&c[t.v]===c[t.w]){n.warn("Fixing and trixing link to self - removing XXX",t.v,t.w,t.name),n.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),i=m(t.v),o=m(t.w),r.removeEdge(t.v,t.w,t.name);const h=t.w+"---"+t.v;r.setNode(h,{domId:h,id:h,labelStyle:"",labelText:d.label,padding:0,shape:"labelRect",style:""});const l=JSON.parse(JSON.stringify(d)),g=JSON.parse(JSON.stringify(d));l.label="",l.arrowTypeEnd="none",g.label="",l.fromCluster=t.v,g.toCluster=t.v,r.setEdge(i,h,l,t.name+"-cyclic-special"),r.setEdge(h,o,g,t.name+"-cyclic-special")}else(c[t.v]||c[t.w])&&(n.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),i=m(t.v),o=m(t.w),r.removeEdge(t.v,t.w,t.name),i!==t.v&&(d.fromCluster=t.v),o!==t.w&&(d.toCluster=t.w),n.warn("Fix Replacing with XXX",i,o,t.name),r.setEdge(i,o,d,t.name))}),n.warn("Adjusted Graph",v(r)),I(r,0),n.trace(c)},I=(r,e)=>{if(n.warn("extractor - ",e,v(r),r.children("D")),e>10){n.error("Bailing out");return}let t=r.nodes(),d=!1;for(const i of t){const o=r.children(i);d=d||o.length>0}if(!d){n.debug("Done, no node has children",r.nodes());return}n.debug("Nodes = ",t,e);for(const i of t)if(n.debug("Extracting node",i,c,c[i]&&!c[i].externalConnections,!r.parent(i),r.node(i),r.children("D")," Depth ",e),!c[i])n.debug("Not a cluster",i,e);else if(!c[i].externalConnections&&r.children(i)&&r.children(i).length>0){n.warn("Cluster without external connections, without a parent and with children",i,e);let o=r.graph().rankdir==="TB"?"LR":"TB";c[i]&&c[i].clusterData&&c[i].clusterData.dir&&(o=c[i].clusterData.dir,n.warn("Fixing dir",c[i].clusterData.dir,o));const h=new k({multigraph:!0,compound:!0}).setGraph({rankdir:o,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});n.warn("Old graph before copy",v(r)),T(i,r,h,i),r.setNode(i,{clusterNode:!0,id:i,clusterData:c[i].clusterData,labelText:c[i].labelText,graph:h}),n.warn("New graph after copy node: (",i,")",v(h)),n.debug("Old graph after copy",v(r))}else n.warn("Cluster ** ",i," **not meeting the criteria !externalConnections:",!c[i].externalConnections," no parent: ",!r.parent(i)," children ",r.children(i)&&r.children(i).length>0,r.children("D"),e),n.debug(c);t=r.nodes(),n.warn("New list of nodes",t);for(const i of t){const o=r.node(i);n.warn(" Now next level",i,o),o.clusterNode&&I(o.graph,e+1)}},G=(r,e)=>{if(e.length===0)return[];let t=Object.assign(e);return e.forEach(d=>{const i=r.children(d),o=G(r,i);t=[...t,...o]}),t},te=r=>G(r,r.children()),ne=(r,e)=>{n.trace("Creating subgraph rect for ",e.id,e);const t=r.insert("g").attr("class","cluster"+(e.class?" "+e.class:"")).attr("id",e.id),d=t.insert("rect",":first-child"),i=t.insert("g").attr("class","cluster-label"),o=i.node().appendChild(O(e.labelText,e.labelStyle,void 0,!0));let h=o.getBBox();if(E(S().flowchart.htmlLabels)){const s=o.children[0],a=B(o);h=s.getBoundingClientRect(),a.attr("width",h.width),a.attr("height",h.height)}const l=0*e.padding,g=l/2,f=e.width<=h.width+l?h.width+l:e.width;e.width<=h.width+l?e.diff=(h.width-e.width)/2-e.padding/2:e.diff=-e.padding/2,n.trace("Data ",e,JSON.stringify(e)),d.attr("style",e.style).attr("rx",e.rx).attr("ry",e.ry).attr("x",e.x-f/2).attr("y",e.y-e.height/2-g).attr("width",f).attr("height",e.height+l),i.attr("transform","translate("+(e.x-h.width/2)+", "+(e.y-e.height/2)+")");const u=d.node().getBBox();return e.width=u.width,e.height=u.height,e.intersect=function(s){return N(e,s)},t},ie=(r,e)=>{const t=r.insert("g").attr("class","note-cluster").attr("id",e.id),d=t.insert("rect",":first-child"),i=0*e.padding,o=i/2;d.attr("rx",e.rx).attr("ry",e.ry).attr("x",e.x-e.width/2-o).attr("y",e.y-e.height/2-o).attr("width",e.width+i).attr("height",e.height+i).attr("fill","none");const h=d.node().getBBox();return e.width=h.width,e.height=h.height,e.intersect=function(l){return N(e,l)},t},de=(r,e)=>{const t=r.insert("g").attr("class",e.classes).attr("id",e.id),d=t.insert("rect",":first-child"),i=t.insert("g").attr("class","cluster-label"),o=t.append("rect"),h=i.node().appendChild(O(e.labelText,e.labelStyle,void 0,!0));let l=h.getBBox();if(E(S().flowchart.htmlLabels)){const a=h.children[0],w=B(h);l=a.getBoundingClientRect(),w.attr("width",l.width),w.attr("height",l.height)}l=h.getBBox();const g=0*e.padding,f=g/2,u=e.width<=l.width+e.padding?l.width+e.padding:e.width;e.width<=l.width+e.padding?e.diff=(l.width+e.padding*0-e.width)/2:e.diff=-e.padding/2,d.attr("class","outer").attr("x",e.x-u/2-f).attr("y",e.y-e.height/2-f).attr("width",u+g).attr("height",e.height+g),o.attr("class","inner").attr("x",e.x-u/2-f).attr("y",e.y-e.height/2-f+l.height-1).attr("width",u+g).attr("height",e.height+g-l.height-3),i.attr("transform","translate("+(e.x-l.width/2)+", "+(e.y-e.height/2-e.padding/3+(E(S().flowchart.htmlLabels)?5:3))+")");const s=d.node().getBBox();return e.height=s.height,e.intersect=function(a){return N(e,a)},t},oe=(r,e)=>{const t=r.insert("g").attr("class",e.classes).attr("id",e.id),d=t.insert("rect",":first-child"),i=0*e.padding,o=i/2;d.attr("class","divider").attr("x",e.x-e.width/2-o).attr("y",e.y-e.height/2).attr("width",e.width+i).attr("height",e.height+i);const h=d.node().getBBox();return e.width=h.width,e.height=h.height,e.diff=-e.padding/2,e.intersect=function(l){return N(e,l)},t},se={rect:ne,roundedWithTitle:de,noteGroup:ie,divider:oe};let F={};const ae=(r,e)=>{n.trace("Inserting cluster");const t=e.shape||"rect";F[e.id]=se[t](r,e)},ce=()=>{F={}},P=(r,e,t,d)=>{n.info("Graph in recursive render: XXX",v(e),d);const i=e.graph().rankdir;n.trace("Dir in recursive render - dir:",i);const o=r.insert("g").attr("class","root");e.nodes()?n.info("Recursive render XXX",e.nodes()):n.info("No nodes found for",e),e.edges().length>0&&n.trace("Recursive edges",e.edge(e.edges()[0]));const h=o.insert("g").attr("class","clusters"),l=o.insert("g").attr("class","edgePaths"),g=o.insert("g").attr("class","edgeLabels"),f=o.insert("g").attr("class","nodes");e.nodes().forEach(function(s){const a=e.node(s);if(d!==void 0){const w=JSON.parse(JSON.stringify(d.clusterData));n.info("Setting data for cluster XXX (",s,") ",w,d),e.setNode(d.id,w),e.parent(s)||(n.trace("Setting parent",s,d.id),e.setParent(s,d.id,w))}if(n.info("(Insert) Node XXX"+s+": "+JSON.stringify(e.node(s))),a&&a.clusterNode){n.info("Cluster identified",s,a.width,e.node(s));const w=P(f,a.graph,t,e.node(s)),X=w.elem;M(a,X),a.diff=w.diff||0,n.info("Node bounds (abc123)",s,a,a.width,a.x,a.y),j(X,a),n.warn("Recursive render complete ",X,a)}else e.children(s).length>0?(n.info("Cluster - the non recursive path XXX",s,a.id,a,e),n.info(y(a.id,e)),c[a.id]={id:y(a.id,e),node:a}):(n.info("Node - the non recursive path",s,a.id,a),A(f,e.node(s),i))}),e.edges().forEach(function(s){const a=e.edge(s.v,s.w,s.name);n.info("Edge "+s.v+" -> "+s.w+": "+JSON.stringify(s)),n.info("Edge "+s.v+" -> "+s.w+": ",s," ",JSON.stringify(e.edge(s))),n.info("Fix",c,"ids:",s.v,s.w,"Translateing: ",c[s.v],c[s.w]),z(g,a)}),e.edges().forEach(function(s){n.info("Edge "+s.v+" -> "+s.w+": "+JSON.stringify(s))}),n.info("#############################################"),n.info("###                Layout                 ###"),n.info("#############################################"),n.info(e),L(e),n.info("Graph after layout:",v(e));let u=0;return te(e).forEach(function(s){const a=e.node(s);n.info("Position "+s+": "+JSON.stringify(e.node(s))),n.info("Position "+s+": ("+a.x,","+a.y,") width: ",a.width," height: ",a.height),a&&a.clusterNode?C(a):e.children(s).length>0?(ae(h,a),c[a.id].node=a):C(a)}),e.edges().forEach(function(s){const a=e.edge(s);n.info("Edge "+s.v+" -> "+s.w+": "+JSON.stringify(a),a);const w=Q(l,s,a,c,t,e);W(a,w)}),e.nodes().forEach(function(s){const a=e.node(s);n.info(s,a.type,a.diff),a.type==="group"&&(u=a.diff)}),{elem:o,diff:u}},fe=(r,e,t,d,i)=>{K(r,t,d,i),Z(),q(),ce(),_(),n.warn("Graph at first:",v(e)),re(e),n.warn("Graph after:",v(e)),P(r,e,d)};export{fe as h};
