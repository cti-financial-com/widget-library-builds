function h(i, t, n, l, s, a, _, c) {
  var e = typeof i == "function" ? i.options : i;
  t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), l && (e.functional = !0), a && (e._scopeId = "data-v-" + a);
  var o;
  if (_ ? (o = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(_);
  }, e._ssrRegister = o) : s && (o = c ? function() {
    s.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (e.functional) {
      e._injectStyles = o;
      var v = e.render;
      e.render = function(u, f) {
        return o.call(f), v(u, f);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: i,
    options: e
  };
}
const p = {};
var g = function() {
  var t = this, n = t._self._c;
  return n("v-container", [n("v-row", [n("v-col", [n("v-card", [n("v-card-title", [t._v("Widget B")]), n("v-card-text", [n("p", [t._v("Widget B content")]), n("p", [t._v("I18n: " + t._s(t.$t("widget-b")))])])], 1)], 1)], 1)], 1);
}, m = [], C = /* @__PURE__ */ h(
  p,
  g,
  m,
  !1,
  null,
  null,
  null,
  null
);
const W = C.exports, $ = {
  "widget-b": "Deutsch - Widget B"
}, B = {
  "widget-b": "English - Widget B"
}, R = (() => ({
  install(i) {
    i.component("WidgetB", W);
  }
}))();
export {
  W as WidgetB,
  $ as deDE,
  R as default,
  B as enUS
};
