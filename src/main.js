(function (window, document, $) {

  'use strict';

  var bootstrapSelectToButton = (function () {

    var ATTR_DATA_JS = 'data-js-bs';
    var TEMPLATE_GROUP  = '<div class="btn-group"></div>';
    var TEMPLATE_BUTTON = '<button id="{id}" type="button" class="btn dropdown-toggle {style}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span {data-js}>{text}</span> {icon}</button>';
    var TEMPLATE_MENU = '<ul class="dropdown-menu"></ul>';
    var TEMPLATE_MENU_ITEM = '<li{disabled}><a href="#">{text}</a></li>';

    /**
     * Build button from template
     * @param id
     * @param text
     * @returns {*|jQuery|HTMLElement}
     */
    var buildButton = function (id, text, style, icon) {
      var buttonHTML = TEMPLATE_BUTTON
        .replace(/\{id\}/g, id)
        .replace(/\{text\}/g, text)
        .replace(/\{style\}/g, style)
        .replace(/\{data-js\}/g, ATTR_DATA_JS)
        .replace(/\{icon\}/g, icon);
      return $(buttonHTML);
    };

    /**
     * Build button group from template
     * @returns {*|jQuery|HTMLElement}
     */
    var buildButtonGroup = function () {
      return $(TEMPLATE_GROUP);
    };

    /**
     * Build menu from template using menu items
     * @param $menuItems
     * @returns {*|jQuery}
     */
    var buildMenu = function ($menuItems) {
      return $(TEMPLATE_MENU).append($menuItems);
    };

    /**
     * Build menu item from template
     * @param index
     * @param value
     * @returns {*|jQuery|HTMLElement}
     */
    var buildMenuItem = function (index, value) {
      var $item = $(value);
      var text = $item.text();
      var disabled = $item.prop('disabled') ? ' class="disabled"' : '';
      var menuItemHTML = TEMPLATE_MENU_ITEM
        .replace(/\{disabled\}/g, disabled)
        .replace(/\{text\}/g, text);
      return $(menuItemHTML);
    };

    /**
     * Build menu items and return as jQuery collection
     * @param $select
     * @returns {*}
     */
    var buildMenuItems = function ($select) {
      return $select.find('option').map(buildMenuItem).toArray();
    };

    /**
     * Update button text after change
     * @param $group
     * @param $link
     */
    var updateButtonText = function ($group, $link) {
      var text = $link.text().trim();
      var $buttonText = $group.find('[' + ATTR_DATA_JS + ']');
      $buttonText.text(text);
    };

    /**
     * Update select this widget has replaced
     * @param $options
     * @param $link
     */
    var updateHiddenSelect = function ($options, $link) {
      var index = $link.closest('li').index();
      $options.eq(index).prop('selected', true);
    };

    /**
     * Event handler for option select
     * @param e
     */
    var handleSelect = function (e) {
      e.preventDefault();
      var $group = $(e.delegateTarget);
      var $link = $(e.currentTarget);
      var $options = $group.data('select').find('option');
      var isDisabled = $link.closest('li').hasClass('disabled');
      if (!isDisabled) {
        updateButtonText($group, $link);
        updateHiddenSelect($options, $link);
      }
    };

    /**
     * Event handler for shown dropdown
     * @param e
     */
    var handleShown = function (e) {
      var $group = $(this);
      var selectedIndex = $group.data('select').find(':selected').index();
      $group.find('li:eq(' + selectedIndex + ') a').focus();
    };

    /**
     * Transform native select into bootstrap dropdown
     */
    var transformSelect = function () {

      var $select = $(this);
      var options = $select.data('options');

      var id = $select.attr('id');
      var text = $select.find(':selected').text();
      var style = options.classButtonStyle;
      var icon = options.iconTemplate;

      var $button    = buildButton(id, text, style, icon);
      var $group     = buildButtonGroup();
      var $menuItems = buildMenuItems($select);
      var $menu      = buildMenu($menuItems);

      // add to group
      $button.appendTo($group);
      $menu.appendTo($group);

      // group to select
      $group.insertAfter($select);

      // keep track of select
      $group.data('select', $select);

      // remove id, so label works
      $select.attr('id', '');
      
      // events
      $group.on('click', 'a', handleSelect);
      $group.on('shown.bs.dropdown', handleShown);
    };

    return {
      transformSelect: transformSelect
    };

  })();

  /**
   * jQuery fn
   */
  $.fn.bootstrapSelectToButton = function(options) {
    options = $.extend({}, $.fn.bootstrapSelectToButton.defaults, options);
    return this.each(function() {
      $(this).data('options', options);
      this.style.display = 'none';
      bootstrapSelectToButton.transformSelect.call(this);
    });
  };

  $.fn.bootstrapSelectToButton.defaults = {
    iconTemplate: '<span class="caret"></span>',
    classButtonStyle: 'btn-default'
  };

}(this, this.document, this.jQuery));

