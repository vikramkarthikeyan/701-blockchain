function onLoad() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
        window.location = "/dashboard.html";
    }
}
function Onsubmit(){
    var userUrl = '/addEntry';
    var obj=new Object();

    // debugger;

    var brief=document.getElementById('reportEve').value;
    var inctype=document.getElementById('incident').value;
    var witness= document.getElementById('q3').value;
    var whereI= document.getElementById('where').value;
    var when= document.getElementById('when').value;

    var wit=new Boolean(false);

    if(witness.localeCompare("Yes")){
        wit=true;
    }
    else{
        wit=false;
    }

    
    obj.Brief=brief;
    obj.type=inctype;
    obj.witness=wit;
    obj.Where=whereI;
    obj.when=when;

    var entry=JSON.stringify(obj);

    console.log(entry);

    var successCallback = function (data) {
                console.log(data);
                setTimeout(function() {
                    window.localStorage.removeItem("token");
                    window.location = "/dashboard.html";    
                }, 2500);
                $.toast({
                    heading: 'Thank you',
                    text: 'We appreciate.'
                })
        
    }
    $.ajax({
                type: "POST",
                url: userUrl,
                data: entry,
                success: successCallback
            });


}
