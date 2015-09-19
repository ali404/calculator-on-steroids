;var Calculator = {};

(function($, window, document, undefined) {

	Calculator = (function() {

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

				//takes care of adding appropriate things to regex
				addFuncRegex(functionName);
				addScript(temp);
				$('.user-btns').append('<div class="user-btn double" data-name="' + functionName + '">' + functionName + '</div>');
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
			};

			/*
			*	@param void
			*	@return void
			*/
			var _btnClickHandler = function() {
				var text = $(classes.func).text();
				var name = $(classes.name).text();

				var hasErrors = false;

				try {
					eval(text);
				}
				catch (err) {
					hasErrors = true;
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



				addFunction( text, name );
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

			};

			return {
				// globals in CALCULATOR SCOPE
				init: init,
				funcNamesRegex: funcNamesRegex
			};

		})();

		/*
		*	CALCULUS MODULE
		*	@features 	calculation, type checking
		*				user-defined func calculation
		*/
		var Calculus = (function() {

			function CalculatorError(type, message) {
				this.type = type;
				this.message = message;
				this.pushLog({type: message});
			}

			CalculatorError.prototype.log = [];

			CalculatorError.prototype.pushLog = function(obj) {
				this.log.push(obj);
			};

			Math.ln = function(x) {
				return Math.log1p(x);
			};

			Math.deg = {};

			Math.deg.sin = function(deg) {
				var temp = Math.PI/180;
				return Math.sin(deg*temp);
			};

			Math.deg.cos = function(deg) {
				return Math.cos(deg*Math.PI/180)
			};

			Math.deg.tan = function(deg) {
				return Math.tan(deg*Math.PI/180);
			};

			Math.roundf = function(x, integers) {

				if( getDecimals(x) < integers ) {
					integers = getDecimals(x);
				}

				var temp = 1;
				for( var i=1; i<=integers; i++ ) {
					temp *= 10;
				}

				return Math.round(x*temp)/temp;

			};

			Math.roundSqrt = function(x) {
				return Math.roundf(Math.sqrt(x), 5);
			};

			var calcWithRadians = false;


			var cache = [{'value': false}];
			var cacheIndex = 1;

			// used to create computedArray based on input (mathematical expression)
			var computed = [];

			/*
			*	@desc event handler namespace
			*/
			var eventHandlers = (function() {

				/*
				*	@param btn type jQuery object
				*	@return void
				*/
				var normalBtn = function(btn) {
					var str = $('#input').text() + btn.text();
					$('#input').text(str);
				};

				/*
				*	@param void
				*	@return void
				*/
				var deleteBtn = function() {
					var str = $('#input').text().slice(0, -1);
					$('#input').text(str);
				};

				/*
				*	@param void
				*	@return void
				*/
				var deleteAllBtn = function() {
					var temp;
					$('#terminate')
						.on('mouseup', function() {
							clearTimeout(temp);

							return false;
						})
						.on('mousedown', function() {

							temp = window.setTimeout(function(){
								$('#input').text('');
							}, 1000);
							return false;
						});
				};

				/*
				*	@param btn type jQuery object
				*	@return void
				*/
				var paranthesisBtn = function(btn) {
					var str = $('#input').text() + btn.text() + '(';
					$('#input').text(str);
				};

				return {
					normalBtn : normalBtn,
					deleteBtn : deleteBtn,
					deleteAllBtn : deleteAllBtn,
					paranthesisBtn : paranthesisBtn
				}
			})();

			var regex = {

				'multiply': /(x)/,
				'ln': /((ln)\(\w+\))/,
				'log': /((log)\(\w+\))/,
				'trig': /(sin|cos|tan)/,
				'euler': /(e)/,
				'operations': /(x|\-|\+)/,
				'functions': "(sin|cos|tan|ln|log)",
				'helper': "([0-9]*(\\.?[0-9]+)+)|(x|\\-|\\+)|((e){1})|(\\()|(\\))",
				'userFunctions' : [],

			};

			regex['fullString'] = "(" + regex.functions + ")|" + regex.helper;
			regex['fullStringRegex'] = new RegExp(regex.fullString);

			/*
			*	@param input type string
			*	@return input type string
			*	desc: strips spaces in input string
			*/
			var stripInput = function(input) {
				return input.replace(/\s+/g, '');
			};

			/*
			*	@param index int
			*	@param value string / int
			*	@param array array
			*		array = ['isOperation', 'isFunc']
			*	pushes in computed a new object
			*/
			var addComputed = function( index, value, array ) {

				array = array || [];

				computed[++index] = {
					'value' : false,
					'isOperation': false,
					'isOpenBracket': false,
					'isClosedBracket': false,
					'isFunc': false,
					'isSymbol': false
				}

				computed[index]['value'] = value;

				for (var i=0; i < array.length; i++ ) {
					computed[index][array[i]] = true;
				}
			};

			/*
			*	@param input type string
			*	@return computedArray type array
			*	desc:
			*/
			var calcComputedArray = function(input) {

				var index = -1;
				var arr = [];
				var consecutiveIterations = 0;
				var len = 0;

				while( input.length !== 0 ) {

					while( input[0] == '\u03C0' || input[0] == '\u00F7' || input[0] == '\u221A' || input[0] == ',' ) {

						// pi sign
						if( input[0] == '\u03C0' ) {

							addComputed(index, 'pi', ['isNumber', 'isSymbol']);
							index++;
							input = input.slice(1);
						}
						// divide sign
						else if( input[0] == '\u00F7' ) {

							addComputed(index, 'divide', ['isOperation']);
							index++;
							input = input.slice(1);
						}
						// square root
						else if( input[0] == '\u221A' ) {

							addComputed(index, 'sqrt', ['isFunc', 'isSymbol']);
							index++;
							input = input.slice(1);
						}
						// comma
						else if( input[0] == ',' ) {
							addComputed(index, ',', ['isOperation']);
							index++;
							input = input.slice(1);
						}
					}

					arr = regex['fullStringRegex'].exec(input);

					if( arr !== null ) {

						if( arr.index !== 0 ) {
							throw new CalculatorError('fatal error', 'input contains invalid charachters');
						}

						addComputed(index, arr[0]);
						index++;
						input = input.slice( arr[0].length );

						if( computed[index]['value'] == '(' ) {

							computed[index]['isOpenBracket'] = true;
						}
						else if( computed[index]['value'] == ')' ) {

							computed[index]['isClosedBracket'] = true;
						}
						else if( computed[index]['value'].match(regex.operations) ) {

							computed[index]['isOperation']  = true;
						}
						else if( computed[index]['value'].match(regex.functions) ){

							computed[index]['isFunc'] = true;
						}
						else {

							computed[index]['isNumber'] = true;
						}
					}

					if( len == input.length ) {
						consecutiveIterations++;
					}
					else {
						len = input.length;
						consecutiveIterations = 0;
					}

					if( consecutiveIterations === 5 ) {

						throw new CalculatorError('fatal error', 'input contains invalid charachters');
					}
				}
				return computed;
			};

			/*
			*	@param computedArray type array[object]
			*	@return evalArray
			*	desc:
			*/
			var calcEvalArray = function(arr) {

				var evalArray = [];
				var str;
				var arrLen = arr.length;
				var valueAlreadyPushed = false;
				var numberOfOpenBrackets = 0;
				var numberOfClosedBrackets = 0;

				//if the fist sign is an operation or the last one (not a valid input)
				if( arr[0]['isOperation'] ) {

					throw new CalculatorError('fatal error', 'string beggining with an operation');
				}

				if( arr[arrLen-1].isOperation ) {
					throw new CalculatorError('invalid syntax', 'string ending with an operation');
				}

				evalArray.push(arr[0]['value']);

				for( var i=1; i < arrLen; i++ ) {

					if(arr[i]['isOpenBracket']) {
						numberOfOpenBrackets++;
					}
					else if(arr[i]['isClosedBracket']) {
						numberOfClosedBrackets++;
					}

					if( arr[i]['isOperation'] && arr[i-1]['isOperation'] ) {
						throw new CalculatorError('fatal error', 'two operations one after another');
					}

					if( arr[i]['isFunc'] && ( !arr[i+1] || arr[i+1]['isOpenBracket'] !== true ) ) {
						throw new CalculatorError('invalid syntax', 'function not preceeded by open bracket');
					}

					if(		(arr[i]['isOpenBracket'] && (arr[i-1]['isNumber'] || arr[i-1]['isClosedBracket']))
					   ||	(arr[i-1]['isClosedBracket'] && ( arr[i]['isNumber'] || arr[i]['isFunc'] ))
					   ||	(arr[i]['isFunc'] && arr[i-1]['isNumber'])
					   ||	(arr[i]['isSymbol'] && (arr[i-1]['isSymbol'] || arr[i-1]['isNumber']))
					   ||	(arr[i]['isNumber']	&& arr[i-1]['isSymbol']) ){

						evalArray.push('x');
						evalArray.push(arr[i]['value']);
						valueAlreadyPushed = true;
					}

					if( valueAlreadyPushed === false ) {
						evalArray.push(arr[i]['value']);
					}

					valueAlreadyPushed = false;
				}
//primul miros, mirosul visceral
				if(numberOfClosedBrackets > numberOfOpenBrackets) {
					throw new CalculatorError('fatal error', 'closed brackets more than open brackets? why?');
				}

				for(i=1; i <= numberOfOpenBrackets - numberOfClosedBrackets; i++) {
					evalArray.push(')');
				}

				return evalArray;
			};

			/*
			*	@param evalArray type array
			*	@return evalString type string
			*	desc:
			*/
			var computeEvalArray = function(evalArray) {

				var evalString = '';
				var dontPass;

				for( var i = 0, len = evalArray.length; i<len; i++ ) {

					dontPass = false;
					for( var func in regex.userFunctions ) {

						if( evalArray[i].match(regex.userFunctions[func]) ) {

							evalString +=  evalArray[i];
							dontPass = true;
							break;
						}
					}

					// multiply
					if( evalArray[i].match(regex.multiply) ) {

						evalString += '*';
					}
					// divide
					else if( evalArray[i] == 'divide' ) {

						evalString += '/';
					}
					// square root
					else if( evalArray[i] == 'sqrt' ) {

						evalString += 'Math.roundSqrt';
					}
					else if( evalArray[i] == ',' ) {

						evalString += ',';
					}
					// trig functions
					else if( evalArray[i].match(regex.trig) ) {

						evalString += 'Math.';
						if( calcWithRadians == false ) {
							evalString += 'deg.';
						}

						evalString += evalArray[i];
					}
					// woilar number #somean #shomean #shaman
					else if( evalArray[i].match(regex.euler) ) {

						evalString += Math.E;
					}
					// pi number
					else if( evalArray[i] == 'pi' ) {

						evalString += Math.PI;
					}
					// normal number
					else if( dontPass === false ){

						evalString += evalArray[i];
					}
				}

				return evalString;
			};

			/*
			*	@param input type string
			*	@return evalResult type string
			*	calculates the mathematical expression 'input'
			*/
			var _calculateResult = function(input, optionalInput) {

				var computedArray = [];
				var evalArray = [];
				var evalString = '';
				var result;

				// check if it is in cache

				var isString = typeof input == 'string';

				if( isString ) {
					// strip input
					input = stripInput(input);
				}
				else {
					computedArray = input;
					input = optionalInput;
				}

				var a = isInArray(cache, input);

				if( a ) {
					$('#input-rez').text(cache[a].inputValue);
					return;
				}

				if( input == '' ) {
					$('#input-rez').text('');
					return;
				}

				try {

					if( isString ) {
						// calculate computed array
						computedArray = calcComputedArray(input);

						computed = [];
					}

					// calculate the computed array
					evalArray = calcEvalArray(computedArray);

					// insert x's
					evalString = computeEvalArray(evalArray);

					result = eval(evalString);

					if( !isNaN(result) ) {
						// WELL FINALLY AN ANSWER !
						result = Math.roundf(result, numberOfDecimals);

						if( !isInArray(cache, input) ) {
							cache[cacheIndex++] = {
								'value': input,
								'inputValue': result
							}
						}

						// insert into view
						$('#input-rez').text(result);
					}
					else {
						computedArray.pop();

						if( 0 == computedArray.length ) {
							$('#input-rez').text('');
							return;
						}

						_calculateResult(computedArray, input);
					}
				}
				catch(err) {
					if( err instanceof SyntaxError ) {
						$('#input-rez').text('error');
						return;
					}
					else if( err instanceof CalculatorError ) {

						if( err.type === 'fatal error') {
							$('#input-rez').text('error');
							return;
						}

						if( err.type === 'invalid syntax') {
							computedArray.pop();
							_calculateResult(computedArray, input);
						}
					}
				}
			};

			/*
			*	@param void
			*	@return void
			*	ends the calculation with an animation
			*/
			var endCalculation = function() {

				var inputRez = $('#input-rez');

				if( inputRez.text() === 'error' ) {
					raiseErrorAtInput('.input');
					setTimeout(function(){
						normaliseInput('.input');
					}, 2000);
					return;
				}

				$('#input').css('visibility', 'hidden');
				inputRez
					.css('position', 'absolute')
					.css('color', '#000');

				inputRez.animate({
					'font-size': '46px',
					'margin-top': '-65px'
				}, 300, function(){
					$('#input')
						.text( inputRez.text() )
						.removeAttr('style');
					inputRez
						.removeAttr('style')
						.text('');
				});
			};

			/*
			*	@param input type jQuery object
			*	@return void
			*/
			var _reflowFontSize = function(input) {

				var len = input.text().length;
				var size = '';

				if( len > 40 ) {
					size  = '16px';
				}
				else if( len > 20 ) {
					size = '24px';
				}
				else if( len > 10 ) {
					size = '36px';
				}
				else {
					size = '46px';
				}

				$('#input').css( 'font-size', size );
			};

			// variable that decides how many decimals to be in the result
			var numberOfDecimals = 5;

			/*
			*	@param string type string
			*	@return true/false whether string is number or not
			*		'123', 123, 0, 1, 2, '012' is number
			*		'12d' is not a number...
			*/
			var isInt = function (string) {

				return /^[0-9]+[0-9]*$/.test(string);
			};

			/*
			*	@param arr type array
			*	@param val type val
			*	@return true/false
			*		arr is numerical array
			*			each cell is an object, containing a value property
			*			underd that property the value is checked
			*/
			var isInArray = function(arr, val) {

				for(var i=0; i<arr.length; i++) {
					if (arr[i].value == val) {
						return i;
					}
				}
				return false;
			};

			/*
			*	@param num type int/string
			*	@return number of decimals
			*	taken from stackOverflow , kudos to Mike Samuel
			*/
			function getDecimals(num) {
				var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
				if (!match) {
					return 0;
				}
				return Math.max(
				   0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
				);
			}

			/*
			*	@param CssClass type string (css valid class)
			*	@return void
			*		Input to error state
			*/
			var raiseErrorAtInput = function(CssClass) {
				$(CssClass)
				.css('box-shadow', '0px 0px 10px 0px #E81D62')
				.css('border', '1px solid #E81D62');
			};

			/*
			*	@param CssClass type string (css valid class)
			*	@return void
			*		Input to normal state
			*/
			var normaliseInput = function(CssClass) {
				$(CssClass)
				.css('box-shadow', '0px 0px 10px 0px rgba(0,0,0,0.27)')
				.css('border', '1px solid #BCBCBC');
			}

			/*
			*	@param text type string
			*	@return void
			*/
			var proccessInput = function(text) {

				if( text === '' ) {
					// normal behaviour
					numberOfDecimals = 5;
					normaliseInput('#add-rounding');
					return;
				}

				if( !isInt(text) ) {
					raiseErrorAtInput('#add-rounding');
					return;
				}

				// in case a user says :
				// "hey look!, let's put a 0 first..."
				if(text[0] == '0') {
					text = text.slice(1);
				}

				normaliseInput('#add-rounding');
				numberOfDecimals = + text; // to make it a number...

				return;
			};

			/*
			*	@param void
			*	@return void
			*	@desc 	MODULE INITIALISER
			*/
			var init = function() {

				var length = 0;


				$('#input').on('keydown', function(e) {

					if( e.keyCode == 13 ) {
						endCalculation();
						return false;
					}

				});

				$('#input').on('keyup', function(e) {

					var self = $(this);

					if( self.text().length !== length ){
						length =  self.text().length;
						_calculateResult( $(this).text() );
						_reflowFontSize( $(this) );
					}
				});

				$('.normal').on('click', function() {
					var self = $('#input');
					eventHandlers.normalBtn( $(this) );

					_reflowFontSize( self );
					_calculateResult( self.text() );
				});

				$('#end-calc').on('click', function() {
					_calculateResult( $('#input').text() );
					endCalculation();
				});

				$(document).on('click', '.double', function() {
					var self = $('#input');
					eventHandlers.paranthesisBtn( $(this) );

					_reflowFontSize( $('#input') );
					_calculateResult( self.text() );
				});

				$('#terminate').on('click', function() {
					eventHandlers.deleteBtn();
					_calculateResult( $('#input').text() );
				});

				$('#add-rounding').on('keyup', function(e) {
					proccessInput($(this).text());
				});

				eventHandlers.deleteAllBtn();

			};

			return {
				// globals in CALCULATOR SCOPE
				init: init,
				calcWithRadians: calcWithRadians,
				regex: regex,
				raiseErrorAtInput: raiseErrorAtInput,
				normaliseInput: normaliseInput,
			};

		})();


		/*
		*	@param void
		*	@return void
		*	@desc 	MODULE INITIALISER
		*/
		var init = function() {
			Function.init();
			Calculus.init();
		};

		return {
			// globals in GLOBAL SCOPE
			init : init,
		};

	})();

})(jQuery, window, window.document);

Calculator.init();
