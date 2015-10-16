var App = (function() {

    var init = function() {
        var socket = io.connect("http://localhost:3000");

        $(".share-func").on("click", function(e) {
            e.preventDefault();
            var funcName = $(this).parent().attr("id");
            var values = {
                name: funcName
            }
            console.log("entered");
            $.post("/api/function/share", values, function(recievedData) {
                if( "Transaction complete" === recievedData.message ) {
                    console.log("Transaction complete," + " function added to shared functions");
                    socket.emit("share function", recievedData.data);
                }
                else if( "Error while fetching the functions" === recievedData.message ) {
                    console.log("Error occured, probably somebody changed from console.log smthing");
                }
                else if( "No user logged in" === recievedData.message ) {
                    console.log("No user logged in, this is weird. Check your code again main");
                }
            })
        })

        socket.on("share function", function(recievedData) {
            $("#shared-functions").append("<div><h3>" + recievedData.name + "</h3><p>" + recievedData.originalAuthor + "</p><p>" + recievedData.body + "</p><p>" + recievedData.stars + "</p><hr></div>")
        })
    }

    return {
        init: init,
    }
})();
