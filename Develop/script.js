// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

console.log(this)

$(function () {
  var eventText = $("#description");
  var saveBtn = $("#saveBtn");
  var currentDate = $("#currentDay");
  var pastTime = $("#past");
  var presentTime = $("#present");
  var futureTime = $("#future");

  // Display current date
  var today = dayjs();
  currentDate.text(today.format('MMM D, YYYY'));

  // Define the start and end hours to loop through
  const startHour = 9; // Start at 9AM
  const endHour = 17; // End at 5PM (17:00)

  // Loop through the hours and create a time block for each
  for (let i = startHour; i <= endHour; i++) {
    var timeBlockEl = timeBlock(i);
    $(".container-fluid").append(timeBlockEl);
  }

  function timeBlock(hour) {
    var currentTime = dayjs().hour();
    function hourFormat(hour) {
      return dayjs().hour(hour).format('h A');
    }
    var timeBlockEl = $("<div>").attr("id", "hour-" + hour).addClass("row time-block");
    var hourEl = $("<div>").addClass("col-2 col-md-1 hour py-3").text(hourFormat(hour));
    var descriptionEl = $("<textarea>").addClass("col-8 col-md-10 description");
    var saveBtnEl = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
                                  .html("<i class='fas fa-save' aria-hidden='true'></i>");

    var savedDescription = localStorage.getItem("hour-" + hour);
    if (savedDescription) {
      descriptionEl.val(savedDescription);
    }

    if (hour < currentTime) {
      timeBlockEl.addClass("past");
    } else if (hour === currentTime) {
      timeBlockEl.addClass("present");
    } else {
      timeBlockEl.addClass("future");
    }

    timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);
    return timeBlockEl;
  }

  saveBtn.on("click", function() {
    var hour = $(this).parent().attr("id").replace("hour-", "");
    var description = $(this).siblings(eventText).val();
    localStorage.setItem("hour-" + hour, description);
  });

  for (let i = startHour; i <= endHour; i++) {
    var description = localStorage.getItem("hour-" + i);
    if (description) {
      $("#hour-" + i + " .description").val(description);
    }
  }
});

/*$(function () {
  var eventText = $("#description");
  var saveBtn = $("#saveBtn");
  var currentDate = $("#currentDay");
  var pastTime = $("#past");
  var presentTime = $("#present");
  var futureTime = $("#future");

  
  var today = dayjs();
  currentDate.text(today.format('MMM D, YYYY'));



  // Define the start and end hours to loop through
  const startHour = 9; // Start at 9AM
  const endHour = 17; // End at 5PM (17:00)



  // Loop through the hours and create a time block for each
  for (let i = startHour; i <= endHour; i++) {
        var timeBlockEl = timeBlock(i);
        $(".container-fluid").append(timeBlockEl);
      }

      function timeBlock(hour) {
        var currentTime = dayjs().hour();
        function hourFormat(hour) {
          return dayjs().hour(hour).format('h A');
        }
        var timeBlockEl = $("<div>").attr("id", "hour-" + hour).addClass("row time-block");
        var hourEl = $("<div>").addClass("col-2 col-md-1 hour py-3").text(hourFormat(hour));
        var descriptionEl = $("<textarea>").addClass("col-8 col-md-10 description");
        var saveBtnEl = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
                                      .html("<i class='fas fa-save' aria-hidden='true'></i>");

        

        var savedDescription = localStorage.getItem(hour);
        if (savedDescription) {
          descriptionEl.val(savedDescription);
        }


      
        if (hour < currentTime) {
          timeBlockEl.addClass("past");
        } else if (hour === currentTime) {
          timeBlockEl.addClass("present");
        } else {
          timeBlockEl.addClass("future");
        }


      
        timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);
        return timeBlockEl;
        }




      saveBtn.on("click", function() {
        var hour = $(this).parent().attr("id").replace("hour-", "");
        var description = $(this).siblings(eventText).val();
        localStorage.setItem(hour, description);
      });



      for (let i = startHour; i <= endHour; i++) {
        var description = localStorage.getItem(i);
        if (description) {
          $("#hour-" + i + " .description").val(description);
        }
      }
  


    

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
*/