$(document).ready(function() {

  $("form").submit(function() {
    return false;
  }); //to ensure that form doiesn't refresh page

  $("input").keyup(function(enter) {
    if (enter.keyCode == 13) {
      $(".search").click();
    }
  }); //to accept enter instead of click

  $("#search").on("click", function() {
    var term = $("input").val(),
      url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
      term +
      "&callback=?";

    if (term === "") {
      alert("Please enter a valid search term");
    }

    $("#return").html(""); //to clear the previous search queries

    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(search) {
        console.log(search);

        var term, desc, link;
        if (search[2].length >= 1) {
          for (var i = 0; i < search[1].length; i++) {
            term = search[1][i];
            desc = search[2][i].slice(0, 250) + "...";
            link = search[3][i];

            var refer = desc.slice(desc.length - 16, desc.length); //I hate when may refer to comes

            if (desc !== "..." && refer !== "may refer to:...") {
              //to eliminate blank descriptions and 'may refer to'

              $("#return").append(
                "<div class='col-lg-4 col-sm-6 col-md-6 result-box'><a href=" +
                link +
                " target='_blank'><div id='inner'>" +
                term +
                "<br>" +
                desc +
                "</div></div></a>"
              );
            } //if ends
          }
        } else {
          alert("Invalid search term");
        } //for ends
      } //success: ends
    }); //ajax ends
  }); //random article button
}); //document ready ends
