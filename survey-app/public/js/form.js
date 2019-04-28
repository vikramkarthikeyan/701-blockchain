function onLoad() {
    console.log(localStorage.getItem("PersonNumber"));
    if (localStorage.getItem("token") == null) {
        window.location = "/dashboard.html";
    }
}
function Onsubmit(){

    var entry=new Object();

    var brief=document.getElementById('reportEve').value;
    var inctype=document.getElementById('incident').value;
    var witness= document.getElementById('q3').value;
    var whereI= document.getElementById('where').value;
    var when= document.getElementById('when').value;

    var wit = new Boolean(false);

    if(witness.localeCompare("Yes")){
        wit = true;
    }
    else{
        wit = false;
    }
    
    entry.Brief=brief;
    entry.type=inctype;
    entry.witness=wit;
    entry.Where=whereI;
    entry.when=when;
    entry.personNumber = parseInt(localStorage.getItem("PersonNumber"));

    var entrySuccessCallback = function (data) {
        console.log(data);
        setTimeout(function() {
            window.localStorage.removeItem("PersonNumber");
            window.location = "/dashboard.html";    
        }, 2500);
        $.toast({
            heading: 'Thank you',
            text: 'We appreciate.'
        }) 
    }

    var eligibilitySuccessCallback = function (data) {
        $.ajax({
            type: "POST",
            url: '/addEntry',
            data: entry,
            success: entrySuccessCallback
        });
    }

    $.ajax({
                type: "POST",
                url: '/entryEligibilityCheck',
                data: entry,
                success: eligibilitySuccessCallback
    });


}
function Oncancel(){
    window.location='/dashboard.html';
}
function disableSubmit() {
    document.getElementById("submit").disabled = true;
   }
  
function activateButton(element) {
  
        if(element.checked) {
          document.getElementById("submit").disabled = false;
         }
         else  {
          document.getElementById("submit").disabled = true;
        }
  
}
