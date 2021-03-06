/* Javascript functions for the simple search checkbox control */

var ssc = {

	/* Handle keyboard navigation for the list */
	navigateList: function(node, ev) {
		console.log(ev.keyCode);
		var selidx = $(node).find(".search-area").prop('selectedIndex');
		var maxidx = $(node).find(".search-area").prop('length');

		switch (ev.keyCode) {
		case 38: //Key up
			if (selidx > 0)
				selidx--;			
		break;
		case 40: // Key down
			if (selidx <= maxidx-1)
				selidx++;
		case 13: // Enter
			console.log(selidx);
			break;

		case 27: // Esc
			ev.preventDefault();
			this.hideOptions(node);
			$(node).find('.search-text').blur();
		default:
			return;

		break;
		}

		$(node).find(".search-area").prop("selectedIndex", selidx);
		if (!this.selectItem(node, selidx, false)) {
			$(node).find(".search-value").prop('value', '');
		}

		ev.preventDefault();
		if (ev.keyCode === 13) { // If user press enter 
			this.hideOptions(node);
			$(node).find('.search-text').blur();
		}
	},

	/* Show the option list 
		filter: Filter the options alongside showing them
	*/
	showOptions: function(node, filter) {
		var stxt = $(node).find('.search-text');

		var jnode = $(node).find(".search-area");
		jnode.css('display', 'block');
		jnode.css('width', stxt.css('width'));

		if (filter)
			this.filterOptions(node, null);
	},

	/* Selects an item.
	 * Returns true if item was found, false if not
	 */
	selectItem: function(node, idx, hide=true) {
		var ret = false;
		var data = $(node).find(".search-area").prop('data-items');

		if (data && data[idx]) {
			$(node).find(".search-text").prop('value', data[idx].name);
			$(node).find(".search-value").prop('value', data[idx].value);
			ret = true;
		}

		if (hide)
			this.hideOptions(node);

		return ret;
	},

	filterTimeout: -1,
	/* Filter the option list based in a list of options (called 'data') in the
	   'data-items' attribute of our list object
	   Note that we need to have two attributes in each element: 
	   	- name, that will be the name we'll show
		- value, the value of the option in the option box

	  If value is null or nothing, show everything
	*/
	filterOptions: function(node, str) {
		if (this.filterTimeout >= 0)
			return;

		this.filterTimeout = setTimeout(function() {
			var currv = $(node).find(".search-value").prop('value');

			var optionbox = $(node).find(".search-area");
			var data = $(optionbox).prop('data-items');
			optionbox.empty();
	
			var addToList = function(name, v, currentv) {
				var opt = $("<option></option>");
				opt.prop('value', v);
				if (currentv == v)
					opt.prop('selected', 'selected');
				
				opt.text(name);
				optionbox.append(opt);
			};
	
			data.forEach(function(val, i) {
				if (val.name.match(str))
					addToList(val.name, val.value, currv);
				else if (str === null || str.trim() === "") 
					addToList(val.name, val.value, currv);
			});
	
			this.filterTimeout = -1;
		}, 10);
	},
	
	/* Hide the option list */
	hideOptions: function(node) {
		var jnode = $(node).find(".search-area");
		jnode.css('display', 'none');
	}

};
