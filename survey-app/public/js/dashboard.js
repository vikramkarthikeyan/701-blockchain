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

function redeemPoints(points) {

    if(userPoints < points) {
        alert("You have no points to redeem! Report events to earn points.")
    } else {
        $.ajax({
            type: "POST",
            url: '/redeemPoints',
            data: { "personNumber": localStorage.getItem("PersonNumber"), "points": points },
            success: function(data) {
                console.log(data);
                $('#viewModal').modal('hide');
                onView();
            },
            error: function(data) {
                alert('This user cannot redeem points! Contact support@survey.buffalo.edu')
            }
        });
    }
}

function redeemView(){
    if(userPoints < 5){
        alert("You have no points to View data!")
    }
    else{
        redeemPoints(5);
        // onView();
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
    document.getElementById('View').style.display='none';
    document.getElementById('myview').style.display='block';

    $.ajax({
        type: "POST",
        url: '/getAllIncidents',
        data: {},
        success: function(response) {
            $('#my_table').DataTable( {
                data: response,
                "columns": [
                    {"data": "_id"},
                    {"data": "type"},
                    {"data": "witness"},
                    {"data": "Where"},
                    {"data": "when"},
                    {"data": "Brief"}
                ]
            } );
        },
        error: function(data) {
            alert('Data fetch failed....');
        }
    });
    
    
}

function goBack() {

    document.getElementById('myview').style.display='none';
    $('#Report').toggle();
    $('#View').toggle();

}
function removeUserEntry() {
    window.localStorage.removeItem("PersonNumber");
}
