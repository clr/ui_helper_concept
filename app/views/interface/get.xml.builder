xml.instruct!( :xml, :version => "1.0", :encoding => "UTF-8" )
xml.instruct!( :'xml-stylesheet', :href => "chrome://global/skin/", :type => "text/css" )
xml.instruct!( :'xml-stylesheet', :href => stylesheet_path( 'main' ), :type => "text/css" )
xml.window( :xmlns => "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
            :orient => "vertical",
            :onload => "Canvas.setGrid();"
           ) {
  xml.script :language => "javascript", :src => javascript_path( 'jquery' )
  xml.script :language => "javascript", :src => javascript_path( 'application.xul' )

  xml.toolbar {
      xml.textbox :id => "grid_width", :type => "number", :value => "72", :onchange => "Canvas.setGrid();"
      xml.label :value => "X"
      xml.textbox :id => "grid_height", :type => "number", :value => "72", :onchange => "Canvas.setGrid();"
  }

  xml.iframe :id => 'canvas', :flex => 1, :src => '/interface.html'
}
