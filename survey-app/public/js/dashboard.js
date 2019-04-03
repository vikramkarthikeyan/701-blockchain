var entry = {}
function onLoad() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
        window.location = "/index.html";
    }
}

function addCourseno(){
    var ques1=document.getElementById('ques1');
    var courseblock= document.getElementById('addCourseno');
    ques1.style.display='block';
    courseblock.style.display='none';

    var courseno= document.getElementById('courseNumber').value;
    answer['course_number']= courseno;

}

function addq1(){   
    
    var ques1=document.getElementById('ques1');
    var ques2= document.getElementById('ques2');

    ques2.style.display='block';
    ques1.style.display='none';

    var answer=$("input[name=radio1]:checked").val();
    entry["1"] = answer;
    
}

function addq2(){
    var ques2=document.getElementById('ques2');
    var ques3= document.getElementById('ques3');
    ques3.style.display='block';
    ques2.style.display='none';

    var answer=$("input[name=radio2]:checked").val();
    entry["2"]= answer;

   
}

function addq3(){
    var ques3=document.getElementById('ques3');
    var ques4= document.getElementById('ques4');
    ques4.style.display='block';
    ques3.style.display='none';

    var answer=$("input[name=radio3]:checked").val();
    var response={'3':answer};
    
    console.log(response);

    entry["3"]= answer;

    
}

function addq4(){
    var ques4=document.getElementById('ques4');
    var ques5= document.getElementById('ques5');
    ques5.style.display='block';
    ques4.style.display='none';

    var answer=$("input[name=radio4]:checked").val();
    
    entry["4"]= answer;
    
}

function addq5(){
    var ques5=document.getElementById('ques5');
    var ques6= document.getElementById('ques6');
    ques6.style.display='block';
    ques5.style.display='none';

    var answer=$("input[name=radio5]:checked").val();
    var response={'5':answer};
    
    entry["5"]= answer;

   
}

function addq6(){
    var ques6=document.getElementById('ques6');
    var feedback= document.getElementById('survey_feedback');
    feedback.style.display='block';
    ques6.style.display='none';

    var answer=$("input[name=radio1]:checked").val();
    var response={'6':answer};
  
    entry["6"]= answer;

    
}

function feedback() {
    var feed=document.getElementById('survey_feedback');
    var answer=document.getElementById('s_feedback').value;
    var response={'6':answer};
    var userUrl = '/addEntry';
    console.log(response);
    entry["survey"]= answer;
    console.log(entry);
    var successCallback = function (data) {
        console.log(data);
        setTimeout(function() {
            window.localStorage.removeItem("token");
            window.location = "/index.html";    
        }, 2500);
        $.toast({
            heading: 'Thank you',
            text: 'We appreciate your feedback.'
        })

    }
    $.ajax({
        type: "POST",
        url: userUrl,
        data: entry,
        success: successCallback
    });
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