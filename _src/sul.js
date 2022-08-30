!(function () {
  'use strict';
  function t() {}
  function e(t) {
    var e = [];
    if (t.nodeType) e.push(t);
    else {
      if ('string' != typeof t) throw '[SUL] Given selector is not a string or node: ' + t;
      for (var n = t.split(','), i = 0; i < n.length; i++) {
        var o = n[i].trim();
        if ('#' == o.charAt(0)) e.push(document.getElementById(o.substring(1)));
        else for (var s = document.querySelectorAll(o), r = 0; r < s.length; r++) e.push(s[r]);
      }
    }
    this['native'] = e;
  }
  function n(t) {
    return new e(t);
  }
  (e.prototype.each = function (t) {
    for (var e = 0; e < this['native'].length; e++) t.call(this, this['native'][e]);
  }),
    (e.prototype.html = function (t) {
      return void 0 === t || null === t
        ? this['native'][0].innerHTML
        : (this.each(function (e) {
            e.innerHTML = t;
          }),
          this);
    }),
    (e.prototype.val = function (t) {
      return void 0 === t || null === t
        ? this['native'][0].value
        : (this.each(function (e) {
            e.value = t;
          }),
          this);
    }),
    (e.prototype.visibility = function (t) {
      var e;
      return (
        (e = t ? 'visible' : 'hidden'),
        this.each(function (t) {
          t.style.visibility = e;
        }),
        this
      );
    }),
    (e.prototype.hide = function () {
      return (
        this.each(function (t) {
          t.style.display = 'none';
        }),
        this
      );
    }),
    (e.prototype.focus = function () {
      return (
        this.each(function (t) {
          t.focus();
        }),
        this
      );
    }),
    (e.prototype.addOption = function (t) {
      var e = document.createElement('option');
      (e.text = t),
        (e.value = t),
        this.each(function (t) {
          'SELECT' == t.tagName && t.add(e);
        });
    }),
    (e.prototype.index = function (t) {
      var e = null;
      return (
        this.each(function (t) {
          return 'SELECT' == t.tagName ? void (e = t.selectedIndex) : void 0;
        }),
        e
      );
    }),
    (e.prototype.show = function () {
      return (
        this.each(function (t) {
          t.style.display = 'block';
        }),
        this
      );
    }),
    (e.prototype.hasClass = function (t) {
      var e = !1;
      return (
        this.each(function (n) {
          return n.className.indexOf(t) > -1 ? void (e = !0) : void 0;
        }),
        e
      );
    }),
    (e.prototype.addClass = function (t) {
      return (
        this.each(function (e) {
          e.className += ' ' + t;
        }),
        this
      );
    }),
    (e.prototype.removeClass = function (t) {
      return (
        this.each(function (e) {
          e.className = e.className.replace(t, '').trim();
        }),
        this
      );
    }),
    (e.prototype.on = function (t, e) {
      return (
        this.each(function (n) {
          n.addEventListener(t, e);
        }),
        this
      );
    }),
    (e.prototype.css = function (t, e) {
      return e
        ? (this.each(function (n) {
            n.style[t] = e;
          }),
          this)
        : this['native'][0].style[t];
    }),
    (e.prototype.append = function (t) {
      return (
        this.each(function (e) {
          'string' == typeof t
            ? (e.innerHTML = e.innerHTML + t)
            : 'object' == typeof t && t.nodeType && e.appendChild(t);
        }),
        this
      );
    }),
    (e.prototype.isEmpty = function () {
      var t = !1;
      return (
        this.each(function (e) {
          return 'INPUT' != e.tagName || ('' !== e.value && null !== e.value) ? void 0 : void (t = !0);
        }),
        t
      );
    }),
    (e.prototype.clear = function () {
      return (
        this.each(function (t) {
          t.value = '';
        }),
        this
      );
    }),
    (e.prototype.getNative = function () {
      return 1 == this['native'].length ? this['native'][0] : this['native'];
    }),
    (e.prototype.getFirst = function () {
      return this['native'][0];
    });
  var i = {
    globalOptions: { async: !0, contentType: 'application/x-www-form-urlencoded', ajaxHeader: !0 },
    ajax: function (t, e, n, i, o) {
      if ('GET' != t.toUpperCase() && 'POST' != t.toUpperCase())
        return void console.log('[SUL AJAX] Invalid method. Use GET or POST');
      var s = new XMLHttpRequest();
      s.open(t, e, o.async),
        s.setRequestHeader('Content-Type', o.contentType),
        o.ajaxHeader && s.setRequestHeader('X-Requested-With', 'XMLHttpRequest'),
        n == {} ? s.send() : s.send(n),
        (s.onreadystatechange = function () {
          4 == s.readyState && (200 != s.status ? i(s.status, null) : i(s.status, s.responseText));
        });
    },
    get: function (e, n, i) {
      (n = n || t), (i = i || this.globalOptions), this.ajax('GET', e, {}, n, i);
    },
    post: function (e, n, i, o) {
      (i = i || t), (n = n || {}), (o = o || this.globalOptions), this.ajax('POST', e, n, i, o);
    },
  };
  (window.SUL = n),
    (window.SULX = i),
    (window.SULasJQuery = function (t) {
      t ? (window.$ = n) : (window.$ = window.JQuery || null),
        window.$ || console.error('[SUL] JQuery is not defined! $ shorthand is not avaliable!');
    });
})();
