//Initialize Firebase
var config = {
    apiKey: "AIzaSyC-_NURLWHz_EeLMhFeiEfhCLVNvq5ouH4",
    authDomain: "train-time-d0e00.firebaseapp.com",
    databaseURL: "https://train-time-d0e00.firebaseio.com",
    projectId: "train-time-d0e00",
    storageBucket: "train-time-d0e00.appspot.com",
    messagingSenderId: "153500848175"
};

firebase.initializeApp(config);

//title the new firebase database trainData
var trainData = firebase.database();

//on submit, gather trin name, destination, first arrival, and arrival frequency
$("#addTrainBtn").on("click",function(){
	event.preventDefault();
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("x");
	var frequency = $("#frequencyInput").val().trim();


	//create new train entry for database
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	//push gathered data into database
	trainData.ref().push(newTrain);

	//alert user database was updated
	alert("Train Added!");

	//clear input fields
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

})

//on submit, clear form data
$("#clearBtn").on("click",function(){
	event.preventDefault();
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");
})

//whenever database updates, gather last train entry details
trainData.ref().on("child_added", function(snapshot){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().frequency;
	var firstTrain = snapshot.val().firstTrain;

	//calcuate enxt arrival by initial time divided by arrival frequency
	var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes,"m").format("hh:mm A");
	
	console.log(remainder);
	console.log(minutes);
	console.log(arrival);

	//display these details into the database
	$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+ destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})
