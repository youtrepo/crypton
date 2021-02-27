(function ($) {
  $.extend({
    playSound: function () {
      return $(
        '<audio class="sound-player" autoplay="autoplay" style="display:none;">'
        + '<source src="' + arguments[0] + '" />'
        + '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>'
        + '</audio>'
      ).appendTo('body');
    },
    stopSound: function () {
      $(".sound-player").remove();
    }
  });
})(jQuery);
