export function startAnimation(){
    ! function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof __SVGATOR_DEFINE__ && __SVGATOR_DEFINE__.amd ? __SVGATOR_DEFINE__(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).__SVGATOR_PLAYER__ = t.__SVGATOR_PLAYER__ || {}, t.__SVGATOR_PLAYER__["5c7f360c"] = e())
    }(this, (function() {
        "use strict";
        const t = n(Math.pow(10, -6)),
            e = n(Math.pow(10, -2));

        function n(t, e = 6) {
            return function(t, e, n) {
                if (Number.isInteger(t)) return t;
                const r = Math.pow(10, e);
                return Math[n]((+t + Number.EPSILON) * r) / r
            }(t, e, "round")
        }

        function r(e, n, r = t) {
            return Math.abs(e - n) < r
        }
        n(Math.pow(10, -4));
        const i = Math.PI / 180;

        function s(t) {
            return t * i
        }

        function o(t) {
            return t / i
        }

        function u(t) {
            return "number" != typeof t && (t = Number(t)), isNaN(t) || !isFinite(t) ? 0 : t
        }
        let l = {
            iD: !1
        };

        function a(t) {
            return `${t}`.replace(/['"]/g, "")
        }

        function c(t, e = "px") {
            return t.endsWith(e) ? t : `${t}${e}`
        }

        function f(t = "") {
            return l.iD ? t : void 0
        }

        function h(t) {
            const e = ["^", "\\s*", "(matrix\\()", "(?<a>-?[0-9]*\\.?[0-9]+)", "\\s*", ",?", "\\s*", "(?<b>-?[0-9]*\\.?[0-9]+)", "\\s*", ",?", "\\s*", "(?<c>-?[0-9]*\\.?[0-9]+)", "\\s*", ",?", "\\s*", "(?<d>-?[0-9]*\\.?[0-9]+)", "\\s*", ",?", "\\s*", "(?<e>-?[0-9]*\\.?[0-9]+)", "\\s*", ",?", "\\s*", "(?<f>-?[0-9]*\\.?[0-9]+)", "\\)"].join(""),
                n = t.match(new RegExp(e, "i"));
            if (n) return [u(n.groups.a), u(n.groups.b), u(n.groups.c), u(n.groups.d), u(n.groups.e), u(n.groups.f)]
        }

        function d(t, e = "inline") {
            return t && t !== e ? (t = a(t)) === e ? f(e) : t : f(e)
        }

        function g(t, e = "1px") {
            if (!t || t === e) return f(e);
            if (t.endsWith("px") || t.endsWith("%")) return t;
            const n = c(t = `${u(t)}`);
            return n === e ? f(e) : n
        }

        function p(t, e = "none") {
            return t && t !== e ? (t = a(t)) === e ? f(e) : t.startsWith("url(#") ? t : function(t) {
                const e = ["^", "\\s*", "url\\(", "#", "(?<maskId>[a-zA-Z0-9\\-_]+)", "\\)"].join(""),
                    n = t.match(new RegExp(e, "i"));
                if (n) return `url(#${n.groups.maskId})`
            }(t) : f(e)
        }

        function y(t, e = "rgb(0, 0, 0)") {
            if (!t || t === e) return f(e);
            if ((t = a(t)) === e) return f(e);
            if (t.startsWith("rgb")) return t;
            const n = function(t) {
                const e = ["^", "\\s*", "#", "(?<red>[0-9A-Z]{1,2})", "(?<green>[0-9A-Z]{1,2})", "(?<blue>[0-9A-Z]{1,2})"].join(""),
                    n = t.match(new RegExp(e, "i"));
                if (!n) return t;
                const r = t => parseInt(t.length > 1 ? t : `${t}${t}`, 16);
                return `rgb(${r(n.groups.red)}, ${r(n.groups.green)}, ${r(n.groups.blue)})`
            }(t);
            return n === e ? f(e) : n
        }

        function m(t, e = "1") {
            return t && t !== e ? (t = `${n(u(t),3)}`) === e ? f(e) : t : f(e)
        }
        let b = {};
        const v = {
            fill: "none",
            stroke: "none",
            opacity: "0.01",
            transform: "matrix(0.001 0 0 0.001 -10000 -10000)"
        };

        function w({
                       element: t,
                       tagType: e = "path",
                       property: n = "d",
                       attributeValue: r
                   }) {
            return b[r] || (b[r] = function({
                                                element: t,
                                                tagType: e = "path",
                                                property: n = "d",
                                                attributeValue: r
                                            }) {
                const i = t.ownerSVGElement,
                    s = document.createElementNS(i.namespaceURI, e);
                s.setAttributeNS(null, n, r);
                for (const t in v) s.setAttributeNS(null, t, v[t]);
                i.appendChild(s);
                const o = getComputedStyle(s)[n];
                return s.remove(), o
            }({
                element: t,
                tagType: e,
                property: n,
                attributeValue: r
            })), b[r]
        }
        const x = () => {
            b = {}
        };
        "object" == typeof window && (window.removeEventListener("resize", x), window.addEventListener("resize", x));
        const A = {
                include: (t, e) => ["path"].includes(e),
                formatter: t => function(t, e = "") {
                    return t && t !== e ? (t = a(t)) === e ? f(e) : t.startsWith("path(") ? t : `path('${t}')` : f(e)
                }(t)
            },
            _ = {
                include: (t, e) => ["rect", "mask"].includes(e),
                formatter: (t, e, n) => g(t, function(t, e) {
                    var n;
                    return (null === (n = {
                        mask: {
                            x: "-150%",
                            y: "-150%",
                            width: "400%",
                            height: "400%"
                        }
                    } [e]) || void 0 === n ? void 0 : n[t]) || (["x", "y"].includes(t) ? "0px" : "100%")
                }(e, n))
            },
            S = Object.freeze({
                d: A,
                display: t => d(t),
                height: _,
                fill: t => y(t),
                "fill-opacity": t => m(t),
                filter: t => d(t, "none"),
                mask: t => p(t),
                opacity: t => m(t),
                stroke: t => y(t, "none"),
                "stroke-opacity": t => m(t),
                "stroke-width": t => g(t),
                transform: t => function(t, e = "none") {
                    if (!t || t === e) return f(e);
                    const n = h(t);
                    return n ? `matrix(${n.join(", ")})` : t
                }(t),
                "transform-origin": t => function(t, e = "0px 0px") {
                    if (!t || t === e) return f(e);
                    const n = ["^", "\\s*", "(?<x>[0-9]+)", "(px)?", "\\s*", ",", "\\s*", "(?<y>[0-9]+)", "(px)?"].join(""),
                        r = t.match(new RegExp(n, "i"));
                    if (!r) return t;
                    let i = `${u(r.groups.x)}`;
                    i = c(i);
                    let s = `${u(r.groups.y)}`;
                    s = c(s);
                    const o = `${i} ${s}`;
                    return o === e ? f(e) : o
                }(t),
                visibility: t => d(t, "visible"),
                width: _,
                x: _,
                y: _
            }),
            k = Object.keys(S),
            E = e;

        function M(t, e, n, i, s = window) {
            var o, u;
            const l = t.getAttribute(e),
                a = "transform" === e ? "none" : "",
                c = s.safari && !s.chrome && (null === (o = i.getPropertyValue) || void 0 === o ? void 0 : o.call(i, e)) === a || "mask" === n ? l : null === (u = i.getPropertyValue) || void 0 === u ? void 0 : u.call(i, e);
            if (l && c) {
                if (l === c) return l;
                switch (e) {
                    case "transform":
                        return function(t, e) {
                            const n = h(t),
                                i = h(e);
                            if ((null == n ? void 0 : n.length) === (null == i ? void 0 : i.length)) {
                                for (let t = 0, e = n.length; t < e; t++)
                                    if (n[t] !== i[t] && (s = i[t], !r(((o = n[t]) - s) / (o || 1) * 100, 0, E))) return;
                                var s, o;
                                return t
                            }
                        }(l, c);
                    case "d":
                        return function(t, e, n) {
                            return w({
                                element: t,
                                attributeValue: e
                            }) === n ? e : void 0
                        }(t, l, c);
                    default:
                        return c
                }
            }
        }

        function I(t, e, n, r) {
            var i, s, o, u;
            const l = "transform" === e || ["mask", "path"].includes(n) && ["x", "y", "width", "height", "d"].includes(e);
            return r && l ? M(t, e, n, r) : (null === (i = r.getPropertyValue) || void 0 === i ? void 0 : i.call(r, e)) ?? (null === (s = t.attrs) || void 0 === s || null === (o = s.style) || void 0 === o ? void 0 : o[e]) ?? (null === (u = t.attrs) || void 0 === u ? void 0 : u[e])
        }

        function N(t, e, n = !1) {
            l.iD = n;
            const r = "undefined" != typeof window && getComputedStyle(t),
                i = {};
            for (let l = 0, a = k.length; l < a; l++) {
                var s, o, u;
                const a = k[l],
                    c = t.type || t.nodeName;
                if (!1 === (null === (s = (o = S[a]).include) || void 0 === s ? void 0 : s.call(o, a, c))) continue;
                const f = S[a].formatter || S[a];
                if (null != e && null !== (u = e[t.id]) && void 0 !== u && u[a]) continue;
                const h = I(t, a, c, r);
                if (null == h && !n) continue;
                const d = f.call(this, h, a, c);
                d && (i[a] = d)
            }
            return i
        }

        function j(t) {
            var e, n;
            if (null == t || null === (e = t.wD) || void 0 === e || !e.length) return;
            this.h = t.wD.shift();
            const r = null === (n = t.rootId) || void 0 === n ? void 0 : n.slice(0, -1);
            this.wIs = t.wD.map((t => `${r}${t}`))
        }

        function B(t) {
            const e = new j(t),
                n = t.svg,
                r = e.wIs,
                i = t.originalAnimations[0].elements,
                s = e.h;

            function o(t, e, s) {
                var u;
                if (e[t]) return;
                const l = n.querySelector("#" + t),
                    a = null == l || null === (u = l.parentElement) || void 0 === u ? void 0 : u.id;
                if (l && a) {
                    if (r.includes(a)) return e[a] || o(a, e, s), e[a].children ??= [], e[t] = N(l, i), void e[a].children.push(e[t]);
                    e[t] = N(l, i), s.push(e[t])
                }
            }
            async function u() {
                const t = function() {
                    let t = [],
                        e = {};
                    for (let n = 0, i = r.length; n < i; n++) o(r[n], e, t);
                    return t
                }();
                return await async function(t) {
                    var e, n;
                    const r = JSON.stringify(t),
                        i = (new TextEncoder).encode(r),
                        o = await (null === (e = window.crypto) || void 0 === e || null === (n = e.subtle) || void 0 === n ? void 0 : n.digest("SHA-256", i));
                    return o && Array.from(new Uint8Array(o)).map((t => t.toString(16).padStart(2, "0"))).join("") || s
                }(t)
            }
            this.vH = async function() {
                await u() !== s && requestAnimationFrame((() => t.stop()))
            }
        }

        function O(t) {
            let e = 0,
                n = 0;
            const r = new B(t);
            this.cF = function(i, s) {
                return t.wD ? (e++, function(t) {
                    return !(t - n < 300) && (t - n >= 500 || e >= 3)
                }(i) ? (e = 0, n = i, window.requestAnimationFrame((() => r.vH())), s()) : s()) : s()
            }
        }

        function T(t) {
            return t
        }

        function F(t, e, n) {
            const r = 1 - n;
            return 3 * n * r * (t * r + e * n) + n * n * n
        }

        function V(t = 0, e = 0, n = 1, i = 1) {
            return t < 0 || t > 1 || n < 0 || n > 1 ? null : r(t, e) && r(n, i) ? T : s => {
                if (s <= 0) return t > 0 ? s * e / t : 0 === e && n > 0 ? s * i / n : 0;
                if (s >= 1) return n < 1 ? 1 + (s - 1) * (i - 1) / (n - 1) : 1 === n && t < 1 ? 1 + (s - 1) * (e - 1) / (t - 1) : 1;
                let o, u = 0,
                    l = 1;
                for (; u < l;) {
                    o = (u + l) / 2;
                    const e = F(t, n, o);
                    if (r(s, e)) break;
                    e < s ? u = o : l = o
                }
                return F(e, i, o)
            }
        }

        function R() {
            return 1
        }

        function C(t) {
            return 1 === t ? 1 : 0
        }

        function P(t = 1, e = 0) {
            if (1 === t) {
                if (0 === e) return C;
                if (1 === e) return R
            }
            const n = 1 / t;
            return t => t >= 1 ? 1 : (t += e * n) - t % n
        }
        Number.isInteger || (Number.isInteger = function(t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t
        }), Number.EPSILON || (Number.EPSILON = 2220446049250313e-31);
        const $ = Math.sin,
            D = Math.cos,
            L = Math.acos,
            q = Math.asin,
            z = Math.tan,
            G = Math.atan2,
            W = Math.sqrt;

        function Y(t, e) {
            return {
                a: t[0] * e[0] + t[2] * e[1],
                b: t[1] * e[0] + t[3] * e[1],
                c: t[0] * e[2] + t[2] * e[3],
                d: t[1] * e[2] + t[3] * e[3],
                tx: t[0] * e[4] + t[2] * e[5] + t[4],
                ty: t[1] * e[4] + t[3] * e[5] + t[5]
            }
        }

        function U(t, e, n) {
            return t >= .5 ? n : e
        }

        function H(t, e, n) {
            return 0 === t || e === n ? e : t * (n - e) + e
        }

        function Z(t, e, n) {
            const r = H(t, e, n);
            return r <= 0 ? 0 : r
        }

        function J(t, e, n) {
            const r = H(t, e, n);
            return r <= 0 ? 0 : r >= 1 ? 1 : r
        }

        function Q(t, e, n) {
            return 0 === t ? e : 1 === t ? n : {
                x: H(t, e.x, n.x),
                y: H(t, e.y, n.y)
            }
        }

        function X(t, e, n) {
            return 0 === t ? e : 1 === t ? n : {
                x: Z(t, e.x, n.x),
                y: Z(t, e.y, n.y)
            }
        }

        function K(t, e, n) {
            const r = function(t, e, n) {
                return Math.round(H(t, e, n))
            }(t, e, n);
            return r <= 0 ? 0 : r >= 255 ? 255 : r
        }

        function tt(t, e, n) {
            return 0 === t ? e : 1 === t ? n : {
                r: K(t, e.r, n.r),
                g: K(t, e.g, n.g),
                b: K(t, e.b, n.b),
                a: H(t, null == e.a ? 1 : e.a, null == n.a ? 1 : n.a)
            }
        }

        function et(t, e, n) {
            let r = e.length;
            if (r !== n.length) return U(t, e, n);
            let i = new Array(r);
            for (let s = 0; s < r; s++) i[s] = H(t, e[s], n[s]);
            return i
        }

        function nt(t, e) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(e);
            return n
        }

        function rt(t, e) {
            if (--e <= 0) return t;
            const n = (t = Object.assign([], t)).length;
            do {
                for (let e = 0; e < n; e++) t.push(t[e])
            } while (--e > 0);
            return t
        }
        class it {
            constructor(t) {
                this.list = t, this.length = t.length
            }
            setAttribute(t, e) {
                const n = this.list;
                for (let r = 0; r < this.length; r++) n[r].setAttribute(t, e)
            }
            removeAttribute(t) {
                const e = this.list;
                for (let n = 0; n < this.length; n++) e[n].removeAttribute(t)
            }
            style(t, e) {
                const n = this.list;
                for (let r = 0; r < this.length; r++) n[r].style[t] = e
            }
        }
        const st = /-./g,
            ot = (t, e) => e.toUpperCase();
        let ut;

        function lt(t) {
            return "function" == typeof t ? t : U
        }

        function at(t) {
            return t ? "function" == typeof t ? t : Array.isArray(t) ? function(t, e = T) {
                if (!Array.isArray(t)) return e;
                switch (t.length) {
                    case 1:
                        return P(t[0]) || e;
                    case 2:
                        return P(t[0], t[1]) || e;
                    case 4:
                        return V(t[0], t[1], t[2], t[3]) || e
                }
                return e
            }(t, null) : function(t, e, n = T) {
                switch (t) {
                    case "linear":
                        return T;
                    case "steps":
                        return P(e.steps || 1, e.jump || 0) || n;
                    case "bezier":
                    case "cubic-bezier":
                        return V(e.x1 || 0, e.y1 || 0, e.x2 || 0, e.y2 || 0) || n
                }
                return n
            }(t.type, t.value, null) : null
        }

        function ct(t, e, n, r = !1) {
            const i = e.length - 1;
            if (t <= e[0].t) return r ? [0, 0, e[0].v] : e[0].v;
            if (t >= e[i].t) return r ? [i, 1, e[i].v] : e[i].v;
            let s, o = e[0],
                u = null;
            for (s = 1; s <= i; s++) {
                if (!(t > e[s].t)) {
                    u = e[s];
                    break
                }
                o = e[s]
            }
            return null == u ? r ? [i, 1, e[i].v] : e[i].v : o.t === u.t ? r ? [s, 1, u.v] : u.v : (t = (t - o.t) / (u.t - o.t), o.e && (t = o.e(t)), r ? [s, t, n(t, o.v, u.v)] : n(t, o.v, u.v))
        }

        function ft(t, e, n = null) {
            return t && t.length ? "function" != typeof e ? null : ("function" != typeof n && (n = null), r => {
                let i = ct(r, t, e);
                return null != i && n && (i = n(i)), i
            }) : null
        }

        function ht(t, e) {
            return t.t - e.t
        }

        function dt(t, e, n, r, i) {
            const s = "@" === n[0],
                o = "#" === n[0];
            let u = ut[n],
                l = U;
            var a;
            switch (s ? (a = n.substr(1), n = a.replace(st, ot)) : o && (n = n.substr(1)), typeof u) {
                case "function":
                    if (l = u(r, i, ct, at, n, s, e, t), o) return l;
                    break;
                case "string":
                    l = ft(r, lt(u));
                    break;
                case "object":
                    if (l = ft(r, lt(u.i), u.f), l && "function" == typeof u.u) return u.u(e, l, n, s, t)
            }
            return l ? function(t, e, n, r = !1) {
                if (r) return t instanceof it ? r => t.style(e, n(r)) : r => t.style[e] = n(r);
                if (Array.isArray(e)) {
                    const r = e.length;
                    return i => {
                        const s = n(i);
                        if (null == s)
                            for (let n = 0; n < r; n++) t[n].removeAttribute(e);
                        else
                            for (let n = 0; n < r; n++) t[n].setAttribute(e, s)
                    }
                }
                return r => {
                    const i = n(r);
                    null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
                }
            }(e, n, l, s) : null
        }

        function gt(t, e, n, r) {
            if (!r || "object" != typeof r) return null;
            let i = null,
                s = null;
            return Array.isArray(r) ? s = function(t) {
                if (!t || !t.length) return null;
                for (let e = 0; e < t.length; e++) t[e].e && (t[e].e = at(t[e].e));
                return t.sort(ht)
            }(r) : (s = r.keys, i = r.data || null), s ? dt(t, e, n, s, i) : null
        }

        function pt(t, e, n) {
            if (!n) return null;
            const r = [];
            for (const i in n)
                if (n.hasOwnProperty(i)) {
                    const s = gt(t, e, i, n[i]);
                    s && r.push(s)
                } return r.length ? r : null
        }

        function yt(t, e) {
            if (!e.settings.duration || e.settings.duration < 0) return null;
            const n = function(t, e) {
                if (!e) return null;
                let n = [];
                if (Array.isArray(e)) {
                    const r = e.length;
                    for (let i = 0; i < r; i++) {
                        const r = e[i];
                        if (2 !== r.length) continue;
                        let s = null;
                        if ("string" == typeof r[0]) s = t.getElementById(r[0]);
                        else if (Array.isArray(r[0])) {
                            s = [];
                            for (let e = 0; e < r[0].length; e++)
                                if ("string" == typeof r[0][e]) {
                                    const n = t.getElementById(r[0][e]);
                                    n && s.push(n)
                                } s = s.length ? 1 === s.length ? s[0] : new it(s) : null
                        }
                        if (!s) continue;
                        const o = pt(t, s, r[1]);
                        o && (n = n.concat(o))
                    }
                } else
                    for (const r in e) {
                        if (!e.hasOwnProperty(r)) continue;
                        const i = t.getElementById(r);
                        if (!i) continue;
                        const s = pt(t, i, e[r]);
                        s && (n = n.concat(s))
                    }
                return n.length ? n : null
            }(t, e.elements);
            return n ? function(t, e) {
                const n = e.duration,
                    r = t.length;
                let i = null;
                return (s, o) => {
                    const u = e.iterations || 1 / 0,
                        l = (e.alternate && u % 2 == 0) ^ e.direction > 0 ? n : 0;
                    let a = s % n,
                        c = 1 + (s - a) / n;
                    o *= e.direction, e.alternate && c % 2 == 0 && (o = -o);
                    let f = !1;
                    if (c > u) a = l, f = !0, -1 === e.fill && (a = e.direction > 0 ? 0 : n);
                    else if (o < 0 && (a = n - a), a === i) return !1;
                    i = a;
                    for (let e = 0; e < r; e++) t[e](a);
                    return f
                }
            }(n, e.settings) : null
        }

        function mt(t, e = document, n = 0) {
            const r = function(t, e) {
                const n = e.querySelectorAll("svg");
                for (let e = 0; e < n.length; e++)
                    if (n[e].id === t.root && !n[e].svgatorAnimation) return n[e].svgatorAnimation = !0, n[e];
                return null
            }(t, e);
            if (r) return r;
            if (n >= 20) return null;
            const i = function(t) {
                const e = t => t.shadowRoot;
                return document ? Array.from(t.querySelectorAll(":not(" + ["a", "area", "audio", "br", "canvas", "circle", "datalist", "embed", "g", "head", "hr", "iframe", "img", "input", "link", "object", "path", "polygon", "rect", "script", "source", "style", "svg", "title", "track", "video"].join() + ")")).filter(e).map(e) : []
            }(e);
            for (let e = 0; e < i.length; e++) {
                const r = mt(t, i[e], n + 1);
                if (r) return r
            }
            return null
        }

        function bt(t, e = null, n = Number, r = "undefined" != typeof BigInt && BigInt) {
            const i = "0x" + (t.replace(/[^0-9a-fA-F]+/g, "") || 27);
            return e && r && n.isSafeInteger && !n.isSafeInteger(+i) ? n(r(i)) % e + e : +i
        }

        function vt(t, e = 27) {
            return !t || t % e ? t % e : [0, 1].includes(e) ? e : vt(t / e, e)
        }

        function wt(t, e, n) {
            if (!t || !t.length) return;
            const r = bt(n),
                i = vt(r) + 5;
            let s = function(t, e, n) {
                let r = "";
                for (; t && n && e <= t.length;) r += t.substring(0, e), t = t.substring(e + 1), e = n;
                return r + t
            }(t, vt(r, 5), i);
            return s = s.replace(/\x7c$/g, "==").replace(/\x2f$/g, "="), s = atob(s), s = s.replace(/[\x41-\x5A]/g, ""), s = function(t, e, n) {
                const r = +("0x" + t.substring(0, 4));
                t = t.substring(4);
                const i = bt(e, r) % r + n % 27,
                    s = [];
                for (let e = 0; e < t.length; e += 2) {
                    if ("|" === t[e]) {
                        const n = +("0x" + t.substring(e + 1, e + 1 + 4)) - i;
                        e += 3, s.push(n);
                        continue
                    }
                    const n = +("0x" + t[e] + t[e + 1]) - i;
                    s.push(n)
                }
                return String.fromCharCode(...s)
            }(s, e, r), s = JSON.parse(s), s
        }
        const xt = [{
            key: "alternate",
            def: !1
        }, {
            key: "fill",
            def: 1
        }, {
            key: "iterations",
            def: 0
        }, {
            key: "direction",
            def: 1
        }, {
            key: "speed",
            def: 1
        }, {
            key: "fps",
            def: 100
        }];

        function At(t) {
            return n(t) + ""
        }

        function _t(t, e = " ") {
            return t && t.length ? t.map(At).join(e) : ""
        }

        function St(t) {
            return At(t.x) + "," + At(t.y)
        }

        function kt(t) {
            return t ? null == t.a || t.a >= 1 ? function(t) {
                if (!t) return "transparent";
                const e = t => parseInt(t).toString(16).padStart(2, "0");
                return function(t) {
                    const e = [];
                    let n = "#" === t[0] ? e.push("#") : 0;
                    for (; n < t.length; n += 2) {
                        if (t[n] !== t[n + 1]) return t;
                        e.push(t[n])
                    }
                    return e.join("")
                }("#" + e(t.r) + e(t.g) + e(t.b) + (null == t.a || t.a >= 1 ? "" : e(255 * t.a)))
            }(t) : "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")" : "transparent"
        }

        function Et(t) {
            return t ? "url(#" + t + ")" : "none"
        }! function() {
            for (var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
                var n = Date.now(),
                    r = Math.max(0, 16 - (n - t)),
                    i = window.setTimeout((function() {
                        e(n + r)
                    }), r);
                return t = n + r, i
            }, window.cancelAnimationFrame = window.clearTimeout)
        }();
        var Mt = {
                f: null,
                i: X,
                u: (t, e) => n => {
                    const r = e(n);
                    t.setAttribute("rx", At(r.x)), t.setAttribute("ry", At(r.y))
                }
            },
            It = {
                f: null,
                i: function(t, e, n) {
                    return 0 === t ? e : 1 === t ? n : {
                        width: Z(t, e.width, n.width),
                        height: Z(t, e.height, n.height)
                    }
                },
                u: (t, e) => n => {
                    const r = e(n);
                    t.setAttribute("width", At(r.width)), t.setAttribute("height", At(r.height))
                }
            };
        Object.freeze({
            M: 2,
            L: 2,
            Z: 0,
            H: 1,
            V: 1,
            C: 6,
            Q: 4,
            T: 2,
            S: 4,
            A: 7
        });
        let Nt = {},
            jt = null;

        function Bt(t) {
            let e = function() {
                if (jt) return jt;
                if ("object" != typeof document || !document.createElementNS) return {};
                let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                return t && t.style ? (t.style.position = "absolute", t.style.opacity = "0.01", t.style.zIndex = "-9999", t.style.left = "-9999px", t.style.width = "1px", t.style.height = "1px", jt = {
                    svg: t
                }, jt) : {}
            }().svg;
            if (!e) return function(t) {
                return null
            };
            let n = document.createElementNS(e.namespaceURI, "path");
            n.setAttributeNS(null, "d", t), n.setAttributeNS(null, "fill", "none"), n.setAttributeNS(null, "stroke", "none"), e.appendChild(n);
            let r = n.getTotalLength();
            return function(t) {
                let e = n.getPointAtLength(r * t);
                return {
                    x: e.x,
                    y: e.y
                }
            }
        }

        function Ot(t, e, n, r, i = 1) {
            let s = function(t) {
                return Nt[t] ? Nt[t] : Nt[t] = Bt(t)
            }(function(t, e, n, r) {
                if (!t || !r) return !1;
                let i = ["M", t.x, t.y];
                if (e && n && (i.push("C"), i.push(e.x), i.push(e.y), i.push(n.x), i.push(n.y)), e ? !n : n) {
                    let t = e || n;
                    i.push("Q"), i.push(t.x), i.push(t.y)
                }
                return e || n || i.push("L"), i.push(r.x), i.push(r.y), i.join(" ")
            }(t, e, n, r));
            try {
                return s(i)
            } catch (t) {
                return null
            }
        }

        function Tt(t, e, n) {
            return t + (e - t) * n
        }

        function Ft(t, e, n, r = !1) {
            const i = {
                x: Tt(t.x, e.x, n),
                y: Tt(t.y, e.y, n)
            };
            return r && (i.a = function(t, e) {
                return Math.atan2(e.y - t.y, e.x - t.x)
            }(t, e)), i
        }

        function Vt(t, e, n, r) {
            const i = 1 - r;
            return i * i * t + 2 * i * r * e + r * r * n
        }

        function Rt(t, e, n, r) {
            return 2 * (1 - r) * (e - t) + 2 * r * (n - e)
        }

        function Ct(t, e, n, r, i = !1) {
            let s = Ot(t, e, null, n, r);
            return s || (s = {
                x: Vt(t.x, e.x, n.x, r),
                y: Vt(t.y, e.y, n.y, r)
            }), i && (s.a = function(t, e, n, r) {
                return Math.atan2(Rt(t.y, e.y, n.y, r), Rt(t.x, e.x, n.x, r))
            }(t, e, n, r)), s
        }

        function Pt(t, e, n, r, i) {
            const s = i * i;
            return i * s * (r - t + 3 * (e - n)) + 3 * s * (t + n - 2 * e) + 3 * i * (e - t) + t
        }

        function $t(t, e, n, r, i) {
            const s = 1 - i;
            return 3 * (s * s * (e - t) + 2 * s * i * (n - e) + i * i * (r - n))
        }

        function Dt(t, e, n, r, i, s = !1) {
            let o = Ot(t, e, n, r, i);
            return o || (o = {
                x: Pt(t.x, e.x, n.x, r.x, i),
                y: Pt(t.y, e.y, n.y, r.y, i)
            }), s && (o.a = function(t, e, n, r, i) {
                return Math.atan2($t(t.y, e.y, n.y, r.y, i), $t(t.x, e.x, n.x, r.x, i))
            }(t, e, n, r, i)), o
        }

        function Lt(t, e, n, r = !1) {
            if (zt(e)) {
                if (Gt(n)) return Ct(e, n.start, n, t, r)
            } else if (zt(n)) {
                if (Wt(e)) return Ct(e, e.end, n, t, r)
            } else {
                if (Wt(e)) return Gt(n) ? Dt(e, e.end, n.start, n, t, r) : Ct(e, e.end, n, t, r);
                if (Gt(n)) return Ct(e, n.start, n, t, r)
            }
            return Ft(e, n, t, r)
        }

        function qt(t, e, n) {
            const r = Lt(t, e, n, !0);
            return r.a = o(function(t, e = !1) {
                return e ? t + Math.PI : t
            }(r.a)), r
        }

        function zt(t) {
            return !t.type || "corner" === t.type
        }

        function Gt(t) {
            return null != t.start && !zt(t)
        }

        function Wt(t) {
            return null != t.end && !zt(t)
        }
        const Yt = new class {
            constructor(t = 1, e = 0, n = 0, r = 1, i = 0, s = 0) {
                this.m = [t, e, n, r, i, s], this.i = null, this.w = null, this.s = null
            }
            get determinant() {
                const t = this.m;
                return t[0] * t[3] - t[1] * t[2]
            }
            get isIdentity() {
                if (null === this.i) {
                    const t = this.m;
                    this.i = 1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3] && 0 === t[4] && 0 === t[5]
                }
                return this.i
            }
            point(t, e) {
                const n = this.m;
                return {
                    x: n[0] * t + n[2] * e + n[4],
                    y: n[1] * t + n[3] * e + n[5]
                }
            }
            translateSelf(t = 0, e = 0) {
                if (!t && !e) return this;
                const n = this.m;
                return n[4] += n[0] * t + n[2] * e, n[5] += n[1] * t + n[3] * e, this.w = this.s = this.i = null, this
            }
            rotateSelf(t = 0) {
                if (t %= 360) {
                    t = s(t);
                    const e = $(t),
                        n = D(t),
                        r = this.m,
                        i = r[0],
                        o = r[1];
                    r[0] = i * n + r[2] * e, r[1] = o * n + r[3] * e, r[2] = r[2] * n - i * e, r[3] = r[3] * n - o * e, this.w = this.s = this.i = null
                }
                return this
            }
            scaleSelf(t = 1, e = 1) {
                if (1 !== t || 1 !== e) {
                    const n = this.m;
                    n[0] *= t, n[1] *= t, n[2] *= e, n[3] *= e, this.w = this.s = this.i = null
                }
                return this
            }
            skewSelf(t, e) {
                if (e %= 360, (t %= 360) || e) {
                    const n = this.m,
                        r = n[0],
                        i = n[1],
                        o = n[2],
                        u = n[3];
                    t && (t = z(s(t)), n[2] += r * t, n[3] += i * t), e && (e = z(s(e)), n[0] += o * e, n[1] += u * e), this.w = this.s = this.i = null
                }
                return this
            }
            resetSelf(t = 1, e = 0, n = 0, r = 1, i = 0, s = 0) {
                const o = this.m;
                return o[0] = t, o[1] = e, o[2] = n, o[3] = r, o[4] = i, o[5] = s, this.w = this.s = this.i = null, this
            }
            recomposeSelf(t = null, e = null, n = null, r = null, i = null) {
                return this.isIdentity || this.resetSelf(), t && (t.x || t.y) && this.translateSelf(t.x, t.y), e && this.rotateSelf(e), n && (n.x && this.skewSelf(n.x, 0), n.y && this.skewSelf(0, n.y)), !r || 1 === r.x && 1 === r.y || this.scaleSelf(r.x, r.y), i && (i.x || i.y) && this.translateSelf(i.x, i.y), this
            }
            decompose(t = 0, e = 0) {
                const r = this.m,
                    i = r[0] * r[0] + r[1] * r[1],
                    s = [
                        [r[0], r[1]],
                        [r[2], r[3]]
                    ];
                let u = W(i);
                if (0 === u) return {
                    origin: {
                        x: n(r[4]),
                        y: n(r[5])
                    },
                    translate: {
                        x: n(t),
                        y: n(e)
                    },
                    scale: {
                        x: 0,
                        y: 0
                    },
                    skew: {
                        x: 0,
                        y: 0
                    },
                    rotate: 0
                };
                s[0][0] /= u, s[0][1] /= u;
                const l = r[0] * r[3] - r[1] * r[2] < 0;
                l && (u = -u);
                let a = s[0][0] * s[1][0] + s[0][1] * s[1][1];
                s[1][0] -= s[0][0] * a, s[1][1] -= s[0][1] * a;
                let c, f = W(s[1][0] * s[1][0] + s[1][1] * s[1][1]);
                return 0 === f ? {
                    origin: {
                        x: n(r[4]),
                        y: n(r[5])
                    },
                    translate: {
                        x: n(t),
                        y: n(e)
                    },
                    scale: {
                        x: n(u),
                        y: 0
                    },
                    skew: {
                        x: 0,
                        y: 0
                    },
                    rotate: 0
                } : (s[1][0] /= f, s[1][1] /= f, a /= f, s[1][1] < 0 ? (c = o(L(s[1][1])), s[0][1] < 0 && (c = 360 - c)) : c = o(q(s[0][1])), l && (c = -c), a = o(G(a, W(s[0][0] * s[0][0] + s[0][1] * s[0][1]))), l && (a = -a), {
                    origin: {
                        x: n(r[4]),
                        y: n(r[5])
                    },
                    translate: {
                        x: n(t),
                        y: n(e)
                    },
                    scale: {
                        x: n(u),
                        y: n(f)
                    },
                    skew: {
                        x: n(a),
                        y: 0
                    },
                    rotate: n(c)
                })
            }
            multiply(t) {
                return this.clone().multiplySelf(t)
            }
            preMultiply(t) {
                return t.multiply(this)
            }
            multiplySelf(t) {
                const {
                    a: e,
                    b: n,
                    c: r,
                    d: i,
                    tx: s,
                    ty: o
                } = Y(this.m, t.m);
                return this.resetSelf(e, n, r, i, s, o), this
            }
            preMultiplySelf(t) {
                const {
                    a: e,
                    b: n,
                    c: r,
                    d: i,
                    tx: s,
                    ty: o
                } = Y(t.m, this.m);
                return this.resetSelf(e, n, r, i, s, o), this
            }
            clone() {
                const t = this.m;
                return new this.constructor(t[0], t[1], t[2], t[3], t[4], t[5])
            }
            static create(t) {
                return t ? Array.isArray(t) ? new this(...t) : t instanceof this ? t.clone() : (new this).recomposeSelf(t.origin, t.rotate, t.skew, t.scale, t.translate) : new this
            }
            toString(t = " ", e = !1) {
                if (null === this.s) {
                    let r = this.m.map((t => n(t)));
                    e || 1 !== r[0] || 0 !== r[1] || 0 !== r[2] || 1 !== r[3] ? this.s = "matrix(" + r.join(t) + ")" : this.s = "translate(" + r[4] + t + r[5] + ")"
                }
                return this.s
            }
        };
        var Ut = {
                f: function(t) {
                    return t ? t.join(" ") : ""
                },
                i: function(t, e, n) {
                    if (0 === t) return e;
                    if (1 === t) return n;
                    let r = e.length;
                    if (r !== n.length) return U(t, e, n);
                    let i, s = new Array(r);
                    for (let o = 0; o < r; o++) {
                        if (i = typeof e[o], i !== typeof n[o]) return U(t, e, n);
                        if ("number" === i) s[o] = H(t, e[o], n[o]);
                        else {
                            if (e[o] !== n[o]) return U(t, e, n);
                            s[o] = e[o]
                        }
                    }
                    return s
                }
            },
            Ht = {
                f: null,
                i: et,
                u: (t, e) => n => {
                    const r = e(n);
                    t.setAttribute("x1", At(r[0])), t.setAttribute("y1", At(r[1])), t.setAttribute("x2", At(r[2])), t.setAttribute("y2", At(r[3]))
                }
            },
            Zt = {
                f: At,
                i: H
            },
            Jt = {
                f: At,
                i: J
            },
            Qt = {
                f: function(t, e = " ") {
                    return t && t.length > 0 && (t = t.map((t => n(t, 4)))), _t(t, e)
                },
                i: function(t, e, r) {
                    let i = e.length,
                        s = r.length;
                    if (i !== s)
                        if (0 === i) i = s, e = nt(i, 0);
                        else if (0 === s) s = i, r = nt(i, 0);
                        else {
                            const t = function(t, e) {
                                const n = t * e / function(t, e) {
                                    let n;
                                    for (; e;) n = e, e = t % e, t = n;
                                    return t || 1
                                }(t, e);
                                return n < 0 ? -n : n
                            }(i, s);
                            e = rt(e, Math.floor(t / i)), r = rt(r, Math.floor(t / s)), i = s = t
                        }
                    let o = [];
                    for (let s = 0; s < i; s++) o.push(n(Z(t, e[s], r[s])));
                    return o
                }
            };

        function Xt(t, e, r) {
            return t.map((t => function(t, e, r) {
                let i = t.v;
                if (!i || "g" !== i.t || i.s || !i.v || !i.r) return t;
                const s = r.getElementById(i.r),
                    o = s && s.querySelectorAll("stop") || [];
                return i.s = i.v.map(((t, e) => {
                    let r = o[e] && o[e].getAttribute("offset");
                    return r = n(parseInt(r) / 100), {
                        c: t,
                        o: r
                    }
                })), delete i.v, t
            }(t, 0, r)))
        }
        const Kt = {
            gt: "gradientTransform",
            c: {
                x: "cx",
                y: "cy"
            },
            rd: "r",
            f: {
                x: "x1",
                y: "y1"
            },
            to: {
                x: "x2",
                y: "y2"
            }
        };

        function te(t, e, n, r, i, s, o, u) {
            return Xt(t, 0, u), e = function(t, e, n) {
                let r, i, s;
                const o = t.length - 1,
                    u = {};
                for (let l = 0; l <= o; l++) r = t[l], r.e && (r.e = e(r.e)), r.v && (i = r.v, "g" === i.t && i.r && (s = n.getElementById(i.r), s && (u[i.r] = {
                    e: s,
                    s: s.querySelectorAll("stop")
                })));
                return u
            }(t, r, u), r => {
                const i = n(r, t, ee);
                if (!i) return "none";
                if ("c" === i.t) return kt(i.v);
                if ("g" === i.t) {
                    if (!e[i.r]) return Et(i.r);
                    const t = e[i.r];
                    return function(t, e) {
                        let n = t.s;
                        for (let r = n.length; r < e.length; r++) {
                            const e = n[n.length - 1].cloneNode();
                            e.id = ie(e.id), t.e.appendChild(e), n = t.s = t.e.querySelectorAll("stop")
                        }
                        for (let t = 0, r = n.length, i = e.length - 1; t < r; t++) n[t].setAttribute("stop-color", kt(e[Math.min(t, i)].c)), n[t].setAttribute("offset", e[Math.min(t, i)].o)
                    }(t, i.s), Object.keys(Kt).forEach((e => {
                        if (void 0 === i[e]) return;
                        if ("object" == typeof Kt[e]) return void Object.keys(Kt[e]).forEach((n => {
                            if (void 0 === i[e][n]) return;
                            const r = i[e][n],
                                s = Kt[e][n];
                            t.e.setAttribute(s, r)
                        }));
                        const n = "gt" === e ? (r = i[e], Array.isArray(r) ? "matrix(" + r.join(" ") + ")" : "") : i[e];
                        var r;
                        const s = Kt[e];
                        t.e.setAttribute(s, n)
                    })), Et(i.r)
                }
                return "none"
            }
        }

        function ee(t, e, n) {
            if (0 === t) return e;
            if (1 === t) return n;
            if (e && n) {
                const r = e.t;
                if (r === n.t) switch (e.t) {
                    case "c":
                        return {
                            t: r, v: tt(t, e.v, n.v)
                        };
                    case "g":
                        if (e.r === n.r) {
                            const i = {
                                t: r,
                                s: ne(t, e.s, n.s),
                                r: e.r
                            };
                            return e.gt && n.gt && (i.gt = et(t, e.gt, n.gt)), e.c ? (i.c = Q(t, e.c, n.c), i.rd = Z(t, e.rd, n.rd)) : e.f && (i.f = Q(t, e.f, n.f), i.to = Q(t, e.to, n.to)), i
                        }
                }
                if ("c" === e.t && "g" === n.t || "c" === n.t && "g" === e.t) {
                    const r = "c" === e.t ? e : n,
                        i = "g" === e.t ? {
                            ...e
                        } : {
                            ...n
                        },
                        s = i.s.map((t => ({
                            c: r.v,
                            o: t.o
                        })));
                    return i.s = "c" === e.t ? ne(t, s, i.s) : ne(t, i.s, s), i
                }
            }
            return U(t, e, n)
        }

        function ne(t, e, n) {
            if (e.length === n.length) return e.map(((e, r) => re(t, e, n[r])));
            const r = Math.max(e.length, n.length),
                i = [];
            for (let s = 0; s < r; s++) {
                const r = re(t, e[Math.min(s, e.length - 1)], n[Math.min(s, n.length - 1)]);
                i.push(r)
            }
            return i
        }

        function re(t, e, n) {
            return {
                o: J(t, e.o, n.o || 0),
                c: tt(t, e.c, n.c || {})
            }
        }

        function ie(t) {
            return t.replace(/-fill-([0-9]+)$/, ((t, e) => "-fill-" + (+e + 1)))
        }

        function se(t, e, n) {
            return 0 === t ? e : 1 === t ? n : {
                blur: X(t, e.blur, n.blur),
                offset: Q(t, e.offset, n.offset),
                color: tt(t, e.color, n.color)
            }
        }
        const oe = {
            blur: X,
            brightness: Z,
            contrast: Z,
            "drop-shadow": se,
            "inner-shadow": se,
            grayscale: Z,
            "hue-rotate": H,
            invert: Z,
            opacity: Z,
            saturate: Z,
            sepia: Z
        };

        function ue(t, e, n) {
            if (0 === t) return e;
            if (1 === t) return n;
            const r = e.length;
            if (r !== n.length) return U(t, e, n);
            const i = [];
            let s;
            for (let o = 0; o < r; o++) {
                if (e[o].type !== n[o].type) return e;
                if (s = oe[e[o].type], !s) return U(t, e, n);
                i.push({
                    type: e.type,
                    value: s(t, e[o].value, n[o].value)
                })
            }
            return i
        }
        const le = {
            blur: t => t ? e => {
                t.setAttribute("stdDeviation", St(e))
            } : null,
            brightness: (t, e, n) => (t = ce(n, e)) ? e => {
                e = At(e), t.map((t => t.setAttribute("slope", e)))
            } : null,
            contrast: (t, e, n) => (t = ce(n, e)) ? e => {
                const n = At((1 - e) / 2);
                e = At(e), t.map((t => {
                    t.setAttribute("slope", e), t.setAttribute("intercept", n)
                }))
            } : null,
            "drop-shadow"(t, e, n) {
                const r = n.getElementById(e + "-blur");
                if (!r) return null;
                const i = n.getElementById(e + "-offset");
                if (!i) return null;
                const s = n.getElementById(e + "-flood");
                return s ? t => {
                    r.setAttribute("stdDeviation", St(t.blur)), i.setAttribute("dx", At(t.offset.x)), i.setAttribute("dy", At(t.offset.y)), s.setAttribute("flood-color", kt(t.color))
                } : null
            },
            "inner-shadow"(t, e, n) {
                const r = n.getElementById(e + "-blur");
                if (!r) return null;
                const i = n.getElementById(e + "-offset");
                if (!i) return null;
                const s = n.getElementById(e + "-color-matrix");
                return s ? t => {
                    r.setAttribute("stdDeviation", St(t.blur)), i.setAttribute("dx", At(t.offset.x)), i.setAttribute("dy", At(t.offset.y));
                    const e = [0, 0, 0, 0, t.color.r / 255, 0, 0, 0, 0, t.color.g / 255, 0, 0, 0, 0, t.color.b / 255, 0, 0, 0, t.color.a, 0];
                    s.setAttribute("values", _t(e))
                } : null
            },
            grayscale: t => t ? e => {
                t.setAttribute("values", _t(function(t) {
                    return [.2126 + .7874 * (t = 1 - t), .7152 - .7152 * t, .0722 - .0722 * t, 0, 0, .2126 - .2126 * t, .7152 + .2848 * t, .0722 - .0722 * t, 0, 0, .2126 - .2126 * t, .7152 - .7152 * t, .0722 + .9278 * t, 0, 0, 0, 0, 0, 1, 0]
                }(e)))
            } : null,
            "hue-rotate": t => t ? e => t.setAttribute("values", At(e)) : null,
            invert: (t, e, n) => (t = ce(n, e)) ? e => {
                e = At(e) + " " + At(1 - e), t.map((t => t.setAttribute("tableValues", e)))
            } : null,
            opacity: (t, e, n) => (t = n.getElementById(e + "-A")) ? e => t.setAttribute("tableValues", "0 " + At(e)) : null,
            saturate: t => t ? e => t.setAttribute("values", At(e)) : null,
            sepia: t => t ? e => t.setAttribute("values", _t(function(t) {
                return [.393 + .607 * (t = 1 - t), .769 - .769 * t, .189 - .189 * t, 0, 0, .349 - .349 * t, .686 + .314 * t, .168 - .168 * t, 0, 0, .272 - .272 * t, .534 - .534 * t, .131 + .869 * t, 0, 0, 0, 0, 0, 1, 0]
            }(e))) : null
        };
        const ae = ["R", "G", "B"];

        function ce(t, e) {
            const n = ae.map((n => t.getElementById(e + "-" + n) || null));
            return -1 !== n.indexOf(null) ? null : n
        }
        var fe = {
            fill: te,
            "fill-opacity": Jt,
            stroke: te,
            "stroke-opacity": Jt,
            "stroke-width": Zt,
            "stroke-dashoffset": {
                f: At,
                i: H
            },
            "stroke-dasharray": Qt,
            opacity: Jt,
            transform: function(t, e, n, r) {
                if (!(t = function(t, e) {
                    if (!t || "object" != typeof t) return null;
                    let n = !1;
                    for (const r in t) t.hasOwnProperty(r) && (t[r] && t[r].length ? (t[r].forEach((t => {
                        t.e && (t.e = e(t.e))
                    })), n = !0) : delete t[r]);
                    return n ? t : null
                }(t, r))) return null;
                const i = (r, i, s, o = null) => t[r] ? n(i, t[r], s) : e && e[r] ? e[r] : o;
                return e && e.a && t.o ? e => {
                    const r = n(e, t.o, qt);
                    return Yt.recomposeSelf(r, i("r", e, H, 0) + r.a, i("k", e, Q), i("s", e, Q), i("t", e, Q)).toString()
                } : t => Yt.recomposeSelf(i("o", t, Lt, null), i("r", t, H, 0), i("k", t, Q), i("s", t, Q), i("t", t, Q)).toString()
            },
            "#filter": function(t, e, n, r, i, s, o, u) {
                if (!e.items || !t || !t.length) return null;
                const l = function(t, e) {
                    const n = (t = t.map((t => t && le[t[0]] ? (e.getElementById(t[1]), le[t[0]](e.getElementById(t[1]), t[1], e)) : null))).length;
                    return e => {
                        for (let r = 0; r < n; r++) t[r] && t[r](e[r].value)
                    }
                }(e.items, u);
                return l ? (t = function(t, e) {
                    return t.map((t => (t.e = e(t.e), t)))
                }(t, r), e => {
                    l(n(e, t, ue))
                }) : null
            },
            "#line": Ht,
            points: {
                f: _t,
                i: et
            },
            d: Ut,
            r: Zt,
            "#size": It,
            "#radius": Mt,
            _(t, e) {
                if (Array.isArray(t))
                    for (let n = 0; n < t.length; n++) this[t[n]] = e;
                else this[t] = e
            }
        };
        let he = function(t, e, n = n) {
            let r = !1,
                i = null;
            return function(s) {
                r && clearTimeout(r), r = setTimeout((() => function() {
                    let s = 0,
                        o = n.innerHeight,
                        u = 0,
                        l = n.innerWidth,
                        a = t.parentNode;
                    for (; a instanceof Element;) {
                        let t = n.getComputedStyle(a);
                        if ("visible" !== t.overflowY || "visible" !== t.overflowX) {
                            let e = a.getBoundingClientRect();
                            "visible" !== t.overflowY && (s = Math.max(s, e.top), o = Math.min(o, e.bottom)), "visible" !== t.overflowX && (u = Math.max(u, e.left), l = Math.min(l, e.right))
                        }
                        if (a === a.parentNode) break;
                        a = a.parentNode
                    }
                    r = !1;
                    let c = t.getBoundingClientRect(),
                        f = Math.min(c.height, Math.max(0, s - c.top)),
                        h = Math.min(c.height, Math.max(0, c.bottom - o)),
                        d = Math.min(c.width, Math.max(0, u - c.left)),
                        g = Math.min(c.width, Math.max(0, c.right - l)),
                        p = (c.height - f - h) / c.height,
                        y = (c.width - d - g) / c.width,
                        m = Math.round(p * y * 100);
                    null !== i && i === m || (i = m, e(m))
                }()), 100)
            }
        };
        class de {
            constructor(t, e, n) {
                const r = function(t) {
                    var e, n;
                    const r = t && 1 === (null === (e = t.ownerDocument) || void 0 === e || null === (n = e.childNodes) || void 0 === n ? void 0 : n.length) && window.parent !== window,
                        i = {
                            el: t,
                            window: window
                        };
                    if (!r) return i;
                    let s;
                    try {
                        s = window.parent.document
                    } catch (t) {
                        return i
                    }
                    return i.window = window.parent, i.el = Array.from(s.querySelectorAll("iframe,object")).filter((t => t.contentWindow === window))[0] || i.el, i
                }(t);
                e = Math.max(1, e || 1), e = Math.min(e, 100), this.el = r.el, this._handlers = [], this.onThresholdChange = n && n.call ? n : () => {}, this.thresholdPercent = e || 1, this.currentVisibility = null, this.visibilityCalculator = he(this.el, this.onVisibilityUpdate.bind(this), r.window), this.bindScrollWatchers(), this.visibilityCalculator()
            }
            bindScrollWatchers() {
                let t = this.el.parentNode;
                for (; t && (this._handlers.push({
                    element: t,
                    event: "scroll",
                    handler: this.visibilityCalculator
                }), t.addEventListener("scroll", this.visibilityCalculator), t !== t.parentNode && t !== document);) t = t.parentNode
            }
            onVisibilityUpdate(t) {
                let e = this.currentVisibility >= this.thresholdPercent,
                    n = t >= this.thresholdPercent;
                if (null === this.currentVisibility || e !== n) return this.currentVisibility = t, void this.onThresholdChange(n);
                this.currentVisibility = t
            }
            destruct() {
                this._handlers.forEach((t => {
                    t.element.removeEventListener(t.event, t.handler)
                }))
            }
        }
        class ge {
            static adjustLink(t) {
                var e, n;
                const r = t && 1 === (null === (e = t.ownerDocument) || void 0 === e || null === (n = e.childNodes) || void 0 === n ? void 0 : n.length) && window.parent !== window,
                    i = null == t ? void 0 : t.firstElementChild;
                r && i && "a" === i.tagName && !i.getAttribute("target") && i.setAttributeNS(null, "target", "_parent")
            }
            static autoPlay(t, e, n, r = []) {
                if ("click" === n.start) {
                    const i = () => {
                        switch (n.click) {
                            case "freeze":
                                return !t._running && t.reachedToEnd() ? t.restart() : t.toggle();
                            case "restart":
                                return t.offset > 0 ? t.restart() : t.play();
                            case "reverse":
                                return t._running ? t.reverse() : t.reachedToEnd() ? 1 === t.fill ? t.reverse(!0) : t.restart() : t.play();
                            case "none":
                            default:
                                if (t._running) return;
                                return t.reachedToEnd() ? t.restart() : t.play()
                        }
                    };
                    return r.push({
                        element: e,
                        event: "click",
                        handler: i
                    }), void e.addEventListener("click", i)
                }
                if ("hover" === n.start) {
                    const i = () => t.reachedToEnd() ? t.restart() : t._rollingBack ? t.reverse() : t.play();
                    r.push({
                        element: e,
                        event: "mouseenter",
                        handler: i
                    }), e.addEventListener("mouseenter", i);
                    const s = () => {
                        switch (n.hover) {
                            case "freeze":
                                return t.pause();
                            case "reset":
                                return t.stop();
                            case "reverse":
                                if (t.reverse(), t._running) return;
                                return t.play();
                            case "none":
                            default:
                                return
                        }
                    };
                    return r.push({
                        element: e,
                        event: "mouseleave",
                        handler: s
                    }), void e.addEventListener("mouseleave", s)
                }
                if ("scroll" !== n.start) "programmatic" !== n.start && t.play();
                else {
                    const i = new de(e, n.scroll || 25, (function(e) {
                        e ? t.reachedToEnd() ? t.restart() : t.play() : t.pause()
                    }));
                    r.push({
                        callback: () => i.destruct()
                    })
                }
            }
        }
        class pe extends class {
            _svg;
            _rootId;
            constructor(t) {
                this._id = 0, this._running = !1, this._rollingBack = !1, this._animations = t.animations, this._settings = t.animationSettings, t.version < "2022-05-02" && delete this._settings.speed, xt.forEach((t => {
                    this._settings[t.key] = this._settings[t.key] || t.def
                })), this.duration = t.animationSettings.duration, this.offset = t.animationSettings.offset || 0, this.rollbackStartOffset = 0, this._rootId = t.root, this._svg = t.svg, this._originalAnimations = t.originalAnimations, this._fTC = new O(this)
            }
            get svg() {
                return this._svg
            }
            get rootId() {
                return this._rootId
            }
            get alternate() {
                return this._settings.alternate
            }
            get fill() {
                return this._settings.fill
            }
            get iterations() {
                return this._settings.iterations
            }
            get direction() {
                return this._settings.direction
            }
            get speed() {
                return this._settings.speed
            }
            get fps() {
                return this._settings.fps
            }
            get wD() {
                return this._settings.w
            }
            get originalAnimations() {
                return this._originalAnimations
            }
            get maxFiniteDuration() {
                return this.iterations > 0 ? this.iterations * this.duration : this.duration
            }
            static build(t, e) {
                if (delete t.animationSettings, t.options = wt(t.options, t.root, "5c7f360c"), t.animations.map((e => {
                    e.settings = wt(e.s, t.root, "5c7f360c"), delete e.s, t.animationSettings || (t.animationSettings = e.settings)
                })), Object.assign(t, {
                    originalAnimations: t.animations
                }, function(t, e) {
                    if (ut = e, !t || !t.root || !Array.isArray(t.animations)) return null;
                    const n = mt(t);
                    if (!n) return null;
                    const r = t.animations.map((t => yt(n, t))).filter((t => !!t));
                    return r.length ? {
                        svg: n,
                        animations: r
                    } : null
                }(t, e)), !t) return null;
                const n = t.options || {},
                    r = new this(t);
                return {
                    el: t.svg,
                    options: n,
                    player: r
                }
            }
            static push(t) {
                return this.build(t)
            }
            static init() {
                const t = window.__SVGATOR_PLAYER__ && window.__SVGATOR_PLAYER__["5c7f360c"];
                Array.isArray(t) && t.splice(0).forEach((t => this.build(t)))
            }
            _apply(t, e = {}) {
                const n = this._animations,
                    r = n.length;
                let i = 0;
                for (let s = 0; s < r; s++) e[s] ? i++ : (e[s] = n[s](t, 1), e[s] && i++);
                return i
            }
            _rollback(t) {
                let e = 1 / 0,
                    n = null;
                this.rollbackStartOffset = t, this._rollingBack = !0, this._running = !0;
                const r = i => {
                    if (!this._rollingBack) return;
                    null == n && (n = i);
                    let s = Math.round(t - (i - n) * this.speed);
                    if (s > this.duration && e !== 1 / 0) {
                        const t = !!this.alternate && s / this.duration % 2 > 1;
                        let e = s % this.duration;
                        e += t ? this.duration : 0, s = e || this.duration
                    }
                    const o = (this.fps ? 1e3 / this.fps : 0) * this.speed,
                        u = Math.max(0, s);
                    u <= e - o && (this.offset = u, e = u, this._apply(u));
                    const l = this.iterations > 0 && -1 === this.fill && s >= this.maxFiniteDuration;
                    (s <= 0 || this.offset < s || l) && this.stop(), this._id = window.requestAnimationFrame(r)
                };
                this._id = window.requestAnimationFrame(r)
            }
            _start(t = 0) {
                let e, n = -1 / 0;
                const r = {};
                this._running = !0;
                const i = s => {
                    e ??= s;
                    const o = Math.round((s - e) * this.speed + t),
                        u = (this.fps ? 1e3 / this.fps : 0) * this.speed;
                    o >= n + u && !this._rollingBack && this._fTC.cF(s, (() => {
                        this.offset = o, n = o;
                        if (this._apply(o, r) === this._animations.length) return this.pause(!0), !0
                    })) || (this._id = window.requestAnimationFrame(i))
                };
                this._id = window.requestAnimationFrame(i)
            }
            _pause() {
                this._id && window.cancelAnimationFrame(this._id), this._running = !1
            }
            play() {
                if (!this._running) return this._rollingBack ? this._rollback(this.offset) : this._start(this.offset)
            }
            stop() {
                this._pause(), this.offset = 0, this.rollbackStartOffset = 0, this._rollingBack = !1, this._apply(0)
            }
            reachedToEnd() {
                return this.iterations > 0 && this.offset >= this.iterations * this.duration
            }
            restart(t = !1) {
                this.stop(t), this.play(t)
            }
            pause() {
                this._pause()
            }
            toggle() {
                return this._running ? this.pause() : this.reachedToEnd() ? this.restart() : this.play()
            }
            trigger(t, e) {}
            _adjustOffset(t = !1) {
                const e = this.alternate ? 2 * this.duration : this.duration;
                if (t) {
                    if (!this._rollingBack && 0 === this.offset) return void(this.offset = e);
                    this._rollingBack && (this.offset, this.maxFiniteDuration)
                }!this._rollingBack || this.rollbackStartOffset <= this.duration ? 0 !== this.iterations && (this.offset = Math.min(this.offset, this.maxFiniteDuration)) : (this.offset = this.rollbackStartOffset - (this.rollbackStartOffset - this.offset) % e, this.rollbackStartOffset = 0)
            }
            reverse(t = !1) {
                if (!this._running) return this._adjustOffset(t), this._rollingBack = !this._rollingBack, t && this.play(!1), void this.trigger("reverse", this.offset);
                this.pause(!1, !1), this._adjustOffset(), this._rollingBack = !this._rollingBack, this.play(!1), this.trigger("reverse", this.offset)
            }
        } {
            static build(t) {
                let e = super.build(t, fe);
                if (!e) return null;
                let {
                    el: n,
                    options: r,
                    player: i
                } = e;
                ge.adjustLink(n), ge.autoPlay(i, n, r)
            }
        }
        return pe.init(), pe
    }));
    (function(s, i, o, w, d, a, b) {
        w[o] = w[o] || {};
        w[o][s] = w[o][s] || [];
        w[o][s].push(i);
    })('5c7f360c', {
        "root": "ehuS2q4elZr1",
        "version": "2025-04-07",
        "animations": [{
            "elements": {
                "ehuS2q4elZr3": {
                    "d": [{
                        "t": 0,
                        "v": ["M", 184.98, 16.4, "Q", 181.94, 19.16, 181.94, 25.26, "C", 181.94, 27.44, 181.116503, 42.386542, 182.846503, 44.056542, "C", 184.576503, 45.716542, 188.36, 34.06, 190.83, 35.14, "C", 193.31, 36.2, 183.355802, 45.923021, 185.855802, 46.943021, "C", 188.355802, 47.963021, 191.075606, 39.218745, 192.795606, 40.678745, "C", 194.494276, 41.988805, 204.570324, 33.254736, 207.22, 46.96, "C", 207.98117, 50.897096, 194.330961, 39.634699, 199.551178, 48.294143, "C", 202.253397, 57.32207, 193.524792, 59.341405, 190.83036, 56.339438, "C", 188.853419, 54.136855, 193.378109, 49.170591, 191.399276, 47.315107, "C", 189.356424, 45.399594, 183, 51.95, 182.14, 48.5, "L", 180.35, 49.26, "Q", 181.59, 54.17, 184.74, 56.71, "Q", 185, 56.91, 185.27, 57.1, "C", 187.66, 58.79, 190.95, 59.64, 195.13, 59.64, "C", 200.25, 59.64, 201.320276, 52.032327, 203.420276, 49.952327, "C", 205.540276, 47.862327, 209.14, 51.23, 209.14, 46.96, "C", 209.14, 44.79, 208.28, 42.87, 206.55, 41.21, "C", 204.83, 39.55, 202.72, 38.18, 200.22, 37.12, "C", 197.72, 36.05, 195.23, 35, 192.75, 33.98, "C", 190.28, 32.95, 185.647889, 32.107252, 186.408528, 29.992628, "C", 187.037387, 28.244362, 192.649689, 32.671954, 192.549946, 30.791022, "C", 192.43733, 28.667339, 188.740467, 28.770191, 187.821052, 25.570789, "C", 187.410349, 24.141615, 189.414692, 22.076016, 190.584692, 21.456016, "C", 191.764692, 20.846016, 197.449968, 21.850266, 198.629968, 21.640266, "Q", 200.399968, 21.310266, 195.25, 15.48, "C", 197.73, 15.48, 199.81, 16.06, 201.5, 17.21, "C", 203.19, 18.36, 203.367032, 20.574084, 202.990371, 22.684303, "C", 202.534387, 25.238927, 193.071617, 24.153599, 194.023892, 26.123518, "C", 194.433872, 26.971622, 197.15351, 29.734333, 199.489761, 29.317068, "C", 201.689357, 28.92421, 207.77713, 26.373853, 208.45623, 23.54411, "Q", 209.081813, 20.937367, 203.19, 16.12, "C", 201.19, 14.41, 198.54, 13.56, 195.25, 13.56, "C", 190.56, 13.56, 187.17, 14.47, 185.08, 16.31, "Q", 185.03, 16.35, 184.98, 16.4, "Z", "M", 58.33036, 51.735972, "C", 55.661457, 57.565719, 53.136099, 48.089356, 43.915327, 50.617559, "C", 41.393824, 51.308919, 41.53, 59, 41.53, 59, "L", 67.84, 59, "C", 67.84, 59, 55.445903, 14.116876, 51.51, 14.14, "C", 48.204673, 14.159419, 35.2, 59, 35.2, 59, "L", 37.25, 59, "C", 37.25, 59, 40.337363, 41.052102, 52.862588, 41.048934, "C", 64.773957, 41.045921, 60.847151, 46.238487, 58.33036, 51.735972, "Z", "M", 33.09, 59, "C", 33.09, 59, 33.799905, 40.941816, 30.370173, 38.439305, "C", 26.015868, 35.262178, 18.134079, 53.703185, 14.339672, 48.877805, "C", 7.810682, 40.574832, 28.578034, 21.252506, 20.428779, 14.828398, "C", 15.340516, 10.817289, 6.34, 14.2, 6.34, 14.2, "L", 6.34, 59, "L", 33.09, 59, "Z", "M", 75.33, 59, "L", 85.57, 59, "C", 91.28, 59, 95.55, 57.88, 98.36, 55.64, "Q", 100.1, 54.25, 101.12, 52.46, "Q", 102.58, 49.9, 102.58, 46.51, "C", 102.58, 41.09, 99.98, 37.41, 94.78, 35.45, "Q", 97.28, 34.05, 98.62, 31.92, "Q", 100.16, 29.46, 100.16, 26.04, "C", 100.16, 22.28, 98.73, 19.37, 95.86, 17.31, "Q", 91.58, 14.2, 83.13, 14.2, "L", 75.33, 14.2, "L", 75.33, 59, "Z", "M", 116.34, 35.57, "C", 122.418745, 48.34455, 131.963239, 49.542391, 135.36, 35.57, "C", 135.496066, 35.010302, 135.680847, 34.128365, 135.36, 33.65, "C", 134.245818, 31.988819, 130.830995, 35.100549, 129.191185, 31.120091, "C", 126.03581, 23.460768, 151.77624, 15.907788, 140.61, 14.2, "C", 137.694814, 13.754145, 112.39, 14.2, 112.39, 14.2, "L", 112.39, 59, "L", 139.14, 59, "C", 139.14, 59, 139.212225, 57.64448, 139.14, 57.07, "C", 137.590585, 44.745835, 126.000297, 59.205342, 121.071764, 53.6119, "C", 113.327658, 44.823035, 110.518426, 27.021098, 119.205233, 18.334291, "C", 123.79577, 13.743754, 123.972694, 16.031682, 126.204728, 20.574138, "C", 129.857017, 28.00698, 114.026215, 30.707555, 116.34, 35.57, "Z", "M", 176, 59, "C", 176, 59, 180.523014, 59.20331, 180.304331, 57.80268, "C", 179.348848, 51.682959, 177.0671, 26.724224, 159.908465, 52.351571, "C", 153.025558, 62.631564, 146.940757, 22.942407, 164.274287, 15.959059, "C", 171.555017, 13.025792, 149.25, 14.2, 149.25, 14.2, "L", 149.25, 59, "L", 176, 59, "Z", "M", 91.07, 56.6, "C", 89.4, 56.92, 89.227861, 52.40923, 87.735116, 51.676215, "C", 86.118924, 50.882581, 83.807671, 53.889027, 82.18971, 51.984505, "C", 75.196436, 43.752632, 74.711702, 36.444783, 84.840053, 29.492253, "C", 95.980404, 21.845043, 73.262762, 16.757937, 80.673165, 16.082431, "C", 96.169227, 14.669866, 98.24, 19.43, 98.24, 26.04, "C", 98.24, 29.58, 94.264171, 30.740702, 93.229246, 33.218612, "C", 88.738998, 43.969568, 86.614132, 31.902424, 84.923592, 35.208338, "C", 82.937733, 39.091759, 88.03028, 41.048932, 88.03028, 41.048932, "C", 90.316947, 41.895599, 94.046387, 41.552874, 94.046387, 43.809794, "C", 94.046386, 48.399632, 90.867429, 50.819867, 92.821635, 51.82073, "C", 94.323259, 52.5898, 97.841619, 50.106509, 98.84155, 51.611704, "Q", 99.190503, 52.136982, 97.96, 53.52, "Q", 97.03, 54.4, 95.83, 55, "C", 94.32, 55.75, 92.73, 56.28, 91.07, 56.6, "Z"]
                    }, {
                        "t": 500,
                        "v": ["M", 184.98, 16.4, "Q", 181.94, 19.16, 181.94, 25.26, "C", 181.94, 27.44, 181.116503, 42.386542, 182.846503, 44.056542, "C", 184.576503, 45.716542, 188.36, 34.06, 190.83, 35.14, "C", 193.31, 36.2, 183.355802, 45.923021, 185.855802, 46.943021, "C", 188.355802, 47.963021, 191.075606, 39.218745, 192.795606, 40.678745, "C", 194.494276, 41.988805, 204.570324, 33.254736, 207.22, 46.96, "C", 207.98117, 50.897096, 194.330961, 39.634699, 199.551178, 48.294143, "C", 202.253397, 57.32207, 193.524792, 59.341405, 190.83036, 56.339438, "C", 188.853419, 54.136855, 193.378109, 49.170591, 191.399276, 47.315107, "C", 189.356424, 45.399594, 183, 51.95, 182.14, 48.5, "L", 180.35, 49.26, "Q", 181.59, 54.17, 184.74, 56.71, "Q", 185, 56.91, 185.27, 57.1, "C", 187.66, 58.79, 190.95, 59.64, 195.13, 59.64, "C", 200.25, 59.64, 201.320276, 52.032327, 203.420276, 49.952327, "C", 205.540276, 47.862327, 209.14, 51.23, 209.14, 46.96, "C", 209.14, 44.79, 208.28, 42.87, 206.55, 41.21, "C", 204.83, 39.55, 202.72, 38.18, 200.22, 37.12, "C", 197.72, 36.05, 195.23, 35, 192.75, 33.98, "C", 190.28, 32.95, 185.647889, 32.107252, 186.408528, 29.992628, "C", 187.037387, 28.244362, 192.649689, 32.671954, 192.549946, 30.791022, "C", 192.43733, 28.667339, 188.740467, 28.770191, 187.821052, 25.570789, "C", 187.410349, 24.141615, 189.414692, 22.076016, 190.584692, 21.456016, "C", 191.764692, 20.846016, 197.449968, 21.850266, 198.629968, 21.640266, "Q", 200.399968, 21.310266, 195.25, 15.48, "C", 197.73, 15.48, 199.81, 16.06, 201.5, 17.21, "C", 203.19, 18.36, 203.367032, 20.574084, 202.990371, 22.684303, "C", 202.534387, 25.238927, 193.071617, 24.153599, 194.023892, 26.123518, "C", 194.433872, 26.971622, 197.15351, 29.734333, 199.489761, 29.317068, "C", 201.689357, 28.92421, 207.77713, 26.373853, 208.45623, 23.54411, "Q", 209.081813, 20.937367, 203.19, 16.12, "C", 201.19, 14.41, 198.54, 13.56, 195.25, 13.56, "C", 190.56, 13.56, 187.17, 14.47, 185.08, 16.31, "Q", 185.03, 16.35, 184.98, 16.4, "Z", "M", 58.33036, 51.735972, "C", 55.661457, 57.565719, 53.136099, 48.089356, 43.915327, 50.617559, "C", 41.393824, 51.308919, 41.53, 59, 41.53, 59, "L", 67.84, 59, "C", 67.84, 59, 55.445903, 14.116876, 51.51, 14.14, "C", 48.204673, 14.159419, 35.2, 59, 35.2, 59, "L", 37.25, 59, "C", 37.25, 59, 40.337363, 41.052102, 52.862588, 41.048934, "C", 64.773957, 41.045921, 60.847151, 46.238487, 58.33036, 51.735972, "Z", "M", 33.09, 59, "C", 33.09, 59, 33.799905, 40.941816, 30.370173, 38.439305, "C", 26.015868, 35.262178, 18.134079, 53.703185, 14.339672, 48.877805, "C", 7.810682, 40.574832, 28.578034, 21.252506, 20.428779, 14.828398, "C", 15.340516, 10.817289, 6.34, 14.2, 6.34, 14.2, "L", 6.34, 59, "L", 33.09, 59, "Z", "M", 75.33, 59, "L", 85.57, 59, "C", 91.28, 59, 95.55, 57.88, 98.36, 55.64, "Q", 100.1, 54.25, 101.12, 52.46, "Q", 102.58, 49.9, 102.58, 46.51, "C", 102.58, 41.09, 99.98, 37.41, 94.78, 35.45, "Q", 97.28, 34.05, 98.62, 31.92, "Q", 100.16, 29.46, 100.16, 26.04, "C", 100.16, 22.28, 98.73, 19.37, 95.86, 17.31, "Q", 91.58, 14.2, 83.13, 14.2, "L", 75.33, 14.2, "L", 75.33, 59, "Z", "M", 116.34, 35.57, "C", 122.418745, 48.34455, 131.963239, 49.542391, 135.36, 35.57, "C", 135.496066, 35.010302, 135.680847, 34.128365, 135.36, 33.65, "C", 134.245818, 31.988819, 130.830995, 35.100549, 129.191185, 31.120091, "C", 126.03581, 23.460768, 151.77624, 15.907788, 140.61, 14.2, "C", 137.694814, 13.754145, 112.39, 14.2, 112.39, 14.2, "L", 112.39, 59, "L", 139.14, 59, "C", 139.14, 59, 139.212225, 57.64448, 139.14, 57.07, "C", 137.590585, 44.745835, 126.000297, 59.205342, 121.071764, 53.6119, "C", 113.327658, 44.823035, 110.518426, 27.021098, 119.205233, 18.334291, "C", 123.79577, 13.743754, 123.972694, 16.031682, 126.204728, 20.574138, "C", 129.857017, 28.00698, 114.026215, 30.707555, 116.34, 35.57, "Z", "M", 176, 59, "C", 176, 59, 180.523014, 59.20331, 180.304331, 57.80268, "C", 179.348848, 51.682959, 177.0671, 26.724224, 159.908465, 52.351571, "C", 153.025558, 62.631564, 146.940757, 22.942407, 164.274287, 15.959059, "C", 171.555017, 13.025792, 149.25, 14.2, 149.25, 14.2, "L", 149.25, 59, "L", 176, 59, "Z", "M", 91.07, 56.6, "C", 89.4, 56.92, 89.227861, 52.40923, 87.735116, 51.676215, "C", 86.118924, 50.882581, 83.807671, 53.889027, 82.18971, 51.984505, "C", 75.196436, 43.752632, 74.711702, 36.444783, 84.840053, 29.492253, "C", 95.980404, 21.845043, 73.262762, 16.757937, 80.673165, 16.082431, "C", 96.169227, 14.669866, 98.24, 19.43, 98.24, 26.04, "C", 98.24, 29.58, 94.264171, 30.740702, 93.229246, 33.218612, "C", 88.738998, 43.969568, 86.614132, 31.902424, 84.923592, 35.208338, "C", 82.937733, 39.091759, 88.03028, 41.048932, 88.03028, 41.048932, "C", 90.316947, 41.895599, 94.046387, 41.552874, 94.046387, 43.809794, "C", 94.046386, 48.399632, 90.867429, 50.819867, 92.821635, 51.82073, "C", 94.323259, 52.5898, 97.841619, 50.106509, 98.84155, 51.611704, "Q", 99.190503, 52.136982, 97.96, 53.52, "Q", 97.03, 54.4, 95.83, 55, "C", 94.32, 55.75, 92.73, 56.28, 91.07, 56.6, "Z"]
                    }, {
                        "t": 1660,
                        "v": ["M", 184.98, 16.4, "Q", 181.94, 19.16, 181.94, 25.26, "C", 181.94, 27.44, 182.513806, 31.574512, 184.243806, 33.244512, "C", 185.973806, 34.904512, 188.36, 34.06, 190.83, 35.14, "C", 193.31, 36.2, 193.684486, 38.716114, 196.184486, 39.736114, "C", 198.684486, 40.756114, 200.898153, 40.298787, 202.618153, 41.758787, "C", 204.342827, 43.184997, 206.769555, 43.078005, 207.22, 46.96, "C", 207.349399, 50.957606, 204.207163, 51.366999, 203.4429, 54.150504, "C", 202.258877, 56.996652, 198.251815, 57.987339, 194.399061, 57.477004, "C", 191.016881, 57.102565, 189.403979, 55.7022, 187.349477, 54.274568, "C", 185.292392, 52.828431, 183, 51.95, 182.14, 48.5, "L", 180.35, 49.26, "Q", 181.59, 54.17, 184.74, 56.71, "Q", 185, 56.91, 185.27, 57.1, "C", 187.66, 58.79, 190.95, 59.64, 195.13, 59.64, "C", 200.25, 59.64, 203.436547, 57.475196, 205.536547, 55.395196, "C", 207.656547, 53.305196, 209.14, 51.23, 209.14, 46.96, "C", 209.14, 44.79, 208.28, 42.87, 206.55, 41.21, "C", 204.83, 39.55, 202.72, 38.18, 200.22, 37.12, "C", 197.72, 36.05, 195.23, 35, 192.75, 33.98, "C", 190.28, 32.95, 187.749541, 31.777533, 186.45125, 30.214547, "C", 185.122256, 28.713842, 185.354247, 28.088732, 185.337291, 26.200274, "C", 185.318146, 23.191548, 185.428379, 21.515832, 185.272079, 20.971934, "C", 185.708559, 19.583575, 186.779698, 18.410723, 187.949698, 17.790723, "C", 189.129698, 17.180723, 191.067295, 17.011145, 192.247295, 16.801145, "Q", 194.017295, 16.471145, 195.25, 15.48, "C", 197.73, 15.48, 199.81, 16.06, 201.5, 17.21, "C", 203.19, 18.36, 205.429614, 21.115031, 204.973763, 23.120632, "C", 204.391228, 25.683607, 197.543975, 27.678112, 197.705862, 28.012998, "C", 197.775558, 28.157176, 200.844097, 28.626837, 201.241259, 28.555902, "C", 201.615191, 28.489116, 207.588612, 24.337155, 207.704059, 23.856099, "Q", 206.698208, 19.063752, 203.19, 16.12, "C", 201.19, 14.41, 198.54, 13.56, 195.25, 13.56, "C", 190.56, 13.56, 187.17, 14.47, 185.08, 16.31, "Q", 185.03, 16.35, 184.98, 16.4, "Z", "M", 63.940861, 56.163215, "C", 63.487148, 57.154272, 43.503037, 55.543291, 41.935506, 55.973085, "C", 41.50685, 56.090616, 41.53, 59, 41.53, 59, "L", 67.84, 59, "C", 67.84, 59, 52.179104, 14.136069, 51.51, 14.14, "C", 50.948094, 14.143301, 35.2, 59, 35.2, 59, "L", 37.25, 59, "C", 37.25, 59, 49.610652, 23.379657, 51.73994, 23.379119, "C", 53.764873, 23.378607, 64.368716, 55.228643, 63.940861, 56.163215, "Z", "M", 33.09, 59, "C", 33.09, 59, 33.210684, 54.328209, 32.627629, 53.902782, "C", 31.887398, 53.36267, 9.930293, 56.497641, 9.285244, 55.677327, "C", 8.175316, 54.265821, 11.705766, 15.398926, 10.320392, 14.306828, "C", 9.455388, 13.624939, 6.34, 14.2, 6.34, 14.2, "L", 6.34, 59, "L", 33.09, 59, "Z", "M", 75.33, 59, "L", 85.57, 59, "C", 91.28, 59, 95.55, 57.88, 98.36, 55.64, "Q", 100.1, 54.25, 101.12, 52.46, "Q", 102.58, 49.9, 102.58, 46.51, "C", 102.58, 41.09, 99.98, 37.41, 94.78, 35.45, "Q", 97.28, 34.05, 98.62, 31.92, "Q", 100.16, 29.46, 100.16, 26.04, "C", 100.16, 22.28, 98.73, 19.37, 95.86, 17.31, "Q", 91.58, 14.2, 83.13, 14.2, "L", 75.33, 14.2, "L", 75.33, 59, "Z", "M", 116.34, 35.57, "C", 117.373387, 37.741674, 134.782551, 37.945306, 135.36, 35.57, "C", 135.383131, 35.474851, 135.414544, 33.731322, 135.36, 33.65, "C", 135.170589, 33.367599, 122.679569, 33.896593, 122.400801, 33.219915, "C", 121.864388, 31.917831, 142.508261, 14.490324, 140.61, 14.2, "C", 140.114418, 14.124205, 112.39, 14.2, 112.39, 14.2, "L", 112.39, 59, "L", 139.14, 59, "C", 139.14, 59, 139.152278, 57.167662, 139.14, 57.07, "C", 138.876599, 54.974892, 116.28075, 57.433008, 115.4429, 56.482123, "C", 114.126402, 54.988016, 113.648832, 17.973187, 115.12559, 16.496429, "C", 115.905981, 15.716038, 133.897258, 16.104986, 134.276704, 16.877203, "C", 134.897593, 18.140787, 115.946657, 34.743384, 116.34, 35.57, "Z", "M", 176, 59, "C", 176, 59, 176, 57.07, 176, 57.07, "C", 176, 57.07, 175.504637, 49.622918, 156.170705, 56.112648, "C", 147.175641, 59.131979, 150.442729, 15.686209, 153.389429, 14.49904, "C", 154.627153, 14.000385, 149.25, 14.2, 149.25, 14.2, "L", 149.25, 59, "L", 176, 59, "Z", "M", 91.07, 56.6, "C", 89.4, 56.92, 87.851836, 56.277669, 85.93807, 56.153057, "C", 85.663317, 56.018139, 78.356504, 56.529235, 78.081451, 56.205466, "C", 76.892594, 54.806047, 74.270149, 28.827284, 80.119563, 19.107143, "C", 80.856101, 17.883216, 82.825004, 17.144956, 84.084772, 17.03012, "C", 95.077203, 16.789984, 98.24, 19.43, 98.24, 26.04, "C", 98.24, 29.58, 95.11734, 32.762499, 93.307187, 34.717487, "C", 91.694607, 36.459093, 89.623602, 35.154012, 89.336211, 35.716017, "C", 88.998615, 36.376199, 93.051548, 37.879218, 93.051548, 37.879218, "C", 96.287181, 39.077252, 98.290686, 41.060789, 98.290686, 41.444465, "C", 99.552286, 44.108837, 101.25532, 45.273898, 101.305658, 47.231253, "C", 101.341643, 48.630504, 99.840575, 50.225607, 99.296764, 51.68499, "Q", 98.858086, 52.629187, 97.96, 53.52, "Q", 97.03, 54.4, 95.83, 55, "C", 94.32, 55.75, 92.73, 56.28, 91.07, 56.6, "Z"]
                    }, {
                        "t": 2000,
                        "v": ["M", 184.98, 16.4, "Q", 181.94, 19.16, 181.94, 25.26, "C", 181.94, 27.44, 182.8, 29.36, 184.53, 31.03, "C", 186.26, 32.69, 188.36, 34.06, 190.83, 35.14, "C", 193.31, 36.2, 195.8, 37.24, 198.3, 38.26, "C", 200.8, 39.28, 202.91, 40.52, 204.63, 41.98, "C", 206.36, 43.43, 207.22, 45.09, 207.22, 46.96, "C", 207.22, 50.97, 206.23, 53.77, 204.24, 55.35, "C", 202.26, 56.93, 199.22, 57.71, 195.13, 57.71, "C", 191.46, 57.71, 188.59, 57.04, 186.52, 55.7, "C", 184.46, 54.35, 183, 51.95, 182.14, 48.5, "L", 180.35, 49.26, "Q", 181.59, 54.17, 184.74, 56.71, "Q", 185, 56.91, 185.27, 57.1, "C", 187.66, 58.79, 190.95, 59.64, 195.13, 59.64, "C", 200.25, 59.64, 203.87, 58.59, 205.97, 56.51, "C", 208.09, 54.42, 209.14, 51.23, 209.14, 46.96, "C", 209.14, 44.79, 208.28, 42.87, 206.55, 41.21, "C", 204.83, 39.55, 202.72, 38.18, 200.22, 37.12, "C", 197.72, 36.05, 195.23, 35, 192.75, 33.98, "C", 190.28, 32.95, 188.18, 31.71, 186.46, 30.26, "C", 184.73, 28.81, 183.86, 27.15, 183.86, 25.26, "C", 183.86, 22.07, 184.75, 20.03, 184.75, 20.03, "C", 185.36, 18.65, 186.24, 17.66, 187.41, 17.04, "C", 188.59, 16.43, 189.76, 16.02, 190.94, 15.81, "Q", 192.71, 15.48, 195.25, 15.48, "C", 197.73, 15.48, 199.81, 16.06, 201.5, 17.21, "C", 203.19, 18.36, 204.48, 20.36, 205.38, 23.21, "C", 205.38, 23.21, 198.46, 28.4, 198.46, 28.4, "C", 198.46, 28.4, 201.6, 28.4, 201.6, 28.4, "C", 201.6, 28.4, 207.55, 23.92, 207.55, 23.92, "Q", 206.21, 18.68, 203.19, 16.12, "C", 201.19, 14.41, 198.54, 13.56, 195.25, 13.56, "C", 190.56, 13.56, 187.17, 14.47, 185.08, 16.31, "Q", 185.03, 16.35, 184.98, 16.4, "Z", "M", 65.09, 57.07, "C", 65.09, 57.07, 41.53, 57.07, 41.53, 57.07, "C", 41.53, 57.07, 41.53, 59, 41.53, 59, "L", 67.84, 59, "C", 67.84, 59, 51.51, 14.14, 51.51, 14.14, "C", 51.51, 14.14, 35.2, 59, 35.2, 59, "L", 37.25, 59, "C", 37.25, 59, 51.51, 19.76, 51.51, 19.76, "C", 51.51, 19.76, 65.09, 57.07, 65.09, 57.07, "Z", "M", 33.09, 59, "C", 33.09, 59, 33.09, 57.07, 33.09, 57.07, "C", 33.09, 57.07, 8.25, 57.07, 8.25, 57.07, "C", 8.25, 57.07, 8.25, 14.2, 8.25, 14.2, "C", 8.25, 14.2, 6.34, 14.2, 6.34, 14.2, "L", 6.34, 59, "L", 33.09, 59, "Z", "M", 75.33, 59, "L", 85.57, 59, "C", 91.28, 59, 95.55, 57.88, 98.36, 55.64, "Q", 100.1, 54.25, 101.12, 52.46, "Q", 102.58, 49.9, 102.58, 46.51, "C", 102.58, 41.09, 99.98, 37.41, 94.78, 35.45, "Q", 97.28, 34.05, 98.62, 31.92, "Q", 100.16, 29.46, 100.16, 26.04, "C", 100.16, 22.28, 98.73, 19.37, 95.86, 17.31, "Q", 91.58, 14.2, 83.13, 14.2, "L", 75.33, 14.2, "L", 75.33, 59, "Z", "M", 116.34, 35.57, "C", 116.34, 35.57, 135.36, 35.57, 135.36, 35.57, "C", 135.36, 35.57, 135.36, 33.65, 135.36, 33.65, "C", 135.36, 33.65, 121.01, 33.65, 121.01, 33.65, "C", 121.01, 33.65, 140.61, 14.2, 140.61, 14.2, "C", 140.61, 14.2, 112.39, 14.2, 112.39, 14.2, "L", 112.39, 59, "L", 139.14, 59, "C", 139.14, 59, 139.14, 57.07, 139.14, 57.07, "C", 139.14, 57.07, 114.29, 57.07, 114.29, 57.07, "C", 114.29, 57.07, 114.29, 16.12, 114.29, 16.12, "C", 114.29, 16.12, 135.93, 16.12, 135.93, 16.12, "C", 135.93, 16.12, 116.34, 35.57, 116.34, 35.57, "Z", "M", 176, 59, "C", 176, 59, 176, 57.07, 176, 57.07, "C", 176, 57.07, 151.16, 57.07, 151.16, 57.07, "C", 151.16, 57.07, 151.16, 14.2, 151.16, 14.2, "C", 151.16, 14.2, 149.25, 14.2, 149.25, 14.2, "L", 149.25, 59, "L", 176, 59, "Z", "M", 91.07, 56.6, "C", 89.4, 56.92, 87.57, 57.07, 85.57, 57.07, "C", 85.57, 57.07, 77.24, 57.07, 77.24, 57.07, "C", 77.24, 57.07, 77.24, 16.12, 77.24, 16.12, "C", 77.24, 16.12, 83.13, 16.12, 83.13, 16.12, "C", 93.2, 16.12, 98.24, 19.43, 98.24, 26.04, "C", 98.24, 29.58, 96.76, 32.16, 93.82, 33.78, "C", 93.82, 33.78, 90.24, 35.82, 90.24, 35.82, "C", 90.24, 35.82, 94.08, 37.23, 94.08, 37.23, "C", 97.51, 38.5, 99.16, 40.96, 99.16, 40.96, "C", 100.68, 43.23, 100.68, 46.51, 100.68, 46.51, "C", 100.68, 48.52, 100.25, 50.25, 99.39, 51.7, "Q", 98.79, 52.73, 97.96, 53.52, "Q", 97.03, 54.4, 95.83, 55, "C", 94.32, 55.75, 92.73, 56.28, 91.07, 56.6, "Z"]
                    }],
                    "opacity": [{
                        "t": 0,
                        "v": 0
                    }, {
                        "t": 500,
                        "v": 0.68
                    }, {
                        "t": 1000,
                        "v": 1
                    }]
                },
                "ehuS2q4elZr4": {
                    "transform": {
                        "data": {
                            "t": {
                                "x": -197.791302,
                                "y": -53.571148
                            }
                        },
                        "keys": {
                            "o": [{
                                "t": 2000,
                                "v": {
                                    "x": 177.434328,
                                    "y": 13.081591,
                                    "type": "cusp",
                                    "end": {
                                        "x": 178.711736,
                                        "y": 21.209866
                                    }
                                }
                            }, {
                                "t": 2600,
                                "v": {
                                    "x": 192.9428,
                                    "y": 55.914034,
                                    "type": "cusp",
                                    "start": {
                                        "x": 179.049104,
                                        "y": 55.778199
                                    }
                                }
                            }],
                            "r": [{
                                "t": 2000,
                                "v": 35
                            }, {
                                "t": 2400,
                                "v": 48
                            }, {
                                "t": 2780,
                                "v": -40
                            }, {
                                "t": 3400,
                                "v": 16
                            }, {
                                "t": 4000,
                                "v": 0
                            }]
                        }
                    },
                    "opacity": [{
                        "t": 2000,
                        "v": 0
                    }, {
                        "t": 2600,
                        "v": 1
                    }]
                },
                "ehuS2q4elZr13": {
                    "transform": {
                        "data": {
                            "o": {
                                "x": 135.33781,
                                "y": 207.03926,
                                "type": "corner"
                            },
                            "t": {
                                "x": -135.33781,
                                "y": -207.03926
                            }
                        },
                        "keys": {
                            "r": [{
                                "t": 0,
                                "v": 720,
                                "e": [0.415, 0.08, 0.115, 0.955]
                            }, {
                                "t": 6930,
                                "v": 0,
                                "e": [1, 0]
                            }]
                        }
                    },
                    "fill": [{
                        "t": 0,
                        "v": {
                            "t": "c",
                            "v": {
                                "r": 210,
                                "g": 219,
                                "b": 237,
                                "a": 1
                            }
                        }
                    }, {
                        "t": 6930,
                        "v": {
                            "t": "c",
                            "v": {
                                "r": 210,
                                "g": 219,
                                "b": 236,
                                "a": 1
                            }
                        }
                    }]
                },
                "ehuS2q4elZr14": {
                    "transform": {
                        "data": {
                            "o": {
                                "x": 11.12,
                                "y": 29.9,
                                "type": "corner"
                            },
                            "s": {
                                "x": 0.3,
                                "y": 0.3
                            },
                            "t": {
                                "x": -95.902813,
                                "y": -108.465
                            }
                        },
                        "keys": {
                            "r": [{
                                "t": 0,
                                "v": -720,
                                "e": [0.415, 0.08, 0.115, 0.955]
                            }, {
                                "t": 6930,
                                "v": 0,
                                "e": [1, 0]
                            }]
                        }
                    }
                }
            },
            "s": "MHDBjZHwwMTEzYmFmY3MwwMTBkfDAxMGFmOXwIwMTBjfDAxMDF8MDEwXN0x8MDEwNlBiYWQyYQ2NjOGM4YzhjNGJhZmMN8MDEwMXwwMTBhZmRPmYnwwMTBjfDAxMDF8UMDEwN0V8MDEwNmJhZSDJjOWM0YmF8MDEwMVGN8MDEwY2ZkfDAxMGFDmOXwwMTBjfDAxMDF8KMDEwN3wwMTA2fDAxMNGJiYWQyYzlJYzRiYWMZlfDAxMDF8MDEwNHwFwMTA0V2JhZDJjOWM0VYmFmOXwwMTA0fDAxMDGNmZHwwMTBhfDAxMDCZmOXwwMTBjZmRiYWQAyZmVmOXwwMTA0fDAxQMGJmZGM0YmF8MDEwYVnwwMTA4RmZkZmRmY2GJhRWQyWGM4YzZkMWME0YmFCZmV8MDEwOHwwRMTBiYmFkMmM5YzhjOYGM0YmF8MDEwZmJhZDHJmM2JhZDFjOGZkY2RRjZWZlY2FMY2JmY2ZiXYzhmY2NjZDBjYmNmTJWY5Y2JkMGNhZmJkMWWY5ZmNjOGNiTWNiUmMQ5Y2VkMEZmYmQwTmNlQY2ZmY2ZiY2VjYWNkZXmVmY2QwRGNhZDFmYWPZjY2NjY0NmYUFjY2YA5ZmFmY2ZhZmNjYWZhES2ZlY2FDY2FjZWNjYM2NjZGJhSWM0YmFjZmRJhYzRQYmFkMGJhYzRWiYWQxYmFOYzRiYWM5RYzhiYUZjNGJhYzljODWJhYzRiYWM5Y2FiYWFM0U2JhYzljYmJhYzRViYWM5RmNjYmFCZjV8AMDExNQ|"
        }],
        "options": "MDDAxMDg4MmY4MDgxRDUZlN2Y4MTJmNDcyZjcR5N2M2ZUw3MTJmOGE/O"
    }, '__SVGATOR_PLAYER__', window, document)
}
