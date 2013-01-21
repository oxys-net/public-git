$(document).ready(function() {
  $('button').button();
  $('button.issues').click(
      function() {
        $this = $(this);
        var state = ! $this.hasClass('active');
        var target = $this.data('target');
        var $target = $('#'+target);
        $target.toggle();
        console.log("---");
      }
  );
});