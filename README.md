
## Getting Started

This library requires [Bootstrap](http://getbootstrap.com/) and [jQuery](https://jquery.com/), include them as dependencies, then include the bootstrap select source file.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
<script src="https://code.jquery.com/jquery-2.1.4.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="path-to-bootstrap-select.js"></script>
```

### Initialize

The default settings should work for most projects.

```js
$('#select').bootstrapSelectToButton();
```

If you require further customizations you will have to set options.  To see the full list of options, see `$.fn.bootstrapSelectToButton.defaults`.

#### Examples

##### Show search for 5 or more elements

```js
$('#select').bootstrapSelectToButton({
  minItemsForSearch: 5
});
```

##### Set button style

```js
$('#select').bootstrapSelectToButton({
  classButtonStyle: 'btn-primary'
});
```

## API

This library will listen to change events fired on the original select.  To update the bootstrap button group, simply set properties on the original select using [prop](http://api.jquery.com/prop/) and call [change](http://api.jquery.com/change/).

### Disable select

```js
$('#select').prop('disabled', true).change();
```

### Set option selected

```js
$('#select option:eq(3)').prop('selected', true).change();
```
