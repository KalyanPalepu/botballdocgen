/************************************************UTIL************************************************/
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Date.daysBetween = function(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    var convertedDifference = Math.round(difference_ms / one_day);
    return convertedDifference;
}

function getAddedDate(dateOld, increment) {
    //adds increment to date and returns it
    var date = new Date(dateOld.getFullYear(), dateOld.getMonth(), dateOld.getDate());
    date.setDate(date.getDate() + increment)
    return date
}

function makeTextDate(date) {
    return "<strong>" + " [Due " + String(date.getMonth() + 1) + "/" + String(date.getDate()) + "]" + "</strong>"
}

/************************************************PROGRAM************************************************/
function init() {
    var startDateStringArray = document.getElementById("startDate").value.split("-");
    var endDateStringArray = document.getElementById("endDate").value.split("-");
    var teamName = document.getElementById("teamName").value;
    var teamNumber = document.getElementById("teamNumber").value;
    var region = document.getElementById("region").value;
    var legoRobotAbility = " " + document.getElementById("legoRobotAbility").value;
    var createRobotAbility = " " + document.getElementById("createRobotAbility").value;
    var startDate = new Date(startDateStringArray[0], startDateStringArray[1] - 1, startDateStringArray[2]);
    var endDate = new Date(endDateStringArray[0], endDateStringArray[1] - 1, endDateStringArray[2]);
    var gameGoalDates = generateGameGoalDates(startDate, endDate);
    var robotGoalDates = generateRobotGoalDates(gameGoalDates[1], endDate);
    var programmingGoalDates = generateProgrammingGoalDates(gameGoalDates[1], endDate);
    var firstPeriodDueDateStringArray = document.getElementById("firstPeriodDueDate").value.split("-")
    var secondPeriodDueDateStringArray = document.getElementById("secondPeriodDueDate").value.split("-")
    var thirdPeriodDueDateStringArray = document.getElementById("thirdPeriodDueDate").value.split("-")
    var firstPeriodDueDate = new Date(firstPeriodDueDateStringArray[0], firstPeriodDueDateStringArray[1] - 1, firstPeriodDueDateStringArray[2]);
    var secondPeriodDueDate = new Date(secondPeriodDueDateStringArray[0], secondPeriodDueDateStringArray[1] - 1, secondPeriodDueDateStringArray[2]);
    var thirdPeriodDueDate = new Date(thirdPeriodDueDateStringArray[0], thirdPeriodDueDateStringArray[1] - 1, thirdPeriodDueDateStringArray[2]);
    var documentationGoalDates = [startDate, firstPeriodDueDate, secondPeriodDueDate, thirdPeriodDueDate];
    generateHeader(teamName, teamNumber, region);
    generateGameGoal(gameGoalDates);
    generateRobotGoal(robotGoalDates, legoRobotAbility, createRobotAbility, documentationGoalDates);
    generateProgrammingGoal(programmingGoalDates, legoRobotAbility, createRobotAbility, documentationGoalDates);
    generateDocumentationGoal(documentationGoalDates);
    generateMisc();
    /*console.log("GGD:");
    console.log(gameGoalDates);
    console.log("RGD:");
    console.log(robotGoalDates);
    console.log("PGD:");
    console.log(programmingGoalDates); */
}

function generateGameGoalDates(startDateOld, endDateOld) {
    var endDate = new Date(endDateOld.getFullYear(), endDateOld.getMonth(), endDateOld.getDate());
    var startDate = new Date(startDateOld.getFullYear(), startDateOld.getMonth(), startDateOld.getDate());
    var totalDays = Date.daysBetween(startDate, endDate);
    endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    var endDateIncreased = Math.floor(totalDays / 4) + endDate.getDate();
    endDate.setDate(endDateIncreased);
    var dates = [startDate, endDate];
    return dates;
}

function generateRobotGoalDates(startDateOld, endDateOld) {
    var endDate = new Date(endDateOld.getFullYear(), endDateOld.getMonth(), endDateOld.getDate());
    var startDate = new Date(startDateOld.getFullYear(), startDateOld.getMonth(), startDateOld.getDate());
    var totalDays = Date.daysBetween(startDate, endDate);
    var endDateDecreased = endDate.getDate() - Math.round(totalDays / 8) + randomInt(0, 3);
    endDate.setDate(endDateDecreased);
    var dates = [startDate, endDate];

    return dates;
}

function generateProgrammingGoalDates(startDateOld, endDateOld) {
    var endDate = new Date(endDateOld.getFullYear(), endDateOld.getMonth(), endDateOld.getDate());
    var startDate = new Date(startDateOld.getFullYear(), startDateOld.getMonth(), startDateOld.getDate());
    var totalDays = Date.daysBetween(startDate, endDate);
    var endDateDecreased = endDate.getDate() - Math.round(totalDays / 8) + randomInt(0, 3);
    endDate.setDate(endDateDecreased);
    var dates = [startDate, endDate];

    return dates;
}

function generateHeader(teamName, teamNumber, region) {
    var generatedHeader = [];
    generatedHeader.push(teamName);
    generatedHeader.push(teamNumber);
    generatedHeader.push(region);
    document.getElementById("firstTitle").innerHTML = "<h1>Goals and Tasks for Botball 2015<h1>";
    document.getElementById("header").innerHTML = generatedHeader.join("<br>");
}

function generateGameGoal(gameGoalDates){
    var generatedGameGoal = [];
    var totalDays = Date.daysBetween(gameGoalDates[0], gameGoalDates[1]);
    generatedGameGoal.push("<ul>")
    generatedGameGoal.push("Construct Board" + makeTextDate(gameGoalDates[1]) + "<ul>");
    generatedGameGoal.push("Buy and cut PVC" + makeTextDate(getAddedDate(gameGoalDates[0], totalDays / 2)));
    generatedGameGoal.push("Assemble a team to make the board" + makeTextDate(getAddedDate(gameGoalDates[0], 1)) + "</ul>");
    generatedGameGoal.push("Go over game review and discuss strategy" + makeTextDate(getAddedDate(gameGoalDates[0], (totalDays / 2) - 1)) + "<ul>");
    generatedGameGoal.push("Study game review as a group" + makeTextDate(getAddedDate(gameGoalDates[0], (totalDays / 2) - 2)));
    generatedGameGoal.push("Toss around and critique ideas for robots" + makeTextDate(getAddedDate(gameGoalDates[0], (totalDays / 2) - 1)) + "</ul>");
    generatedGameGoal.push("Start work on robots" + makeTextDate(getAddedDate(gameGoalDates[0], Math.floor((totalDays / 4) * 3))) + "<ul>");
    generatedGameGoal.push("Present ideas" + makeTextDate(getAddedDate(gameGoalDates[0], Math.floor((totalDays / 4) * 3) - 2)));
    generatedGameGoal.push("Form groups for executing certain ideas" + makeTextDate(getAddedDate(gameGoalDates[0], Math.floor((totalDays / 4) * 3) - 1)) + "</ul>");
    document.getElementById("gameGoalTitle").innerHTML = "<h2> Game Goals </h2>"
    document.getElementById("gameGoal").innerHTML = generatedGameGoal.join("<li>")
}

function generateRobotGoal(robotGoalDates, legoRobotAbility, createRobotAbility, documentationGoalDates){
    var generatedRobotGoal = [];
    var totalDays = Date.daysBetween(robotGoalDates[0], robotGoalDates[1]);
    generatedRobotGoal.push("<ul>");
    generatedRobotGoal.push("Make a Lego robot that" + legoRobotAbility + makeTextDate(getAddedDate(robotGoalDates[1], -10)) + "<ul>");
    generatedRobotGoal.push("Build robot" + makeTextDate(getAddedDate(robotGoalDates[0], Math.floor(((totalDays - 10) / 3) * 2))));
    generatedRobotGoal.push("Work out bugs" + makeTextDate(getAddedDate(robotGoalDates[1], -10)) + "</ul>")
    generatedRobotGoal.push("Make a Create robot that" + createRobotAbility + makeTextDate(getAddedDate(robotGoalDates[1], -10)) + "<ul>");
    generatedRobotGoal.push("Build robot" + makeTextDate(getAddedDate(robotGoalDates[0], Math.floor(((totalDays - 10) / 3) * 2))));
    generatedRobotGoal.push("Work out bugs" + makeTextDate(getAddedDate(robotGoalDates[1], -10)) + "</ul>")
    generatedRobotGoal.push("Adjust robots based on tests" + makeTextDate(documentationGoalDates[2]) + "<ul>");
    generatedRobotGoal.push("Adjust Lego Robot" + makeTextDate(getAddedDate(documentationGoalDates[2], -4)));
    generatedRobotGoal.push("Adjust Create Robot" + makeTextDate(getAddedDate(documentationGoalDates[2], -2)));
    document.getElementById("robotGoalTitle").innerHTML = "<h2> Robot Goals </h2>";
    document.getElementById("robotGoal").innerHTML = generatedRobotGoal.join("<li>");
}

function generateProgrammingGoal(programmingGoalDates, legoRobotAbility, createRobotAbility, documentationGoalDates){
    var generatedProgrammingGoal = [];
    var totalDays = Date.daysBetween(programmingGoalDates[0], programmingGoalDates[1]);
    generatedProgrammingGoal.push("<ul>");
    generatedProgrammingGoal.push("Program the Lego robot so that it" + legoRobotAbility + makeTextDate(getAddedDate(programmingGoalDates[1], -10)) + "<ul>");
    generatedProgrammingGoal.push("Teach new members about basic Lego robot functions (e.g. mav()) " + makeTextDate(getAddedDate(programmingGoalDates[0], Math.floor(totalDays / 3))));
    generatedProgrammingGoal.push("Write the routine for the robot to follow" + makeTextDate(getAddedDate(programmingGoalDates[1], -10)) + "</ul>")
    generatedProgrammingGoal.push("Program the Create robot so that it" + createRobotAbility + makeTextDate(getAddedDate(programmingGoalDates[1], -10)) + "<ul>");
    generatedProgrammingGoal.push("Teach new members about basic Create robot functions (e.g. create_drive_straight())" + makeTextDate(getAddedDate(programmingGoalDates[0], Math.floor(totalDays / 3))));
    generatedProgrammingGoal.push("Write the routine for the robot to follow" + makeTextDate(getAddedDate(programmingGoalDates[1], -10)) + "</ul>");
    generatedProgrammingGoal.push("Adjust Program for robots based on tests" + makeTextDate(documentationGoalDates[2]) + "<ul>");
    generatedProgrammingGoal.push("Adjust Lego robot program" + makeTextDate(getAddedDate(documentationGoalDates[2], -4)));
    generatedProgrammingGoal.push("Adjust Create robot program" + makeTextDate(getAddedDate(documentationGoalDates[2], -2)));
    document.getElementById("programmingGoalTitle").innerHTML = "<h2> Progrramming Goals </h2>";
    document.getElementById("programmingGoal").innerHTML = generatedProgrammingGoal.join("<li>")
}

function generateDocumentationGoal(documentationGoalDates){
    var generatedDocumentationGoal = [];
    var totalDays = Date.daysBetween(documentationGoalDates[0], documentationGoalDates[3]);
    generatedDocumentationGoal.push("<ul>")
    generatedDocumentationGoal.push("Write Period 1 Documentation" + makeTextDate(documentationGoalDates[1]) + "<ul>")
    generatedDocumentationGoal.push("Discuss goals and plans" + makeTextDate(documentationGoalDates[0]));
    generatedDocumentationGoal.push("Edit and submit final copy" + makeTextDate(documentationGoalDates[1]) + "</ul>")
    generatedDocumentationGoal.push("Write Period 2 Documentation" + makeTextDate(documentationGoalDates[2]) + "<ul>")
    generatedDocumentationGoal.push("Perform test runs for data" + makeTextDate(getAddedDate(documentationGoalDates[1], 4)));
    generatedDocumentationGoal.push("Edit and submit final copy" + makeTextDate(documentationGoalDates[2]) + "</ul>")
    generatedDocumentationGoal.push("Write Period 3 Documentation" + makeTextDate(documentationGoalDates[3]) + "<ul>")
    generatedDocumentationGoal.push("Poll team members about lessons that they learned over the season" + makeTextDate(getAddedDate(documentationGoalDates[2], 4)));
    generatedDocumentationGoal.push("Edit and submit final copy" + makeTextDate(documentationGoalDates[3]) + "</ul>")
    
    document.getElementById("documentationGoalTitle").innerHTML = "<h2> Documentation Goals </h2>"
    document.getElementById("documentationGoal").innerHTML = generatedDocumentationGoal.join("<li>")
}

function generateMisc(){
    document.getElementById("misc").style.display = "block"
}