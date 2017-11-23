# simple-search-combobox

A simple jQuery-backed searching with a combobox-like dropdown, that shows items while you type them.

It doesn't use that datalist thing, because the datalist doesn't store a name/value pair.

Works on Safari, however :P

## Layout

Consists of three elements inside of a `.search` block: 

 - a text box with class `search-text` where you can type the data;

 - a selectbox with class `search-area` where the available options will appear;

 - a hidden field witht class `search-value` where the chosen value will be stored. This is the field
   you need to send in your form

## Data receiving

Since this list supports jQuery, it retrieves the list content as a name/value pair in the 
`data-items` attribute in the `search-area` list, like:

```javascript

		
var data = [
	{name: 'A data', value: 10},
	{name: 'B data', value: 20},
	{name: 'C data', value: 30},
	{name: 'Final', value: 400}
];

$(".search .search-area").prop('data-items', data);

```

## Where's the CSS?

It's a _simple_ search combobox. This means no style, because I ~am lazy~ don't know what framework you'll use,
and I don't want conflict.

## Installation

Copy that `search` class in your form and include the `ssc.js` file.

## License

Licensed under the MIT license.
