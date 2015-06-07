// Render functions. Add any custom render function here

// TODO: Try moving this into meteor
renderDefaultAutocomplete = function(x) {
  return Blaze.toHTMLWithData(Template.autocomplete, x);
}

renderUserAutocomplete = function(x) {
  return Blaze.toHTMLWithData(Template.usersAutocomplete, x);
}