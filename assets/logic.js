console.log("hello");

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


$("#submitBtn").on("click", function(event) {

    event.preventDefault();
    // Creating variables to grab the input from the form
    var trainName 	= $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain 	= $("#first-train").val().trim();
    var frequency 	= $("#frequency").val().trim();

    // Converting the time input into moment.js and pushing back 1 year to make sure it comes before current time
    var timeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(timeConverted);
    // Current time
    var currentTime = moment();
    // Getting the difference between current time and the timeConverted
    var diffTime = currentTime.diff(moment(timeConverted), "minutes");
    console.log(diffTime);
    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);
    // Minutes left until next train
   	var minTillTrain = frequency - remainder;
   	// Next train arrival time
   	var nextTrain = currentTime.add(minTillTrain, "minutes");
   	nextTrain = moment(nextTrain).format("hh:mm");

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minTillTrain: minTillTrain,
        nextTrain: nextTrain
    };

    database.ref().push(newTrain);
});
// Getting the references from the firebase database and creating "snapshots"
database.ref().on("child_added", function(snapshot, prevChildKey) {
	// Putting all variables into one variable called fields
	var fields = snapshot.val();

	// Key value pairs for the newTrain added
	var trainName 	= fields.trainName;
	var destination = fields.destination;
	var firstTrain 	= fields.firstTrain;
	var frequency 	= fields.frequency;
	var nextArrival = fields.nextTrain;
	var minAway 	= fields.minTillTrain; 

	// Dynamically creating table rows and table data with the values from the firebase
	var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
	// Creating a body variable equal to the train data id so that we can push the newRow data onto the HTML!
	var body = ($("#train-data"));
	$(body).append(newRow);
})

});
