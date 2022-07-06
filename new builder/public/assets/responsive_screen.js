$.fn.multiSizeScreen = function(el, options) {
  var screen = this,
    settings = $.extend({
      size: "iPhone",
      speed: "slow"
    }, options),
    options = options;
  if (settings.size === "iPhone") {
    screen.click(function(e) {
      var iPhone = $.extend({
        "width": "320px",
        "height": "620px",
        "padding": "80px 0",
        "border": "1px solid #AAA",
        "border-radius": "25px",
        "border": "1px"
      }, options);
      el.animate(iPhone, settings.speed);
    });
  }
  if (settings.size === "iPad") {
    screen.click(function(e) {
      var iPad = $.extend({
        "width": "640px",
        "height": "966px",
        "padding": "80px 0",
        "border-radius": "10",
        "border": "1px"
      }, options);
      el.animate(iPad, settings.speed);
    });
  }

  if (settings.size === "desktop") {
    screen.click(function(e) {
      var desktop = $.extend({
        "width": "1080px",
        "height": "720px",
        "border-radius": "0",
        "border": "1px",
        "padding": "30px 0 1px 0"
      }, options);
      el.animate(desktop, "slow");
    });
  }
  if (settings.size === "custom") {
    screen.click(function(e) {
      var custom = $.extend({
        "width": "320px",
        "height": "640px",
        "padding": "80px 0",
        "border-radius": "50px",
        "border": "1px"
      }, settings);
      el.animate(custom, settings.speed);
    });
  }
};