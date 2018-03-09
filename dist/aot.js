HTMLElement.prototype.AOTinitAll = function(selector, options, refresh) {
    if (typeof selector === "object") {
        options = selector;
        refresh = options;
        selector = undefined;
    } else if (typeof selector === "boolean") {
        refresh = selector;
        options = undefined;
        selector = undefined;
    }
    options = options || {};
    selector = selector || "aot";
    refresh = refresh || false;
    var aot_all = this.querySelectorAll(selector);
    [].forEach.call(aot_all, function(elem, i) {
        options.once = elem.getAttribute("data-aot-once");
        options.disable = elem.getAttribute("data-aot-disable");
        options.delay = elem.getAttribute("data-aot-delay");
        options.duration = elem.getAttribute("data-aot-duration");
        options.timeout = elem.getAttribute("data-aot-timeout");
        options.timeoutOnce = elem.getAttribute("data-aot-timeout-once");
        options.class = elem.getAttribute("data-aot-class");
        options.classOut = elem.getAttribute("data-aot-class-out");
        for (var prop in options) {
            switch (options[prop]) {
              case null:
                delete options[prop];
                break;

              case "true":
                options[prop] = true;
                break;

              case "false":
                options[prop] = false;
                break;

              default:
                var value = parseInt(options[prop], 10);
                if (!isNaN(value)) {
                    options[prop] = value;
                }
            }
        }
        elem.AOTinit(options, refresh);
    });
    return aot_all;
};

HTMLElement.prototype.AOTinit = function(options, refresh) {
    var aot_el = this;
    if (typeof options === "boolean") {
        refresh = options;
        options = undefined;
    }
    if (refresh === true) {
        this.AOTdestroy();
        this.classList.remove("aot-initialized");
    }
    if (this.aot && this.aot.initialized === true) {
        return this.aot;
    }
    this.aot = {
        initialized: false,
        options: Object.assign({}, {
            delay: 0,
            duration: 400,
            disable: false,
            once: false,
            timeout: 0,
            timeoutOnce: true,
            class: "aot-animate",
            classOut: "aot-hide"
        }, options),
        elements: []
    };
    var elements = this.querySelectorAll("[data-aot]");
    var final_elements = [];
    [].forEach.call(elements, function(el, i) {
        el.classList.remove(aot_el.aot.options.class);
        el.classList.add(aot_el.aot.options.classOut);
        final_elements.push({
            node: el
        });
    });
    this.aot.elements = final_elements;
    this.aot.animatedOnce = false;
    this.classList.add("aot-initialized");
    this.aot.initialized = true;
    return this.aot;
};

HTMLElement.prototype.AOTdestroy = function() {
    delete this.aot;
};

HTMLElement.prototype.AOTanimateAll = function(selector, animate) {
    if (typeof selector === "boolean" && animate === undefined) {
        animate = selector;
        selector = undefined;
    }
    selector = selector || "aot";
    animate = animate === undefined ? true : animate;
    var aot_all = this.querySelectorAll(selector);
    [].forEach.call(aot_all, function(el_anim, i) {
        el_anim.AOTanimate(animate);
    });
    return aot_all;
};

HTMLElement.prototype.AOTanimate = function(animate, timeout) {
    var aot_el = this;
    animate = animate === undefined ? true : animate;
    timeout = !timeout ? aot_el.aot.options.timeout : timeout;
    timeout = aot_el.aot.options.timeoutOnce === true && aot_el.aot.animatedOnce === true ? 0 : timeout;
    setTimeout(function() {
        aot_el.aot.animatedOnce = true;
        [].forEach.call(aot_el.aot.elements, function(el_anim, key) {
            var classes_anim, i;
            var classes_in = [ aot_el.aot.options.class ], classes_out = [ aot_el.aot.options.classOut ];
            var once = aot_el.aot.options.once;
            var disable = aot_el.aot.options.disable;
            if (el_anim.node.getAttribute("data-aot-once") !== null) {
                once = el_anim.node.getAttribute("data-aot-once") === true || false;
            }
            if (el_anim.node.getAttribute("data-aot-disable") !== null) {
                disable = el_anim.node.getAttribute("data-aot-disable") === true || false;
            }
            if (once !== true || !el_anim.node.classList.contains(aot_el.aot.options.class)) {
                classes_anim = el_anim.node.getAttribute("data-aot");
                if (!el_anim.node.getAttribute("data-aot-duration")) {
                    el_anim.node.setAttribute("data-aot-duration", aot_el.aot.options.duration);
                }
                if (!el_anim.node.getAttribute("data-aot-delay")) {
                    el_anim.node.setAttribute("data-aot-delay", aot_el.aot.options.delay);
                }
                classes_in = classes_anim ? classes_in.concat(classes_anim.split(" ")) : classes_in;
                if (animate === true && disable === false) {
                    el_anim.node.classList.remove(classes_out);
                    for (i = 0; i < classes_in.length; i++) {
                        el_anim.node.classList.add(classes_in[i]);
                    }
                } else {
                    for (i = 0; i < classes_in.length; i++) {
                        el_anim.node.classList.remove(classes_in[i]);
                    }
                    el_anim.node.classList.add(classes_out);
                }
            }
        });
    }, parseInt(timeout, 10));
};
//# sourceMappingURL=aot.js.map
