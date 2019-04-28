function onLoad() {
    console.log(localStorage.getItem("PersonNumber"));
    
    $('#login-number').text(localStorage.getItem("PersonNumber"));

    $.ajax({
        type: "POST",
        url: '/getPoints',
        data: {"personNumber": localStorage.getItem("PersonNumber")},
        success: function(data) {
            console.log(data.points);
            $('#login-points').text(data.points);
        }
    });
    
    if (localStorage.getItem("PersonNumber") == null) {
        window.location = "/index.html";
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

