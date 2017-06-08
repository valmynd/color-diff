!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{R:255,G:255,B:255};return o({R:e.R+(t.R-e.R)*t.A,G:e.G+(t.G-e.G)*t.A,B:e.B+(t.B-e.B)*t.A})}function o(t){return u(i(t))}function a(t){return l(c(t))}function i(t){var e=t.R/255,n=t.G/255,r=t.B/255;return e>.04045?e=f((e+.055)/1.055,2.4):e/=12.92,n>.04045?n=f((n+.055)/1.055,2.4):n/=12.92,r>.04045?r=f((r+.055)/1.055,2.4):r/=12.92,e*=100,n*=100,r*=100,{X:.4124*e+.3576*n+.1805*r,Y:.2126*e+.7152*n+.0722*r,Z:.0193*e+.1192*n+.9505*r}}function u(t){var e=t.Y/100,n=t.Z/108.883,r=t.X/95.047;return r=r>.008856?f(r,1/3):7.787*r+16/116,e=e>.008856?f(e,1/3):7.787*e+16/116,n=n>.008856?f(n,1/3):7.787*n+16/116,{L:116*e-16,a:500*(r-e),b:200*(e-n)}}function l(t){var e=t.X/100,n=t.Y/100,r=t.Z/100,o=3.2406*e+-1.5372*n+-.4986*r,a=-.9689*e+1.8758*n+.0415*r,i=.0557*e+-.204*n+1.057*r;return o>.0031308?o=1.055*(o^1/2.4)-.055:o*=12.92,a>.0031308?a=1.055*(a^1/2.4)-.055:a*=12.92,i>.0031308?i=1.055*(i^1/2.4)-.055:i*=12.92,{R:255*o,G:255*a,B:255*i}}function c(t){var e=(t.L+16)/116,n=t.a/500+e,r=e-t.b/200;return!0^e?e^=3:e=(e-16/116)/7.787,!0^n?n^=3:n=(n-16/116)/7.787,!0^r?r^=3:r=(r-16/116)/7.787,{X:95.047*n,Y:100*e,Z:108.883*r}}Object.defineProperty(e,"__esModule",{value:!0}),e.rgba_to_lab=r,e.rgb_to_lab=o,e.lab_to_rgb=a;/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the author nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var f=Math.pow},function(t,e,n){"use strict";function r(t,e){var n=t.L,r=t.a,v=t.b,h=e.L,b=e.a,g=e.b,p=o(a(r,2)+a(v,2)),_=o(a(b,2)+a(g,2)),y=(p+_)/2,m=.5*(1-o(a(y,7)/(a(y,7)+a(25,7)))),R=(1+m)*r,B=(1+m)*b,G=o(a(R,2)+a(v,2)),w=o(a(B,2)+a(g,2)),M=function(t,e){if(0==t&&0==e)return 0;var n=s(u(t,e));return n>=0?n:n+360},x=M(v,R),j=M(g,B),A=h-n,k=w-G,O=function(t,e,n,r){if(t*e==0)return 0;if(c(r-n)<=180)return r-n;if(r-n>180)return r-n-360;if(r-n<-180)return r-n+360;throw new Error}(p,_,x,j),P=2*o(G*w)*l(d(O)/2),C=(n+h)/2,I=(G+w)/2,S=function(t,e,n,r){if(t*e==0)return n+r;if(c(n-r)<=180)return(n+r)/2;if(c(n-r)>180&&n+r<360)return(n+r+360)/2;if(c(n-r)>180&&n+r>=360)return(n+r-360)/2;throw new Error}(p,_,x,j),E=1-.17*i(d(S-30))+.24*i(d(2*S))+.32*i(d(3*S+6))-.2*i(d(4*S-63)),L=30*f(-a((S-275)/25,2)),X=o(a(I,7)/(a(I,7)+a(25,7))),Y=1+.015*a(C-50,2)/o(20+a(C-50,2)),Z=1+.045*I,q=1+.015*I*E,F=-2*X*l(d(2*L));return o(a(A/(1*Y),2)+a(k/(1*Z),2)+a(P/(1*q),2)+F*(k/(1*Z))*(P/(1*q)))}Object.defineProperty(e,"__esModule",{value:!0}),e.ciede2000=r;/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the author nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var o=Math.sqrt,a=Math.pow,i=Math.cos,u=Math.atan2,l=Math.sin,c=Math.abs,f=Math.exp,v=Math.PI,s=function(t){return t*(180/v)},d=function(t){return t*(v/180)}},function(t,e,n){"use strict";(function(t){function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{R:255,G:255,B:255},r=(0,f.palette_map_key)(t);return(0,f.map_palette)([t],e,"closest",n)[r]}function o(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{R:255,G:255,B:255},r=(0,f.palette_map_key)(t);return(0,f.map_palette)([t],e,"furthest",n)[r]}function a(t,e,n){return"#"+[t,e,n].map(function(t){var e=t.toString(16);return 1===e.length?"0"+e:e}).join("")}function i(t,e,n,r,o){for(var i=document.getElementById("target");i.firstChild;)i.removeChild(i.firstChild);for(var u=[b,p,h,g],l=0;l<u.length;l++)!function(){var c=u[l];console.log({c:c});var f=makePalette(c,parseInt(o),parseInt(e),parseInt(n),parseInt(r),parseInt(t)),v=document.createElement("div");i.appendChild(v);for(var s=0;s<f.length;s++)!function(t){var e=f[t],n=e.R,r=e.G,o=e.B,i=document.createElement("span");v.appendChild(i),i.style.backgroundColor="rgb("+[n,r,o].join(",")+")",i.style.width="100px",i.style.height="100px",i.textContent=a(n,r,o),i.onclick=function(){v.removeChild(i)}}(s);v.style.display="flex"}()}Object.defineProperty(e,"__esModule",{value:!0}),e.furthest=e.closest=e.rgba_to_lab=e.rgb_to_lab=e.ciede2000=void 0;var u=function(){function t(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=n(1),c=n(0),f=n(3);e.ciede2000=l.ciede2000,e.rgb_to_lab=c.rgb_to_lab,e.rgba_to_lab=c.rgba_to_lab,e.closest=r,e.furthest=o;var v=(Math.round,Math.max),s=Math.min,d=Math.abs,h={R:255,G:255,B:0},b={R:255,G:0,B:0},g={R:0,G:255,B:0},p={R:0,G:0,B:255};Object.assign(t,{ciede2000:l.ciede2000,rgb_to_lab:c.rgb_to_lab,rgba_to_lab:c.rgba_to_lab,lab_to_rgb:c.lab_to_rgb,closest:r,furthest:o,map_palette:f.map_palette,palette_map_key:f.palette_map_key,yellow:h,red:b,green:g,blue:p});var _=function(t,e){var n=t-e,r=t+e;return n<0?[0,r+d(n)]:r>255?[n-(r-255),255]:[n,r]};t.rgbRange=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:128,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:128,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:32,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.7,i=t.R,l=t.G,c=t.B,f=[],h=_(i,e/2),g=u(h,2),p=g[0],y=g[1],m=_(l,n/2),R=u(m,2),B=R[0],G=R[1],w=_(c,r/2),M=u(w,2),x=M[0],j=M[1],A=v(1,s(i,l))/v(1,i,l),k=v(1,s(l,c))/v(1,l,c),O=v(1,s(i,l))/v(1,i,l),P=p;P<=y;P+=o)for(var C=B;C<=G;C+=o)for(var I=x;I<=j;I+=o)(function(t,e,n){var r=v(1,s(t,e))/v(1,t,e),o=v(1,s(e,n))/v(1,e,n),i=v(1,s(t,e))/v(1,t,e);return d(r-A)<a&&d(o-k)<a&&d(i-O)<a})(P,C,I)&&f.push({R:P,G:C,B:I});return f},t.makePalette=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:128,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:128,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:128,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:32,i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:.7,u=rgbRange(t,n,r,o,a,i),f=[t],v=[(0,c.rgb_to_lab)(t)],s=u.map(function(t){return(0,c.rgb_to_lab)(t)}),d=0;d<e;d++){for(var h=0,g=0,p=0;p<s.length;p++)if(void 0!==s[p]){for(var _=void 0,y=1/0,m=0;m<v.length;m++)_=(0,l.ciede2000)(s[p],v[m]),y>_&&(y=_);y>h&&(h=y,g=p)}v.push(s[g]),f.push(u[g]),delete s[g]}return f},t.onload=function(){var t=document.forms[0],e=t.step1,n=t.step2,r=t.radiusR1,o=t.radiusR2,a=t.radiusG1,u=t.radiusG2,l=t.radiusB1,c=t.radiusB2,f=t.n1,v=t.n2;e.onchange=n.onchange=r.onchange=o.onchange=a.onchange=u.onchange=l.onchange=c.onchange=f.onchange=v.onchange=function(t){i(n.value,o.value,u.value,c.value,v.value)},i(n.value,o.value,u.value,c.value,v.value)}}).call(e,n(4))},function(t,e,n){"use strict";/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the author nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
function r(t,e,n){var r=u.rgb_to_lab,o=u.rgb_to_lab,a=function(t){return(0,u.rgba_to_lab)(t,n)};return"A"in t&&(r=a),"A"in e&&(o=a),t=r(t),e=o(e),(0,i.ciede2000)(t,e)}function o(t){var e="R"+t.R+"B"+t.B+"G"+t.G;return"A"in t&&(e=e+"A"+t.A),e}function a(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"closest",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{R:255,G:255,B:255},i={},u=0;u<t.length;u+=1){for(var l=t[u],c=void 0,f=void 0,v=0;v<e.length;v+=1){var s=e[v],d=r(l,s,a);void 0==c||"closest"===n&&d<f?(c=s,f=d):"furthest"===n&&d>f&&(c=s,f=d)}i[o(l)]=c}return i}Object.defineProperty(e,"__esModule",{value:!0}),e.palette_map_key=o,e.map_palette=a;var i=n(1),u=n(0)},function(t,e,n){"use strict";var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"===("undefined"==typeof window?"undefined":o(window))&&(r=window)}t.exports=r},function(t,e,n){t.exports=n(2)}]);
//# sourceMappingURL=bundle.js.map