function onLoad() {
    console.log(localStorage.getItem("PersonNumber"));
    
    $('#login-number').text(localStorage.getItem("PersonNumber"));

    $.ajax({
        type: "POST",
        url: '/getPoints',
        data: { "personNumber": localStorage.getItem("PersonNumber") },
        success: function(data) {
            console.log(data.points);
            userPoints = data.points;
            $('#login-points').text(data.points);
        },
        error: function(data) {
            $('#login-points').text("BANNED");
        }
    });
    
    if (localStorage.getItem("PersonNumber") == null) {
        window.location = "/index.html";
    }

}

var userPoints = 0;

function redeemPoints() {

    if(userPoints == 0) {
        alert("You have no points to redeem! Report events to earn points.")
    } else {
        $.ajax({
            type: "POST",
            url: '/redeemPoints',
            data: { "personNumber": localStorage.getItem("PersonNumber"), "points": userPoints },
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                alert('This user cannot redeem points! Contact support@survey.buffalo.edu')
            }
        });
    }
}

function ReportForm(){
    window.location="form.html";
}

function activate(link) {
    if (link === 'feedback') {
        for (var i = 1; i < 7; i++)
            document.getElementById('ques'+i).style.display = 'none';
        document.getElementById('survey_feedback').style.display = 'block';
        document.getElementById('addCourseno').style.display='none';
    }
    else {
        document.getElementById("survey_feedback").style.display = 'none';
        for (var i = 1; i < 7; i++)
            document.getElementById('ques'+i).style.display = 'none';
        document.getElementById('ques'+link).style.display = 'block';
        document.getElementById('addCourseno').style.display='none';
    }   
}

function onView(){
    document.getElementById('Report').style.display='none';
    document.getElementById('Validate').style.display='none';
    document.getElementById('View').style.display='none';
    document.getElementById('myview').style.display='block'
}

function addRow(tableId, data){
    let tableRef= document.getElementById(tableId);
    let newRow = tableRef.insertRow(-1);

    
    let newCell = newRow.insertCell(0);

    
    let newText = document.createTextNode(data);
    newCell.appendChild(newText);
}

function removeUserEntry() {
    window.localStorage.removeItem("PersonNumber");
}