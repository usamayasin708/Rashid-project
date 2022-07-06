// Code goes here

(function () {
    $(function(){
      var frame = $('#frame'),
          big = $('#big-screen').multiSizeScreen(frame, {
              size: "desktop"
          }),
          medium = $('#medium-screen').multiSizeScreen(frame, {
              size: "iPad"
          }),
          small = $('#small-screen').multiSizeScreen(frame, {
              size: "iPhone"
          }),
          custom = $('#custom-screen').multiSizeScreen(frame, {
            size: "custom",
            "width": "360px",
            "height": "640px",
            "padding": "35px 0"
          })
    });
})();