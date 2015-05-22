Template.labels.helpers({
	'labels': function(){
		return Labels.find();
	}
});

Template.labelRow.events({
    'click .delete': function (event) {
		if(confirm("Confirm Delete?"))
      		Labels.remove(this._id);
    }
});

Template.colorElement.helpers({
	'complement': function(color) {
		var re = /rgb\((\d+), (\d+), (\d+)\)/;
		rgb = re.exec(color);
		var red = parseInt(rgb[1], 10),
    		green = parseInt(rgb[2], 10),
    		blue = parseInt(rgb[3], 10),
    		brightness = (red / 255.0) * 0.3 + (green / 255.0) * 0.59 + (blue / 255.0) * 0.11;
    	console.log(brightness);
    	if(brightness>0.5)
    		return '#000';
    	else
    		return '#fff';
    	//var comp = 'rgb('+ r_c +','+ g_c +','+ b_c +')';
    	//return comp;
	}
})

// Custom global function used for rendering for labels
renderLabelAutocomplete = function(x) {
  return Blaze.toHTMLWithData(Template.colorElement, x)
}