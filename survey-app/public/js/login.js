function login() {
    debugger;
    var personNo = document.getElementById('personNumber').value;
    var response = {'personNumber' : personNo }
    var loginUrl = '/login';
    console.log(response);
    var successCallback = function (data) {
        console.log(data);
        $.toast("Successfully Logged in");
        window.localStorage.setItem("token",personNo);
        window.location = "/dashboard.html";
    }
    $.ajax({
        type: "POST",
        url: loginUrl,
        data: response,
        success: successCallback
    });
}