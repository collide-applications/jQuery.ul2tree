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
        info:           {},         // object with tree info
        single:         false       // render tree level by level
    };

    ///////////////////////////////// PRIVATE //////////////////////////////////

    /**
     * Initialize plugin
     *
     * @access  public
     * @return  mixed   jQuery object on success or false on error
     */
    methods.init = function(){
        // for each element of the original instance
        return this.each(function(){
            var html = '';

            console.dir( $.fn.ul2tree.params );
        });
    }
})(jQuery);    // end closure