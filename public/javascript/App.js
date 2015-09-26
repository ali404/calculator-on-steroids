var App = (function() {

    var init = function() {
        $("#share-func").on("click", function(e) {
            e.preventDefault();
            var funcName = $(this).parent().attr("id");
            var values = {
                name: funcName
            }
            $.get("/shareFunction", values, function(data) {

                if( "Transaction complete" === data ) {
                    console.log("Transaction complete," + " function added to shared functions");
                }
                else if( "Error while fetching the functions" === data ) {
                    console.log("Error occured, probably somebody changed from console.log smthing");
                }
                else if( "No user logged in" === data ) {
                    console.log("No user logged in, this is weird. Check your code again main");
                }
            });
        })
    }

    return {
        init: init,
    }
})();
