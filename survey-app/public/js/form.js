function onLoad() {
    console.log(localStorage.getItem("PersonNumber"));
    if (localStorage.getItem("PersonNumber") == null) {
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

        // Algorithm:
        // Step 1: Convert mongo's ID field to a hex string using web3
        // Step 2: convert that hex string to hex int 
        // Step 3: Get previous hex string for the user
        // Step 4: Add this hex int to the hex int of the user
        // Step 5: Convert to hex string back and store. 
        // web3.fromDecimal(parseInt(web3.fromAscii(data.objectId)) + parseInt(web3.fromAscii(data.objectId)))
        calculateUserHash(data.objectId);

        setTimeout(function() {
            window.location = "/dashboard.html";    
        }, 2500000);
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

function Oncancel() {
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

function calculateUserHash(currentHash) {

    $.ajax({
        type: "POST",
        url: '/getUserHash',
        data: {'personNumber': parseInt(localStorage.getItem("PersonNumber"))},
        success: function(response) {
            var previousHash = response.userHash;

            if(previousHash === "") {
                previousHash = "0x00"
            }

            var newHash = parseInt(currentHash, 16) + parseInt(previousHash, 16);

            newHash = newHash.toString(16)

            console.log(previousHash, currentHash, newHash);
            
            updateUserHash(newHash);
        },
        error: function(error) {
            alert('Failed to compute user hash!');
        }
    });
}


function updateUserHash(newHash) {
    console.log("In update new hash:",newHash);
    $.ajax({
        type: "POST",
        url: '/updateUserHash',
        data: {'personNumber': parseInt(localStorage.getItem("PersonNumber")), 'hash': '0x' + newHash},
        success: function(response) {
            console.log("HASH UPDATED!");
        },
        error: function(error) {
            alert('Failed to compute user hash!');
        }
    });
}
