// Grab the articles as a json
$.getJSON("/headlines", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#headlines").append("<p class=headline-title data-id='" + data[i]._id + "'>" + data[i].title + "</p>" + "<a href='" + data[i].link +"'target=blank>" + data[i].link + "</a>");
    $("#headlines").append("<button class=comment-button data-id='" + data[i]._id + "'>COMMENTS</button>");
  }
});

$(document).on("click", ".scrape-button", function(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(){
    location.reload();
  })
})


// Whenever someone clicks a comment button
$(document).on("click", ".comment-button", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the comment button
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/headlines/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      const noteArray = data.notes;
      noteArray.forEach(function(id){
        $.ajax({
          method: "GET",
          url: "/notes/"+ id
        }).then(function(note){
          $("#notes").append("<h5>User: " + note.user + "</h5>");
          $("#notes").append("<h5>Comment: " + note.body + "</h5>");
        })
      })
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='userinput' name='user' placeholder=' Name'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' placeholder=' Comment' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Add comment</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='closenote'>Close</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

//button to close comments box
$(document).on("click", "#closenote", function (){
  $("#notes").empty();
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  if (($("#userinput").val()) && ($("#bodyinput").val())){
  $.ajax({
    method: "POST",
    url: "/headlines/" + thisId,
    data: {
      // Value taken from title input
      user: $("#userinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
      $("#titleinput").val("");
      $("#bodyinput").val("");
    }); 
  }else{
    swal("Oops!", 'Please enter your name and a comment', 'warning');
  }
});
  
