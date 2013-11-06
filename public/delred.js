

(function () {
    function success () {
        document.body.bgColor = "#0f0";
    }

    function error (msg) {
        document.body.bgColor = "#f00";
        document.getElementById("error").textContent = msg;
    }
    
    function runDelRed () {
        console.log("running");
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/delred");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                try {
                    var res = JSON.parse(xhr.responseText);
                    if (res.ok) success();
                    else error(res.error);
                }
                catch (e) {
                    error("Exception " + e);
                }
            }
        };
        xhr.send();
    }
    
    document.getElementById("delred").onclick = runDelRed;
}());


