function registerUser() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var personNo = document.getElementById('personNumber').value;
    var response = { 'firstName' : firstName, 
                    'lastName' : lastName,
                    'personNumber' : personNo }
    var registrationUrl = '/registerUser';
    console.log(response);
    var successCallback = function (data) {
        console.log(data);
        $.toast("Successfully Registered")
        window.location = "/index.html";
    }
    $.ajax({
        type: "POST",
        url: registrationUrl,
        data: response,
        success: successCallback
    });
}