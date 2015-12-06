var App = (function() {

    var user = {}

    var getUserDetails = function() {
        user = $("#user-details").text()
    }


    var init = function() {
        getUserDetails();
        console.log(user);

        var socket = io.connect("http://localhost:3000");

        $(".share-func").on("click", function(e) {
            e.preventDefault();
            var funcName = $(this).parent().attr("id");
            var values = {
                name: funcName
            }

            $.post("/api/function/share", values)
                .done(function(response) {
                    socket.emit("share function", recievedData.data);
                })
                .fail(function(response) {
                    console.log("error while sharing function");
                })
        })

        socket.on("share function", function(recievedData) {
            $("#shared-functions").append("<div><h3>" + recievedData.name + "</h3><p>" + recievedData.originalAuthor + "</p><p>" + recievedData.body + "</p><p>" + recievedData.stars + "</p><hr></div>")
        })
    }

    return {
        init: init,
        user: user
    }
})();
