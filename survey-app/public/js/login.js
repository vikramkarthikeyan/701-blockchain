function loginWithPersonNumber() {
    // debugger;
    var personNo = document.getElementById('personNumber').value;
    var request = {'personNumber' : personNo }
    var loginUrl = '/login';

    console.log("Login request:",request);

    var successCallback = function (data) {
        console.log(data);
        window.localStorage.setItem("PersonNumber", personNo);
        window.location = "/dashboard.html";
    }

    $.ajax({
        type: "POST",
        url: loginUrl,
        data: request,
        success: successCallback
    });

}