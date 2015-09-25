var App = (function() {

    var init = function() {
        $("#share-func").on("click", function(e) {
            e.preventDefault();
            var funcName = $(this).parent().attr("id");
            var values = {
                name: funcName
            }
            $.get("/shareFunction", values, function(data) {

                if("Transaction complete" === data) {
                    console.log("Transaction complete," + " function added to shared functions");
                }
            });
        })
    }

    return {
        init: init,
    }
})();
