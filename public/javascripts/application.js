jQuery.fn.extend( {

  moveTo: function( left, top ) {
    var new_position = {
      position: 'absolute',
      left: left,
      top: top
    };
    return this.css( new_position );
  },
  
  stretchTo: function( right, bottom ) {
    var starting_x = this.data( 'starting_x' );
    var starting_y = this.data( 'starting_y' );
    var border_width = parseInt( $.curCSS( this[0], 'borderLeftWidth', true ) ) + parseInt( $.curCSS( this[0], 'borderRightWidth', true ) );
    var border_height = parseInt( $.curCSS( this[0], 'borderTopWidth', true ) ) + parseInt( $.curCSS( this[0], 'borderBottomWidth', true ) );
    if( right == starting_x ) {
      var new_left = starting_x;
      var new_width = 0;
    } else if( right < starting_x ) {
      var new_left = right;
      var new_width = starting_x - right - border_width;
    } else { 
      var new_left = starting_x;
      var new_width = right - starting_x - border_width;
    }
    if( bottom == starting_y ) {
      var new_top = starting_y;
      var new_height = 0;
    } else if( bottom < starting_y ) {
      var new_top = bottom;
      var new_height = starting_y - bottom - border_height;
    } else { 
      var new_top = starting_y;
      var new_height = bottom - starting_y - border_height;
    }
    var new_dimensions = {
      left: new_left,
      top: new_top,
      width: new_width,
      height: new_height
    };
    return this.css( new_dimensions );
  }

});

var grid = null;
var Grid = {

  nearestPoint: function( from_left, from_top ) {
    var left = ( Math.floor( ( from_left / grid.width ) + 0.5 ) * grid.width );
    var top = ( Math.floor( ( from_top / grid.height ) + 0.5 ) * grid.height );
    return { left: left, top: top };
  },

  setGrid: function( width, height ) {
    grid = { width: width, height: height };
    var body_height = $( window ).height();
    var body_width = $( window ).width();
    var div_css = {
      display: 'block',
      width: '2px',
      height: '2px',
      backgroundColor: "#000"
    };
    $( 'div.grid_point' ).remove();
    var h = 0;
    while( h < body_height ) {
      var w = 0;
      while( w < body_width ) {
        var new_div = $( "<div></div>" ).addClass( 'grid_point' ).css( div_css ).moveTo( ( w - 1 ), ( h - 1) );
        $( 'body' ).append( new_div );
        w = w + grid.width;
      }
      h = h + grid.height;
    }
    $( window ).mousedown( WorkingDiv.startDraw );
  }

}
  

var working_div = null;
var WorkingDiv = {
  
  startDraw: function( e ) {
    var div_css = {
      display: 'block',
      width: '0px',
      height: '0px',
      border: '1px solid #900'
    };
    var point = Grid.nearestPoint( e.pageX, e.pageY );
    working_div = $( "<div></div>" ).attr( 'id', 'working_div' ).css( div_css ).moveTo( point.left, point.top ).data( 'starting_x', point.left ).data( 'starting_y', point.top );
    $( 'body' ).append( working_div );
    $( window ).mousemove( WorkingDiv.dragDraw );
    $( window ).mouseup( WorkingDiv.endDraw );
  },
  
  dragDraw: function( e ) {
    if( !working_div ) {
      alert( 'Lost the div we were working with.  Sorry!' );
    }
    var point = Grid.nearestPoint( e.pageX, e.pageY );
    working_div.stretchTo( point.left, point.top );
  },

  endDraw: function( e ) {
    if( working_div.width() < 1 || working_div.height() < 1 ) {
      $( working_div ).remove();
    }
    working_div.click( function(){ alert( "I am a " + this.nodeName ) } ); 
    $( window ).unbind( 'mousemove' );
    $( window ).unbind( 'mouseup' );
  }
}
