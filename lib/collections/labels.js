Labels = new Meteor.Collection('labels')

labelSchema = new SimpleSchema({
	'name' : {
		type: String
	},
	'color': {
		type: String,
		autoform: {
			type: 'spectrum-colorpicker',
			afFieldInput: {
				'colorPickerOptions': {
					'showPaletteOnly': true,
					'showPalette':true,
					'hideAfterPaletteSelect': true
				}
			}
		}
	}
});

Labels.attachSchema(labelSchema);