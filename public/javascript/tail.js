		/*
		*	@param void
		*	@return void
		*	@desc 	MODULE INITIALISER
		*/
		var init = function() {
			Function.init();
			Calculus.init();
			App.init();
			//Unit.init();
		};

		return {
			// globals in GLOBAL SCOPE
			init : init,
		};

	})();

})(jQuery, window, window.document);

CalculatorApp.init();
