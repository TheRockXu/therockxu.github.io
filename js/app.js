function ace_detect_device_type() {
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (ace.mobile = !0, ace.html.addClass("crt-mobile")) : (ace.mobile = !1, ace.html.addClass("crt-desktop"))
}

function ace_append_overlay() {
    ace.body.append(ace.overlay.obj), ace.overlay.obj[0].style.opacity = 0, window.getComputedStyle(ace.overlay.obj[0]).opacity, ace.overlay.obj[0].style.opacity = 1
}

function ace_remove_overlay() {
    ace.overlay.obj[0].style.opacity = 0, ace.overlay.obj.remove()
}

function ace_lock_scroll() {
    var e = ace.html.outerWidth(),
        t = ace.body.outerHeight(),
        o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    ace.html.data("scroll-position", o), ace.html.data("previous-overflow", ace.html.css("overflow")), ace.html.css("overflow", "hidden"), window.scrollTo(o[0], o[1]);
    var r = ace.body.outerWidth() - e,
        i = ace.body.outerHeight() - t;
    ace.body.css({
        "margin-right": r,
        "margin-bottom": i
    }), ace.html.addClass("crt-lock-scroll")
}

function ace_unlock_scroll() {
    ace.html.css("overflow", ace.html.data("previous-overflow"));
    var e = ace.html.data("scroll-position");
    window.scrollTo(e[0], e[1]), ace.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }), ace.html.removeClass("crt-lock-scroll")
}

function ace_open_sidebar() {
    ace.html.addClass("crt-sidebar-opened"), ace_append_overlay(), ace_lock_scroll()
}

function ace_close_sidebar() {
    ace.html.removeClass("crt-sidebar-opened"), ace_remove_overlay(), ace_unlock_scroll()
}

function ace_progress_chart(e, t, o, r) {
    void 0 === t && (t = ""), new ProgressBar.Circle(e, {
        color: certy.vars.themeColor,
        strokeWidth: 5,
        trailWidth: 0,
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "50%",
                left: "50%",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(-50%, -50%)"
                }
            },
            autoStyleContainer: !0,
            alignToBottom: !0
        },
        svgStyle: {
            display: "block",
            width: "100%"
        },
        duration: r,
        easing: "easeOut"
    }).animate(o)
}

function ace_progress_line(e, t, o, r) {
    void 0 === t && (t = ""), new ProgressBar.Line(e, {
        strokeWidth: 4,
        easing: "easeInOut",
        duration: r,
        color: certy.vars.themeColor,
        trailColor: certy.progress.trailColor,
        trailWidth: 4,
        svgStyle: {
            width: "100%",
            height: "100%"
        },
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "-25px",
                right: "0",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(0, 0)"
                }
            },
            autoStyleContainer: !0
        }
    }).animate(o)
}

function ace_is_elem_in_viewport(e, t) {
    var o = e[0].getBoundingClientRect();
    return o.bottom >= 0 && o.right >= 0 && o.top + t <= (window.innerHeight || document.documentElement.clientHeight) && o.left <= (window.innerWidth || document.documentElement.clientWidth)
}

function ace_is_elems_in_viewport(e, t) {
    for (var o = 0; o < e.length; o++) {
        var r = jQuery(e[o]);
        if (r.hasClass("crt-animate") && ace_is_elem_in_viewport(r, t)) {
            if (r.removeClass("crt-animate").addClass("crt-animated"), r.hasClass("progress-chart")) {
                var i = r.find(".progress-bar");
                ace_progress_chart(i[0], i.data("text"), i.data("value"), 1e3)
            }
            if (r.hasClass("progress-line")) {
                var s = r.find(".progress-bar");
                ace_progress_line(s[0], s.data("text"), s.data("value"), 1e3)
            }
        }
    }
}

function ace_appear_elems(e, t) {
    ace_is_elems_in_viewport(e, t), jQuery(window).scroll(function() {
        ace_is_elems_in_viewport(e, t)
    }), jQuery(window).resize(function() {
        ace_is_elems_in_viewport(e, t)
    })
}

function initialiseGoogleMap(e) {
    var t, o = 44.5403,
        r = -78.5463,
        i = jQuery("#map"),
        s = i.get(0),
        a = jQuery.parseJSON(e);
    i.data("latitude") && (o = i.data("latitude")), i.data("longitude") && (r = i.data("longitude")), t = new google.maps.LatLng(o, r);
    var n = {
        zoom: 14,
        center: t,
        scrollwheel: !0,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: a
    };
    i = new google.maps.Map(s, n);
    new google.maps.Marker({
        map: i,
        position: t,
        icon: {
            path: "M125 410 c-56 -72 -111 -176 -120 -224 -7 -36 11 -83 49 -124 76 -85 223 -67 270 31 28 60 29 88 6 150 -19 51 -122 205 -148 221 -6 3 -32 -21 -57 -54z m110 -175 c35 -34 33 -78 -4 -116 -35 -35 -71 -37 -105 -7 -40 35 -43 78 -11 116 34 41 84 44 120 7z",
            fillColor: certy_vars_from_WP.themeColor,
            fillOpacity: 1,
            scale: .1,
            strokeColor: certy_vars_from_WP.themeColor,
            strokeWeight: 1,
            anchor: new google.maps.Point(185, 500)
        },
        title: "Hello World!"
    });
    google.maps.event.addDomListener(window, "resize", function() {
        i.setCenter(t)
    })
}
var navStiky = !1;
1 == certy_vars_from_WP.enable_sticky && (navStiky = !0);
var certy = {
    vars: {
        rtl: !1,
        themeColor: certy_vars_from_WP.themeColor,
        screenMd: "992px"
    },
    nav: {
        height: "auto",
        arrow: !1,
        sticky: {
            top: "-1px",
            active: navStiky
        },
        tooltip: {
            active: !0
        }
    },
    sideBox: {
        sticky: {
            top: "20px",
            active: !1
        }
    },
    progress: {
        animation: !0,
        textColor: "inherit",
        trailColor: "rgba(0,0,0,0.07)"
    }
};
! function(e, t, o, r) {
    var i = function(r, i) {
        this.elem = r, this.$elem = e(r), this.options = i, this.metadata = this.$elem.data("plugin-options"), this.$win = e(t), this.sections = {}, this.didScroll = !1, this.$doc = e(o), this.docHeight = this.$doc.height()
    };
    i.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function() {
            return this.config = e.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", e.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", e.proxy(this.getPositions, this)), this
        },
        adjustNav: function(e, t) {
            e.$elem.find("." + e.config.currentClass).removeClass(e.config.currentClass), t.addClass(e.config.currentClass)
        },
        bindInterval: function() {
            var e, t = this;
            t.$win.on("scroll.onePageNav", function() {
                t.didScroll = !0
            }), t.t = setInterval(function() {
                e = t.$doc.height(), t.didScroll && (t.didScroll = !1, t.scrollChange()), e !== t.docHeight && (t.docHeight = e, t.getPositions())
            }, 250)
        },
        getHash: function(e) {
            return e.attr("href").split("#")[1]
        },
        getPositions: function() {
            var t, o, r, i = this;
            i.$nav.each(function() {
                t = i.getHash(e(this)), r = e("#" + t), r.length && (o = r.offset().top, i.sections[t] = Math.round(o))
            })
        },
        getSection: function(e) {
            var t = null,
                o = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var r in this.sections) this.sections[r] - o < e && (t = r);
            return t
        },
        handleClick: function(o) {
            var r = this,
                i = e(o.currentTarget),
                s = i.parent(),
                a = "#" + r.getHash(i);
            s.hasClass(r.config.currentClass) || (r.config.begin && r.config.begin(), r.adjustNav(r, s), r.unbindInterval(), r.scrollTo(a, function() {
                r.config.changeHash && (t.location.hash = a), r.bindInterval(), r.config.end && r.config.end()
            })), o.preventDefault()
        },
        scrollChange: function() {
            var e, t = this.$win.scrollTop(),
                o = this.getSection(t);
            null !== o && (e = this.$elem.find('a[href$="#' + o + '"]').parent(), e.hasClass(this.config.currentClass) || (this.adjustNav(this, e), this.config.scrollChange && this.config.scrollChange(e)))
        },
        scrollTo: function(t, o) {
            var r = e(t).offset().top;
            e(t).closest(".crt-paper-layers").hasClass("crt-animate") ? r -= 145 : r -= 45, e("html, body").animate({
                scrollTop: r
            }, this.config.scrollSpeed, this.config.easing, o)
        },
        unbindInterval: function() {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, i.defaults = i.prototype.defaults, e.fn.onePageNav = function(e) {
        return this.each(function() {
            new i(this, e).init()
        })
    }
}(jQuery, window, document), certy.initGlobalVars = function() {
    this.vars.html = jQuery("html"), this.vars.body = jQuery("body"), this.vars.footer = jQuery("#crt-footer"), this.vars.windowW = jQuery(window).width(), this.vars.windowH = jQuery(window).height(), this.vars.windowScrollTop = jQuery(window).scrollTop(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (this.vars.mobile = !0, this.vars.html.addClass("mobile")) : (this.vars.mobile = !1, this.vars.html.addClass("desktop"))
}, certy.lockScroll = function() {
    var e = certy.vars.html.outerWidth(),
        t = certy.vars.body.outerHeight(),
        o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    certy.vars.html.data("scroll-position", o), certy.vars.html.data("previous-overflow", certy.vars.html.css("overflow")), certy.vars.html.css("overflow", "hidden"), window.scrollTo(o[0], o[1]);
    var r = certy.vars.body.outerWidth() - e,
        i = certy.vars.body.outerHeight() - t;
    certy.vars.body.css({
        "margin-right": r,
        "margin-bottom": i
    }), certy.vars.html.addClass("lock-scroll")
}, certy.unlockScroll = function() {
    certy.vars.html.css("overflow", certy.vars.html.data("previous-overflow"));
    var e = certy.vars.html.data("scroll-position");
    window.scrollTo(e[0], e[1]), certy.vars.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }), certy.vars.html.removeClass("lock-scroll")
}, certy.nav.initScroll = function(e) {
    e.height(e.height()).animate({
        height: certy.nav.height
    }, 700, function() {
        e.mCustomScrollbar({
            axis: "y",
            scrollbarPosition: "outside"
        })
    }), certy.nav.arrow && (jQuery("#crt-nav-tools").removeClass("hidden"), jQuery("#crt-nav-arrow").on("click", function() {
        e.mCustomScrollbar("scrollTo", "-=" + certy.nav.height)
    }))
}, certy.nav.exists = !1, certy.nav.makeSticky = function() {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crt-nav-inner"), this.wrap = jQuery("#crt-nav-wrap"), this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}, certy.nav.tooltip.el = "", certy.nav.tooltip.timer = 0, certy.nav.tooltip.show = function(e) {
    certy.nav.tooltip.timer = setTimeout(function() {
        certy.nav.tooltip.el = jQuery('<div class="crt-tooltip"></div>');
        var t = e.offset().top,
            o = e.offset().left,
            r = o + e.outerWidth();
        e.outerWidth();
        certy.vars.body.append(certy.nav.tooltip.el), certy.nav.tooltip.el.text(e.data("tooltip")), r + certy.nav.tooltip.el.outerWidth() < certy.vars.windowW ? certy.nav.tooltip.el.addClass("arrow-left").css({
            left: r + "px",
            top: t + 4 + "px"
        }) : certy.nav.tooltip.el.addClass("arrow-right text-right").css({
            left: o - certy.nav.tooltip.el.outerWidth() - 10 + "px",
            top: t + 4 + "px"
        }), certy.nav.tooltip.el.fadeIn(150)
    }, 150)
}, certy.nav.tooltip.hide = function() {
    clearTimeout(certy.nav.tooltip.timer), certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.fadeOut(150, function() {
        certy.nav.tooltip.el.remove()
    })
}, certy.sideBox.exists = !1, certy.sideBox.makeSticky = function() {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crt-side-box"), this.wrap = jQuery("#crt-side-box-wrap"), this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}, certy.slider = function(e) {
    for (var t = 0; t < e.length; t++) "none" != jQuery(e[t]).data("init") && jQuery(e[t]).slick()
}, certy.carousel = function(e) {
    for (var t = 0; t < e.length; t++) "none" !== jQuery(e[t]).data("init") && jQuery(e[t]).slick({
        dots: !0
    })
}, certy.portfolio = {
    popupSlider: "",
    popupCarousel: "",
    currentEmbed: !1,
    currentEmbedType: !1,
    initGrid: function(e) {
        var t = e.isotope({
            isOriginLeft: !certy.vars.rtl,
            itemSelector: ".pf-grid-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".pf-grid-sizer"
            }
        });
        t.imagesLoaded().progress(function() {
            t.isotope("layout")
        });
        var o = e.closest(".pf-wrap").find(".pf-filter");
        if (o.length > 0) {
            var r = o.find("button");
            jQuery(".pf-filter button:first-child").addClass("active"), r.on("click", function() {
                r.removeClass("active"), jQuery(this).addClass("active");
                var e = jQuery(this).attr("data-filter");
                t.isotope({
                    filter: e
                })
            })
        }
    },
    openPopup: function(e) {
        certy.vars.html.addClass("crt-pf-popup-opened"), this.popup_wrapper = jQuery('<div id="pf-popup-wrap"><button id="pf-popup-close"><i class="crt-icon crt-icon-close"></i></button><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div></div>'), certy.vars.body.append(this.popup_wrapper), this.popup_content = jQuery("#pf-popup-content"), this.popup_content.append(e.clone()), this.popupSlider = jQuery("#pf-popup-content .pf-popup-media"), this.popupSlider.on("init", function(e, t) {
            certy.portfolio.loadEmbed(0), jQuery(window).trigger("resize")
        }), this.popupSlider.on("beforeChange", function(e, t, o, r) {
            if (certy.portfolio.currentEmbed && certy.portfolio.currentEmbedType) switch (certy.portfolio.currentEmbedType) {
                case "iframe":
                    var i = certy.portfolio.currentEmbed.find("iframe");
                    i.attr("src", i.attr("src"));
                    break;
                case "video":
                    certy.portfolio.currentEmbed.find("video")[0].pause()
            }
            certy.portfolio.loadEmbed(r)
        }), this.popupSlider.slick({
            speed: 500,
            dots: !1,
            arrow: !0,
            infinite: !1,
            slidesToShow: 1,
            adaptiveHeight: !0
        }), this.popupCarousel = jQuery("#pf-popup-content .pf-rel-carousel"), this.popupCarousel.slick({
            dots: !1,
            infinite: !0,
            slidesToShow: 3,
            slidesToScroll: 3,
            lazyLoad: "ondemand"
        }), this.popup_wrapper.addClass("pf-opened"), certy.lockScroll()
    },
    closePopup: function(e) {
        certy.vars.html.removeClass("cr-portfolio-opened"), this.popup_wrapper.removeClass("pf-opened"), setTimeout(function() {
            certy.portfolio.popup_wrapper.remove(), certy.unlockScroll()
        }, 500)
    },
    loadEmbed: function(e) {
        var t = jQuery('#pf-popup-content .pf-popup-slide[data-slick-index="' + e + '"]').find(".pf-popup-embed"),
            o = jQuery.trim(t.data("type")),
            r = jQuery.trim(t.data("url"));
        if (certy.portfolio.currentEmbed = t, certy.portfolio.currentEmbedType = o, !t.hasClass("pf-embed-loaded") && void 0 !== o && !1 !== o && "" !== o && void 0 !== r && !1 !== r && "" !== r) {
            var i = jQuery.trim(t.data("width")),
                s = jQuery.trim(t.data("height"));
            switch (void 0 !== i && !1 !== i && "" !== i && void 0 !== s && !1 !== s && "" !== s && t.css({
                "padding-top": s / i * 100 + "%"
            }), o) {
                case "image":
                    t.addClass("pf-embed-image");
                    var a = jQuery("<img/>", {
                        src: r,
                        style: "display:none"
                    }).load(function() {
                        jQuery(this).fadeIn(500), t.addClass("pf-embed-loaded")
                    }).error(function() {
                        t.addClass("pf-embed-error")
                    });
                    t.empty().append(a);
                    break;
                case "iframe":
                    t.addClass("pf-embed-iframe");
                    var n = jQuery("<iframe/>", {
                        src: r,
                        style: "display:none",
                        allowfullscreen: ""
                    }).load(function() {
                        jQuery(this).fadeIn(500), t.addClass("pf-embed-loaded")
                    }).error(function() {
                        t.addClass("pf-embed-error")
                    });
                    t.empty().append(n);
                    break;
                case "video":
                    t.addClass("pf-embed-video");
                    var c = this.parseOptions(r),
                        l = "<video ";
                    c.poster && (l += 'poster="' + c.poster + '" '), l += 'controls="controls" preload="yes">', c.mp4 && (l += '<source type="video/mp4" src="' + c.mp4 + '"/>'), c.webm && (l += '<source type="video/webm" src="' + c.webm + '"/>'), c.ogv && (l += '<source type="video/ogg" src="' + c.ogv + '"/>'), l += "Your browser does not support the video tag.</video>", t.empty().append(jQuery(l))
            }
        }
    },
    parseOptions: function(e) {
        var t, o, r, i, s, a, n, c = {};
        for (s = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), n = 0, a = s.length; n < a && (o = s[n], -1 === o.search(/^(http|https|ftp):\/\//) && -1 !== o.search(":")); n++) t = o.indexOf(":"), r = o.substring(0, t), i = o.substring(t + 1), i || (i = void 0), "string" == typeof i && (i = "true" === i || "false" !== i && i), "string" == typeof i && (i = isNaN(i) ? i : +i), c[r] = i;
        return null == r && null == i ? e : c
    }
},
    function(e) {
        "use strict";
        e(function() {
            certy.initGlobalVars(), certy.vars.body.hasClass("crt-nav-on") && (Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && "auto" !== certy.nav.height && certy.nav.initScroll(e("#crt-nav-scroll")), certy.nav.makeSticky(), certy.nav.tooltip.active && e("#crt-nav a").hover(function() {
                certy.nav.tooltip.show(e(this))
            }, function() {
                certy.nav.tooltip.hide()
            }), e("#crt-nav").onePageNav({
                changeHash: !0,
                scrollThreshold: .5,
                filter: ":not(.external)"
            })), certy.sideBox.makeSticky();
            var t = e(".pf-grid");
            if (t.length > 0) {
                for (var o = 0; o < t.length; o++) certy.portfolio.initGrid(e(t[o]));
                e(document).on("click", ".pf-project", function() {
                    var t = e(this).attr("href");
                    return certy.portfolio.openPopup(e(t)), !1
                }), e(document).on("click", ".pf-rel-href", function() {
                    var t = e(this).attr("href");
                    if (-1 != t.indexOf("#")) return certy.portfolio.closePopup(), setTimeout(function() {
                        certy.portfolio.openPopup(e(t))
                    }, 500), !1
                }), e(document).on("click", "#pf-popup-close", function() {
                    certy.portfolio.closePopup()
                }), e(document).on("touchstart click", ".crt-pf-popup-opened #pf-popup-wrap", function(t) {
                    var o = e("#pf-popup-content");
                    o.is(t.target) || 0 !== o.has(t.target).length || certy.portfolio.closePopup()
                })
            }
            certy.slider(e(".cr-slider")), certy.carousel(e(".cr-carousel"));
            var r = e("#crt-btn-up");
            r.length > 0 && (e(window).scrollTop() > 100 ? r.show(0) : r.hide(0), e(window).scroll(function() {
                e(this).scrollTop() > 100 ? r.show(0) : r.hide(0)
            }), r.on("click", function() {
                return e("html, body").animate({
                    scrollTop: 0
                }, 800), !1
            }))
        }), e(window).on("resize", function() {
            certy.vars.windowW = e(window).width(), certy.vars.windowH = e(window).height(), certy.vars.windowScrollTop = e(window).scrollTop(), certy.nav.makeSticky(), certy.sideBox.makeSticky()
        }), e(window).on("scroll", function() {
            certy.vars.windowScrollTop = e(window).scrollTop(), certy.nav.makeSticky(), certy.sideBox.makeSticky(), certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.remove()
        }), e(window).on("load", function() {})
    }(jQuery);
var ace = {
    html: "",
    body: "",
    mobile: "",
    sidebar: {
        obj: "",
        btn: ""
    },
    nav: {
        obj: "",
        tooltip: jQuery('<div class="crt-tooltip"></div>')
    },
    overlay: {
        obj: jQuery('<div id="crt-overlay"></div>')
    },
    progress: {
        lines: "",
        charts: "",
        bullets: ""
    }
};
! function(e) {
    "use strict";
    e(function() {
        if (ace.html = e("html"), ace.body = e("body"), ace_detect_device_type(), e("#crt-main-nav-sm .menu-item-has-children > a").on("click touchstart", function() {
                return !!e(this).hasClass("hover") || (e(this).addClass("hover"), e(this).next().slideDown(500), !1)
            }), ace.sidebar.obj = e("#crt-sidebar"), ace.sidebar.btn = e("#crt-sidebar-btn"), ace.sidebar.btn.on("touchstart click", function() {
                ace_open_sidebar()
            }), e(document).on("touchstart click", ".crt-sidebar-opened #crt-overlay", function(e) {
                var t = ace.sidebar.obj;
                t.is(e.target) || 0 !== t.has(e.target).length || ace_close_sidebar()
            }), e("#crt-sidebar-close").on("click", function() {
                ace_close_sidebar()
            }), e("#crt-sidebar-inner").mCustomScrollbar({
                axis: "y",
                theme: "minimal-dark",
                autoHideScrollbar: !0,
                scrollButtons: {
                    enable: !0
                }
            }), !certy.progress.animation || ace.mobile) {
            ace.progress.charts = e(".progress-chart .progress-bar");
            for (var t = 0; t < ace.progress.charts.length; t++) {
                var o = e(ace.progress.charts[t]);
                ace_progress_chart(o[0], o.data("text"), o.data("value"), 1)
            }
            ace.progress.lines = e(".progress-line .progress-bar");
            for (var t = 0; t < ace.progress.lines.length; t++) {
                var r = e(ace.progress.lines[t]);
                ace_progress_line(r[0], r.data("text"), r.data("value"), 1)
            }
        }
        certy.progress.animation && !ace.mobile && ace_appear_elems(e(".crt-animate"), 0), e("pre").each(function(e, t) {
            hljs.highlightBlock(t)
        }), e(".alert .close").on("click", function() {
            var t = e(this).parent();
            t.fadeOut(500, function() {
                t.remove()
            })
        }), e(".slider").slick({
            dots: !0
        }), e("#map").length > 0 && initialiseGoogleMap(certy_vars_from_WP.mapStyles);
        var i = e(".tabs-menu>li.active");
        if (i.length > 0)
            for (var t = 0; t < i.length; t++) {
                var s = e(i[t]).children().attr("href");
                e(s).addClass("active").show()
            }
        e(".tabs-menu a").on("click", function(t) {
            var o = e(this),
                r = o.attr("href"),
                i = o.closest(".tabs"),
                s = i.find(".tab-content");
            o.parent().addClass("active"), o.parent().siblings().removeClass("active"), s.not(r).removeClass("active").hide(), e(r).addClass("active").fadeIn(500), t.preventDefault()
        });
        var a = e(".togglebox>li.active");
        a.length > 0 && a.find(".togglebox-content").show(), e(".togglebox-header").on("click", function() {
            var t = e(this);
            t.next(".togglebox-content").slideToggle(300), t.parent().toggleClass("active")
        });
        var n = e(".accordion>li.active");
        n.length > 0 && n.find(".accordion-content").show(), e(".accordion-header").on("click", function() {
            var t = e(this),
                o = t.parent(),
                r = t.next(),
                i = t.closest(".accordion").find(".accordion-content");
            o.hasClass("active") ? (o.removeClass("active"), r.slideUp()) : (o.siblings().removeClass("active"), o.addClass("active"), i.slideUp(300), r.slideDown(300))
        }), e(".comment-replys-link").on("click", function() {
            return e(this).closest(".comment").toggleClass("show-replies"), !1
        });
        var c = {};
        c.wrapper = null, c.content = null, c.slider = null, c.open = function(t) {
            this.wrapper = e('<div id="pf-popup-wrap" class="pf-popup-wrap"><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div>'), ace.body.append(this.wrapper), this.content = e("#pf-popup-content"), this.content.append(t.clone()), c.wrapper.addClass("opened"), ace_lock_scroll()
        }, c.close = function() {
            this.wrapper.removeClass("opened"), setTimeout(function() {
                c.wrapper.remove(), ace_unlock_scroll()
            }, 500)
        }, e(document).on("click", ".pf-btn-view", function() {
            var t = e(this).attr("href");
            return c.open(e(t)), ace.html.addClass("crt-portfolio-opened"), !1
        }), e(document).on("touchstart click", ".crt-portfolio-opened #pf-popup-wrap", function(t) {
            var o = e("#pf-popup-content");
            o.is(t.target) || 0 !== o.has(t.target).length || (c.close(), ace.html.removeClass("crt-portfolio-opened"))
        }), e(".toggle-link").on("click", function() {
            var t = e(this).attr("href");
            return e(this).hasClass("opened") ? (e(t).slideUp(500), e(this).removeClass("opened")) : (e(t).slideDown(500), e(this).addClass("opened")), !1
        }), e(".share-btn").on("mouseenter", function() {
            e(this).parent().addClass("hovered")
        }), e(".share-box").on("mouseleave", function() {
            var t = e(this);
            t.hasClass("hovered") && (t.addClass("closing"), setTimeout(function() {
                t.removeClass("hovered"), t.removeClass("closing")
            }, 300))
        })
    })
}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9mdW5jdGlvbnMuanMiLCJvcHRpb25zLmpzIiwib25lLXBhZ2UtbmF2LmpzIiwiX25hdi5qcyIsIl9zaWRlLWJveC5qcyIsIl9zbGlkZXIuanMiLCJfcG9ydGZvbGlvLmpzIiwibWFpbi5qcyIsInRoZW1lLmpzIl0sIm5hbWVzIjpbImFjZV9kZXRlY3RfZGV2aWNlX3R5cGUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWNlIiwibW9iaWxlIiwiaHRtbCIsImFkZENsYXNzIiwiYWNlX2FwcGVuZF9vdmVybGF5IiwiYm9keSIsImFwcGVuZCIsIm92ZXJsYXkiLCJvYmoiLCJzdHlsZSIsIm9wYWNpdHkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwiYWNlX3JlbW92ZV9vdmVybGF5IiwicmVtb3ZlIiwiYWNlX2xvY2tfc2Nyb2xsIiwiaW5pdFdpZHRoIiwib3V0ZXJXaWR0aCIsImluaXRIZWlnaHQiLCJvdXRlckhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwic2VsZiIsInBhZ2VYT2Zmc2V0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxMZWZ0IiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUb3AiLCJkYXRhIiwiY3NzIiwic2Nyb2xsVG8iLCJtYXJnaW5SIiwibWFyZ2luQiIsIm1hcmdpbi1yaWdodCIsIm1hcmdpbi1ib3R0b20iLCJhY2VfdW5sb2NrX3Njcm9sbCIsInJlbW92ZUNsYXNzIiwiYWNlX29wZW5fc2lkZWJhciIsImFjZV9jbG9zZV9zaWRlYmFyIiwiYWNlX3Byb2dyZXNzX2NoYXJ0IiwiZWxlbWVudCIsInRleHQiLCJ2YWx1ZSIsImR1cmF0aW9uIiwiUHJvZ3Jlc3NCYXIiLCJDaXJjbGUiLCJjb2xvciIsImNlcnR5IiwidmFycyIsInRoZW1lQ29sb3IiLCJzdHJva2VXaWR0aCIsInRyYWlsV2lkdGgiLCJjbGFzc05hbWUiLCJ0b3AiLCJsZWZ0IiwicHJvZ3Jlc3MiLCJ0ZXh0Q29sb3IiLCJwb3NpdGlvbiIsIm1hcmdpbiIsInBhZGRpbmciLCJ0cmFuc2Zvcm0iLCJwcmVmaXgiLCJhdXRvU3R5bGVDb250YWluZXIiLCJhbGlnblRvQm90dG9tIiwic3ZnU3R5bGUiLCJkaXNwbGF5Iiwid2lkdGgiLCJlYXNpbmciLCJhbmltYXRlIiwiYWNlX3Byb2dyZXNzX2xpbmUiLCJMaW5lIiwidHJhaWxDb2xvciIsImhlaWdodCIsInJpZ2h0IiwiYWNlX2lzX2VsZW1faW5fdmlld3BvcnQiLCJlbCIsInZwYXJ0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiYWNlX2lzX2VsZW1zX2luX3ZpZXdwb3J0IiwiZWxlbXMiLCJpIiwibGVuZ3RoIiwiaXRlbSIsImpRdWVyeSIsImhhc0NsYXNzIiwiY2hhcnQiLCJmaW5kIiwibGluZSIsImFjZV9hcHBlYXJfZWxlbXMiLCJzY3JvbGwiLCJyZXNpemUiLCJpbml0aWFsaXNlR29vZ2xlTWFwIiwibWFwU3R5bGVzIiwibGF0bG5nIiwibGF0IiwibG5nIiwibWFwIiwibWFwQ2FudmFzIiwiZ2V0IiwibWFwX3N0eWxlcyIsInBhcnNlSlNPTiIsImdvb2dsZSIsIm1hcHMiLCJMYXRMbmciLCJtYXBPcHRpb25zIiwiem9vbSIsImNlbnRlciIsInNjcm9sbHdoZWVsIiwibWFwVHlwZUlkIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsInN0eWxlcyIsIk1hcCIsIk1hcmtlciIsImljb24iLCJwYXRoIiwiZmlsbENvbG9yIiwiY2VydHlfdmFyc19mcm9tX1dQIiwiZmlsbE9wYWNpdHkiLCJzY2FsZSIsInN0cm9rZUNvbG9yIiwic3Ryb2tlV2VpZ2h0IiwiYW5jaG9yIiwiUG9pbnQiLCJ0aXRsZSIsImV2ZW50IiwiYWRkRG9tTGlzdGVuZXIiLCJzZXRDZW50ZXIiLCJuYXZTdGlreSIsImVuYWJsZV9zdGlja3kiLCJydGwiLCJzY3JlZW5NZCIsIm5hdiIsImFycm93Iiwic3RpY2t5IiwiYWN0aXZlIiwidG9vbHRpcCIsInNpZGVCb3giLCJhbmltYXRpb24iLCIkIiwidW5kZWZpbmVkIiwiT25lUGFnZU5hdiIsImVsZW0iLCJvcHRpb25zIiwidGhpcyIsIiRlbGVtIiwibWV0YWRhdGEiLCIkd2luIiwic2VjdGlvbnMiLCJkaWRTY3JvbGwiLCIkZG9jIiwiZG9jSGVpZ2h0IiwicHJvdG90eXBlIiwiZGVmYXVsdHMiLCJuYXZJdGVtcyIsImN1cnJlbnRDbGFzcyIsImNoYW5nZUhhc2giLCJmaWx0ZXIiLCJzY3JvbGxTcGVlZCIsInNjcm9sbFRocmVzaG9sZCIsImJlZ2luIiwiZW5kIiwic2Nyb2xsQ2hhbmdlIiwiaW5pdCIsImNvbmZpZyIsImV4dGVuZCIsIiRuYXYiLCJvbiIsInByb3h5IiwiaGFuZGxlQ2xpY2siLCJnZXRQb3NpdGlvbnMiLCJiaW5kSW50ZXJ2YWwiLCJhZGp1c3ROYXYiLCIkcGFyZW50IiwidCIsInNldEludGVydmFsIiwiZ2V0SGFzaCIsIiRsaW5rIiwiYXR0ciIsInNwbGl0IiwibGlua0hyZWYiLCJ0b3BQb3MiLCIkdGFyZ2V0IiwiZWFjaCIsIm9mZnNldCIsIk1hdGgiLCJyb3VuZCIsImdldFNlY3Rpb24iLCJ3aW5kb3dQb3MiLCJyZXR1cm5WYWx1ZSIsIndpbmRvd0hlaWdodCIsInNlY3Rpb24iLCJlIiwiY3VycmVudFRhcmdldCIsInBhcmVudCIsIm5ld0xvYyIsInVuYmluZEludGVydmFsIiwibG9jYXRpb24iLCJoYXNoIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3dUb3AiLCJ0YXJnZXQiLCJjYWxsYmFjayIsImNsb3Nlc3QiLCJjbGVhckludGVydmFsIiwidW5iaW5kIiwiZm4iLCJvbmVQYWdlTmF2IiwiaW5pdEdsb2JhbFZhcnMiLCJmb290ZXIiLCJ3aW5kb3dXIiwid2luZG93SCIsIndpbmRvd1Njcm9sbFRvcCIsImxvY2tTY3JvbGwiLCJ1bmxvY2tTY3JvbGwiLCJpbml0U2Nyb2xsIiwibUN1c3RvbVNjcm9sbGJhciIsImF4aXMiLCJzY3JvbGxiYXJQb3NpdGlvbiIsImV4aXN0cyIsIm1ha2VTdGlja3kiLCJNb2Rlcm5penIiLCJtcSIsIndyYXAiLCJ0aW1lciIsInNob3ciLCJjdXJyZW50Iiwic2V0VGltZW91dCIsImZhZGVJbiIsImhpZGUiLCJjbGVhclRpbWVvdXQiLCJmYWRlT3V0Iiwic2xpZGVyIiwic2xpY2siLCJjYXJvdXNlbCIsImRvdHMiLCJwb3J0Zm9saW8iLCJwb3B1cFNsaWRlciIsInBvcHVwQ2Fyb3VzZWwiLCJjdXJyZW50RW1iZWQiLCJjdXJyZW50RW1iZWRUeXBlIiwiaW5pdEdyaWQiLCJncmlkIiwiaXNvdG9wZSIsImlzT3JpZ2luTGVmdCIsIml0ZW1TZWxlY3RvciIsInBlcmNlbnRQb3NpdGlvbiIsIm1hc29ucnkiLCJjb2x1bW5XaWR0aCIsImltYWdlc0xvYWRlZCIsImZpbHRlcl9idG4iLCJmaWx0ZXJWYWx1ZSIsIm9wZW5Qb3B1cCIsInBvcHVwX3dyYXBwZXIiLCJwb3B1cF9jb250ZW50IiwiY2xvbmUiLCJsb2FkRW1iZWQiLCJ0cmlnZ2VyIiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaWZyYW1lIiwicGF1c2UiLCJzcGVlZCIsImluZmluaXRlIiwic2xpZGVzVG9TaG93IiwiYWRhcHRpdmVIZWlnaHQiLCJzbGlkZXNUb1Njcm9sbCIsImxhenlMb2FkIiwiY2xvc2VQb3B1cCIsInNsaWRlSW5kZXgiLCJ0cmltIiwiY3VyZW50RW1iZWRVcmwiLCJlbWJlZFciLCJlbWJlZEgiLCJwYWRkaW5nLXRvcCIsImltZyIsInNyYyIsImxvYWQiLCJlcnJvciIsImVtcHR5IiwiYWxsb3dmdWxsc2NyZWVuIiwidmlkZW9PcHRpb25zIiwicGFyc2VPcHRpb25zIiwidmlkZW8iLCJwb3N0ZXIiLCJtcDQiLCJ3ZWJtIiwib2d2Iiwic3RyIiwiZGVsaW1pdGVySW5kZXgiLCJvcHRpb24iLCJwcm9wIiwidmFsIiwiYXJyIiwibGVuIiwicmVwbGFjZSIsInNlYXJjaCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJpc05hTiIsImhvdmVyIiwicGZfZ3JpZCIsImlkIiwiaHJlZiIsImNvbnRhaW5lciIsImlzIiwiaGFzIiwiJGJ0blNjcm9sbFRvcCIsInNpZGViYXIiLCJidG4iLCJsaW5lcyIsImNoYXJ0cyIsImJ1bGxldHMiLCJuZXh0Iiwic2xpZGVEb3duIiwidGhlbWUiLCJhdXRvSGlkZVNjcm9sbGJhciIsInNjcm9sbEJ1dHRvbnMiLCJlbmFibGUiLCJibG9jayIsImhsanMiLCJoaWdobGlnaHRCbG9jayIsImFsZXJ0IiwidGFiQWN0aXZlIiwidGFiX2lkIiwiY2hpbGRyZW4iLCJ0YWIiLCJ0YWJfd3JhcCIsInRhYl9jb250ZW50Iiwic2libGluZ3MiLCJub3QiLCJ0b2dnbGVib3hBY3RpdmUiLCJ0b2dnbGVfaGVhZCIsInNsaWRlVG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJhY2NvcmRlb25BY3RpdmUiLCJhY2NfaGVhZCIsImFjY19zZWN0aW9uIiwiYWNjX2NvbnRlbnQiLCJhY2NfYWxsX2NvbnRlbnRzIiwic2xpZGVVcCIsInBmX3BvcHVwIiwid3JhcHBlciIsImNvbnRlbnQiLCJvcGVuIiwiY2xvc2UiLCJzaGFyZV9ib3giXSwibWFwcGluZ3MiOiJBQWtFQSxRQUFBQSwwQkFDQSxpRUFBQUMsS0FBQUMsVUFBQUMsWUFDQUMsSUFBQUMsUUFBQSxFQUNBRCxJQUFBRSxLQUFBQyxTQUFBLGdCQUVBSCxJQUFBQyxRQUFBLEVBQ0FELElBQUFFLEtBQUFDLFNBQUEsZ0JBS0EsUUFBQUMsc0JBQ0FKLElBQUFLLEtBQUFDLE9BQUFOLElBQUFPLFFBQUFDLEtBR0FSLElBQUFPLFFBQUFDLElBQUEsR0FBQUMsTUFBQUMsUUFBQSxFQUdBQyxPQUFBQyxpQkFBQVosSUFBQU8sUUFBQUMsSUFBQSxJQUFBRSxRQUdBVixJQUFBTyxRQUFBQyxJQUFBLEdBQUFDLE1BQUFDLFFBQUEsRUFHQSxRQUFBRyxzQkFFQWIsSUFBQU8sUUFBQUMsSUFBQSxHQUFBQyxNQUFBQyxRQUFBLEVBR0FWLElBQUFPLFFBQUFDLElBQUFNLFNBSUEsUUFBQUMsbUJBQ0Es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LEVBQUE1VCxZQUFBLFdBQ0E0VCxFQUFBNVQsWUFBQSxZQUNBLFdBS0FxRCIsImZpbGUiOiJ0aGVtZS5taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENlcnR5IEZ1bmN0aW9uc1xuICovXG5cbi8qIEluaXQgR2xvYmFsIFZhcmlhYmxlcyAqL1xuY2VydHkuaW5pdEdsb2JhbFZhcnMgPSBmdW5jdGlvbigpe1xuICAgIC8vIGdldCBkb2N1bWVudCA8aHRtbD5cbiAgICB0aGlzLnZhcnMuaHRtbCA9IGpRdWVyeSgnaHRtbCcpO1xuXG4gICAgLy8gZ2V0IGRvY3VtZW50IDxib2R5PlxuICAgIHRoaXMudmFycy5ib2R5ID0galF1ZXJ5KCdib2R5Jyk7XG5cbiAgICAvLyBnZXQgZG9jdW1lbnQgI2Zvb3RlclxuICAgIHRoaXMudmFycy5mb290ZXIgPSBqUXVlcnkoJyNjcnQtZm9vdGVyJyk7XG5cbiAgICAvLyBnZXQgd2luZG93IFdpZHRoXG4gICAgdGhpcy52YXJzLndpbmRvd1cgPSBqUXVlcnkod2luZG93KS53aWR0aCgpO1xuXG4gICAgLy8gZ2V0IHdpbmRvdyBoZWlnaHRcbiAgICB0aGlzLnZhcnMud2luZG93SCA9IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgLy8gZ2V0IHdpbmRvdyBzY3JvbGwgdG9wXG4gICAgdGhpcy52YXJzLndpbmRvd1Njcm9sbFRvcCA9IGpRdWVyeSh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gZGV0ZWN0IGRldmljZSB0eXBlXG4gICAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICB0aGlzLnZhcnMubW9iaWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YXJzLmh0bWwuYWRkQ2xhc3MoJ21vYmlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFycy5tb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YXJzLmh0bWwuYWRkQ2xhc3MoJ2Rlc2t0b3AnKTtcbiAgICB9XG59O1xuXG4vKiBMb2NrIFdpbmRvdyBTY3JvbGwgKi9cbmNlcnR5LmxvY2tTY3JvbGwgPSBmdW5jdGlvbigpe1xuICAgIHZhciBpbml0V2lkdGggPSBjZXJ0eS52YXJzLmh0bWwub3V0ZXJXaWR0aCgpO1xuICAgIHZhciBpbml0SGVpZ2h0ID0gY2VydHkudmFycy5ib2R5Lm91dGVySGVpZ2h0KCk7XG5cbiAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSBbXG4gICAgICAgIHNlbGYucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuICAgICAgICBzZWxmLnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3BcbiAgICBdO1xuXG4gICAgY2VydHkudmFycy5odG1sLmRhdGEoJ3Njcm9sbC1wb3NpdGlvbicsIHNjcm9sbFBvc2l0aW9uKTtcbiAgICBjZXJ0eS52YXJzLmh0bWwuZGF0YSgncHJldmlvdXMtb3ZlcmZsb3cnLCBjZXJ0eS52YXJzLmh0bWwuY3NzKCdvdmVyZmxvdycpKTtcbiAgICBjZXJ0eS52YXJzLmh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsUG9zaXRpb25bMF0sIHNjcm9sbFBvc2l0aW9uWzFdKTtcblxuICAgIHZhciBtYXJnaW5SID0gY2VydHkudmFycy5ib2R5Lm91dGVyV2lkdGgoKSAtIGluaXRXaWR0aDtcbiAgICB2YXIgbWFyZ2luQiA9IGNlcnR5LnZhcnMuYm9keS5vdXRlckhlaWdodCgpIC0gaW5pdEhlaWdodDtcbiAgICBjZXJ0eS52YXJzLmJvZHkuY3NzKHsnbWFyZ2luLXJpZ2h0JzogbWFyZ2luUiwgJ21hcmdpbi1ib3R0b20nOiBtYXJnaW5CfSk7XG4gICAgY2VydHkudmFycy5odG1sLmFkZENsYXNzKCdsb2NrLXNjcm9sbCcpO1xufTtcblxuLyogVW5sb2NrIFdpbmRvdyBTY3JvbGwgKi9cbmNlcnR5LnVubG9ja1Njcm9sbCA9IGZ1bmN0aW9uKCl7XG4gICAgY2VydHkudmFycy5odG1sLmNzcygnb3ZlcmZsb3cnLCBjZXJ0eS52YXJzLmh0bWwuZGF0YSgncHJldmlvdXMtb3ZlcmZsb3cnKSk7XG4gICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gY2VydHkudmFycy5odG1sLmRhdGEoJ3Njcm9sbC1wb3NpdGlvbicpO1xuICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblswXSwgc2Nyb2xsUG9zaXRpb25bMV0pO1xuXG4gICAgY2VydHkudmFycy5ib2R5LmNzcyh7J21hcmdpbi1yaWdodCc6IDAsICdtYXJnaW4tYm90dG9tJzogMH0pO1xuICAgIGNlcnR5LnZhcnMuaHRtbC5yZW1vdmVDbGFzcygnbG9jay1zY3JvbGwnKTtcbn07XG5cbi8qIERldGVjdCBEZXZpY2UgVHlwZSAqL1xuZnVuY3Rpb24gYWNlX2RldGVjdF9kZXZpY2VfdHlwZSgpIHtcbiAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIGFjZS5tb2JpbGUgPSB0cnVlO1xuICAgICAgICBhY2UuaHRtbC5hZGRDbGFzcygnY3J0LW1vYmlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFjZS5tb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgYWNlLmh0bWwuYWRkQ2xhc3MoJ2NydC1kZXNrdG9wJyk7XG4gICAgfVxufVxuXG4vKiBDZXJ0eSBPdmVybGF5ICovXG5mdW5jdGlvbiBhY2VfYXBwZW5kX292ZXJsYXkoKSB7XG4gICAgYWNlLmJvZHkuYXBwZW5kKGFjZS5vdmVybGF5Lm9iaik7XG5cbiAgICAvLyBNYWtlIHRoZSBlbGVtZW50IGZ1bGx5IHRyYW5zcGFyZW50XG4gICAgYWNlLm92ZXJsYXkub2JqWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBpbml0aWFsIHN0YXRlIGlzIGFwcGxpZWRcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhY2Uub3ZlcmxheS5vYmpbMF0pLm9wYWNpdHk7XG5cbiAgICAvLyBGYWRlIGl0IGluXG4gICAgYWNlLm92ZXJsYXkub2JqWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xufVxuXG5mdW5jdGlvbiBhY2VfcmVtb3ZlX292ZXJsYXkoKSB7XG4gICAgLy8gRmFkZSBpdCBvdXRcbiAgICBhY2Uub3ZlcmxheS5vYmpbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAvLyBSZW1vdmUgb3ZlcmxheVxuICAgIGFjZS5vdmVybGF5Lm9iai5yZW1vdmUoKTtcbn1cblxuLyogQ2VydHkgTG9jayBTY3JvbGwgKi9cbmZ1bmN0aW9uIGFjZV9sb2NrX3Njcm9sbCgpIHtcbiAgICB2YXIgaW5pdFdpZHRoID0gYWNlLmh0bWwub3V0ZXJXaWR0aCgpO1xuICAgIHZhciBpbml0SGVpZ2h0ID0gYWNlLmJvZHkub3V0ZXJIZWlnaHQoKTtcblxuICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IFtcbiAgICAgICAgc2VsZi5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQsXG4gICAgICAgIHNlbGYucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgIF07XG5cbiAgICBhY2UuaHRtbC5kYXRhKCdzY3JvbGwtcG9zaXRpb24nLCBzY3JvbGxQb3NpdGlvbik7XG4gICAgYWNlLmh0bWwuZGF0YSgncHJldmlvdXMtb3ZlcmZsb3cnLCBhY2UuaHRtbC5jc3MoJ292ZXJmbG93JykpO1xuICAgIGFjZS5odG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWzBdLCBzY3JvbGxQb3NpdGlvblsxXSk7XG5cbiAgICB2YXIgbWFyZ2luUiA9IGFjZS5ib2R5Lm91dGVyV2lkdGgoKSAtIGluaXRXaWR0aDtcbiAgICB2YXIgbWFyZ2luQiA9IGFjZS5ib2R5Lm91dGVySGVpZ2h0KCkgLSBpbml0SGVpZ2h0O1xuICAgIGFjZS5ib2R5LmNzcyh7J21hcmdpbi1yaWdodCc6IG1hcmdpblIsICdtYXJnaW4tYm90dG9tJzogbWFyZ2luQn0pO1xuICAgIGFjZS5odG1sLmFkZENsYXNzKCdjcnQtbG9jay1zY3JvbGwnKTtcbn1cblxuLyogQ2VydHkgVW5sb2NrIFNjcm9sbCAqL1xuZnVuY3Rpb24gYWNlX3VubG9ja19zY3JvbGwoKSB7XG4gICAgYWNlLmh0bWwuY3NzKCdvdmVyZmxvdycsIGFjZS5odG1sLmRhdGEoJ3ByZXZpb3VzLW92ZXJmbG93JykpO1xuICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IGFjZS5odG1sLmRhdGEoJ3Njcm9sbC1wb3NpdGlvbicpO1xuICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblswXSwgc2Nyb2xsUG9zaXRpb25bMV0pO1xuXG4gICAgYWNlLmJvZHkuY3NzKHsnbWFyZ2luLXJpZ2h0JzogMCwgJ21hcmdpbi1ib3R0b20nOiAwfSk7XG4gICAgYWNlLmh0bWwucmVtb3ZlQ2xhc3MoJ2NydC1sb2NrLXNjcm9sbCcpO1xufVxuXG4vKiBDZXJ0eSBDbG9zZSBTaWRlYmFyICovXG5mdW5jdGlvbiBhY2Vfb3Blbl9zaWRlYmFyKCkge1xuICAgIGFjZS5odG1sLmFkZENsYXNzKCdjcnQtc2lkZWJhci1vcGVuZWQnKTtcbiAgICBhY2VfYXBwZW5kX292ZXJsYXkoKTtcbiAgICBhY2VfbG9ja19zY3JvbGwoKTtcbn1cblxuZnVuY3Rpb24gYWNlX2Nsb3NlX3NpZGViYXIoKSB7XG4gICAgYWNlLmh0bWwucmVtb3ZlQ2xhc3MoJ2NydC1zaWRlYmFyLW9wZW5lZCcpO1xuICAgIGFjZV9yZW1vdmVfb3ZlcmxheSgpO1xuICAgIGFjZV91bmxvY2tfc2Nyb2xsKCk7XG59XG5cbi8qIENlcnR5IFByb2dyZXNzIENpcmNsZSAqL1xuZnVuY3Rpb24gYWNlX3Byb2dyZXNzX2NoYXJ0KGVsZW1lbnQsIHRleHQsIHZhbHVlLCBkdXJhdGlvbikge1xuICAgIC8vIFdlIGhhdmUgdW5kZWZpbmVkIHRleHQgd2hlbiB1c2VyIGRpZG50biBmaWxsIHRleHQgZmllbGQgZnJvbSBhZG1pblxuICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gXCJ1bmRlZmluZWRcIikgeyB0ZXh0ID0gXCJcIjsgfVxuXG4gICAgdmFyIGNpcmNsZSA9IG5ldyBQcm9ncmVzc0Jhci5DaXJjbGUoZWxlbWVudCwge1xuICAgICAgICBjb2xvcjogY2VydHkudmFycy50aGVtZUNvbG9yLFxuICAgICAgICBzdHJva2VXaWR0aDogNSxcbiAgICAgICAgdHJhaWxXaWR0aDogMCxcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdwcm9ncmVzcy10ZXh0JyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2VydHkucHJvZ3Jlc3MudGV4dENvbG9yLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybToge1xuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvU3R5bGVDb250YWluZXI6IHRydWUsXG4gICAgICAgICAgICBhbGlnblRvQm90dG9tOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHN2Z1N0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXQnXG4gICAgfSk7XG5cbiAgICBjaXJjbGUuYW5pbWF0ZSh2YWx1ZSk7IC8vIE51bWJlciBmcm9tIDAuMCB0byAxLjBcbn1cblxuLyogQ2VydHkgUHJvZ3Jlc3MgTGluZSAqL1xuZnVuY3Rpb24gYWNlX3Byb2dyZXNzX2xpbmUoZWxlbWVudCwgdGV4dCwgdmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgLy8gV2UgaGF2ZSB1bmRlZmluZWQgdGV4dCB3aGVuIHVzZXIgZGlkbnRuIGZpbGwgdGV4dCBmaWVsZCBmcm9tIGFkbWluXG4gICAgaWYgKHR5cGVvZiB0ZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7IHRleHQgPSBcIlwiOyB9XG4gICAgXG4gICAgdmFyIGxpbmUgPSBuZXcgUHJvZ3Jlc3NCYXIuTGluZShlbGVtZW50LCB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiA0LFxuICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXQnLFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGNvbG9yOiBjZXJ0eS52YXJzLnRoZW1lQ29sb3IsXG4gICAgICAgIHRyYWlsQ29sb3I6IGNlcnR5LnByb2dyZXNzLnRyYWlsQ29sb3IsXG4gICAgICAgIHRyYWlsV2lkdGg6IDQsXG4gICAgICAgIHN2Z1N0eWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdwcm9ncmVzcy10ZXh0JyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnLTI1cHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnMCcsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNlcnR5LnByb2dyZXNzLnRleHRDb2xvcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3RyYW5zbGF0ZSgwLCAwKSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b1N0eWxlQ29udGFpbmVyOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxpbmUuYW5pbWF0ZSh2YWx1ZSk7ICAvLyBOdW1iZXIgZnJvbSAwLjAgdG8gMS4wXG59XG5cbi8qIENlcnR5IEVsZW1lbnQgSW4gVmlld3BvcnQgKi9cbmZ1bmN0aW9uIGFjZV9pc19lbGVtX2luX3ZpZXdwb3J0KGVsLCB2cGFydCkge1xuICAgIHZhciByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgIHJlY3QuYm90dG9tID49IDAgJiZcbiAgICByZWN0LnJpZ2h0ID49IDAgJiZcbiAgICByZWN0LnRvcCArIHZwYXJ0IDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LmxlZnQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhY2VfaXNfZWxlbXNfaW5fdmlld3BvcnQoZWxlbXMsIHZwYXJ0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGpRdWVyeShlbGVtc1tpXSk7XG5cbiAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2NydC1hbmltYXRlJykgJiYgYWNlX2lzX2VsZW1faW5fdmlld3BvcnQoaXRlbSwgdnBhcnQpKSB7XG4gICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdjcnQtYW5pbWF0ZScpLmFkZENsYXNzKCdjcnQtYW5pbWF0ZWQnKTtcblxuICAgICAgICAgICAgLy8gQW5pbWF0ZSBDaXJjbGUgQ2hhcnRcbiAgICAgICAgICAgIGlmKGl0ZW0uaGFzQ2xhc3MoJ3Byb2dyZXNzLWNoYXJ0Jykpe1xuICAgICAgICAgICAgICAgIHZhciBjaGFydCA9IGl0ZW0uZmluZCgnLnByb2dyZXNzLWJhcicpO1xuICAgICAgICAgICAgICAgIGFjZV9wcm9ncmVzc19jaGFydChjaGFydFswXSwgY2hhcnQuZGF0YSgndGV4dCcpLCBjaGFydC5kYXRhKCd2YWx1ZScpLCAxMDAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQW5pbWF0ZSBMaW5lIENoYXJ0XG4gICAgICAgICAgICBpZihpdGVtLmhhc0NsYXNzKCdwcm9ncmVzcy1saW5lJykpe1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gaXRlbS5maW5kKCcucHJvZ3Jlc3MtYmFyJyk7XG4gICAgICAgICAgICAgICAgYWNlX3Byb2dyZXNzX2xpbmUobGluZVswXSwgbGluZS5kYXRhKCd0ZXh0JyksIGxpbmUuZGF0YSgndmFsdWUnKSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFjZV9hcHBlYXJfZWxlbXMoZWxlbXMsIHZwYXJ0KSB7XG4gICAgYWNlX2lzX2VsZW1zX2luX3ZpZXdwb3J0KGVsZW1zLCB2cGFydCk7XG5cbiAgICBqUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBhY2VfaXNfZWxlbXNfaW5fdmlld3BvcnQoZWxlbXMsIHZwYXJ0KTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFjZV9pc19lbGVtc19pbl92aWV3cG9ydChlbGVtcywgdnBhcnQpO1xuICAgIH0pO1xufVxuXG4vKiBDZXJ0eSBHb29nbGUgTWFwICovXG5mdW5jdGlvbiBpbml0aWFsaXNlR29vZ2xlTWFwKG1hcFN0eWxlcykge1xuICAgIHZhciBsYXRsbmc7XG4gICAgdmFyIGxhdCA9IDQ0LjU0MDM7XG4gICAgdmFyIGxuZyA9IC03OC41NDYzO1xuICAgIHZhciBtYXAgPSBqUXVlcnkoJyNtYXAnKTtcbiAgICB2YXIgbWFwQ2FudmFzID0gbWFwLmdldCgwKTtcbiAgICB2YXIgbWFwX3N0eWxlcyA9IGpRdWVyeS5wYXJzZUpTT04obWFwU3R5bGVzKTtcblxuICAgIGlmIChtYXAuZGF0YShcImxhdGl0dWRlXCIpKSBsYXQgPSBtYXAuZGF0YShcImxhdGl0dWRlXCIpO1xuICAgIGlmIChtYXAuZGF0YShcImxvbmdpdHVkZVwiKSkgbG5nID0gbWFwLmRhdGEoXCJsb25naXR1ZGVcIik7XG5cbiAgICBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcblxuICAgIC8vIE1hcCBPcHRpb25zXG4gICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAgIHpvb206IDE0LFxuICAgICAgICBjZW50ZXI6IGxhdGxuZyxcbiAgICAgICAgc2Nyb2xsd2hlZWw6IHRydWUsXG4gICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICAgIHN0eWxlczogbWFwX3N0eWxlc1xuICAgIH07XG5cbiAgICAvLyBDcmVhdGUgdGhlIE1hcFxuICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwQ2FudmFzLCBtYXBPcHRpb25zKTtcblxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIHBvc2l0aW9uOiBsYXRsbmcsXG4gICAgICAgIGljb246IHtcbiAgICAgICAgICAgIHBhdGg6ICdNMTI1IDQxMCBjLTU2IC03MiAtMTExIC0xNzYgLTEyMCAtMjI0IC03IC0zNiAxMSAtODMgNDkgLTEyNCA3NiAtODUgMjIzIC02NyAyNzAgMzEgMjggNjAgMjkgODggNiAxNTAgLTE5IDUxIC0xMjIgMjA1IC0xNDggMjIxIC02IDMgLTMyIC0yMSAtNTcgLTU0eiBtMTEwIC0xNzUgYzM1IC0zNCAzMyAtNzggLTQgLTExNiAtMzUgLTM1IC03MSAtMzcgLTEwNSAtNyAtNDAgMzUgLTQzIDc4IC0xMSAxMTYgMzQgNDEgODQgNDQgMTIwIDd6JyxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogY2VydHlfdmFyc19mcm9tX1dQLnRoZW1lQ29sb3IsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgICAgIHNjYWxlOiAwLjEsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogY2VydHlfdmFyc19mcm9tX1dQLnRoZW1lQ29sb3IsXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDEsXG4gICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgxODUsIDUwMClcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6ICdIZWxsbyBXb3JsZCEnXG4gICAgfSk7XG5cbiAgICAvKnZhciBtYXJrZXIgPSBuZXcgTWFya2VyKHtcbiAgICAgbWFwOiBtYXAsXG4gICAgIHBvc2l0aW9uOiBsYXRsbmcsXG4gICAgIGljb246IHtcbiAgICAgcGF0aDogU1FVQVJFX1BJTixcbiAgICAgZmlsbENvbG9yOiAnJyxcbiAgICAgZmlsbE9wYWNpdHk6IDAsXG4gICAgIHN0cm9rZUNvbG9yOiAnJyxcbiAgICAgc3Ryb2tlV2VpZ2h0OiAwXG4gICAgIH0sXG4gICAgIG1hcF9pY29uX2xhYmVsOiAnPHNwYW4gY2xhc3M9XCJtYXAtaWNvbiBtYXAtaWNvbi1wb3N0YWwtY29kZVwiPjwvc3Bhbj4nXG4gICAgIH0pOyovXG5cbiAgICAvLyBLZWVwIE1hcmtlciBpbiBDZW50ZXJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcC5zZXRDZW50ZXIobGF0bG5nKTtcbiAgICB9KTtcbn0iLCIvKipcbiAqIENlcnR5IE9wdGlvbnNcbiAqL1xuXG52YXIgbmF2U3Rpa3kgPSBmYWxzZTtcbmlmKGNlcnR5X3ZhcnNfZnJvbV9XUC5lbmFibGVfc3RpY2t5ID09IDEpIHsgbmF2U3Rpa3kgPSB0cnVlOyB9XG5cblxudmFyIGNlcnR5ID0ge1xuICAgIHZhcnM6IHtcbiAgICAgICAgLy8gU2V0IHRoZW1lIHJ0bCBtb2RlXG4gICAgICAgIHJ0bDogZmFsc2UsXG5cbiAgICAgICAgLy8gU2V0IHRoZW1lIHByaW1hcnkgY29sb3JcbiAgICAgICAgdGhlbWVDb2xvcjogY2VydHlfdmFyc19mcm9tX1dQLnRoZW1lQ29sb3IsXG5cbiAgICAgICAgLy8gU2V0IG1pZGRsZSBzY3JlZW4gc2l6ZSwgbXVzdCBoYXZlIHRoZSBzYW1lIHZhbHVlIGFzIGluIHRoZSBfdmFyaWFibGVzLnNjc3NcbiAgICAgICAgc2NyZWVuTWQ6ICc5OTJweCdcbiAgICB9LFxuXG4gICAgbmF2OiB7XG4gICAgICAgIGhlaWdodDogJ2F1dG8nLCAvLyB1c2UgJ2F1dG8nIG9yIHNvbWUgZml4ZWQgdmFsdWUsIGZvciBleGFtcGxlIDQ4MHB4XG4gICAgICAgIGFycm93OiBmYWxzZSwgLy8gYWN0aXZhdGUgYXJyb3cgdG8gc2Nyb2xsIGRvd24gbWVudSBpdGVtcyxcbiAgICAgICAgc3RpY2t5OiB7XG4gICAgICAgICAgICB0b3A6IFwiLTFweFwiLCAvLyBzdGlja3kgcG9zaXRpb24gZnJvbSB0b3BcbiAgICAgICAgICAgIGFjdGl2ZTogbmF2U3Rpa3kgLy8gYWN0aXZhdGUgc3RpY2t5IHByb3BlcnR5IG9uIHdpbmRvdyBzY3JvbGxcbiAgICAgICAgfSxcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2lkZUJveDoge1xuICAgICAgICBzdGlja3k6IHtcbiAgICAgICAgICAgIHRvcDogXCIyMHB4XCIsIC8vIHN0aWNreSBwb3NpdGlvbiBmcm9tIHRvcFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSAvLyBhY3RpdmF0ZSBzdGlja3kgcHJvcGVydHkgb24gd2luZG93IHNjcm9sbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHByb2dyZXNzOiB7XG4gICAgICAgIGFuaW1hdGlvbjogdHJ1ZSwgLy8gYW5pbWF0ZSBvbiB3aW5kb3cgc2Nyb2xsXG4gICAgICAgIHRleHRDb2xvcjogJ2luaGVyaXQnLCAvLyBzZXQgdGV4dCBjb2xvclxuICAgICAgICB0cmFpbENvbG9yOiAncmdiYSgwLDAsMCwwLjA3KScgLy8gc2V0IHRyYWlsIGNvbG9yXG4gICAgfVxufTsiLCIvKlxuICogalF1ZXJ5IE9uZSBQYWdlIE5hdiBQbHVnaW5cbiAqIGh0dHA6Ly9naXRodWIuY29tL2RhdmlzdDExL2pRdWVyeS1PbmUtUGFnZS1OYXZcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAgVHJldm9yIERhdmlzIChodHRwOi8vdHJldm9yZGF2aXMubmV0KVxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXMuXG4gKiBVc2VzIHRoZSBzYW1lIGxpY2Vuc2UgYXMgalF1ZXJ5LCBzZWU6XG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogQHZlcnNpb24gMy4wLjBcbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICogJCgnI25hdicpLm9uZVBhZ2VOYXYoe1xuICogICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50JyxcbiAqICAgY2hhbmdlSGFzaDogZmFsc2UsXG4gKiAgIHNjcm9sbFNwZWVkOiA3NTBcbiAqIH0pO1xuICovXG5cbjsoZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKXtcblxuICAgIC8vIG91ciBwbHVnaW4gY29uc3RydWN0b3JcbiAgICB2YXIgT25lUGFnZU5hdiA9IGZ1bmN0aW9uKGVsZW0sIG9wdGlvbnMpe1xuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IHRoaXMuJGVsZW0uZGF0YSgncGx1Z2luLW9wdGlvbnMnKTtcbiAgICAgICAgdGhpcy4kd2luID0gJCh3aW5kb3cpO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0ge307XG4gICAgICAgIHRoaXMuZGlkU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGRvYyA9ICQoZG9jdW1lbnQpO1xuICAgICAgICB0aGlzLmRvY0hlaWdodCA9IHRoaXMuJGRvYy5oZWlnaHQoKTtcbiAgICB9O1xuXG4gICAgLy8gdGhlIHBsdWdpbiBwcm90b3R5cGVcbiAgICBPbmVQYWdlTmF2LnByb3RvdHlwZSA9IHtcbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIG5hdkl0ZW1zOiAnYScsXG4gICAgICAgICAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50JyxcbiAgICAgICAgICAgIGNoYW5nZUhhc2g6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nOiAnc3dpbmcnLFxuICAgICAgICAgICAgZmlsdGVyOiAnJyxcbiAgICAgICAgICAgIHNjcm9sbFNwZWVkOiA3NTAsXG4gICAgICAgICAgICBzY3JvbGxUaHJlc2hvbGQ6IDAuNSxcbiAgICAgICAgICAgIGJlZ2luOiBmYWxzZSxcbiAgICAgICAgICAgIGVuZDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBJbnRyb2R1Y2UgZGVmYXVsdHMgdGhhdCBjYW4gYmUgZXh0ZW5kZWQgZWl0aGVyXG4gICAgICAgICAgICAvLyBnbG9iYWxseSBvciB1c2luZyBhbiBvYmplY3QgbGl0ZXJhbC5cbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0gJC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdHMsIHRoaXMub3B0aW9ucywgdGhpcy5tZXRhZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuJG5hdiA9IHRoaXMuJGVsZW0uZmluZCh0aGlzLmNvbmZpZy5uYXZJdGVtcyk7XG5cbiAgICAgICAgICAgIC8vRmlsdGVyIGFueSBsaW5rcyBvdXQgb2YgdGhlIG5hdlxuICAgICAgICAgICAgaWYodGhpcy5jb25maWcuZmlsdGVyICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hdiA9IHRoaXMuJG5hdi5maWx0ZXIodGhpcy5jb25maWcuZmlsdGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9IYW5kbGUgY2xpY2tzIG9uIHRoZSBuYXZcbiAgICAgICAgICAgIHRoaXMuJG5hdi5vbignY2xpY2sub25lUGFnZU5hdicsICQucHJveHkodGhpcy5oYW5kbGVDbGljaywgdGhpcykpO1xuXG4gICAgICAgICAgICAvL0dldCB0aGUgc2VjdGlvbiBwb3NpdGlvbnNcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9zaXRpb25zKCk7XG5cbiAgICAgICAgICAgIC8vSGFuZGxlIHNjcm9sbCBjaGFuZ2VzXG4gICAgICAgICAgICB0aGlzLmJpbmRJbnRlcnZhbCgpO1xuXG4gICAgICAgICAgICAvL1VwZGF0ZSB0aGUgcG9zaXRpb25zIG9uIHJlc2l6ZSB0b29cbiAgICAgICAgICAgIHRoaXMuJHdpbi5vbigncmVzaXplLm9uZVBhZ2VOYXYnLCAkLnByb3h5KHRoaXMuZ2V0UG9zaXRpb25zLCB0aGlzKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdE5hdjogZnVuY3Rpb24oc2VsZiwgJHBhcmVudCkge1xuICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCcuJyArIHNlbGYuY29uZmlnLmN1cnJlbnRDbGFzcykucmVtb3ZlQ2xhc3Moc2VsZi5jb25maWcuY3VycmVudENsYXNzKTtcbiAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3Moc2VsZi5jb25maWcuY3VycmVudENsYXNzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kSW50ZXJ2YWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGRvY0hlaWdodDtcblxuICAgICAgICAgICAgc2VsZi4kd2luLm9uKCdzY3JvbGwub25lUGFnZU5hdicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlkU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLnQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb2NIZWlnaHQgPSBzZWxmLiRkb2MuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvL0lmIGl0IHdhcyBzY3JvbGxlZFxuICAgICAgICAgICAgICAgIGlmKHNlbGYuZGlkU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlkU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgZG9jdW1lbnQgaGVpZ2h0IGNoYW5nZXNcbiAgICAgICAgICAgICAgICBpZihkb2NIZWlnaHQgIT09IHNlbGYuZG9jSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9jSGVpZ2h0ID0gZG9jSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFBvc2l0aW9ucygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDI1MCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SGFzaDogZnVuY3Rpb24oJGxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiAkbGluay5hdHRyKCdocmVmJykuc3BsaXQoJyMnKVsxXTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQb3NpdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGxpbmtIcmVmO1xuICAgICAgICAgICAgdmFyIHRvcFBvcztcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0O1xuXG4gICAgICAgICAgICBzZWxmLiRuYXYuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsaW5rSHJlZiA9IHNlbGYuZ2V0SGFzaCgkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCgnIycgKyBsaW5rSHJlZik7XG5cbiAgICAgICAgICAgICAgICBpZigkdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b3BQb3MgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWN0aW9uc1tsaW5rSHJlZl0gPSBNYXRoLnJvdW5kKHRvcFBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VjdGlvbjogZnVuY3Rpb24od2luZG93UG9zKSB7XG4gICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9IE1hdGgucm91bmQodGhpcy4kd2luLmhlaWdodCgpICogdGhpcy5jb25maWcuc2Nyb2xsVGhyZXNob2xkKTtcblxuICAgICAgICAgICAgZm9yKHZhciBzZWN0aW9uIGluIHRoaXMuc2VjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZigodGhpcy5zZWN0aW9uc1tzZWN0aW9uXSAtIHdpbmRvd0hlaWdodCkgPCB3aW5kb3dQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBzZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgJGxpbmsgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICB2YXIgJHBhcmVudCA9ICRsaW5rLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIG5ld0xvYyA9ICcjJyArIHNlbGYuZ2V0SGFzaCgkbGluayk7XG5cbiAgICAgICAgICAgIGlmKCEkcGFyZW50Lmhhc0NsYXNzKHNlbGYuY29uZmlnLmN1cnJlbnRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAvL1N0YXJ0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jb25maWcuYmVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcuYmVnaW4oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL0NoYW5nZSB0aGUgaGlnaGxpZ2h0ZWQgbmF2IGl0ZW1cbiAgICAgICAgICAgICAgICBzZWxmLmFkanVzdE5hdihzZWxmLCAkcGFyZW50KTtcblxuICAgICAgICAgICAgICAgIC8vUmVtb3ZpbmcgdGhlIGF1dG8tYWRqdXN0IG9uIHNjcm9sbFxuICAgICAgICAgICAgICAgIHNlbGYudW5iaW5kSW50ZXJ2YWwoKTtcblxuICAgICAgICAgICAgICAgIC8vU2Nyb2xsIHRvIHRoZSBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxUbyhuZXdMb2MsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL0RvIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoYXNoP1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5jaGFuZ2VIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld0xvYztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vQWRkIHRoZSBhdXRvLWFkanVzdCBvbiBzY3JvbGwgYmFjayBpblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJpbmRJbnRlcnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vRW5kIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNjcm9sbENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93VG9wID0gdGhpcy4kd2luLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRTZWN0aW9uKHdpbmRvd1RvcCk7XG4gICAgICAgICAgICB2YXIgJHBhcmVudDtcblxuICAgICAgICAgICAgLy9JZiB0aGUgcG9zaXRpb24gaXMgc2V0XG4gICAgICAgICAgICBpZihwb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRwYXJlbnQgPSB0aGlzLiRlbGVtLmZpbmQoJ2FbaHJlZiQ9XCIjJyArIHBvc2l0aW9uICsgJ1wiXScpLnBhcmVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy9JZiBpdCdzIG5vdCBhbHJlYWR5IHRoZSBjdXJyZW50IHNlY3Rpb25cbiAgICAgICAgICAgICAgICBpZighJHBhcmVudC5oYXNDbGFzcyh0aGlzLmNvbmZpZy5jdXJyZW50Q2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSBoaWdobGlnaHRlZCBuYXYgaXRlbVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkanVzdE5hdih0aGlzLCAkcGFyZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGEgc2Nyb2xsQ2hhbmdlIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnNjcm9sbENoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc2Nyb2xsQ2hhbmdlKCRwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNjcm9sbFRvOiBmdW5jdGlvbih0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJCh0YXJnZXQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIGlmKCAkKHRhcmdldCkuY2xvc2VzdCgnLmNydC1wYXBlci1sYXllcnMnKS5oYXNDbGFzcygnY3J0LWFuaW1hdGUnKSApe1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldCAtIDE0NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0IC0gNDU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldFxuICAgICAgICAgICAgfSwgdGhpcy5jb25maWcuc2Nyb2xsU3BlZWQsIHRoaXMuY29uZmlnLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuYmluZEludGVydmFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50KTtcbiAgICAgICAgICAgIHRoaXMuJHdpbi51bmJpbmQoJ3Njcm9sbC5vbmVQYWdlTmF2Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgT25lUGFnZU5hdi5kZWZhdWx0cyA9IE9uZVBhZ2VOYXYucHJvdG90eXBlLmRlZmF1bHRzO1xuXG4gICAgJC5mbi5vbmVQYWdlTmF2ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV3IE9uZVBhZ2VOYXYodGhpcywgb3B0aW9ucykuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3cgLCBkb2N1bWVudCApOyIsIi8qKlxuICogQ2VydHkgTmF2aWdhdGlvblxuICovXG5cbi8vIE5hdmlnYXRpb24gV2l0aCBTY3JvbGwgYW5kIEFycm93XG5jZXJ0eS5uYXYuaW5pdFNjcm9sbCA9IGZ1bmN0aW9uKCBlbCApe1xuICAgIC8vIFNldCBOYXYgSGVpZ2h0XG4gICAgLy8gY2VydHkubmF2LnNjcm9sbCA9IGVsO1xuXG4gICAgZWwuaGVpZ2h0KGVsLmhlaWdodCgpKS5hbmltYXRlKHtoZWlnaHQ6IGNlcnR5Lm5hdi5oZWlnaHR9LCA3MDAsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgLy8gTW91c2UgU2Nyb2xsXG4gICAgICAgIGVsLm1DdXN0b21TY3JvbGxiYXIoe1xuICAgICAgICAgICAgYXhpczogXCJ5XCIsXG4gICAgICAgICAgICBzY3JvbGxiYXJQb3NpdGlvbjogXCJvdXRzaWRlXCJcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBBcnJvdyBTY3JvbGxcbiAgICBpZiAoY2VydHkubmF2LmFycm93KXtcbiAgICAgICAgalF1ZXJ5KFwiI2NydC1uYXYtdG9vbHNcIikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIGpRdWVyeShcIiNjcnQtbmF2LWFycm93XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWwubUN1c3RvbVNjcm9sbGJhcignc2Nyb2xsVG8nLCAnLT0nK2NlcnR5Lm5hdi5oZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vLyBTdGlja3kgTmF2aWdhdGlvblxuY2VydHkubmF2LmV4aXN0cyA9IGZhbHNlO1xuY2VydHkubmF2Lm1ha2VTdGlja3kgPSBmdW5jdGlvbigpe1xuXG4gICAgLy8gY2hlY2sgc3RpY2t5IG9wdGlvbiwgZGV2aWNlIHR5cGUgYW5kIHNjcmVlbiBzaXplXG4gICAgaWYgKCB0aGlzLnN0aWNreS5hY3RpdmUgJiYgIWNlcnR5LnZhcnMubW9iaWxlICYmIE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogJyArIGNlcnR5LnZhcnMuc2NyZWVuTWQgKyAnKScpICkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIG5hdiBub2RlcyBleGlzdHNcbiAgICAgICAgaWYgKCB0aGlzLmV4aXN0cyApe1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3aW5kb3cgc2Nyb2xsIHBhc3MgZWxlbWVudFxuICAgICAgICAgICAgaWYgKCBjZXJ0eS52YXJzLndpbmRvd1Njcm9sbFRvcCA+IHRoaXMud3JhcC5vZmZzZXQoKS50b3AgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAndG9wJzogdGhpcy5zdGlja3kudG9wLFxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHRoaXMud3JhcC5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiB0aGlzLndyYXAud2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvdHRvbSc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdib3R0b20nOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwgPSBqUXVlcnkoJyNjcnQtbmF2LWlubmVyJyk7XG4gICAgICAgICAgICB0aGlzLndyYXAgPSBqUXVlcnkoJyNjcnQtbmF2LXdyYXAnKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmVsLmxlbmd0aCA+IDAgJiYgdGhpcy53cmFwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gTmF2aWdhdGlvbiBUb29sdGlwc1xuY2VydHkubmF2LnRvb2x0aXAuZWwgPSAnJztcbmNlcnR5Lm5hdi50b29sdGlwLnRpbWVyID0gMDtcblxuY2VydHkubmF2LnRvb2x0aXAuc2hvdyA9IGZ1bmN0aW9uKGN1cnJlbnQpe1xuICAgIGNlcnR5Lm5hdi50b29sdGlwLnRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJjcnQtdG9vbHRpcFwiPjwvZGl2PicpO1xuXG4gICAgICAgIC8vIEluaXQgdmFyc1xuICAgICAgICB2YXIgdG9wID0gY3VycmVudC5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciBsZWZ0ID0gY3VycmVudC5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgcmlnaHQgPSBsZWZ0ICsgY3VycmVudC5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciB3aWR0aCA9IGN1cnJlbnQub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gNDtcblxuICAgICAgICAvLyBBcHBlbmQgdG9vbHRpcFxuICAgICAgICBjZXJ0eS52YXJzLmJvZHkuYXBwZW5kKCBjZXJ0eS5uYXYudG9vbHRpcC5lbCApO1xuXG4gICAgICAgIC8vIFNldCB0b29sdGlwIHRleHRcbiAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwudGV4dCggY3VycmVudC5kYXRhKCd0b29sdGlwJykgKTtcblxuICAgICAgICAvLyBQb3NpdGlvbmluZyB0b29sdGlwXG4gICAgICAgIGlmIChyaWdodCArIGNlcnR5Lm5hdi50b29sdGlwLmVsLm91dGVyV2lkdGgoKSA8IGNlcnR5LnZhcnMud2luZG93Vykge1xuICAgICAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwuYWRkQ2xhc3MoJ2Fycm93LWxlZnQnKS5jc3Moe1wibGVmdFwiOiByaWdodCArIFwicHhcIiwgXCJ0b3BcIjogKHRvcCArIGhlaWdodCkgKyBcInB4XCJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlcnR5Lm5hdi50b29sdGlwLmVsLmFkZENsYXNzKCdhcnJvdy1yaWdodCB0ZXh0LXJpZ2h0JykuY3NzKHtcbiAgICAgICAgICAgICAgICBcImxlZnRcIjogKGxlZnQgLSBjZXJ0eS5uYXYudG9vbHRpcC5lbC5vdXRlcldpZHRoKCkgLSAxMCkgKyBcInB4XCIsXG4gICAgICAgICAgICAgICAgXCJ0b3BcIjogKHRvcCArIGhlaWdodCkgKyBcInB4XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2hvdyBUb29sdGlwXG4gICAgICAgIGNlcnR5Lm5hdi50b29sdGlwLmVsLmZhZGVJbigxNTApO1xuXG4gICAgfSwgMTUwKTtcbn07XG5cbmNlcnR5Lm5hdi50b29sdGlwLmhpZGUgPSBmdW5jdGlvbigpe1xuICAgIGNsZWFyVGltZW91dChjZXJ0eS5uYXYudG9vbHRpcC50aW1lcik7XG4gICAgaWYgKGNlcnR5Lm5hdi50b29sdGlwLmVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwuZmFkZU91dCgxNTAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNlcnR5Lm5hdi50b29sdGlwLmVsLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59OyIsIi8qKlxuICogQ2VydHkgU2lkZSBCb3hcbiAqL1xuY2VydHkuc2lkZUJveC5leGlzdHMgPSBmYWxzZTtcbmNlcnR5LnNpZGVCb3gubWFrZVN0aWNreSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAvLyBjaGVjayBzdGlja3kgb3B0aW9uLCBkZXZpY2UgdHlwZSBhbmQgc2NyZWVuIHNpemVcbiAgICBpZiAoIHRoaXMuc3RpY2t5LmFjdGl2ZSAmJiAhY2VydHkudmFycy5tb2JpbGUgJiYgTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOiAnICsgY2VydHkudmFycy5zY3JlZW5NZCArICcpJykgKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbmF2IG5vZGVzIGV4aXN0c1xuICAgICAgICBpZiAoIHRoaXMuZXhpc3RzICl7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdpbmRvdyBzY3JvbGwgcGFzcyBlbGVtZW50XG4gICAgICAgICAgICBpZiAoIGNlcnR5LnZhcnMud2luZG93U2Nyb2xsVG9wID4gdGhpcy53cmFwLm9mZnNldCgpLnRvcCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiB0aGlzLnN0aWNreS50b3AsXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogdGhpcy53cmFwLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IHRoaXMud3JhcC53aWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICAnYm90dG9tJzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnZml4ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvdHRvbSc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbCA9IGpRdWVyeSgnI2NydC1zaWRlLWJveCcpO1xuICAgICAgICAgICAgdGhpcy53cmFwID0galF1ZXJ5KCcjY3J0LXNpZGUtYm94LXdyYXAnKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmVsLmxlbmd0aCA+IDAgJiYgdGhpcy53cmFwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTsiLCIvKipcbiAqIENlcnR5IFNsaWRlclxuICovXG5cbi8vIFNsaWRlclxuY2VydHkuc2xpZGVyID0gZnVuY3Rpb24oc2xpZGVyKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgaWYoIGpRdWVyeShzbGlkZXJbaV0pLmRhdGEoXCJpbml0XCIpICE9IFwibm9uZVwiICl7XG4gICAgICAgICAgIGpRdWVyeShzbGlkZXJbaV0pLnNsaWNrKCk7XG4gICAgICAgfVxuICAgIH1cbn07XG5cbi8vIENhcm91c2VsXG5jZXJ0eS5jYXJvdXNlbCA9IGZ1bmN0aW9uKGNhcm91c2VsKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcm91c2VsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKCBqUXVlcnkoY2Fyb3VzZWxbaV0pLmRhdGEoXCJpbml0XCIpICE9PSBcIm5vbmVcIiApe1xuICAgICAgICAgICAgalF1ZXJ5KGNhcm91c2VsW2ldKS5zbGljayh7XG4gICAgICAgICAgICAgICAgXCJkb3RzXCIgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsIi8qKlxuICogQ2VydHkgUG9ydGZvbGlvXG4gKi9cblxuY2VydHkucG9ydGZvbGlvID0ge1xuICAgIHBvcHVwU2xpZGVyOiAnJyxcbiAgICBwb3B1cENhcm91c2VsOiAnJyxcbiAgICBjdXJyZW50RW1iZWQ6IGZhbHNlLFxuICAgIGN1cnJlbnRFbWJlZFR5cGU6IGZhbHNlLFxuXG4gICAgaW5pdEdyaWQ6IGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgLy8gaXNvdG9wZSBpbml0aWFsaXphdGlvblxuICAgICAgICB2YXIgZ3JpZCA9IGVsLmlzb3RvcGUoe1xuICAgICAgICAgICAgaXNPcmlnaW5MZWZ0OiAhY2VydHkudmFycy5ydGwsXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGYtZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogJy5wZi1ncmlkLXNpemVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsYXlvdXQgaXNvdG9wZSBhZnRlciBlYWNoIGltYWdlIGxvYWRzXG4gICAgICAgIGdyaWQuaW1hZ2VzTG9hZGVkKCkucHJvZ3Jlc3MoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ3JpZC5pc290b3BlKCdsYXlvdXQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaXNvdG9wZSBmaWx0ZXJcbiAgICAgICAgdmFyIGZpbHRlciA9IGVsLmNsb3Nlc3QoJy5wZi13cmFwJykuZmluZCgnLnBmLWZpbHRlcicpO1xuICAgICAgICBpZiAoZmlsdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJfYnRuID0gZmlsdGVyLmZpbmQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgdmFyIGZpbHRlcl9idG5fZmlyc3QgPSBqUXVlcnkoJy5wZi1maWx0ZXIgYnV0dG9uOmZpcnN0LWNoaWxkJyk7XG5cbiAgICAgICAgICAgIGZpbHRlcl9idG5fZmlyc3QuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBmaWx0ZXJfYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfYnRuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJyk7XG4gICAgICAgICAgICAgICAgZ3JpZC5pc290b3BlKHsgZmlsdGVyOiBmaWx0ZXJWYWx1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5Qb3B1cDogZnVuY3Rpb24oZWwpe1xuICAgICAgICAvLyBhZGQgb3BlbmVkIGNsYXNzIG9uIGh0bWxcbiAgICAgICAgY2VydHkudmFycy5odG1sLmFkZENsYXNzKCdjcnQtcGYtcG9wdXAtb3BlbmVkJyk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHBvcnRmb2xpbyBwb3B1cFxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIgPSBqUXVlcnkoJzxkaXYgaWQ9XCJwZi1wb3B1cC13cmFwXCI+Jytcblx0XHRcdCc8YnV0dG9uIGlkPVwicGYtcG9wdXAtY2xvc2VcIj48aSBjbGFzcz1cImNydC1pY29uIGNydC1pY29uLWNsb3NlXCI+PC9pPjwvYnV0dG9uPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBmLXBvcHVwLWlubmVyXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtbWlkZGxlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtY29udGFpbmVyXCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIGlkPVwicGYtcG9wdXAtY2xvc2VcIj48aSBjbGFzcz1cInJzaWNvbiByc2ljb24tY2xvc2VcIj48L2k+PC9idXR0b24+JytcbiAgICAgICAgICAgICc8ZGl2IGlkPVwicGYtcG9wdXAtY29udGVudFwiIGNsYXNzPVwicGYtcG9wdXAtY29udGVudFwiPjwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+Jyk7XG5cbiAgICAgICAgY2VydHkudmFycy5ib2R5LmFwcGVuZCggdGhpcy5wb3B1cF93cmFwcGVyICk7XG5cbiAgICAgICAgLy8gYWRkIHBvcnRmb2xpbyBwb3B1cCBjb250ZW50XG4gICAgICAgIHRoaXMucG9wdXBfY29udGVudCA9IGpRdWVyeSgnI3BmLXBvcHVwLWNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5wb3B1cF9jb250ZW50LmFwcGVuZCggZWwuY2xvbmUoKSApO1xuXG4gICAgICAgIC8vIHBvcHVwIHNsaWRlclxuICAgICAgICB0aGlzLnBvcHVwU2xpZGVyID0galF1ZXJ5KCcjcGYtcG9wdXAtY29udGVudCAucGYtcG9wdXAtbWVkaWEnKTtcblxuICAgICAgICAvLyBwb3B1cCBzbGlkZXI6IG9uIGluaXRcbiAgICAgICAgdGhpcy5wb3B1cFNsaWRlci5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xuICAgICAgICAgICAgY2VydHkucG9ydGZvbGlvLmxvYWRFbWJlZCgwKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBQb3J0Zm9saW8gUG9wdXAgVmlzaWJsZVxuICAgICAgICAgICAgalF1ZXJ5KHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBvcHVwIHNsaWRlcjogYmVmb3JlIGNoYW5nZVxuICAgICAgICB0aGlzLnBvcHVwU2xpZGVyLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkge1xuXG4gICAgICAgICAgICAvLyBTdG9wIGN1cnJlbnQgc2xpZGUgaWZyYW1lL3ZpZGVvIHBsYXlcbiAgICAgICAgICAgIGlmKCBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkICYmIGNlcnR5LnBvcnRmb2xpby5jdXJyZW50RW1iZWRUeXBlICl7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZyYW1lXCI6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZnJhbWUgPSBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkLmZpbmQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLmF0dHIoJ3NyYycsIGlmcmFtZS5hdHRyKCdzcmMnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gY2VydHkucG9ydGZvbGlvLmN1cnJlbnRFbWJlZC5maW5kKCd2aWRlbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9bMF0ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb2FkIG5leHQgc2xpZGUgZW1iZWRcbiAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5sb2FkRW1iZWQobmV4dFNsaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcG9wdXAgc2xpZGVyOiBpbml0aWFsaXplXG4gICAgICAgIHRoaXMucG9wdXBTbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3c6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBwb3B1cCBjYXJvdXNlbFxuICAgICAgICB0aGlzLnBvcHVwQ2Fyb3VzZWwgPSBqUXVlcnkoJyNwZi1wb3B1cC1jb250ZW50IC5wZi1yZWwtY2Fyb3VzZWwnKTtcblxuICAgICAgICAvLyBwb3B1cCBjYXJvdXNlbDogaW5pdGlhbGl6ZVxuICAgICAgICB0aGlzLnBvcHVwQ2Fyb3VzZWwuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFrZSBwb3J0Zm9saW8gcG9wdXAgdmlzaWJsZVxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIuYWRkQ2xhc3MoJ3BmLW9wZW5lZCcpO1xuXG4gICAgICAgIC8vIGxvY2sgd2luZG93IHNjcm9sbFxuICAgICAgICBjZXJ0eS5sb2NrU2Nyb2xsKCk7XG4gICAgfSxcblxuICAgIGNsb3NlUG9wdXA6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIC8vIHJlbW92ZSBvcGVuZWQgY2xhc3MgZnJvbSBodG1sXG4gICAgICAgIGNlcnR5LnZhcnMuaHRtbC5yZW1vdmVDbGFzcygnY3ItcG9ydGZvbGlvLW9wZW5lZCcpO1xuXG4gICAgICAgIC8vIG1ha2UgcG9ydGZvbGlvIHBvcHVwIGludmlzaWJsZVxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ3BmLW9wZW5lZCcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5wb3B1cF93cmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgY2VydHkudW5sb2NrU2Nyb2xsKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSxcblxuICAgIGxvYWRFbWJlZDogZnVuY3Rpb24gKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRFbWJlZCA9IGpRdWVyeSgnI3BmLXBvcHVwLWNvbnRlbnQgLnBmLXBvcHVwLXNsaWRlW2RhdGEtc2xpY2staW5kZXg9XCInICsgc2xpZGVJbmRleCArICdcIl0nKS5maW5kKCcucGYtcG9wdXAtZW1iZWQnKTtcbiAgICAgICAgdmFyIGN1cnJlbnRFbWJlZFR5cGUgPSBqUXVlcnkudHJpbShjdXJyZW50RW1iZWQuZGF0YSgndHlwZScpKTtcbiAgICAgICAgdmFyIGN1cmVudEVtYmVkVXJsID0galF1ZXJ5LnRyaW0oY3VycmVudEVtYmVkLmRhdGEoJ3VybCcpKTtcblxuICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkID0gY3VycmVudEVtYmVkO1xuICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkVHlwZSA9IGN1cnJlbnRFbWJlZFR5cGU7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgJ2N1cnJlbnRFbWJlZCcgc3RpbGwgbm90IGxvYWRlZCB0aGVuIGRvIGFjdGlvbnNcbiAgICAgICAgaWYgKCFjdXJyZW50RW1iZWQuaGFzQ2xhc3MoJ3BmLWVtYmVkLWxvYWRlZCcpKSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmICdjdXJyZW50RW1iZWQnIHVybCBhbmQgdHlwZSBhcmUgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEVtYmVkVHlwZSAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBjdXJyZW50RW1iZWRUeXBlICE9PSBmYWxzZSAmJiBjdXJyZW50RW1iZWRUeXBlICE9PSBcIlwiICYmIHR5cGVvZiBjdXJlbnRFbWJlZFVybCAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBjdXJlbnRFbWJlZFVybCAhPT0gZmFsc2UgJiYgY3VyZW50RW1iZWRVcmwgIT09IFwiXCIpIHtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBlbWJlZCBkaW1lbnNpb25zIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgdmFyIGVtYmVkVyA9IGpRdWVyeS50cmltKGN1cnJlbnRFbWJlZC5kYXRhKCd3aWR0aCcpKTtcbiAgICAgICAgICAgICAgICB2YXIgZW1iZWRIID0galF1ZXJ5LnRyaW0oY3VycmVudEVtYmVkLmRhdGEoJ2hlaWdodCcpKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVtYmVkVyAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBlbWJlZFcgIT09IGZhbHNlICYmIGVtYmVkVyAhPT0gXCJcIiAmJiB0eXBlb2YgZW1iZWRIICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmIGVtYmVkSCAhPT0gZmFsc2UgJiYgZW1iZWRIICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5jc3MoeydwYWRkaW5nLXRvcCc6IChlbWJlZEgvZW1iZWRXKjEwMCkrJyUnfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBhcHByb3ByaWF0ZSBlbWJlZFxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudEVtYmVkVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW1hZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBlbWJlZCB0eXBlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWltYWdlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbWJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGpRdWVyeSgnPGltZy8+Jyx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBjdXJlbnRFbWJlZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmxvYWQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZmFkZUluKDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1sb2FkZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1lcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5lbXB0eSgpLmFwcGVuZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZyYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZW1iZWQgdHlwZSBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1pZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIEVtYmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWZyYW1lID0galF1ZXJ5KCc8aWZyYW1lLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBjdXJlbnRFbWJlZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkubG9hZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWxvYWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmVtcHR5KCkuYXBwZW5kKGlmcmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGVtYmVkIHR5cGUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5hZGRDbGFzcygncGYtZW1iZWQtdmlkZW8nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIEVtYmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9PcHRpb25zID0gdGhpcy5wYXJzZU9wdGlvbnMoY3VyZW50RW1iZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gJzx2aWRlbyAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9PcHRpb25zLnBvc3RlcikgdmlkZW8gKz0gJ3Bvc3Rlcj1cIicrdmlkZW9PcHRpb25zLnBvc3RlcisnXCIgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvICs9ICdjb250cm9scz1cImNvbnRyb2xzXCIgcHJlbG9hZD1cInllc1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb09wdGlvbnMubXA0KSB2aWRlbyArPSAnPHNvdXJjZSB0eXBlPVwidmlkZW8vbXA0XCIgc3JjPVwiJyt2aWRlb09wdGlvbnMubXA0KydcIi8+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvT3B0aW9ucy53ZWJtKSB2aWRlbyArPSAnPHNvdXJjZSB0eXBlPVwidmlkZW8vd2VibVwiIHNyYz1cIicrdmlkZW9PcHRpb25zLndlYm0rJ1wiLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9PcHRpb25zLm9ndikgdmlkZW8gKz0gJzxzb3VyY2UgdHlwZT1cInZpZGVvL29nZ1wiIHNyYz1cIicrdmlkZW9PcHRpb25zLm9ndisnXCIvPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbyArPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy48L3ZpZGVvPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5lbXB0eSgpLmFwcGVuZCggalF1ZXJ5KHZpZGVvKSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGFyc2VPcHRpb25zOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgdmFyIGRlbGltaXRlckluZGV4O1xuICAgICAgICB2YXIgb3B0aW9uO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgdmFyIGFycjtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHNwYWNlcyBhcm91bmQgZGVsaW1pdGVycyBhbmQgc3BsaXRcbiAgICAgICAgYXJyID0gc3RyLnJlcGxhY2UoL1xccyo6XFxzKi9nLCAnOicpLnJlcGxhY2UoL1xccyosXFxzKi9nLCAnLCcpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgLy8gUGFyc2UgYSBzdHJpbmdcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBhcnJbaV07XG5cbiAgICAgICAgICAgIC8vIElnbm9yZSB1cmxzIGFuZCBhIHN0cmluZyB3aXRob3V0IGNvbG9uIGRlbGltaXRlcnNcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VhcmNoKC9eKGh0dHB8aHR0cHN8ZnRwKTpcXC9cXC8vKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VhcmNoKCc6JykgPT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsaW1pdGVySW5kZXggPSBvcHRpb24uaW5kZXhPZignOicpO1xuICAgICAgICAgICAgcHJvcCA9IG9wdGlvbi5zdWJzdHJpbmcoMCwgZGVsaW1pdGVySW5kZXgpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9uLnN1YnN0cmluZyhkZWxpbWl0ZXJJbmRleCArIDEpO1xuXG4gICAgICAgICAgICAvLyBJZiB2YWwgaXMgYW4gZW1wdHkgc3RyaW5nLCBtYWtlIGl0IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgaWYgaXQgaXMgbGlrZSBhIGJvb2xlYW5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbCA9PT0gJ3RydWUnIHx8ICh2YWwgPT09ICdmYWxzZScgPyBmYWxzZSA6IHZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgaWYgaXQgaXMgbGlrZSBhIG51bWJlclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIWlzTmFOKHZhbCkgPyArdmFsIDogdmFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmpbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBub3RoaW5nIGlzIHBhcnNlZFxuICAgICAgICBpZiAocHJvcCA9PSBudWxsICYmIHZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG59O1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKGZ1bmN0aW9uICgpIHsgLy8gc3RhcnQ6IGRvY3VtZW50IHJlYWR5XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTZXQgR2xvYmFsIFZhcnNcbiAgICAgICAgICovXG4gICAgICAgIGNlcnR5LmluaXRHbG9iYWxWYXJzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBOYXZpZ2F0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoY2VydHkudmFycy5ib2R5Lmhhc0NsYXNzKCdjcnQtbmF2LW9uJykpIHsgLy8gQ2hlY2sgSWYgTmF2IEV4aXN0c1xuICAgICAgICAgICAgLy8gU2Nyb2xsZWQgTmF2aWdhdGlvbiAoIGxhcmdlIHNjcmVlbnMgKVxuICAgICAgICAgICAgaWYgKCBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6ICcrY2VydHkudmFycy5zY3JlZW5NZCsnKScpICYmIGNlcnR5Lm5hdi5oZWlnaHQgIT09ICdhdXRvJyApIHtcbiAgICAgICAgICAgICAgICBjZXJ0eS5uYXYuaW5pdFNjcm9sbCggJCgnI2NydC1uYXYtc2Nyb2xsJykgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RpY2t5IE5hdmlnYXRpb25cbiAgICAgICAgICAgIGNlcnR5Lm5hdi5tYWtlU3RpY2t5KCk7XG5cbiAgICAgICAgICAgIC8vIE5hdmlnYXRpb24gVG9vbHRpcHNcbiAgICAgICAgICAgIGlmKGNlcnR5Lm5hdi50b29sdGlwLmFjdGl2ZSl7XG4gICAgICAgICAgICAgICAgJCgnI2NydC1uYXYgYScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuc2hvdyggJCh0aGlzKSApO1xuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBbmNob3IgTmF2aWdhdGlvblxuICAgICAgICAgICAgJCgnI2NydC1uYXYnKS5vbmVQYWdlTmF2KHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VIYXNoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNjcm9sbFRocmVzaG9sZDogMC41LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogJzpub3QoLmV4dGVybmFsKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBGaXhlZCBTaWRlIEJveFxuICAgICAgICAgKi9cbiAgICAgICAgY2VydHkuc2lkZUJveC5tYWtlU3RpY2t5KCk7XG5cbiAgICAgICAgLyoqIFBvcnRmb2xpbyAqL1xuICAgICAgICB2YXIgcGZfZ3JpZCA9ICQoJy5wZi1ncmlkJyk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgZ3JpZCBleGlzdHMgdGhhbiBkbyBhY3Rpb25cbiAgICAgICAgaWYgKHBmX2dyaWQubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBpbml0IHBvcnRmb2xpbyBncmlkXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBmX2dyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uaW5pdEdyaWQoICQocGZfZ3JpZFtpXSkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb3BlbiBwb3J0Zm9saW8gcG9wdXBcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucGYtcHJvamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgY2VydHkucG9ydGZvbGlvLm9wZW5Qb3B1cCggJChpZCkgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBmLXJlbC1ocmVmJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnRhaW4gYW5jaG9yLCBvcGVuIHByb2plY3QgcG9wdXBcbiAgICAgICAgICAgICAgICBpZiggaHJlZi5pbmRleE9mKFwiI1wiKSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgYWxyZWFkeSBvcGVuZWQgcG9wdXBcbiAgICAgICAgICAgICAgICAgICAgY2VydHkucG9ydGZvbGlvLmNsb3NlUG9wdXAoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuIG5ldyBvbmUgYWZ0ZXIgdGltZW91dFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZXJ0eS5wb3J0Zm9saW8ub3BlblBvcHVwKCAkKGhyZWYpICk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXHRcdFx0XG5cdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3BmLXBvcHVwLWNsb3NlJywgZnVuY3Rpb24oKSB7XHRcdFx0XHRcbiAgICAgICAgICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY2xvc2VQb3B1cCgpO1xuXHRcdFx0fSk7XG5cbiAgICAgICAgICAgIC8vIGNsb3NlIHBvcnRmb2xpbyBwb3B1cFxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3RvdWNoc3RhcnQgY2xpY2snLCAnLmNydC1wZi1wb3B1cC1vcGVuZWQgI3BmLXBvcHVwLXdyYXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcjcGYtcG9wdXAtY29udGVudCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lci4uLiBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5jbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogQ29tcG9uZW50cyAqL1xuICAgICAgICAvLyBpbml0IHNsaWRlcnNcbiAgICAgICAgY2VydHkuc2xpZGVyKCAkKFwiLmNyLXNsaWRlclwiKSApO1xuXG4gICAgICAgIC8vIGluaXQgY2Fyb3VzZWxcbiAgICAgICAgY2VydHkuY2Fyb3VzZWwoICQoXCIuY3ItY2Fyb3VzZWxcIikgKTtcblx0XHRcblx0XHQvKiogV2luZG93IFNjcm9sbCBUb3AgQnV0dG9uICovXG4gICAgICAgIHZhciAkYnRuU2Nyb2xsVG9wID0gJCgnI2NydC1idG4tdXAnKTtcblx0XHRcblx0XHRpZigkYnRuU2Nyb2xsVG9wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAkYnRuU2Nyb2xsVG9wLnNob3coMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRidG5TY3JvbGxUb3AuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTAwKSB7XG5cdFx0XHRcdFx0JGJ0blNjcm9sbFRvcC5zaG93KDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRidG5TY3JvbGxUb3AuaGlkZSgwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCRidG5TY3JvbGxUb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgIH0pOyAvLyBlbmQ6IGRvY3VtZW50IHJlYWR5XG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7IC8vIHN0YXJ0OiB3aW5kb3cgcmVzaXplXG5cbiAgICAgICAgLy8gUmUgSW5pdCBWYXJzXG4gICAgICAgIGNlcnR5LnZhcnMud2luZG93VyA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBjZXJ0eS52YXJzLndpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNlcnR5LnZhcnMud2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIC8vIFN0aWNreSBOYXZpZ2F0aW9uXG4gICAgICAgIGNlcnR5Lm5hdi5tYWtlU3RpY2t5KCk7XG5cbiAgICAgICAgLy8gU3RpY2t5IFNpZGUgQm94XG4gICAgICAgIGNlcnR5LnNpZGVCb3gubWFrZVN0aWNreSgpO1xuXG4gICAgfSk7IC8vIGVuZDogd2luZG93IHJlc2l6ZVxuXG5cblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkgeyAvLyBzdGFydDogd2luZG93IHNjcm9sbFxuXG4gICAgICAgIC8vIFJlIEluaXQgVmFyc1xuICAgICAgICBjZXJ0eS52YXJzLndpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAvLyBTdGlja3kgTmF2aWdhdGlvblxuICAgICAgICBjZXJ0eS5uYXYubWFrZVN0aWNreSgpO1xuXG4gICAgICAgIC8vIFN0aWNreSBTaWRlIEJveFxuICAgICAgICBjZXJ0eS5zaWRlQm94Lm1ha2VTdGlja3koKTtcblxuICAgICAgICAvLyBSZW1vdmUgVG9vbHRpcFxuICAgICAgICBpZihjZXJ0eS5uYXYudG9vbHRpcC5lbC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGNlcnR5Lm5hdi50b29sdGlwLmVsLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICB9KTsgLy8gZW5kOiB3aW5kb3cgc2Nyb2xsXG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkgeyAvLyBzdGFydDogd2luZG93IGxvYWRcblxuICAgIH0pOyAvLyBlbmQ6IHdpbmRvdyBsb2FkXG5cbn0pKGpRdWVyeSk7IiwiLy8gVGhlbWUgVmFyaWFibGVzXG52YXIgYWNlID0ge1xuICAgIGh0bWw6ICcnLFxuICAgIGJvZHk6ICcnLFxuICAgIG1vYmlsZTogJycsXG5cbiAgICBzaWRlYmFyOiB7XG4gICAgICAgIG9iajogJycsXG4gICAgICAgIGJ0bjogJydcbiAgICB9LFxuXG4gICAgbmF2OiB7XG4gICAgICAgIG9iajogJycsXG4gICAgICAgIHRvb2x0aXA6IGpRdWVyeSgnPGRpdiBjbGFzcz1cImNydC10b29sdGlwXCI+PC9kaXY+JylcbiAgICB9LFxuXG4gICAgb3ZlcmxheToge1xuICAgICAgICBvYmo6IGpRdWVyeSgnPGRpdiBpZD1cImNydC1vdmVybGF5XCI+PC9kaXY+JylcbiAgICB9LFxuXG4gICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgbGluZXM6ICcnLFxuICAgICAgICBjaGFydHM6ICcnLFxuICAgICAgICBidWxsZXRzOiAnJ1xuICAgIH1cbn07XG5cbihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXHRcblx0JChmdW5jdGlvbiAoKSB7IC8vIHN0YXJ0OiBkb2N1bWVudCByZWFkeVxuXG5cdFx0LyoqXG5cdFx0ICogQ2VydHkgSW5pdCBNYWluIFZhcnNcblx0XHQgKi9cblx0XHRhY2UuaHRtbCA9ICQoJ2h0bWwnKTtcblx0XHRhY2UuYm9keSA9ICQoJ2JvZHknKTtcblxuXHRcdC8qKlxuXHRcdCAqIENlcnR5IERldGVjdCBEZXZpY2UgVHlwZVxuXHRcdCAqL1xuXHRcdGFjZV9kZXRlY3RfZGV2aWNlX3R5cGUoKTtcblxuXHRcdC8qKlxuXHRcdCAqIENlcnR5IE1vYmlsZSBOYXZpZ2F0aW9uXG5cdFx0ICovXG5cdFx0JCgnI2NydC1tYWluLW5hdi1zbSAubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcygnaG92ZXInKSApe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgpLnNsaWRlRG93big1MDApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBTaWRlYmFyXG5cdFx0ICovXG5cdFx0YWNlLnNpZGViYXIub2JqID0gJCgnI2NydC1zaWRlYmFyJyk7XG5cdFx0YWNlLnNpZGViYXIuYnRuID0gJCgnI2NydC1zaWRlYmFyLWJ0bicpO1xuXG5cdFx0Ly8gT3BlbiBTaWRlYmFyXG5cdFx0YWNlLnNpZGViYXIuYnRuLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0YWNlX29wZW5fc2lkZWJhcigpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ2xvc2UgU2lkZWJhciBUaHJvdWdoIE92ZXJsYXlcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hzdGFydCBjbGljaycsICcuY3J0LXNpZGViYXItb3BlbmVkICNjcnQtb3ZlcmxheScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgY29udGFpbmVyID0gYWNlLnNpZGViYXIub2JqO1xuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lci4uLiBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcblx0XHRcdGlmICghY29udGFpbmVyLmlzKGUudGFyZ2V0KSAmJiBjb250YWluZXIuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0YWNlX2Nsb3NlX3NpZGViYXIoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIENsb3NlIFNpZGViYXIgVXNpbmcgQnV0dG9uXG5cdFx0JCgnI2NydC1zaWRlYmFyLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0YWNlX2Nsb3NlX3NpZGViYXIoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNpZGViYXIgQ3VzdG9tIFNjcm9sbFxuXHRcdCQoXCIjY3J0LXNpZGViYXItaW5uZXJcIikubUN1c3RvbVNjcm9sbGJhcih7XG5cdFx0XHRheGlzOiBcInlcIixcblx0XHRcdHRoZW1lOiBcIm1pbmltYWwtZGFya1wiLFxuXHRcdFx0YXV0b0hpZGVTY3JvbGxiYXI6IHRydWUsXG5cdFx0XHRzY3JvbGxCdXR0b25zOiB7IGVuYWJsZTogdHJ1ZSB9XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBDaXJjbGUgJiBMaW5lIENoYXJ0c1xuXHRcdCAqL1xuXHRcdGlmKCFjZXJ0eS5wcm9ncmVzcy5hbmltYXRpb24gfHwgYWNlLm1vYmlsZSkge1xuXHRcdFx0Ly8gQ2lyY2xlIENoYXJ0XG5cdFx0XHRhY2UucHJvZ3Jlc3MuY2hhcnRzID0gJCgnLnByb2dyZXNzLWNoYXJ0IC5wcm9ncmVzcy1iYXInKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWNlLnByb2dyZXNzLmNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgY2hhcnQgPSAkKGFjZS5wcm9ncmVzcy5jaGFydHNbaV0pO1xuXG5cdFx0XHRcdGFjZV9wcm9ncmVzc19jaGFydChjaGFydFswXSwgY2hhcnQuZGF0YSgndGV4dCcpLCBjaGFydC5kYXRhKCd2YWx1ZScpLCAxKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTGluZSBDaGFydFxuXHRcdFx0YWNlLnByb2dyZXNzLmxpbmVzID0gJCgnLnByb2dyZXNzLWxpbmUgLnByb2dyZXNzLWJhcicpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhY2UucHJvZ3Jlc3MubGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGxpbmUgPSAkKGFjZS5wcm9ncmVzcy5saW5lc1tpXSk7XG5cblx0XHRcdFx0YWNlX3Byb2dyZXNzX2xpbmUobGluZVswXSwgbGluZS5kYXRhKCd0ZXh0JyksIGxpbmUuZGF0YSgndmFsdWUnKSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ2VydHkgQW5pbWF0ZSBFbGVtZW50c1xuXHRcdCAqL1xuXHRcdGlmKGNlcnR5LnByb2dyZXNzLmFuaW1hdGlvbiAmJiAhYWNlLm1vYmlsZSkge1xuXHRcdFx0YWNlX2FwcGVhcl9lbGVtcygkKCcuY3J0LWFuaW1hdGUnKSwgMCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29kZSBIaWdobGlnaHRcblx0XHQgKi9cblx0XHQkKCdwcmUnKS5lYWNoKGZ1bmN0aW9uIChpLCBibG9jaykge1xuXHRcdFx0aGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBBbGVydHNcblx0XHQgKi9cblx0XHQkKCcuYWxlcnQgLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFsZXJ0ID0gJCh0aGlzKS5wYXJlbnQoKTtcblxuXHRcdFx0YWxlcnQuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0YWxlcnQucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENlcnR5IFNsaWRlclxuXHRcdCAqL1xuXHRcdCQoJy5zbGlkZXInKS5zbGljayh7XG5cdFx0XHRkb3RzOiB0cnVlXG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBHb29nbGUgTWFwIEluaXRpYWxpc2F0aW9uXG5cdFx0ICovXG5cdFx0aWYgKCQoJyNtYXAnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRpbml0aWFsaXNlR29vZ2xlTWFwKCBjZXJ0eV92YXJzX2Zyb21fV1AubWFwU3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogIFRhYnNcblx0XHQgKi9cblx0XHR2YXIgdGFiQWN0aXZlID0gJCgnLnRhYnMtbWVudT5saS5hY3RpdmUnKTtcblx0XHRpZiggdGFiQWN0aXZlLmxlbmd0aCA+IDAgKXtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQWN0aXZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciB0YWJfaWQgPSAkKHRhYkFjdGl2ZVtpXSkuY2hpbGRyZW4oKS5hdHRyKCdocmVmJyk7XG5cblx0XHRcdFx0JCh0YWJfaWQpLmFkZENsYXNzKCdhY3RpdmUnKS5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JCgnLnRhYnMtbWVudSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgdGFiID0gJCh0aGlzKTtcblx0XHRcdHZhciB0YWJfaWQgPSB0YWIuYXR0cignaHJlZicpO1xuXHRcdFx0dmFyIHRhYl93cmFwID0gdGFiLmNsb3Nlc3QoJy50YWJzJyk7XG5cdFx0XHR2YXIgdGFiX2NvbnRlbnQgPSB0YWJfd3JhcC5maW5kKCcudGFiLWNvbnRlbnQnKTtcblxuXHRcdFx0dGFiLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0dGFiLnBhcmVudCgpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0dGFiX2NvbnRlbnQubm90KHRhYl9pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmhpZGUoKTtcblx0XHRcdCQodGFiX2lkKS5hZGRDbGFzcygnYWN0aXZlJykuZmFkZUluKDUwMCk7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZUJveFxuXHRcdCAqL1xuXHRcdHZhciB0b2dnbGVib3hBY3RpdmUgPSAkKCcudG9nZ2xlYm94PmxpLmFjdGl2ZScpO1xuXHRcdGlmKCB0b2dnbGVib3hBY3RpdmUubGVuZ3RoID4gMCApe1xuXHRcdFx0dG9nZ2xlYm94QWN0aXZlLmZpbmQoJy50b2dnbGVib3gtY29udGVudCcpLnNob3coKTtcblx0XHR9XG5cblx0XHQkKCcudG9nZ2xlYm94LWhlYWRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgdG9nZ2xlX2hlYWQgPSAkKHRoaXMpO1xuXG5cdFx0XHR0b2dnbGVfaGVhZC5uZXh0KCcudG9nZ2xlYm94LWNvbnRlbnQnKS5zbGlkZVRvZ2dsZSgzMDApO1xuXHRcdFx0dG9nZ2xlX2hlYWQucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cblx0XHQvKipcblx0XHQgKiBBY2NvcmRlb25cblx0XHQgKi9cblx0XHR2YXIgYWNjb3JkZW9uQWN0aXZlID0gJCgnLmFjY29yZGlvbj5saS5hY3RpdmUnKTtcblx0XHRpZiggYWNjb3JkZW9uQWN0aXZlLmxlbmd0aCA+IDAgKXtcblx0XHRcdGFjY29yZGVvbkFjdGl2ZS5maW5kKCcuYWNjb3JkaW9uLWNvbnRlbnQnKS5zaG93KCk7XG5cdFx0fVxuXG5cdFx0JCgnLmFjY29yZGlvbi1oZWFkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFjY19oZWFkID0gJCh0aGlzKTtcblx0XHRcdHZhciBhY2Nfc2VjdGlvbiA9IGFjY19oZWFkLnBhcmVudCgpO1xuXHRcdFx0dmFyIGFjY19jb250ZW50ID0gYWNjX2hlYWQubmV4dCgpO1xuXHRcdFx0dmFyIGFjY19hbGxfY29udGVudHMgPSBhY2NfaGVhZC5jbG9zZXN0KCcuYWNjb3JkaW9uJykuZmluZCgnLmFjY29yZGlvbi1jb250ZW50Jyk7XG5cblx0XHRcdGlmKGFjY19zZWN0aW9uLmhhc0NsYXNzKCdhY3RpdmUnKSl7XG5cdFx0XHRcdGFjY19zZWN0aW9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0YWNjX2NvbnRlbnQuc2xpZGVVcCgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGFjY19zZWN0aW9uLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHRhY2Nfc2VjdGlvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdGFjY19hbGxfY29udGVudHMuc2xpZGVVcCgzMDApO1xuXHRcdFx0XHRhY2NfY29udGVudC5zbGlkZURvd24oMzAwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENvbW1lbnRzIE9wZW4vQ2xvc2Vcblx0XHQgKi9cblx0XHQkKCcuY29tbWVudC1yZXBseXMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5jb21tZW50JykudG9nZ2xlQ2xhc3MoJ3Nob3ctcmVwbGllcycpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBQb3J0Zm9saW8gUG9wdXBcblx0XHQgKi9cblx0XHR2YXIgcGZfcG9wdXAgPSB7fTtcblx0XHRwZl9wb3B1cC53cmFwcGVyID0gbnVsbDtcblx0XHRwZl9wb3B1cC5jb250ZW50ID0gbnVsbDtcblx0XHRwZl9wb3B1cC5zbGlkZXIgPSBudWxsO1xuXG5cdFx0cGZfcG9wdXAub3BlbiA9IGZ1bmN0aW9uICggZWwgKXtcblx0XHRcdC8vIEFwcGVuZCBQb3J0Zm9saW8gUG9wdXBcblx0XHRcdHRoaXMud3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJwZi1wb3B1cC13cmFwXCIgY2xhc3M9XCJwZi1wb3B1cC13cmFwXCI+Jytcblx0XHRcdCc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtaW5uZXJcIj4nK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwZi1wb3B1cC1taWRkbGVcIj4nK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwZi1wb3B1cC1jb250YWluZXJcIj4nK1xuXHRcdFx0JzxidXR0b24gaWQ9XCJwZi1wb3B1cC1jbG9zZVwiPjxpIGNsYXNzPVwicnNpY29uIHJzaWNvbi1jbG9zZVwiPjwvaT48L2J1dHRvbj4nK1xuXHRcdFx0JzxkaXYgaWQ9XCJwZi1wb3B1cC1jb250ZW50XCIgY2xhc3M9XCJwZi1wb3B1cC1jb250ZW50XCI+PC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+Jyk7XG5cblx0XHRcdGFjZS5ib2R5LmFwcGVuZCh0aGlzLndyYXBwZXIpO1xuXG5cdFx0XHQvLyBBZGQgUG9ydGZvbGlvIFBvcHVwIEl0ZW1zXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSAkKCcjcGYtcG9wdXAtY29udGVudCcpO1xuXHRcdFx0dGhpcy5jb250ZW50LmFwcGVuZCggZWwuY2xvbmUoKSApO1xuXG5cdFx0XHQvLyBNYWtlIFBvcnRmb2xpbyBQb3B1cCBWaXNpYmxlXG5cdFx0XHRwZl9wb3B1cC53cmFwcGVyLmFkZENsYXNzKCdvcGVuZWQnKTtcblx0XHRcdGFjZV9sb2NrX3Njcm9sbCgpO1xuXHRcdH07XG5cblx0XHRwZl9wb3B1cC5jbG9zZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRwZl9wb3B1cC53cmFwcGVyLnJlbW92ZSgpO1xuXHRcdFx0XHRhY2VfdW5sb2NrX3Njcm9sbCgpO1xuXHRcdFx0fSwgNTAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gT3BlbiBQb3J0Zm9saW8gUG9wdXBcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBmLWJ0bi12aWV3JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdHBmX3BvcHVwLm9wZW4oICQoaWQpICk7XG5cblx0XHRcdGFjZS5odG1sLmFkZENsYXNzKCdjcnQtcG9ydGZvbGlvLW9wZW5lZCcpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblx0XHQvLyBDbG9zZSBQb3J0Zm9saW8gUG9wdXBcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hzdGFydCBjbGljaycsICcuY3J0LXBvcnRmb2xpby1vcGVuZWQgI3BmLXBvcHVwLXdyYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGNvbnRhaW5lciA9ICQoJyNwZi1wb3B1cC1jb250ZW50Jyk7XG5cblx0XHRcdC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIuLi4gbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG5cdFx0XHRpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHBmX3BvcHVwLmNsb3NlKCk7XG5cdFx0XHRcdGFjZS5odG1sLnJlbW92ZUNsYXNzKCdjcnQtcG9ydGZvbGlvLW9wZW5lZCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogU2hvdyBDb2RlIDxwcmU+XG5cdFx0ICovXG5cdFx0JCgnLnRvZ2dsZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXG5cdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdvcGVuZWQnKSl7XG5cdFx0XHRcdCQoaWQpLnNsaWRlVXAoNTAwKTtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKGlkKS5zbGlkZURvd24oNTAwKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnb3BlbmVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIFNoYXJlIEJ1dHRvblxuXHRcdCAqL1xuXHRcdCQoJy5zaGFyZS1idG4nKS5vbiggXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdob3ZlcmVkJyk7XG5cdFx0fSk7XG5cblx0XHQkKCcuc2hhcmUtYm94Jykub24oIFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHNoYXJlX2JveCA9ICQodGhpcyk7XG5cblx0XHRcdGlmKHNoYXJlX2JveC5oYXNDbGFzcygnaG92ZXJlZCcpKXtcblx0XHRcdFx0c2hhcmVfYm94LmFkZENsYXNzKCdjbG9zaW5nJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2hhcmVfYm94LnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XG5cdFx0XHRcdFx0c2hhcmVfYm94LnJlbW92ZUNsYXNzKCdjbG9zaW5nJyk7XG5cdFx0XHRcdH0sMzAwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTsgLy8gZW5kOiBkb2N1bWVudCByZWFkeVxufSkoalF1ZXJ5KTsiXX0=

;
! function(a, b) {
    "use strict";

    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
                if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
            }
        }
    }
    var d = !1,
        e = !1;
    if (b.querySelector)
        if (a.addEventListener) d = !0;
    if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
        if (a.wp.receiveEmbedMessage = function(c) {
                var d = c.data;
                if (d.secret || d.message || d.value)
                    if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                        var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                            k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                        for (e = 0; e < k.length; e++) k[e].style.display = "none";
                        for (e = 0; e < j.length; e++)
                            if (f = j[e], c.source === f.contentWindow) {
                                if (f.removeAttribute("style"), "height" === d.message) {
                                    if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
                                    else if (~~g < 200) g = 200;
                                    f.height = g
                                }
                                if ("link" === d.message)
                                    if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
                                        if (b.activeElement === f) a.top.location.href = d.value
                            } else;
                    }
            }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);;
(function($) {
    var $wdg_window_width = 0,
        $wdg_window_height = 0,
        $wdg_window_scroll_top = 0,
        $wdg_wrapped = false;
    $wdg_ismobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) $wdg_ismobile = true;
    $(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    });
    $(window).scroll(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    });
    $(window).resize(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    })

    function set_sticky_widget() {
        var wdg_start = $('#wdg-sticky-start'),
            wdg_end = $('#wdg-sticky-end');
        if (!$wdg_wrapped) {
            $("#wdg-sticky-start ~ *").wrapAll("<div id='sticky-widget-wrapper'></div>").wrapAll("<div id='sticky-widget-inner'></div>");
            $wdg_wrapped = true
        };
        var wdg_wrap = $('#sticky-widget-wrapper'),
            wdg_inner = $('#sticky-widget-inner'),
            wdg_offset_top = wdg_wrap.offset().top;
        if (!$wdg_ismobile)
            if ($wdg_window_scroll_top > wdg_offset_top && $wdg_window_width > 992) {
                wdg_inner.addClass('wdg-sticky').css({
                    top: '10px',
                    bottom: 'auto',
                    position: 'fixed',
                    left: wdg_wrap.offset().left,
                    width: wdg_wrap.width()
                });
                if (!($('#crt-footer').offset().top > $wdg_window_scroll_top + wdg_inner.outerHeight())) wdg_inner.css({
                    top: 'auto',
                    bottom: $('#crt-footer').height() + 'px'
                })
            } else wdg_inner.removeClass('wdg-sticky').css({
                top: 'auto',
                left: 'auto',
                width: 'auto',
                position: 'static'
            })
    }
}(jQuery))