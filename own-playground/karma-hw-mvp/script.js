var $$ = {
  storeData: function() {
    localStorage["karma.data"] = JSON.stringify(this.data);
  },
  readData: function() {
    this.data = JSON.parse(localStorage["karma.data"]);
  },
  leaderboard: function() {
    return this.data.sort(this.compare);
  },
  compare: function (a, b){
    return b.points - a.points;
  },
  // modifyPointsFor(0, 2);
  modifyPointsFor: function(indexInArray, newPoints) {
    this.data[indexInArray].points = newPoints;
    this.storeData();
  },
  data: []
};

$(document).ready(function() {
  $$.readData();
  var sorted = $$.leaderboard();

  var $template = $(".person:first"), $clonedLi;
  var ppl = sorted.map(function(p, i) {
    $clonedLi = $template.clone().show();
    $clonedLi.data("order", i);
    $clonedLi.find(".name").text(p.name);
    $clonedLi.find(".points").text(p.points);
    $clonedLi.find("input").val(p.points);
    return $clonedLi;
  });

  $("#ppl").append(ppl);

  var person;

  $("#ppl")
  .on("dblclick", ".points", function() {
    $(this).hide('.points');
    $(this).siblings('.input:first').removeClass('hidden');
    person = $(this).parents(".person");
    console.log(person.data("order"));
  })
  .on("keyup", "input", function(event) {
    if (event.which === 13) {
      console.log("Enter");
      $('.input').addClass('hidden');
      $('.points').show('.input');
      var newPoints = $(this).val();
      console.log(newPoints);
      $$.modifyPointsFor(person.data("order"), newPoints);
      $('.points') === newPoints;
      window.location.reload();
    }

  });

});
