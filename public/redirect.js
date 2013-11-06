

(function () {
    
    var codes = [301, 302, 303, 307, 308]
    ,   methods = "POST PUT DELETE".split(" ") // not testing HEAD or GET
    ,   output = {}
    ;
    
    function format () {
        var out = [];
        for (var i = 0, n = codes.length; i < n; i++) {
            var code = codes[i];
            out.push(code + ":");
            for (var j = 0, m = methods.length; j < m; j++) {
                var method = methods[j]
                ,   got = output[method + code]
                ,   result
                ;
                if (got === null) result = "no response body";
                else result = got ? "OK" : "changed";
                out.push("    " + method + ": " + result);
            }
        }
        document.getElementById("log").textContent = out.join("\n");
    }

    function request (code, method) {
        var path = "/" + method + "-" + code
        ;
        var xhr = new XMLHttpRequest();
        xhr.open(method, path);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    var res;
                    if (xhr.responseText) res = JSON.parse(xhr.responseText);
                    else res = { ok: null };
                    output[method + code] = res.ok;
                    console.log("For " + res.code + ": asked " + res.original + " got " + res.received + ", " + (res.ok ? "OK!" : "Boooh"));
                    format();
                }
                catch (e) {
                    console.log("Exception " + e, code, method);
                }
            }
        };
        xhr.send();
    }

    for (var i = 0, n = codes.length; i < n; i++) {
        for (var j = 0, m = methods.length; j < m; j++) {
            request(codes[i], methods[j]);
        }
    }
}());


