function loginWithPersonNumber() {
    // debugger;
    var personNo = document.getElementById('personNumber').value;
    var request = {'personNumber' : personNo }
    var loginUrl = '/login';

    console.log("Login request:",request);

    // var successCallback = function (data) {
    //     console.log(data);
    //     $.toast("Successfully Logged in");
    //     window.localStorage.setItem("token",personNo);
    //     window.location = "/dashboard.html";
    // }

    $.ajax({
        type: "POST",
        url: loginUrl,
        data: request,
        success: function(data) {
            console.log("LOGGED IN SUCCESSFULLY!!!");
        }
    });

}