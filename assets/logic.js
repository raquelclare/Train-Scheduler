//console.log("hello");

// Initializing Database
$(document).ready(function() {
// Initialize firebase
var config = {
    apiKey: "AIzaSyB3Ry1Tq0-kkupYpWalYcsuBkfly2WuypY",
    authDomain: "train-scheduler-a9b92.firebaseapp.com",
    databaseURL: "https://train-scheduler-a9b92.firebaseio.com",
    projectId: "train-scheduler-a9b92",
    storageBucket: "train-scheduler-a9b92.appspot.com",
    messagingSenderId: "311217494084"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submitBtn").on("click", function() {

    event.preventDefault();
    // Creating variables to grab the input from the form
    var trainName 	= $("#train-name").val().trim();

    var destination = $("#destination").val().trim();
    // This is actually a time so I might need to change this
    var firstTrain 	= $("#first-train").val().trim();
    // This is also a time
    var frequency 	= $("#frequency").val().trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);
});
// Getting the references from the firebase database and creating "snapshots"
database.ref().on("child_added", function(snapshot) {
	// Calculate time for next arrival and has to dynamically update on the page

	// Calculate how many minutes away the next train is and has to dynamically update on the page
	var minAway = "";
	// Putting all variables into one variable called fields
	var fields = snapshot.val();

	// Key value pairs for the newTrain added
	var trainName 	= fields.trainName;
	var destination = fields.destination;
	var firstTrain 	= fields.firstTrain;
	var frequency 	= fields.frequency;

	// Dynamically creating table rows and table data with the values from the firebase
	var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + minAway + "</td></tr>");
	// Creating a body variable equal to the train data id so that we can push the newRow data onto the HTML!
	var body = ($("#train-data"));
	$(body).append(newRow);
})



});
