// Render functions. Add any custom render function here

// TODO: Try moving this into meteor
renderDefaultAutocomplete = function(x) {
  return Blaze.toHTMLWithData(Template.autocomplete, x)
}