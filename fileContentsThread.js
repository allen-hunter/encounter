onmessage = function(e) {
    //console.log('Message received from main script');
    var file = e.data;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log('Posting message back to main script');
            postMessage([e.data,xhttp.responseText]);
        }
    };
    xhttp.open("GET", e.data, true);
    xhttp.send();
}