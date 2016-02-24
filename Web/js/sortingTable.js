! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) :
        "object" == typeof module && "object" == typeof module.exports ? module
        .exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    return function(a) {
        "use strict";
        var b = a.tablesorter = {
            version: "2.25.4",
            parsers: [],
            widgets: [],
            defaults: {
                theme: "default",
                widthFixed: !1,
                showProcessing: !1,
                headerTemplate: "{content}",
                onRenderTemplate: null,
                onRenderHeader: null,
                cancelSelection: !0,
                tabIndex: !0,
                dateFormat: "mmddyyyy",
                sortMultiSortKey: "shiftKey",
                sortResetKey: "ctrlKey",
                usNumberFormat: !0,
                delayInit: !1,
                serverSideSorting: !1,
                resort: !0,
                headers: {},
                ignoreCase: !0,
                sortForce: null,
                sortList: [],
                sortAppend: null,
                sortStable: !1,
                sortInitialOrder: "asc",
                sortLocaleCompare: !1,
                sortReset: !1,
                sortRestart: !1,
                emptyTo: "bottom",
                stringTo: "max",
                duplicateSpan: !0,
                textExtraction: "basic",
                textAttribute: "data-text",
                textSorter: null,
                numberSorter: null,
                widgets: [],
                widgetOptions: {
                    zebra: ["even", "odd"]
                },
                initWidgets: !0,
                widgetClass: "widget-{name}",
                initialized: null,
                tableClass: "",
                cssAsc: "",
                cssDesc: "",
                cssNone: "",
                cssHeader: "",
                cssHeaderRow: "",
                cssProcessing: "",
                cssChildRow: "tablesorter-childRow",
                cssInfoBlock: "tablesorter-infoOnly",
                cssNoSort: "tablesorter-noSort",
                cssIgnoreRow: "tablesorter-ignoreRow",
                cssIcon: "tablesorter-icon",
                cssIconNone: "",
                cssIconAsc: "",
                cssIconDesc: "",
                pointerClick: "click",
                pointerDown: "mousedown",
                pointerUp: "mouseup",
                selectorHeaders: "> thead th, > thead td",
                selectorSort: "th, td",
                selectorRemove: ".remove-me",
                debug: !1,
                headerList: [],
                empties: {},
                strings: {},
                parsers: []
            },
            css: {
                table: "tablesorter",
                cssHasChild: "tablesorter-hasChildRow",
                childRow: "tablesorter-childRow",
                colgroup: "tablesorter-colgroup",
                header: "tablesorter-header",
                headerRow: "tablesorter-headerRow",
                headerIn: "tablesorter-header-inner",
                icon: "tablesorter-icon",
                processing: "tablesorter-processing",
                sortAsc: "tablesorter-headerAsc",
                sortDesc: "tablesorter-headerDesc",
                sortNone: "tablesorter-headerUnSorted"
            },
            language: {
                sortAsc: "Ascending sort applied, ",
                sortDesc: "Descending sort applied, ",
                sortNone: "No sort applied, ",
                sortDisabled: "sorting is disabled",
                nextAsc: "activate to apply an ascending sort",
                nextDesc: "activate to apply a descending sort",
                nextNone: "activate to remove the sort"
            },
            regex: {
                templateContent: /\{content\}/g,
                templateIcon: /\{icon\}/g,
                templateName: /\{name\}/i,
                spaces: /\s+/g,
                nonWord: /\W/g,
                formElements: /(input|select|button|textarea)/i,
                chunk: /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                chunks: /(^\\0|\\0$)/,
                hex: /^0x[0-9a-f]+$/i,
                comma: /,/g,
                digitNonUS: /[\s|\.]/g,
                digitNegativeTest: /^\s*\([.\d]+\)/,
                digitNegativeReplace: /^\s*\(([.\d]+)\)/,
                digitTest: /^[\-+(]?\d+[)]?$/,
                digitReplace: /[,.'"\s]/g
            },
            string: {
                max: 1,
                min: -1,
                emptymin: 1,
                emptymax: -1,
                zero: 0,
                none: 0,
                "null": 0,
                top: !0,
                bottom: !1
            },
            keyCodes: {
                enter: 13
            },
            dates: {},
            instanceMethods: {},
            setup: function(c, d) {
                if (!c || !c.tHead || 0 === c.tBodies.length ||
                    c.hasInitialized === !0) return void(d.debug &&
                    (c.hasInitialized ? console.warn(
                        "Stopping initialization. Tablesorter has already been initialized"
                    ) : console.error(
                        "Stopping initialization! No table, thead or tbody",
                        c)));
                var e = "",
                    f = a(c),
                    g = a.metadata;
                c.hasInitialized = !1, c.isProcessing = !0, c.config =
                    d, a.data(c, "tablesorter", d), d.debug &&
                    (console[console.group ? "group" : "log"](
                        "Initializing tablesorter"), a.data(
                        c, "startoveralltimer", new Date)), d.supportsDataObject =
                    function(a) {
                        return a[0] = parseInt(a[0], 10), a[0] >
                            1 || 1 === a[0] && parseInt(a[1],
                                10) >= 4
                    }(a.fn.jquery.split(".")), d.emptyTo = d.emptyTo
                    .toLowerCase(), d.stringTo = d.stringTo.toLowerCase(),
                    d.last = {
                        sortList: [],
                        clickedIndex: -1
                    }, /tablesorter\-/.test(f.attr("class")) ||
                    (e = "" !== d.theme ? " tablesorter-" + d.theme :
                        ""), d.table = c, d.$table = f.addClass(
                        b.css.table + " " + d.tableClass + e).attr(
                        "role", "grid"), d.$headers = f.find(d.selectorHeaders),
                    d.namespace ? d.namespace = "." + d.namespace
                    .replace(b.regex.nonWord, "") : d.namespace =
                    ".tablesorter" + Math.random().toString(16)
                    .slice(2), d.$table.children().children(
                        "tr").attr("role", "row"), d.$tbodies =
                    f.children("tbody:not(." + d.cssInfoBlock +
                        ")").attr({
                        "aria-live": "polite",
                        "aria-relevant": "all"
                    }), d.$table.children("caption").length &&
                    (e = d.$table.children("caption")[0], e.id ||
                        (e.id = d.namespace.slice(1) +
                            "caption"), d.$table.attr(
                            "aria-labelledby", e.id)), d.widgetInit = {},
                    d.textExtraction = d.$table.attr(
                        "data-text-extraction") || d.textExtraction ||
                    "basic", b.buildHeaders(d), b.fixColumnWidth(
                        c), b.addWidgetFromClass(c), b.applyWidgetOptions(
                        c), b.setupParsers(d), d.totalRows = 0,
                    d.delayInit || b.buildCache(d), b.bindEvents(
                        c, d.$headers, !0), b.bindMethods(d), d
                    .supportsDataObject && "undefined" !=
                    typeof f.data().sortlist ? d.sortList = f.data()
                    .sortlist : g && f.metadata() && f.metadata()
                    .sortlist && (d.sortList = f.metadata().sortlist),
                    b.applyWidget(c, !0), d.sortList.length > 0 ?
                    b.sortOn(d, d.sortList, {}, !d.initWidgets) :
                    (b.setHeadersCss(d), d.initWidgets && b.applyWidget(
                        c, !1)), d.showProcessing && f.unbind(
                        "sortBegin" + d.namespace + " sortEnd" +
                        d.namespace).bind("sortBegin" + d.namespace +
                        " sortEnd" + d.namespace, function(a) {
                            clearTimeout(d.timerProcessing), b.isProcessing(
                                    c), "sortBegin" === a.type &&
                                (d.timerProcessing = setTimeout(
                                    function() {
                                        b.isProcessing(c, !
                                            0)
                                    }, 500))
                        }), c.hasInitialized = !0, c.isProcessing = !
                    1, d.debug && (console.log(
                            "Overall initialization time: " + b
                            .benchmark(a.data(c,
                                "startoveralltimer"))), d.debug &&
                        console.groupEnd && console.groupEnd()),
                    f.triggerHandler("tablesorter-initialized",
                        c), "function" == typeof d.initialized &&
                    d.initialized(c)
            },
            bindMethods: function(c) {
                var d = c.$table,
                    e = c.namespace,
                    f =
                    "sortReset update updateRows updateAll updateHeaders addRows updateCell updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave "
                    .split(" ").join(e + " ");
                d.unbind(f.replace(b.regex.spaces, " ")).bind(
                    "sortReset" + e, function(a, c) {
                        a.stopPropagation(), b.sortReset(
                            this.config, c)
                    }).bind("updateAll" + e, function(a, c,
                    d) {
                    a.stopPropagation(), b.updateAll(
                        this.config, c, d)
                }).bind("update" + e + " updateRows" + e,
                    function(a, c, d) {
                        a.stopPropagation(), b.update(this.config,
                            c, d)
                    }).bind("updateHeaders" + e, function(a,
                    c) {
                    a.stopPropagation(), b.updateHeaders(
                        this.config, c)
                }).bind("updateCell" + e, function(a, c, d,
                    e) {
                    a.stopPropagation(), b.updateCell(
                        this.config, c, d, e)
                }).bind("addRows" + e, function(a, c, d, e) {
                    a.stopPropagation(), b.addRows(this
                        .config, c, d, e)
                }).bind("updateComplete" + e, function() {
                    this.isUpdating = !1
                }).bind("sorton" + e, function(a, c, d, e) {
                    a.stopPropagation(), b.sortOn(this.config,
                        c, d, e)
                }).bind("appendCache" + e, function(c, d, e) {
                    c.stopPropagation(), b.appendCache(
                        this.config, e), a.isFunction(
                        d) && d(this)
                }).bind("updateCache" + e, function(a, c, d) {
                    a.stopPropagation(), b.updateCache(
                        this.config, c, d)
                }).bind("applyWidgetId" + e, function(a, c) {
                    a.stopPropagation(), b.applyWidgetId(
                        this, c)
                }).bind("applyWidgets" + e, function(a, c) {
                    a.stopPropagation(), b.applyWidget(
                        this, c)
                }).bind("refreshWidgets" + e, function(a, c,
                    d) {
                    a.stopPropagation(), b.refreshWidgets(
                        this, c, d)
                }).bind("removeWidget" + e, function(a, c,
                    d) {
                    a.stopPropagation(), b.removeWidget(
                        this, c, d)
                }).bind("destroy" + e, function(a, c, d) {
                    a.stopPropagation(), b.destroy(this,
                        c, d)
                }).bind("resetToLoadState" + e, function(d) {
                    d.stopPropagation(), b.removeWidget(
                        this, !0, !1), c = a.extend(!
                        0, b.defaults, c.originalSettings
                    ), this.hasInitialized = !1, b.setup(
                        this, c)
                })
            },
            bindEvents: function(c, d, e) {
                c = a(c)[0];
                var f, g = c.config,
                    h = g.namespace,
                    i = null;
                e !== !0 && (d.addClass(h.slice(1) +
                            "_extra_headers"), f = a.fn.closest ?
                        d.closest("table")[0] : d.parents(
                            "table")[0], f && "TABLE" === f.nodeName &&
                        f !== c && a(f).addClass(h.slice(1) +
                            "_extra_table")), f = (g.pointerDown +
                        " " + g.pointerUp + " " + g.pointerClick +
                        " sort keyup ").replace(b.regex.spaces,
                        " ").split(" ").join(h + " "), d.find(g
                        .selectorSort).add(d.filter(g.selectorSort))
                    .unbind(f).bind(f, function(c, e) {
                        var f, h, j, k = a(c.target),
                            l = " " + c.type + " ";
                        if (!(1 !== (c.which || c.button) &&
                            !l.match(" " + g.pointerClick +
                                " | sort | keyup ") ||
                            " keyup " === l && c.which !==
                            b.keyCodes.enter || l.match(
                                " " + g.pointerClick +
                                " ") && "undefined" !=
                            typeof c.which || l.match(
                                " " + g.pointerUp + " "
                            ) && i !== c.target && e !==
                            !0)) {
                            if (l.match(" " + g.pointerDown +
                                " ")) return i = c.target,
                                j = k.jquery.split("."),
                                void("1" === j[0] && j[
                                    1] < 4 && c.preventDefault());
                            if (i = null, b.regex.formElements
                                .test(c.target.nodeName) ||
                                k.hasClass(g.cssNoSort) ||
                                k.parents("." + g.cssNoSort)
                                .length > 0 || k.parents(
                                    "button").length > 0)
                                return !g.cancelSelection;
                            g.delayInit && b.isEmptyObject(
                                    g.cache) && b.buildCache(
                                    g), f = a.fn.closest ?
                                a(this).closest("th, td") :
                                /TH|TD/.test(this.nodeName) ?
                                a(this) : a(this).parents(
                                    "th, td"), j = d.index(
                                    f), g.last.clickedIndex =
                                0 > j ? f.attr(
                                    "data-column") : j, h =
                                g.$headers[g.last.clickedIndex],
                                h && !h.sortDisabled && b.initSort(
                                    g, h, c)
                        }
                    }), g.cancelSelection && d.attr(
                        "unselectable", "on").bind(
                        "selectstart", !1).css({
                        "user-select": "none",
                        MozUserSelect: "none"
                    })
            },
            buildHeaders: function(c) {
                var d, e, f, g;
                for (c.headerList = [], c.headerContent = [], c
                    .sortVars = [], c.debug && (f = new Date),
                    c.columns = b.computeColumnIndex(c.$table.children(
                        "thead, tfoot").children("tr")), e = c.cssIcon ?
                    '<i class="' + (c.cssIcon === b.css.icon ?
                        b.css.icon : c.cssIcon + " " + b.css.icon
                    ) + '"></i>' : "", c.$headers = a(a.map(c.$table
                        .find(c.selectorHeaders), function(
                            d, f) {
                            var g, h, i, j, k, l = a(d);
                            if (!l.parent().hasClass(c.cssIgnoreRow))
                                return g = b.getColumnData(
                                        c.table, c.headers,
                                        f, !0), c.headerContent[
                                        f] = l.html(), "" ===
                                    c.headerTemplate || l.find(
                                        "." + b.css.headerIn
                                    ).length || (j = c.headerTemplate
                                        .replace(b.regex.templateContent,
                                            l.html()).replace(
                                            b.regex.templateIcon,
                                            l.find("." + b.css
                                                .icon).length ?
                                            "" : e), c.onRenderTemplate &&
                                        (h = c.onRenderTemplate
                                            .apply(l, [f, j]),
                                            h && "string" ==
                                            typeof h && (j =
                                                h)), l.html(
                                            '<div class="' +
                                            b.css.headerIn +
                                            '">' + j +
                                            "</div>")), c.onRenderHeader &&
                                    c.onRenderHeader.apply(
                                        l, [f, c, c.$table]
                                    ), i = parseInt(l.attr(
                                            "data-column"),
                                        10), d.column = i,
                                    k = b.getData(l, g,
                                        "sortInitialOrder") ||
                                    c.sortInitialOrder, c.sortVars[
                                        i] = {
                                        count: -1,
                                        order: b.getOrder(k) ? [
                                            1, 0, 2
                                        ] : [0, 1, 2],
                                        lockedOrder: !1
                                    }, k = b.getData(l, g,
                                        "lockedOrder") || !
                                    1, "undefined" !=
                                    typeof k && k !== !1 &&
                                    (c.sortVars[i].lockedOrder = !
                                        0, c.sortVars[i].order =
                                        b.getOrder(k) ? [1,
                                            1, 1
                                        ] : [0, 0, 0]), c.headerList[
                                        f] = d, l.addClass(
                                        b.css.header + " " +
                                        c.cssHeader).parent()
                                    .addClass(b.css.headerRow +
                                        " " + c.cssHeaderRow
                                    ).attr("role", "row"),
                                    c.tabIndex && l.attr(
                                        "tabindex", 0), d
                        })), c.$headerIndexed = [], g = 0; g <
                    c.columns; g++) b.isEmptyObject(c.sortVars[
                        g]) && (c.sortVars[g] = {}), d = c.$headers
                    .filter('[data-column="' + g + '"]'), c.$headerIndexed[
                        g] = d.length ? d.not(".sorter-false").length ?
                    d.not(".sorter-false").filter(":last") : d.filter(
                        ":last") : a();
                c.$table.find(c.selectorHeaders).attr({
                    scope: "col",
                    role: "columnheader"
                }), b.updateHeader(c), c.debug && (console.log(
                        "Built headers:" + b.benchmark(f)),
                    console.log(c.$headers))
            },
            addInstanceMethods: function(c) {
                a.extend(b.instanceMethods, c)
            },
            setupParsers: function(a, c) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r =
                    a.table,
                    s = 0,
                    t = {};
                if (a.$tbodies = a.$table.children(
                        "tbody:not(." + a.cssInfoBlock + ")"),
                    p = "undefined" == typeof c ? a.$tbodies :
                    c, q = p.length, 0 === q) return a.debug ?
                    console.warn(
                        "Warning: *Empty table!* Not building a parser cache"
                    ) : "";
                for (a.debug && (o = new Date, console[console.group ?
                    "group" : "log"](
                    "Detecting parsers for each column"
                )), e = {
                    extractors: [],
                    parsers: []
                }; q > s;) {
                    if (d = p[s].rows, d.length)
                        for (h = 0, g = a.columns, i = 0; g > i; i++) {
                            if (j = a.$headerIndexed[h], j && j
                                .length && (k = b.getColumnData(
                                        r, a.headers, h), n = b
                                    .getParserById(b.getData(j,
                                        k, "extractor")), m = b
                                    .getParserById(b.getData(j,
                                        k, "sorter")), l =
                                    "false" === b.getData(j, k,
                                        "parser"), a.empties[h] =
                                    (b.getData(j, k, "empty") ||
                                        a.emptyTo || (a.emptyToBottom ?
                                            "bottom" : "top")).toLowerCase(),
                                    a.strings[h] = (b.getData(j,
                                            k, "string") || a.stringTo ||
                                        "max").toLowerCase(), l &&
                                    (m = b.getParserById(
                                        "no-parser")), n || (n = !
                                        1), m || (m = b.detectParserForColumn(
                                        a, d, -1, h)), a.debug &&
                                    (t["(" + h + ") " + j.text()] = {
                                        parser: m.id,
                                        extractor: n ? n.id : "none",
                                        string: a.strings[h],
                                        empty: a.empties[h]
                                    }), e.parsers[h] = m, e.extractors[
                                        h] = n, f = j[0].colSpan -
                                    1, f > 0))
                                for (h += f, g += f; f + 1 > 0;)
                                    e.parsers[h - f] = m, e.extractors[
                                        h - f] = n, f--;
                            h++
                        }
                    s += e.parsers.length ? q : 1
                }
                a.debug && (b.isEmptyObject(t) ? console.warn(
                            "  No parsers detected!") : console[
                            console.table ? "table" : "log"](t),
                        console.log(
                            "Completed detecting parsers" + b.benchmark(
                                o)), console.groupEnd &&
                        console.groupEnd()), a.parsers = e.parsers,
                    a.extractors = e.extractors
            },
            addParser: function(a) {
                var c, d = b.parsers.length,
                    e = !0;
                for (c = 0; d > c; c++) b.parsers[c].id.toLowerCase() ===
                    a.id.toLowerCase() && (e = !1);
                e && b.parsers.push(a)
            },
            getParserById: function(a) {
                if ("false" == a) return !1;
                var c, d = b.parsers.length;
                for (c = 0; d > c; c++)
                    if (b.parsers[c].id.toLowerCase() === a.toString()
                        .toLowerCase()) return b.parsers[c];
                return !1
            },
            detectParserForColumn: function(c, d, e, f) {
                for (var g, h, i, j = b.parsers.length, k = !1,
                        l = "", m = !0;
                    "" === l && m;) e++, i = d[e], i && 50 > e ?
                    i.className.indexOf(b.cssIgnoreRow) < 0 &&
                    (k = d[e].cells[f], l = b.getElementText(c,
                            k, f), h = a(k), c.debug && console
                        .log(
                            "Checking if value was empty on row " +
                            e + ", column: " + f + ': "' + l +
                            '"')) : m = !1;
                for (; --j >= 0;)
                    if (g = b.parsers[j], g && "text" !== g.id &&
                        g.is && g.is(l, c.table, k, h)) return g;
                return b.getParserById("text")
            },
            getElementText: function(c, d, e) {
                if (!d) return "";
                var f, g = c.textExtraction || "",
                    h = d.jquery ? d : a(d);
                return "string" == typeof g ? "basic" === g &&
                    "undefined" != typeof(f = h.attr(c.textAttribute)) ?
                    a.trim(f) : a.trim(d.textContent || h.text()) :
                    "function" == typeof g ? a.trim(g(h[0], c.table,
                        e)) : "function" == typeof(f = b.getColumnData(
                        c.table, g, e)) ? a.trim(f(h[0], c.table,
                        e)) : a.trim(h[0].textContent || h.text())
            },
            getParsedText: function(a, c, d, e) {
                "undefined" == typeof e && (e = b.getElementText(
                    a, c, d));
                var f = "" + e,
                    g = a.parsers[d],
                    h = a.extractors[d];
                return g && (h && "function" == typeof h.format &&
                    (e = h.format(e, a.table, c, d)), f =
                    "no-parser" === g.id ? "" : g.format("" +
                        e, a.table, c, d), a.ignoreCase &&
                    "string" == typeof f && (f = f.toLowerCase())
                ), f
            },
            buildCache: function(c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t,
                    u, v, w, x, y, z, A, B = c.table,
                    C = c.parsers;
                if (c.$tbodies = c.$table.children(
                        "tbody:not(." + c.cssInfoBlock + ")"),
                    l = "undefined" == typeof e ? c.$tbodies :
                    e, c.cache = {}, c.totalRows = 0, !C) return
                    c.debug ? console.warn(
                        "Warning: *Empty table!* Not building a cache"
                    ) : "";
                for (c.debug && (q = new Date), c.showProcessing &&
                    b.isProcessing(B, !0), k = 0; k < l.length; k++
                ) {
                    for (u = [], f = c.cache[k] = {
                            normalized: []
                        }, r = l[k] && l[k].rows.length || 0, i =
                        0; r > i; ++i)
                        if (s = {
                            child: [],
                            raw: []
                        }, m = a(l[k].rows[i]), n = [], m.hasClass(
                            c.cssChildRow) && 0 !== i)
                            for (z = f.normalized.length - 1, t =
                                f.normalized[z][c.columns], t.$row =
                                t.$row.add(m), m.prev().hasClass(
                                    c.cssChildRow) || m.prev().addClass(
                                    b.css.cssHasChild), o = m.children(
                                    "th, td"), z = t.child.length,
                                t.child[z] = [], w = 0, y = c.columns,
                                j = 0; y > j; j++) p = o[j], p &&
                                (t.child[z][j] = b.getParsedText(
                                        c, p, j), v = o[j].colSpan -
                                    1, v > 0 && (w += v, y += v)
                                ), w++;
                        else {
                            for (s.$row = m, s.order = i, w = 0,
                                y = c.columns, j = 0; y > j; ++
                                j) {
                                if (p = m[0].cells[j], p && w <
                                    c.columns && (x =
                                        "undefined" != typeof C[
                                            w], !x && c.debug &&
                                        console.warn(
                                            "No parser found for row: " +
                                            i + ", column: " +
                                            j +
                                            '; cell containing: "' +
                                            a(p).text() +
                                            '"; does it have a header?'
                                        ), g = b.getElementText(
                                            c, p, w), s.raw[w] =
                                        g, h = b.getParsedText(
                                            c, p, w, g), n[w] =
                                        h, x && "numeric" === (
                                            C[w].type || "").toLowerCase() &&
                                        (u[w] = Math.max(Math.abs(
                                            h) || 0, u[
                                            w] || 0)), v = p.colSpan -
                                        1, v > 0)) {
                                    for (A = 0; v >= A;) s.raw[
                                            w + A] = c.duplicateSpan ||
                                        0 === A ? g : "", n[w +
                                            A] = c.duplicateSpan ||
                                        0 === A ? g : "", A++;
                                    w += v, y += v
                                }
                                w++
                            }
                            n[c.columns] = s, f.normalized.push(
                                n)
                        }
                    f.colMax = u, c.totalRows += f.normalized.length
                }
                if (c.showProcessing && b.isProcessing(B), c.debug) {
                    for (z = Math.min(5, c.cache[0].normalized.length),
                        console[console.group ? "group" : "log"]
                        ("Building cache for " + c.totalRows +
                            " rows (showing " + z +
                            " rows in log)" + b.benchmark(q)),
                        g = {}, j = 0; j < c.columns; j++)
                        for (w = 0; z > w; w++) g["row: " + w] ||
                            (g["row: " + w] = {}), g["row: " +
                                w][c.$headerIndexed[j].text()] =
                            c.cache[0].normalized[w][j];
                    console[console.table ? "table" : "log"](g),
                        console.groupEnd && console.groupEnd()
                }
                a.isFunction(d) && d(B)
            },
            getColumnText: function(c, d, e, f) {
                c = a(c)[0];
                var g, h, i, j, k, l, m, n, o, p, q =
                    "function" == typeof e,
                    r = "all" === d,
                    s = {
                        raw: [],
                        parsed: [],
                        $cell: []
                    },
                    t = c.config;
                if (!b.isEmptyObject(t)) {
                    for (k = t.$tbodies.length, g = 0; k > g; g++)
                        for (i = t.cache[g].normalized, l = i.length,
                            h = 0; l > h; h++) j = i[h], (!f ||
                            j[t.columns].$row.is(f)) && (p = !
                            0, n = r ? j.slice(0, t.columns) :
                            j[d], j = j[t.columns], m = r ?
                            j.raw : j.raw[d], o = r ? j.$row
                            .children() : j.$row.children()
                            .eq(d), q && (p = e({
                                tbodyIndex: g,
                                rowIndex: h,
                                parsed: n,
                                raw: m,
                                $row: j.$row,
                                $cell: o
                            })), p !== !1 && (s.parsed.push(
                                    n), s.raw.push(m), s.$cell
                                .push(o)));
                    return s
                }
                t.debug && console.warn(
                    "No cache found - aborting getColumnText function!"
                )
            },
            setHeadersCss: function(c) {
                var d, e, f, g = c.sortList,
                    h = g.length,
                    i = b.css.sortNone + " " + c.cssNone,
                    j = [b.css.sortAsc + " " + c.cssAsc, b.css.sortDesc +
                        " " + c.cssDesc
                    ],
                    k = [c.cssIconAsc, c.cssIconDesc, c.cssIconNone],
                    l = ["ascending", "descending"],
                    m = c.$table.find("tfoot tr").children(
                        "td, th").add(a(c.namespace +
                        "_extra_headers")).removeClass(j.join(
                        " "));
                for (c.$headers.removeClass(j.join(" ")).addClass(
                    i).attr("aria-sort", "none").find("." +
                    b.css.icon).removeClass(k.join(" ")).addClass(
                    k[2]), e = 0; h > e; e++)
                    if (2 !== g[e][1] && (d = c.$headers.filter(
                        function(a) {
                            for (var d = !0, e = c.$headers
                                    .eq(a), f =
                                    parseInt(e.attr(
                                        "data-column"
                                    ), 10), g = f + c.$headers[
                                        a].colSpan; g >
                                f; f++) d = d ? d || b.isValueInArray(
                                    f, c.sortList) > -1 :
                                !1;
                            return d
                        }), d = d.not(".sorter-false").filter(
                        '[data-column="' + g[e][0] +
                        '"]' + (1 === h ? ":last" : "")
                    ), d.length)) {
                        for (f = 0; f < d.length; f++) d[f].sortDisabled ||
                            d.eq(f).removeClass(i).addClass(j[g[
                                e][1]]).attr("aria-sort", l[g[e]
                                [1]]).find("." + b.css.icon).removeClass(
                                k[2]).addClass(k[g[e][1]]);
                        m.length && m.filter('[data-column="' +
                            g[e][0] + '"]').removeClass(i).addClass(
                            j[g[e][1]])
                    }
                for (h = c.$headers.length, e = 0; h > e; e++) b
                    .setColumnAriaLabel(c, c.$headers.eq(e))
            },
            setColumnAriaLabel: function(c, d, e) {
                if (d.length) {
                    var f = parseInt(d.attr("data-column"), 10),
                        g = d.hasClass(b.css.sortAsc) ?
                        "sortAsc" : d.hasClass(b.css.sortDesc) ?
                        "sortDesc" : "sortNone",
                        h = a.trim(d.text()) + ": " + b.language[
                            g];
                    d.hasClass("sorter-false") || e === !1 ? h +=
                        b.language.sortDisabled : (e = c.sortVars[
                                f].order[(c.sortVars[f].count +
                                1) % (c.sortReset ? 3 : 2)], h +=
                            b.language[0 === e ? "nextAsc" : 1 ===
                                e ? "nextDesc" : "nextNone"]),
                        d.attr("aria-label", h)
                }
            },
            updateHeader: function(a) {
                var c, d, e, f, g = a.table,
                    h = a.$headers.length;
                for (c = 0; h > c; c++) e = a.$headers.eq(c), f =
                    b.getColumnData(g, a.headers, c, !0), d =
                    "false" === b.getData(e, f, "sorter") ||
                    "false" === b.getData(e, f, "parser"), b.setColumnSort(
                        a, e, d)
            },
            setColumnSort: function(a, b, c) {
                var d = a.table.id;
                b[0].sortDisabled = c, b[c ? "addClass" :
                        "removeClass"]("sorter-false").attr(
                        "aria-disabled", "" + c), a.tabIndex &&
                    (c ? b.removeAttr("tabindex") : b.attr(
                        "tabindex", "0")), d && (c ? b.removeAttr(
                        "aria-controls") : b.attr(
                        "aria-controls", d))
            },
            updateHeaderSortCount: function(c, d) {
                var e, f, g, h, i, j, k, l, m = d || c.sortList,
                    n = m.length;
                for (c.sortList = [], h = 0; n > h; h++)
                    if (k = m[h], e = parseInt(k[0], 10), e < c
                        .columns) {
                        switch (c.sortVars[e].order || (l = c.sortVars[
                                    e].order = b.getOrder(c.sortInitialOrder) ? [
                                    1, 0, 2
                                ] : [0, 1, 2], c.sortVars[e].count =
                                0), l = c.sortVars[e].order, f =
                            ("" + k[1]).match(/^(1|d|s|o|n)/),
                            f = f ? f[0] : "") {
                            case "1":
                            case "d":
                                f = 1;
                                break;
                            case "s":
                                f = i || 0;
                                break;
                            case "o":
                                j = l[(i || 0) % (c.sortReset ?
                                        3 : 2)], f = 0 === j ?
                                    1 : 1 === j ? 0 : 2;
                                break;
                            case "n":
                                f = l[++c.sortVars[e].count % (
                                    c.sortReset ? 3 : 2
                                )];
                                break;
                            default:
                                f = 0
                        }
                        i = 0 === h ? f : i, g = [e, parseInt(f,
                                10) || 0], c.sortList.push(g),
                            f = a.inArray(g[1], l), c.sortVars[
                                e].count = f >= 0 ? f : g[1] %
                            (c.sortReset ? 3 : 2)
                    }
            },
            updateAll: function(a, c, d) {
                var e = a.table;
                e.isUpdating = !0, b.refreshWidgets(e, !0, !0),
                    b.buildHeaders(a), b.bindEvents(e, a.$headers, !
                        0), b.bindMethods(a), b.commonUpdate(a,
                        c, d)
            },
            update: function(a, c, d) {
                var e = a.table;
                e.isUpdating = !0, b.updateHeader(a), b.commonUpdate(
                    a, c, d)
            },
            updateHeaders: function(a, c) {
                a.table.isUpdating = !0, b.buildHeaders(a), b.bindEvents(
                    a.table, a.$headers, !0), b.resortComplete(
                    a, c)
            },
            updateCell: function(c, d, e, f) {
                if (b.isEmptyObject(c.cache)) return b.updateHeader(
                    c), void b.commonUpdate(c, e, f);
                c.table.isUpdating = !0, c.$table.find(c.selectorRemove)
                    .remove();
                var g, h, i, j, k, l, m = c.$tbodies,
                    n = a(d),
                    o = m.index(a.fn.closest ? n.closest(
                        "tbody") : n.parents("tbody").filter(
                        ":first")),
                    p = c.cache[o],
                    q = a.fn.closest ? n.closest("tr") : n.parents(
                        "tr").filter(":first");
                if (d = n[0], m.length && o >= 0) {
                    if (i = m.eq(o).find("tr").index(q), k = p.normalized[
                        i], l = q[0].cells.length, l !== c.columns)
                        for (j = 0, g = !1, h = 0; l > h; h++) g ||
                            q[0].cells[h] === d ? g = !0 : j +=
                            q[0].cells[h].colSpan;
                    else j = n.index();
                    g = b.getElementText(c, d, j), k[c.columns]
                        .raw[j] = g, g = b.getParsedText(c, d,
                            j, g), k[j] = g, k[c.columns].$row =
                        q, "numeric" === (c.parsers[j].type ||
                            "").toLowerCase() && (p.colMax[j] =
                            Math.max(Math.abs(g) || 0, p.colMax[
                                j] || 0)), g = "undefined" !==
                        e ? e : c.resort, g !== !1 ? b.checkResort(
                            c, g, f) : b.resortComplete(c, f)
                } else c.debug && console.error(
                    "updateCell aborted, tbody missing or not within the indicated table"
                ), c.table.isUpdating = !1
            },
            addRows: function(c, d, e, f) {
                var g, h, i, j, k, l, m, n, o, p, q, r, s =
                    "string" == typeof d && 1 === c.$tbodies.length &&
                    /<tr/.test(d || ""),
                    t = c.table;
                if (s) d = a(d), c.$tbodies.append(d);
                else if (!(d && d instanceof jQuery && (a.fn.closest ?
                    d.closest("table")[0] : d.parents(
                        "table")[0]) === c.table)) return c.debug &&
                    console.error(
                        "addRows method requires (1) a jQuery selector reference to rows that have already been added to the table, or (2) row HTML string to be added to a table with only one tbody"
                    ), !1;
                if (t.isUpdating = !0, b.isEmptyObject(c.cache))
                    b.updateHeader(c), b.commonUpdate(c, e, f);
                else {
                    for (k = d.filter("tr").attr("role", "row")
                        .length, i = c.$tbodies.index(d.parents(
                            "tbody").filter(":first")), c.parsers &&
                        c.parsers.length || b.setupParsers(c),
                        j = 0; k > j; j++) {
                        for (n = 0, m = d[j].cells.length, p = [],
                            o = {
                                child: [],
                                raw: [],
                                $row: d.eq(j),
                                order: c.cache[i].normalized.length
                            }, l = 0; m > l; l++) q = d[j].cells[
                                l], g = b.getElementText(c, q,
                                n), o.raw[n] = g, h = b.getParsedText(
                                c, q, n, g), p[n] = h,
                            "numeric" === (c.parsers[n].type ||
                                "").toLowerCase() && (c.cache[i]
                                .colMax[n] = Math.max(Math.abs(
                                    h) || 0, c.cache[i].colMax[
                                    n] || 0)), r = q.colSpan -
                            1, r > 0 && (n += r), n++;
                        p[c.columns] = o, c.cache[i].normalized
                            .push(p)
                    }
                    b.checkResort(c, e, f)
                }
            },
            updateCache: function(a, c, d) {
                a.parsers && a.parsers.length || b.setupParsers(
                    a, d), b.buildCache(a, c, d)
            },
            appendCache: function(a, c) {
                var d, e, f, g, h, i, j, k = a.table,
                    l = a.widgetOptions,
                    m = a.$tbodies,
                    n = [],
                    o = a.cache;
                if (b.isEmptyObject(o)) return a.appender ? a.appender(
                    k, n) : k.isUpdating ? a.$table.triggerHandler(
                    "updateComplete", k) : "";
                for (a.debug && (j = new Date), i = 0; i < m.length; i++)
                    if (f = m.eq(i), f.length) {
                        for (g = b.processTbody(k, f, !0), d =
                            o[i].normalized, e = d.length, h =
                            0; e > h; h++) n.push(d[h][a.columns]
                            .$row), a.appender && (!a.pager ||
                            a.pager.removeRows && l.pager_removeRows ||
                            a.pager.ajax) || g.append(d[h][
                            a.columns
                        ].$row);
                        b.processTbody(k, g, !1)
                    }
                a.appender && a.appender(k, n), a.debug &&
                    console.log("Rebuilt table" + b.benchmark(j)),
                    c || a.appender || b.applyWidget(k), k.isUpdating &&
                    a.$table.triggerHandler("updateComplete", k)
            },
            commonUpdate: function(a, c, d) {
                a.$table.find(a.selectorRemove).remove(), b.setupParsers(
                    a), b.buildCache(a), b.checkResort(a, c,
                    d)
            },
            initSort: function(c, d, e) {
                if (c.table.isUpdating) return setTimeout(
                    function() {
                        b.initSort(c, d, e)
                    }, 50);
                var f, g, h, i, j, k, l, m = !e[c.sortMultiSortKey],
                    n = c.table,
                    o = c.$headers.length,
                    p = parseInt(a(d).attr("data-column"), 10),
                    q = c.sortVars[p].order;
                if (c.$table.triggerHandler("sortStart", n), c.sortVars[
                        p].count = e[c.sortResetKey] ? 2 : (c.sortVars[
                        p].count + 1) % (c.sortReset ? 3 : 2),
                    c.sortRestart)
                    for (h = 0; o > h; h++) l = c.$headers.eq(h),
                        k = parseInt(l.attr("data-column"), 10),
                        p !== k && (m || l.hasClass(b.css.sortNone)) &&
                        (c.sortVars[k].count = -1);
                if (m) {
                    if (c.sortList = [], c.last.sortList = [],
                        null !== c.sortForce)
                        for (f = c.sortForce, g = 0; g < f.length; g++)
                            f[g][0] !== p && c.sortList.push(f[
                                g]);
                    if (i = q[c.sortVars[p].count], 2 > i && (c
                        .sortList.push([p, i]), d.colSpan >
                        1))
                        for (g = 1; g < d.colSpan; g++) c.sortList
                            .push([p + g, i]), c.sortVars[p + g]
                            .count = a.inArray(i, q)
                } else if (c.sortList = a.extend([], c.last.sortList),
                    b.isValueInArray(p, c.sortList) >= 0)
                    for (g = 0; g < c.sortList.length; g++) k =
                        c.sortList[g], k[0] === p && (k[1] = q[
                                c.sortVars[p].count], 2 === k[1] &&
                            (c.sortList.splice(g, 1), c.sortVars[
                                p].count = -1));
                else if (i = q[c.sortVars[p].count], 2 > i && (
                    c.sortList.push([p, i]), d.colSpan > 1))
                    for (g = 1; g < d.colSpan; g++) c.sortList.push(
                            [p + g, i]), c.sortVars[p + g].count =
                        a.inArray(i, q);
                if (c.last.sortList = a.extend([], c.sortList),
                    c.sortList.length && c.sortAppend && (f = a
                        .isArray(c.sortAppend) ? c.sortAppend :
                        c.sortAppend[c.sortList[0][0]], !b.isEmptyObject(
                            f)))
                    for (g = 0; g < f.length; g++)
                        if (f[g][0] !== p && b.isValueInArray(f[
                            g][0], c.sortList) < 0) {
                            if (i = f[g][1], j = ("" + i).match(
                                /^(a|d|s|o|n)/)) switch (k = c.sortList[
                                0][1], j[0]) {
                                case "d":
                                    i = 1;
                                    break;
                                case "s":
                                    i = k;
                                    break;
                                case "o":
                                    i = 0 === k ? 1 : 0;
                                    break;
                                case "n":
                                    i = (k + 1) % (c.sortReset ?
                                        3 : 2);
                                    break;
                                default:
                                    i = 0
                            }
                            c.sortList.push([f[g][0], i])
                        }
                c.$table.triggerHandler("sortBegin", n),
                    setTimeout(function() {
                        b.setHeadersCss(c), b.multisort(c),
                            b.appendCache(c), c.$table.triggerHandler(
                                "sortBeforeEnd", n), c.$table
                            .triggerHandler("sortEnd", n)
                    }, 1)
            },
            multisort: function(a) {
                var c, d, e, f, g = a.table,
                    h = 0,
                    i = a.textSorter || "",
                    j = a.sortList,
                    k = j.length,
                    l = a.$tbodies.length;
                if (!a.serverSideSorting && !b.isEmptyObject(a.cache)) {
                    for (a.debug && (d = new Date), c = 0; l >
                        c; c++) e = a.cache[c].colMax, f = a.cache[
                        c].normalized, f.sort(function(c, d) {
                        var f, l, m, n, o, p, q;
                        for (f = 0; k > f; f++) {
                            if (m = j[f][0], n = j[f][1],
                                h = 0 === n, a.sortStable &&
                                c[m] === d[m] && 1 ===
                                k) return c[a.columns].order -
                                d[a.columns].order;
                            if (l = /n/i.test(b.getSortType(
                                    a.parsers, m)), l &&
                                a.strings[m] ? (l =
                                    "boolean" == typeof b
                                    .string[a.strings[m]] ?
                                    (h ? 1 : -1) * (b.string[
                                        a.strings[m]
                                    ] ? -1 : 1) : a.strings[
                                        m] ? b.string[a
                                        .strings[m]] ||
                                    0 : 0, o = a.numberSorter ?
                                    a.numberSorter(c[m],
                                        d[m], h, e[m],
                                        g) : b[
                                        "sortNumeric" +
                                        (h ? "Asc" :
                                            "Desc")](c[
                                            m], d[m], l,
                                        e[m], m, a)) :
                                (p = h ? c : d, q = h ?
                                    d : c, o =
                                    "function" ==
                                    typeof i ? i(p[m],
                                        q[m], h, m, g) :
                                    "object" == typeof i &&
                                    i.hasOwnProperty(m) ?
                                    i[m](p[m], q[m], h,
                                        m, g) : b[
                                        "sortNatural" +
                                        (h ? "Asc" :
                                            "Desc")](c[
                                            m], d[m], m,
                                        a)), o) return o
                        }
                        return c[a.columns].order - d[a
                            .columns].order
                    });
                    a.debug && console.log("Applying sort " + j
                        .toString() + b.benchmark(d))
                }
            },
            resortComplete: function(b, c) {
                b.table.isUpdating && b.$table.triggerHandler(
                    "updateComplete", b.table), a.isFunction(
                    c) && c(b.table)
            },
            checkResort: function(c, d, e) {
                var f = a.isArray(d) ? d : c.sortList,
                    g = "undefined" == typeof d ? c.resort : d;
                g === !1 || c.serverSideSorting || c.table.isProcessing ?
                    (b.resortComplete(c, e), b.applyWidget(c.table, !
                        1)) : f.length ? b.sortOn(c, f,
                        function() {
                            b.resortComplete(c, e)
                        }, !0) : b.sortReset(c, function() {
                        b.resortComplete(c, e), b.applyWidget(
                            c.table, !1)
                    })
            },
            sortOn: function(c, d, e, f) {
                var g = c.table;
                c.$table.triggerHandler("sortStart", g), b.updateHeaderSortCount(
                        c, d), b.setHeadersCss(c), c.delayInit &&
                    b.isEmptyObject(c.cache) && b.buildCache(c),
                    c.$table.triggerHandler("sortBegin", g), b.multisort(
                        c), b.appendCache(c, f), c.$table.triggerHandler(
                        "sortBeforeEnd", g), c.$table.triggerHandler(
                        "sortEnd", g), b.applyWidget(g), a.isFunction(
                        e) && e(g)
            },
            sortReset: function(c, d) {
                c.sortList = [], b.setHeadersCss(c), b.multisort(
                        c), b.appendCache(c), a.isFunction(d) &&
                    d(c.table)
            },
            getSortType: function(a, b) {
                return a && a[b] ? a[b].type || "" : ""
            },
            getOrder: function(a) {
                return /^d/i.test(a) || 1 === a
            },
            sortNatural: function(a, c) {
                if (a === c) return 0;
                var d, e, f, g, h, i, j = b.regex;
                if (j.hex.test(c)) {
                    if (d = parseInt(a.match(j.hex), 16), e =
                        parseInt(c.match(j.hex), 16), e > d)
                        return -1;
                    if (d > e) return 1
                }
                for (d = a.replace(j.chunk, "\\0$1\\0").replace(
                    j.chunks, "").split("\\0"), e = c.replace(
                    j.chunk, "\\0$1\\0").replace(j.chunks,
                    "").split("\\0"), i = Math.max(d.length,
                    e.length), h = 0; i > h; h++) {
                    if (f = isNaN(d[h]) ? d[h] || 0 :
                        parseFloat(d[h]) || 0, g = isNaN(e[h]) ?
                        e[h] || 0 : parseFloat(e[h]) || 0,
                        isNaN(f) !== isNaN(g)) return isNaN(f) ?
                        1 : -1;
                    if (typeof f != typeof g && (f += "", g +=
                        ""), g > f) return -1;
                    if (f > g) return 1
                }
                return 0
            },
            sortNaturalAsc: function(a, c, d, e) {
                if (a === c) return 0;
                var f = b.string[e.empties[d] || e.emptyTo];
                return "" === a && 0 !== f ? "boolean" ==
                    typeof f ? f ? -1 : 1 : -f || -1 : "" === c &&
                    0 !== f ? "boolean" == typeof f ? f ? 1 : -
                    1 : f || 1 : b.sortNatural(a, c)
            },
            sortNaturalDesc: function(a, c, d, e) {
                if (a === c) return 0;
                var f = b.string[e.empties[d] || e.emptyTo];
                return "" === a && 0 !== f ? "boolean" ==
                    typeof f ? f ? -1 : 1 : f || 1 : "" === c &&
                    0 !== f ? "boolean" == typeof f ? f ? 1 : -
                    1 : -f || -1 : b.sortNatural(c, a)
            },
            sortText: function(a, b) {
                return a > b ? 1 : b > a ? -1 : 0
            },
            getTextValue: function(a, b, c) {
                if (c) {
                    var d, e = a ? a.length : 0,
                        f = c + b;
                    for (d = 0; e > d; d++) f += a.charCodeAt(d);
                    return b * f
                }
                return 0
            },
            sortNumericAsc: function(a, c, d, e, f, g) {
                if (a === c) return 0;
                var h = b.string[g.empties[f] || g.emptyTo];
                return "" === a && 0 !== h ? "boolean" ==
                    typeof h ? h ? -1 : 1 : -h || -1 : "" === c &&
                    0 !== h ? "boolean" == typeof h ? h ? 1 : -
                    1 : h || 1 : (isNaN(a) && (a = b.getTextValue(
                        a, d, e)), isNaN(c) && (c = b.getTextValue(
                        c, d, e)), a - c)
            },
            sortNumericDesc: function(a, c, d, e, f, g) {
                if (a === c) return 0;
                var h = b.string[g.empties[f] || g.emptyTo];
                return "" === a && 0 !== h ? "boolean" ==
                    typeof h ? h ? -1 : 1 : h || 1 : "" === c &&
                    0 !== h ? "boolean" == typeof h ? h ? 1 : -
                    1 : -h || -1 : (isNaN(a) && (a = b.getTextValue(
                        a, d, e)), isNaN(c) && (c = b.getTextValue(
                        c, d, e)), c - a)
            },
            sortNumeric: function(a, b) {
                return a - b
            },
            addWidget: function(a) {
                b.widgets.push(a)
            },
            hasWidget: function(b, c) {
                return b = a(b), b.length && b[0].config && b[0]
                    .config.widgetInit[c] || !1
            },
            getWidgetById: function(a) {
                var c, d, e = b.widgets.length;
                for (c = 0; e > c; c++)
                    if (d = b.widgets[c], d && d.id && d.id.toLowerCase() ===
                        a.toLowerCase()) return d
            },
            applyWidgetOptions: function(c) {
                var d, e, f = c.config,
                    g = f.widgets.length;
                if (g)
                    for (d = 0; g > d; d++) e = b.getWidgetById(
                        f.widgets[d]), e && e.options && (f
                        .widgetOptions = a.extend(!0, {}, e
                            .options, f.widgetOptions))
            },
            addWidgetFromClass: function(a) {
                var c, d, e = a.config,
                    f = "^" + e.widgetClass.replace(b.regex.templateName,
                        "(\\S+)+") + "$",
                    g = new RegExp(f, "g"),
                    h = (a.className || "").split(b.regex.spaces);
                if (h.length)
                    for (c = h.length, d = 0; c > d; d++) h[d].match(
                        g) && e.widgets.push(h[d].replace(g,
                        "$1"))
            },
            applyWidgetId: function(c, d, e) {
                c = a(c)[0];
                var f, g, h, i = c.config,
                    j = i.widgetOptions,
                    k = b.getWidgetById(d);
                k && (h = k.id, f = !1, a.inArray(h, i.widgets) <
                    0 && i.widgets.push(h), i.debug && (g =
                        new Date), (e || !i.widgetInit[h]) &&
                    (i.widgetInit[h] = !0, c.hasInitialized &&
                        b.applyWidgetOptions(c), "function" ==
                        typeof k.init && (f = !0, i.debug &&
                            console[console.group ? "group" :
                                "log"]("Initializing " + h +
                                " widget"), k.init(c, k, i,
                                j))), e || "function" !=
                    typeof k.format || (f = !0, i.debug &&
                        console[console.group ? "group" :
                            "log"]("Updating " + h +
                            " widget"), k.format(c, i, j, !
                            1)), i.debug && f && (console.log(
                            "Completed " + (e ?
                                "initializing " :
                                "applying ") + h +
                            " widget" + b.benchmark(g)),
                        console.groupEnd && console.groupEnd()
                    ))
            },
            applyWidget: function(c, d, e) {
                c = a(c)[0];
                var f, g, h, i, j, k = c.config,
                    l = [];
                if (d === !1 || !c.hasInitialized || !c.isApplyingWidgets &&
                    !c.isUpdating) {
                    if (k.debug && (j = new Date), b.addWidgetFromClass(
                            c), clearTimeout(k.timerReady), k.widgets
                        .length) {
                        for (c.isApplyingWidgets = !0, k.widgets =
                            a.grep(k.widgets, function(b, c) {
                                return a.inArray(b, k.widgets) ===
                                    c
                            }), h = k.widgets || [], g = h.length,
                            f = 0; g > f; f++) i = b.getWidgetById(
                            h[f]), i && i.id && (i.priority ||
                            (i.priority = 10), l[f] = i);
                        for (l.sort(function(a, b) {
                                return a.priority < b.priority ?
                                    -1 : a.priority === b.priority ?
                                    0 : 1
                            }), g = l.length, k.debug &&
                            console[console.group ? "group" :
                                "log"]("Start " + (d ?
                                "initializing" : "applying"
                            ) + " widgets"), f = 0; g > f; f++)
                            i = l[f], i && i.id && b.applyWidgetId(
                                c, i.id, d);
                        k.debug && console.groupEnd && console.groupEnd(),
                            d || "function" != typeof e || e(c)
                    }
                    k.timerReady = setTimeout(function() {
                        c.isApplyingWidgets = !1, a.data(
                            c,
                            "lastWidgetApplication",
                            new Date), k.$table.triggerHandler(
                            "tablesorter-ready")
                    }, 10), k.debug && (i = k.widgets.length,
                        console.log("Completed " + (d === !
                                0 ? "initializing " :
                                "applying ") + i +
                            " widget" + (1 !== i ? "s" : "") +
                            b.benchmark(j)))
                }
            },
            removeWidget: function(c, d, e) {
                c = a(c)[0];
                var f, g, h, i, j = c.config;
                if (d === !0)
                    for (d = [], i = b.widgets.length, h = 0; i >
                        h; h++) g = b.widgets[h], g && g.id &&
                        d.push(g.id);
                else d = (a.isArray(d) ? d.join(",") : d || "")
                    .toLowerCase().split(/[\s,]+/);
                for (i = d.length, f = 0; i > f; f++) g = b.getWidgetById(
                        d[f]), h = a.inArray(d[f], j.widgets),
                    h >= 0 && e !== !0 && j.widgets.splice(h, 1),
                    g && g.remove && (j.debug && console.log((e ?
                            "Refreshing" : "Removing") +
                        ' "' + d[f] + '" widget'), g.remove(
                        c, j, j.widgetOptions, e), j.widgetInit[
                        d[f]] = !1)
            },
            refreshWidgets: function(c, d, e) {
                c = a(c)[0];
                var f, g, h = c.config,
                    i = h.widgets,
                    j = b.widgets,
                    k = j.length,
                    l = [],
                    m = function(b) {
                        a(b).triggerHandler("refreshComplete")
                    };
                for (f = 0; k > f; f++) g = j[f], g && g.id &&
                    (d || a.inArray(g.id, i) < 0) && l.push(g.id);
                b.removeWidget(c, l.join(","), !0), e !== !0 ?
                    (b.applyWidget(c, d || !1, m), d && b.applyWidget(
                        c, !1, m)) : m(c)
            },
            benchmark: function(a) {
                return " ( " + ((new Date).getTime() - a.getTime()) +
                    "ms )"
            },
            log: function() {
                console.log(arguments)
            },
            isEmptyObject: function(a) {
                for (var b in a) return !1;
                return !0
            },
            isValueInArray: function(a, b) {
                var c, d = b && b.length || 0;
                for (c = 0; d > c; c++)
                    if (b[c][0] === a) return c;
                return -1
            },
            formatFloat: function(c, d) {
                if ("string" != typeof c || "" === c) return c;
                var e, f = d && d.config ? d.config.usNumberFormat !==
                    !1 : "undefined" != typeof d ? d : !0;
                return c = f ? c.replace(b.regex.comma, "") : c
                    .replace(b.regex.digitNonUS, "").replace(b.regex
                        .comma, "."), b.regex.digitNegativeTest
                    .test(c) && (c = c.replace(b.regex.digitNegativeReplace,
                        "-$1")), e = parseFloat(c), isNaN(e) ?
                    a.trim(c) : e
            },
            isDigit: function(a) {
                return isNaN(a) ? b.regex.digitTest.test(a.toString()
                        .replace(b.regex.digitReplace, "")) :
                    "" !== a
            },
            computeColumnIndex: function(b, c) {
                var d, e, f, g, h, i, j, k, l, m, n = c && c.columns ||
                    0,
                    o = [],
                    p = new Array(n);
                for (d = 0; d < b.length; d++)
                    for (i = b[d].cells, e = 0; e < i.length; e++) {
                        for (h = i[e], j = h.parentNode.rowIndex,
                            k = h.rowSpan || 1, l = h.colSpan ||
                            1, "undefined" == typeof o[j] && (o[
                                j] = []), f = 0; f < o[j].length +
                            1; f++)
                            if ("undefined" == typeof o[j][f]) {
                                m = f;
                                break
                            }
                        for (n && h.cellIndex === m || (h.setAttribute ?
                                h.setAttribute("data-column", m) :
                                a(h).attr("data-column", m)), f =
                            j; j + k > f; f++)
                            for ("undefined" == typeof o[f] &&
                                (o[f] = []), p = o[f], g = m; m +
                                l > g; g++) p[g] = "x"
                    }
                return p.length
            },
            fixColumnWidth: function(c) {
                c = a(c)[0];
                var d, e, f, g, h, i = c.config,
                    j = i.$table.children("colgroup");
                if (j.length && j.hasClass(b.css.colgroup) && j
                    .remove(), i.widthFixed && 0 === i.$table.children(
                        "colgroup").length) {
                    for (j = a('<colgroup class="' + b.css.colgroup +
                            '">'), d = i.$table.width(), f = i.$tbodies
                        .find("tr:first").children(":visible"),
                        g = f.length, h = 0; g > h; h++) e =
                        parseInt(f.eq(h).width() / d * 1e3, 10) /
                        10 + "%", j.append(a("<col>").css(
                            "width", e));
                    i.$table.prepend(j)
                }
            },
            getData: function(b, c, d) {
                var e, f, g = "",
                    h = a(b);
                return h.length ? (e = a.metadata ? h.metadata() :
                    !1, f = " " + (h.attr("class") || ""),
                    "undefined" != typeof h.data(d) ||
                    "undefined" != typeof h.data(d.toLowerCase()) ?
                    g += h.data(d) || h.data(d.toLowerCase()) :
                    e && "undefined" != typeof e[d] ? g +=
                    e[d] : c && "undefined" != typeof c[d] ?
                    g += c[d] : " " !== f && f.match(" " +
                        d + "-") && (g = f.match(new RegExp(
                            "\\s" + d + "-([\\w-]+)"))[1] ||
                        ""), a.trim(g)) : ""
            },
            getColumnData: function(b, c, d, e, f) {
                if ("undefined" != typeof c && null !== c) {
                    b = a(b)[0];
                    var g, h, i = b.config,
                        j = f || i.$headers,
                        k = i.$headerIndexed && i.$headerIndexed[
                            d] || j.filter('[data-column="' + d +
                            '"]:last');
                    if (c[d]) return e ? c[d] : c[j.index(k)];
                    for (h in c)
                        if ("string" == typeof h && (g = k.filter(
                            h).add(k.find(h)), g.length)) return
                            c[h]
                }
            },
            isProcessing: function(c, d, e) {
                c = a(c);
                var f = c[0].config,
                    g = e || c.find("." + b.css.header);
                d ? ("undefined" != typeof e && f.sortList.length >
                    0 && (g = g.filter(function() {
                        return this.sortDisabled ?
                            !1 : b.isValueInArray(
                                parseFloat(a(this).attr(
                                    "data-column"
                                )), f.sortList) >=
                            0
                    })), c.add(g).addClass(b.css.processing +
                        " " + f.cssProcessing)) : c.add(g).removeClass(
                    b.css.processing + " " + f.cssProcessing
                )
            },
            processTbody: function(b, c, d) {
                if (b = a(b)[0], d) return b.isProcessing = !0,
                    c.before(
                        '<colgroup class="tablesorter-savemyplace"/>'
                    ), a.fn.detach ? c.detach() : c.remove();
                var e = a(b).find(
                    "colgroup.tablesorter-savemyplace");
                c.insertAfter(e), e.remove(), b.isProcessing = !
                    1
            },
            clearTableBody: function(b) {
                a(b)[0].config.$tbodies.children().detach()
            },
            characterEquivalents: {
                a: "áàâãäąå",
                A: "ÁÀÂÃÄĄÅ",
                c: "çćč",
                C: "ÇĆČ",
                e: "éèêëěę",
                E: "ÉÈÊËĚĘ",
                i: "íìİîïı",
                I: "ÍÌİÎÏ",
                o: "óòôõöō",
                O: "ÓÒÔÕÖŌ",
                ss: "ß",
                SS: "ẞ",
                u: "úùûüů",
                U: "ÚÙÛÜŮ"
            },
            replaceAccents: function(a) {
                var c, d = "[",
                    e = b.characterEquivalents;
                if (!b.characterRegex) {
                    b.characterRegexArray = {};
                    for (c in e) "string" == typeof c && (d +=
                        e[c], b.characterRegexArray[c] =
                        new RegExp("[" + e[c] + "]", "g"));
                    b.characterRegex = new RegExp(d + "]")
                }
                if (b.characterRegex.test(a))
                    for (c in e) "string" == typeof c && (a = a
                        .replace(b.characterRegexArray[c],
                            c));
                return a
            },
            restoreHeaders: function(c) {
                var d, e, f = a(c)[0].config,
                    g = f.$table.find(f.selectorHeaders),
                    h = g.length;
                for (d = 0; h > d; d++) e = g.eq(d), e.find("." +
                    b.css.headerIn).length && e.html(f.headerContent[
                    d])
            },
            destroy: function(c, d, e) {
                if (c = a(c)[0], c.hasInitialized) {
                    b.removeWidget(c, !0, !1);
                    var f, g = a(c),
                        h = c.config,
                        i = h.debug,
                        j = g.find("thead:first"),
                        k = j.find("tr." + b.css.headerRow).removeClass(
                            b.css.headerRow + " " + h.cssHeaderRow
                        ),
                        l = g.find("tfoot:first > tr").children(
                            "th, td");
                    d === !1 && a.inArray("uitheme", h.widgets) >=
                        0 && (g.triggerHandler("applyWidgetId", [
                            "uitheme"
                        ]), g.triggerHandler(
                            "applyWidgetId", ["zebra"])), j.find(
                            "tr").not(k).remove(), f =
                        "sortReset update updateRows updateAll updateHeaders updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets removeWidget destroy mouseup mouseleave " +
                        "keypress sortBegin sortEnd resetToLoadState "
                        .split(" ").join(h.namespace + " "), g.removeData(
                            "tablesorter").unbind(f.replace(b.regex
                            .spaces, " ")), h.$headers.add(l).removeClass(
                            [b.css.header, h.cssHeader, h.cssAsc,
                                h.cssDesc, b.css.sortAsc, b.css
                                .sortDesc, b.css.sortNone
                            ].join(" ")).removeAttr(
                            "data-column").removeAttr(
                            "aria-label").attr("aria-disabled",
                            "true"), k.find(h.selectorSort).unbind(
                            "mousedown mouseup keypress ".split(
                                " ").join(h.namespace + " ").replace(
                                b.regex.spaces, " ")), b.restoreHeaders(
                            c), g.toggleClass(b.css.table + " " +
                            h.tableClass + " tablesorter-" + h.theme,
                            d === !1), c.hasInitialized = !1,
                        delete c.config.cache, "function" ==
                        typeof e && e(c), i && console.log(
                            "tablesorter has been removed")
                }
            }
        };
        a.fn.tablesorter = function(c) {
                return this.each(function() {
                    var d = this,
                        e = a.extend(!0, {}, b.defaults, c, b.instanceMethods);
                    e.originalSettings = c, !d.hasInitialized &&
                        b.buildTable && "TABLE" !== this.nodeName ?
                        b.buildTable(d, e) : b.setup(d, e)
                })
            }, window.console && window.console.log || (b.logs = [],
                console = {}, console.log = console.warn = console.error =
                console.table = function() {
                    var a = arguments.length > 1 ? arguments :
                        arguments[0];
                    b.logs.push({
                        date: Date.now(),
                        log: a
                    })
                }), b.addParser({
                id: "no-parser",
                is: function() {
                    return !1
                },
                format: function() {
                    return ""
                },
                type: "text"
            }), b.addParser({
                id: "text",
                is: function() {
                    return !0
                },
                format: function(c, d) {
                    var e = d.config;
                    return c && (c = a.trim(e.ignoreCase ? c.toLocaleLowerCase() :
                            c), c = e.sortLocaleCompare ? b
                        .replaceAccents(c) : c), c
                },
                type: "text"
            }), b.regex.nondigit = /[^\w,. \-()]/g, b.addParser({
                id: "digit",
                is: function(a) {
                    return b.isDigit(a)
                },
                format: function(c, d) {
                    var e = b.formatFloat((c || "").replace(b.regex
                        .nondigit, ""), d);
                    return c && "number" == typeof e ? e : c ?
                        a.trim(c && d.config.ignoreCase ? c.toLocaleLowerCase() :
                            c) : c
                },
                type: "numeric"
            }), b.regex.currencyReplace = /[+\-,. ]/g, b.regex.currencyTest =
            /^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/,
            b.addParser({
                id: "currency",
                is: function(a) {
                    return a = (a || "").replace(b.regex.currencyReplace,
                        ""), b.regex.currencyTest.test(a)
                },
                format: function(c, d) {
                    var e = b.formatFloat((c || "").replace(b.regex
                        .nondigit, ""), d);
                    return c && "number" == typeof e ? e : c ?
                        a.trim(c && d.config.ignoreCase ? c.toLocaleLowerCase() :
                            c) : c
                },
                type: "numeric"
            }), b.regex.urlProtocolTest = /^(https?|ftp|file):\/\//, b.regex
            .urlProtocolReplace = /(https?|ftp|file):\/\//, b.addParser({
                id: "url",
                is: function(a) {
                    return b.regex.urlProtocolTest.test(a)
                },
                format: function(c) {
                    return c ? a.trim(c.replace(b.regex.urlProtocolReplace,
                        "")) : c
                },
                parsed: !0,
                type: "text"
            }), b.regex.dash = /-/g, b.regex.isoDate =
            /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/, b.addParser({
                id: "isoDate",
                is: function(a) {
                    return b.regex.isoDate.test(a)
                },
                format: function(a, c) {
                    var d = a ? new Date(a.replace(b.regex.dash,
                        "/")) : a;
                    return d instanceof Date && isFinite(d) ? d
                        .getTime() : a
                },
                type: "numeric"
            }), b.regex.percent = /%/g, b.regex.percentTest =
            /(\d\s*?%|%\s*?\d)/, b.addParser({
                id: "percent",
                is: function(a) {
                    return b.regex.percentTest.test(a) && a.length <
                        15
                },
                format: function(a, c) {
                    return a ? b.formatFloat(a.replace(b.regex.percent,
                        ""), c) : a
                },
                type: "numeric"
            }), b.addParser({
                id: "image",
                is: function(a, b, c, d) {
                    return d.find("img").length > 0
                },
                format: function(b, c, d) {
                    return a(d).find("img").attr(c.config.imgAttr ||
                        "alt") || b
                },
                parsed: !0,
                type: "text"
            }), b.regex.dateReplace = /(\S)([AP]M)$/i, b.regex.usLongDateTest1 =
            /^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i,
            b.regex.usLongDateTest2 = /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i,
            b.addParser({
                id: "usLongDate",
                is: function(a) {
                    return b.regex.usLongDateTest1.test(a) || b
                        .regex.usLongDateTest2.test(a)
                },
                format: function(a, c) {
                    var d = a ? new Date(a.replace(b.regex.dateReplace,
                        "$1 $2")) : a;
                    return d instanceof Date && isFinite(d) ? d
                        .getTime() : a
                },
                type: "numeric"
            }), b.regex.shortDateTest =
            /(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/,
            b.regex.shortDateReplace = /[\-.,]/g, b.regex.shortDateXXY =
            /(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, b.regex.shortDateYMD =
            /(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, b.convertFormat =
            function(a, c) {
                a = (a || "").replace(b.regex.spaces, " ").replace(b.regex
                        .shortDateReplace, "/"), "mmddyyyy" === c ? a =
                    a.replace(b.regex.shortDateXXY, "$3/$1/$2") :
                    "ddmmyyyy" === c ? a = a.replace(b.regex.shortDateXXY,
                        "$3/$2/$1") : "yyyymmdd" === c && (a = a.replace(
                        b.regex.shortDateYMD, "$1/$2/$3"));
                var d = new Date(a);
                return d instanceof Date && isFinite(d) ? d.getTime() :
                    ""
            }, b.addParser({
                id: "shortDate",
                is: function(a) {
                    return a = (a || "").replace(b.regex.spaces,
                        " ").replace(b.regex.shortDateReplace,
                        "/"), b.regex.shortDateTest.test(a)
                },
                format: function(a, c, d, e) {
                    if (a) {
                        var f = c.config,
                            g = f.$headerIndexed[e],
                            h = g.length && g.data("dateFormat") ||
                            b.getData(g, b.getColumnData(c, f.headers,
                                e), "dateFormat") || f.dateFormat;
                        return g.length && g.data("dateFormat",
                            h), b.convertFormat(a, h) || a
                    }
                    return a
                },
                type: "numeric"
            }), b.regex.timeTest =
            /^([1-9]|1[0-2]):([0-5]\d)(\s[AP]M)$|^((?:[01]\d|[2][0-4]):[0-5]\d)$/i,
            b.regex.timeMatch =
            /([1-9]|1[0-2]):([0-5]\d)(\s[AP]M)|((?:[01]\d|[2][0-4]):[0-5]\d)/i,
            b.addParser({
                id: "time",
                is: function(a) {
                    return b.regex.timeTest.test(a)
                },
                format: function(a, c) {
                    var d, e = (a || "").match(b.regex.timeMatch),
                        f = new Date(a),
                        g = a && (null !== e ? e[0] :
                            "00:00 AM"),
                        h = g ? new Date("2000/01/01 " + g.replace(
                            b.regex.dateReplace, "$1 $2")) : g;
                    return h instanceof Date && isFinite(h) ? (
                        d = f instanceof Date && isFinite(f) ?
                        f.getTime() : 0, d ? parseFloat(h.getTime() +
                            "." + f.getTime()) : h.getTime()
                    ) : a
                },
                type: "numeric"
            }), b.addParser({
                id: "metadata",
                is: function() {
                    return !1
                },
                format: function(b, c, d) {
                    var e = c.config,
                        f = e.parserMetadataName ? e.parserMetadataName :
                        "sortValue";
                    return a(d).metadata()[f]
                },
                type: "numeric"
            }), b.addWidget({
                id: "zebra",
                priority: 90,
                format: function(b, c, d) {
                    var e, f, g, h, i, j, k, l = new RegExp(c.cssChildRow,
                            "i"),
                        m = c.$tbodies.add(a(c.namespace +
                            "_extra_table").children(
                            "tbody:not(." + c.cssInfoBlock +
                            ")"));
                    for (i = 0; i < m.length; i++)
                        for (g = 0, e = m.eq(i).children(
                                "tr:visible").not(c.selectorRemove),
                            k = e.length, j = 0; k > j; j++) f =
                            e.eq(j), l.test(f[0].className) ||
                            g++, h = g % 2 === 0, f.removeClass(
                                d.zebra[h ? 1 : 0]).addClass(d.zebra[
                                h ? 0 : 1])
                },
                remove: function(a, c, d, e) {
                    if (!e) {
                        var f, g, h = c.$tbodies,
                            i = (d.zebra || ["even", "odd"]).join(
                                " ");
                        for (f = 0; f < h.length; f++) g = b.processTbody(
                            a, h.eq(f), !0), g.children().removeClass(
                            i), b.processTbody(a, g, !1)
                    }
                }
            })
    }(jQuery), a.tablesorter
});