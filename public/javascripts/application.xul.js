var Canvas = {
  
  setGrid: function() {
    var width = parseInt( document.getElementById( 'grid_width' ).value );
    var height = parseInt( document.getElementById( 'grid_height' ).value );
    frames['canvas'].Grid.setGrid( width, height );
  }
  
}

$( window ).resize( Canvas.setGrid );
