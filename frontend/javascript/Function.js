
		/*
		*	FUNCTION MODULE
		*	@features: 	adding functions, type/error checking,
		*				text indenting, text highlighting
		*/
		var Function = (function() {

			var classes = {
				'name': '#func-name',
				'func': '#func-code',
				'button' : '#func-btn',
			};

			var funcNamesRegex = [];

			/*
			*	@param functionBody, body of function
			*	@param functionName, name of function
			*	@return void
			*	@desc takes care fo adding a function
			*/
			var addFunction = function( functionBody, functionName ) {
				var temp = 'var ' + functionName + '=' + functionBody + ';';
				var values = {
					name: functionName,
					body: functionBody,
					fullBody: temp
				}

				$.post("/addFunction", values, function(data) {
					if("Transaction complete" === data) {
						//takes care of adding appropriate things to regex
						addFuncRegex(functionName);
						addButton(functionName);
						addScript(temp);
						console.log("success transaction");
					}
				});
			};

			/*
			*	@param funcName type string, name of function
			*	@return void
			*	modifies the regex helper object in Calculus
			*/
			var addFuncRegex = function( funcName ) {
				Calculus.regex['functions'] = Calculus.regex['functions'].slice(0, -1) + "|" + funcName + ")";
				Calculus.regex['fullString'] = 	"(" + Calculus.regex['functions'] + ")|" + Calculus.regex['helper'];
				Calculus.regex['userFunctions'].push(funcName);
				Calculus.regex['fullStringRegex'] = new RegExp(Calculus.regex['fullString']);
			}

			/*
			*	@param text @type string
			*	@return void
			*	@desc 	adds the script, if not already there
			*			if there, appends the text
			*/
			var addScript = function(text) {
				$('body').append('<script class="script">' + text + '</script>');
			}

			var addButton = function(functionName) {
				$('.user-btns').append('<div class="user-btn double" data-name="' + functionName + '">' + functionName + '</div>');
			}

			/*
			*	@param void
			*	@return void
			*/
			var _btnClickHandler = function() {
				var funcBody = $(classes.func).text();
				var name = $(classes.name).text();

				var hasErrors = false;

				try {
					eval("var x = " + funcBody.toString());
				}
				catch (err) {
					hasErrors = true;
					console.log(err);
					console.log(funcBody);
				}

				if( /\W/.test(name) || name.length === 0) {
					if( hasErrors ) {
						Calculus.raiseErrorAtInput(classes.func);
					}
					Calculus.raiseErrorAtInput(classes.name);

					if( hasErrors ) {
						setTimeout(function() {
							$(classes.name).removeAttr('style');
							$(classes.func).removeAttr('style');
						}, 2000);
					}
					else {
						setTimeout(function() {
							$(classes.name).removeAttr('style');
						}, 2000);
					}
					return;
				}

				if(hasErrors) {

					Calculus.raiseErrorAtInput(classes.func);
					setTimeout(function() {
						$(classes.func).removeAttr('style');
					}, 2000);
					return;
				}

				addFunction( funcBody, name );
			};


			/*
			*	@param touchedDiv type jQuery object
			*	@return void
			*/
			var _changeTrig = function( touchedDiv ) {

				if( touchedDiv.hasClass('trig-active') ) {
					return;
				}

				if( touchedDiv.hasClass('deg') ) {
					$('.deg').addClass('trig-active');
					$('.rad').removeClass('trig-active');
					Calculus.calcWithRadians = false;
				}
				else {
					$('.rad').addClass('trig-active');
					$('.deg').removeClass('trig-active');
					Calculus.calcWithRadians = true;
				}
			};

			var loadFunctions = function() {
				$.get("/getFunctions", function(data) {
					if( "No user logged in" === data ) {
						//load no functions, this session is local, not logged in
						console.log("local session, no functions to fetch...");
						return;
					}
					console.log("fetching functions...");
					data.forEach(function(func) {
						addFuncRegex(func.name);
						addButton(func.name);
						addScript(func.fullBody);
					})
					console.log("fetching functions done");
				})
			}

			/*
			*	@param void
			*	@return void
			*	@desc 	MODULE INITIALISER
			*/
			var init = function() {
				$(classes.button).bind('click', _btnClickHandler);
				$('.trig').on('click', function(){
					_changeTrig($(this));
				});
				loadFunctions();
			};

			return {
				// globals in CALCULATOR SCOPE
				init: init,
				funcNamesRegex: funcNamesRegex
			};

		})();
