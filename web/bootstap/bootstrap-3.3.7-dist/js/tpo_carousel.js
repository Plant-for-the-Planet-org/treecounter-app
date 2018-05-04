$(document).ready(function() {
  //$('#tpo_project').carousel({ interval: 7000 });
  $('#tpo_project .tpoProject:first').addClass('active');
  $('#tpo_project .tpoProject').each(function() {
    var itemToClone3 = $(this);
    for (var i = 1; i < 4; i++) {
      itemToClone3 = itemToClone3.next();

      // wrap around if at end of item collection
      if (!itemToClone3.length) {
        itemToClone3 = $(this).siblings(':first');
      }

      // grab item, clone, add marker class, add to collection
      itemToClone3
        .children(':first-child')
        .clone()
        .addClass('cloneditemNew-' + i)
        .appendTo($(this));
    }
  });
});
