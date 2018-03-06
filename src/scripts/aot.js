/**
 * *******************************************************
 * AOT (Animate On Trigger)
 * made to animate elements on javascript trigger
 *
 * Use Animate css classes in data-aot="slideInRight"
 * *******************************************************
 */


/**
 * Initialize All by selector
 *
 * @param selector
 * @param options
 * @returns {NodeList}
 */
HTMLElement.prototype.AOTinitAll = function( selector, options ){

  var aot_all = this.querySelectorAll(selector);

  [].forEach.call(aot_all, function(elem, i) {
    elem.AOTinit(options);
  });

  return aot_all;
};


/**
 * Initialize element
 *
 * @param options
 * @returns {{initialized: boolean, options: *, elements: Array}|*}
 */
HTMLElement.prototype.AOTinit = function( options ){

  /**
   * Private variables
   */
  this.aot = {
    initialized : false,
    options: Object.assign({}, {
      delay: 0,
      duration: 400,
      disable: false,
      once: false,
    }, options),
    elements: []
  };

  var elements = this.querySelectorAll('[data-aot]');
  var final_elements = [];

  [].forEach.call(elements, function(el, i) {
    final_elements.push({node: el});
  });

  this.aot.elements = final_elements;
  this.aot.initialized = true;

  this.classList.add('aot-init');

  return this.aot;
};


/**
 * Destroy element
 *
 */
HTMLElement.prototype.AOTdestroy = function () {

  delete this.aot;
};


/**
 * Refresh All by selector
 *
 * @param selector
 * @param initialize
 * @param visible
 * @returns {NodeList}
 */
HTMLElement.prototype.AOTrefreshAll = function ( selector, visible, initialize) {

  var aot_all = this.querySelectorAll(selector);

  [].forEach.call(aot_all, function(elem, i) {
    elem.AOTrefresh(initialize, visible);
  });

  return aot_all;
};

/**
 * Refresh element
 *
 * @param initialize
 * @param visible
 * @returns {Array}
 */
HTMLElement.prototype.AOTrefresh = function ( visible, initialize ) {

  if (!this.aot.hasOwnProperty(initialized) || initialize === true) {

    this.aot.elements = this.AOTinit( this.aot.options);

  }

  this.AOTanimate(visible === true || false);

  return this.aot.elements;
};


/**
 * Animate All by selector
 *
 * @param visible
 */
HTMLElement.prototype.AOTanimateAll = function( selector, visible ){

  var aot_all = this.querySelectorAll(selector);

  [].forEach.call(aot_all, function(el_anim, i) {
    el_anim.AOTanimate(visible);
  });

  return aot_all;

};


/**
 * Animate element
 *
 * @param visible
 */
HTMLElement.prototype.AOTanimate = function( visible, timeout ){

  var aot_el = this;

  [].forEach.call(aot_el.aot.elements, function(el_anim, key) {

    var classes_anim, i;
    var class_anim = 'aot-animate';
    var classes_in = [class_anim], classes_out = ['aot-hide'];
    var once = aot_el.aot.options.once;
    var disable = aot_el.aot.options.disable;

    if( el_anim.node.getAttribute('data-aot-once') !== null ) {
      once = el_anim.node.getAttribute('data-aot-once') === true || false;
    }

    if( el_anim.node.getAttribute('data-aot-disable') !== null ) {
      disable = el_anim.node.getAttribute('data-aot-disable') === true || false;
    }

    if ( once !== true || !el_anim.node.classList.contains(class_anim) ) {

      classes_anim = el_anim.node.getAttribute('data-aot');

      if( !el_anim.node.getAttribute('data-aot-duration') ) {
        el_anim.node.setAttribute('data-aot-duration', aot_el.aot.options.duration + 'ms');
      }

      if( !el_anim.node.getAttribute('data-aot-delay') ) {
        el_anim.node.setAttribute('data-aot-delay', aot_el.aot.options.delay + 'ms');
      }

      classes_in = classes_anim ? classes_in.concat(classes_anim.split(" ")) : classes_in;

      if ( visible === true && disable === false ) {

        if ( !el_anim.node.classList.contains(class_anim) ) {
          el_anim.node.classList.add(classes_out);
        }

        setTimeout(function() {

          el_anim.node.classList.remove(classes_out);

          for (i = 0; i < classes_in.length; i++) {
            el_anim.node.classList.add(classes_in[i]);
          }
        }, parseInt(timeout, 10));
      }
      else {

        for (i = 0; i < classes_in.length; i++) {
          el_anim.node.classList.remove(classes_in[i]);
        }

        el_anim.node.classList.add(classes_out);
      }
    }
  });
};
