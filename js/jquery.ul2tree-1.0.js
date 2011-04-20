/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                            *
 * jQuery ul2tree Plugin                                                      *
 *                                                                            *
 * Create a tree using ul elements from JSON object.                          *
 *                                                                            *
 * @version             1.0                                                   *
 * @copyright           (c) Collide Applications 2011                         *
 * @author              Radu Graur                                            *
 * @email               radu.graur@gmail.com                                  *
 * @link                https://github.com/collide-applications/jQuery.ul2tree*
 *                                                                            *
 * Do not delete or modify this header!                                       *
 *                                                                            *
 * Plugin call example:                                                       *
 *                                                                            *
 * $(function(){                                                              *
 *     $('#selector').ul2tree({                                               *
 *          info:           {},         // object with tree info              *
 *          single:         false       // render tree level by level         *
 *     });                                                                    *
 * });                                                                        *
 *                                                                            *
 * Plugin parameters:                                                         *
 * - info: object with tree elements;                                         *
 * - single: render one level or the entire tree;                             *
 *                                                                            *
 * Public parameters:                                                         *
 * - $.fn.changes.defaults: default values for plugin parameters;             *
 * - $.fn.changes.params: values for plugin parameters after initialization;  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function($){  // create closure
    // keep all methods called from outside in this object
    var methods = new Object();

    /**
     * Plug-in initialization
     *
     * @access  public
     * @return  object this
     */
    $.fn.ul2tree = function(){
        // check if first parameter is string (function name) and call it
        if( typeof( arguments[0] ) == 'string' ){
            // check if function given and call it
            if( $.isFunction( methods[arguments[0]] ) ){
                methods[arguments[0]].call( this, ( arguments[1] || {} ) );
            }

            return false;
        }

        // merge default settings with dynamic settings
        $.fn.ul2tree.params = $.extend( $.fn.ul2tree.defaults, ( arguments[0] || null ) );

        // take a snapshoot of all selected forms
        return methods.init.call( this );
    };

    ////////////////////////////////// PUBLIC //////////////////////////////////

    /**
     * Plugin default parameters
     *
     * Will be extended to $.fn.ul2tree.params object
     *
     * @access public
     */
    $.fn.ul2tree.defaults = {
        info:           {},             // object with tree info
        single:         false,          // render tree level by level
        collapse:       null,           // if string, all levels will be collapsed
                                        // using that class
        selectedClass:  'selected',     // class for selected elements
        selectMultiple: true,           // allow selecting multiple elements
        onSelect:       function(){},   // callback for select operation
        onUnselect:     function(){},   // callback for unselect operation
        animationSpeed: 500             // speed of toggle effect
    };

    /**
     * Initialize plugin
     *
     * @access  public
     * @return  mixed   jQuery object on success or false on error
     */
    methods.init = function(){
        // for each element of the original instance
        return this.each(function(){
            // create tree for this selector
            var $ul = createUl.call( this, $.fn.ul2tree.params.info );

            // remove collapse class from tree parent
            if( $.fn.ul2tree.params.collapse != null ){
                $ul.removeClass($.fn.ul2tree.params.collapse);
            }

            // add tree to this selector
            $(this).html($ul);
        });
    }

    ///////////////////////////////// PRIVATE //////////////////////////////////

    /**
     * Parse JSON object and create "ul" elements for a html tree
     *
     * Function recursive
     *
     * @access  private
     * @param   subTree json object with one subtree level
     * @return  jQuery object with one "ul" subtree
     */
    function createUl( subTree ){
        // create tree and add collapse class if any
        var $ul = $('<ul>');
        if( $.fn.ul2tree.params.collapse != null ){
            $ul.addClass($.fn.ul2tree.params.collapse);
        }

        // parse each json subtree and create html elements
        for( elem in subTree ){
            // create element
            var $li = createLi( subTree[elem].name );

            // check if this element has subtree
            if( typeof( subTree[elem].value ) != 'undefined' &&
                subTree[elem].value.length > 0 ){
                // go deeper (hopefully this will stop soon)
                $li.append(createUl.call( this, subTree[elem].value ));
            }

            // add this element to the parent tree
            $ul.append($li);
        }

        return $ul;
    }

    /**
     * Create "li" tag and assign mouseover, mouseout and click events
     *
     * @access  private
     * @param   content "li" element content (html accepted)
     * @return  jQuery object with one "li"
     */
    function createLi( content ){
        var $li = $('<li>', {
            html: '<div>' + content + '</div>',
            // bind events
            mouseover: function(){
                $(this).
                removeClass('hover').
                addClass('hover');
            },
            mouseout: function(){
                $(this).
                removeClass('hover')
            },
            click: function(e){
                if( $('ul', this).length < 1 ){
                    $(this).
                    toggleClass($.fn.ul2tree.params.selectedClass);
                }else if( $('>ul.collapse', this).length < 1 ){
                    if( $('ul.collapse', this).length < 1 ){
                        $(this).
                        removeClass($.fn.ul2tree.params.selectedClass);
                    }

                    $(this).
                    find('>ul').
                    hide($.fn.ul2tree.params.animationSpeed, function(){
                        $(this).
                        removeClass('collapse').
                        addClass('collapse');
                    });
                }else{
                    $(this).
                    removeClass($.fn.ul2tree.params.selectedClass).
                    addClass($.fn.ul2tree.params.selectedClass).
                    find('>ul.collapse').
                    show($.fn.ul2tree.params.animationSpeed, function(){
                        $(this).
                        removeClass('collapse');
                    });
                }
                
                // if select or unselect callback defined call that functions
                if( $(this).hasClass($.fn.ul2tree.params.selectedClass) ){
                    $.fn.ul2tree.params.onSelect.call( $(this), e );
                }else{
                    $.fn.ul2tree.params.onUnselect.call( $(this), e );
                }

                e.stopImmediatePropagation();
            }
        });

        return $li;
    }
})(jQuery);    // end closure