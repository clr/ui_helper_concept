class InterfaceController < ApplicationController

  def get
    respond_to do |format|
      format.xml do
        headers['content-type'] = "application/vnd.mozilla.xul+xml"
        render :template => 'interface/get'
      end
      format.html do
        render :template => 'interface/canvas'
      end
    end
  end

end
