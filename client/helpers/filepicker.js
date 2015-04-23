// The Browser API key obtained from the Google Developers Console.
      var developerKey = 'AIzaSyDxVWR6YrF88T0WvMZCdh2FRqVk25iNq2g';

      // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
      var clientId = "1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com"

      // Scope to use to access user's photos.
      var scope = ['https://www.googleapis.com/auth/drive'];

      var pickerApiLoaded = false;
      var oauthToken= "yolo";

      // Use the API Loader script to load google.picker and gapi.auth.
      onApiLoad = function() {
        Session.set('gapiLoaded',true);
      }

      loadGapi = function (){
      		gapi.load('auth', {'callback': onAuthApiLoad});
        	gapi.load('picker');//;, {'callback': onPickerApiLoad});
      }

      function onAuthApiLoad() {
        window.gapi.auth.authorize(
            {
              'client_id': clientId,
              'scope': scope,
              'immediate': false
            },
            handleAuthResult);
      }

      function onPickerApiLoad() {
        pickerApiLoaded = true;
        createPicker();
      }

      function handleAuthResult(authResult) {
      	console.log(authResult.access_token);
        if (authResult && !authResult.error) {
          oauthToken = authResult.access_token;
          createPicker();
        }
      }

      // Create and render a Picker object for picking user Photos.
      function createPicker() {
      		var DocsUploadView = new google.picker.DocsUploadView();
      		DocsUploadView.setIncludeFolders(true);
        //if (pickerApiLoaded && oauthToken) {
          var picker = new google.picker.PickerBuilder().
              addView(new google.picker.DocsUploadView().setIncludeFolders(true)).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
              build();
          picker.setVisible(true);
        //}
      }

      // A simple callback implementation.
      function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          url = doc[google.picker.Document.URL];
        }
        var message = 'You picked: ' + url;
        document.getElementById('result').innerHTML = message;
      }
