courtSchema = new SimpleSchema({
  teamId: {
    type: String
  },
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  },
  code: {
  	type : String,
  	optional : false
  },
  'color': {
    optional:true,
    type: String,
    autoform: {
      type: 'spectrum-colorpicker',
      afFieldInput: {
        'colorPickerOptions': {
          'showPaletteOnly': true,
          'showPalette':true,
          'hideAfterPaletteSelect': true,
          'palette': [
            ['#e11d21', '#eb6420', '#fbca04', '#009800', '#006b75', '#207de5', '#0052cc', '#5319e7'],
            ['#f7c6c7', '#fad8c7', '#fef2c0', '#bfe5bf', '#bfdadc', '#c7def8', '#bfd4f2', '#d4c5f9']
          ]
        }
      }
    }
  }
})

Courts = new Meteor.Collection('courts')
Courts.initEasySearch(['name', 'code'])
Courts.attachSchema(courtSchema);