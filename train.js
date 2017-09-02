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

var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
	event.preventDefault();
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("x");
	var frequency = $("#frequencyInput").val().trim();

	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	trainData.ref().push(newTrain);

	alert("Train Added!");

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");

})

trainData.ref().on("child_added", function(snapshot){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().frequency;
	var firstTrain = snapshot.val().firstTrain;

	var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes,"m").format("hh:mm A");
	
	console.log(remainder);
	console.log(minutes);
	console.log(arrival);

	$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+ destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})
