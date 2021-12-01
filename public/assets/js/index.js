// Elements using JQuery locators
var $noteTitleArea = $(".note-title");
var $noteTextArea = $(".note-textarea");
var $noteSaveButton = $(".save-note");
var $newNoteButton = $(".new-note");
var $NotesContainerListVal = $(".list-container .list-group");

var activeNotes = {};

// This function will get all notes currently within the data.js using the GET api notes route
var apiGetNotes = function () {
  return $.ajax({
    url: "/api/notes/",
    method: "GET"
  });
};

// This function will save current note within the data.js using the POST api notes route
var apiSaveNotes = function (note) {
  return $.ajax({
    url: "/api/notes/",
    data: note,
    method: "POST"
  });
};

// Still trying to figure out how to delete using the Delete API


// This function will render active note
var showActiveReadOnlyNotes = function () {
  $noteSaveButton.hide();

  if (activeNotes.id) {
    $noteTitleArea.attr("readonly", true);
    $noteTextArea.attr("readonly", true);
    $noteTitleArea.val(activeNotes.title);
    $noteTextArea.val(activeNotes.text);
  } else {
    $noteTitleArea.attr("readonly", false);
    $noteTextArea.attr("readonly", false);
    $noteTitleArea.val("");
    $noteTextArea.val("");
  }
};

// This function will render all notes in a list
var showAllNotesList = function (list) {
  $NotesContainerListVal.empty();
  var arrayNotes = [];

  for (var i = 0; i < list.length; i++) {
    var index = list[i];

    var $liList = $("<li class='list-group-item'>").data(index);
    var $spanVal = $("<span>").text(index.title);
    var $deleteButton = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $liList.append($spanVal, $deleteButton);
    arrayNotes.push($liList);
  }

  $NotesContainerListVal.append(arrayNotes);
};

// This function will capture note and save it, then render it
var saveNoteTrigger = function () {
  var newNote = {
    title: $noteTitleArea.val(),
    text: $noteTextArea.val()
  };

  apiSaveNotes(newNote).then(function (data) {
    sideBarShowNotes();
    showActiveReadOnlyNotes();
  });
};


// This function will display the active note
var viewNoteTrigger = function () {
  activeNotes = $(this).data();
  showActiveReadOnlyNotes();
};

// This function will display new active note
var viewNewNoteTrigger = function () {
  activeNotes = {};
  showActiveReadOnlyNotes();
};

// This function will hide the save button based on note input condition
var hideShowSaveButton = function () {
  if (!$noteTitleArea.val().trim() || !$noteTextArea.val().trim()) {
    $noteSaveButton.hide();
  } else {
    $noteSaveButton.show();
  }
};



// This function will get notes and show on side bar
var sideBarShowNotes = function () {
  return apiGetNotes().then(function (data) {
    showAllNotesList(data);
  });
};

$noteSaveButton.on("click", saveNoteTrigger);
$NotesContainerListVal.on("click", ".list-group-item", viewNoteTrigger);
$newNoteButton.on("click", viewNewNoteTrigger);
$noteTitleArea.on("keyup", hideShowSaveButton);
$noteTextArea.on("keyup", hideShowSaveButton);

// Show all notes
sideBarShowNotes();
