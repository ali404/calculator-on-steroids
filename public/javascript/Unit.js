		var Unit = (function() {

			var log = [];

			var it = function(statement, func, optResult) {
				var assessMode = "behaviour";
				if(optResult)
					assessMode = "result";

				// run function
				var result = func();
				if( assessMode == "result" && optResult == result ) {
					push({
						"success"	: "true",
						"date"		: Object.timestamp(),
						"statement"	: statement
					});
				}
			}

			var push = function(obj) {
				log.push(obj);
				console.log("======== unit test no." + log.length);
				console.log(obj);
				console.log("========================");
			}

			return {
					it: it,
					log: log
			}

		})();
