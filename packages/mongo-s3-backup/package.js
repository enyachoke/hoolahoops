Package.describe({
  name: 'akshay:mongo-s3-backup',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: 'uploads tarball of mondodb to s3',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['npm-container']);  // need 'mongodb_s3_backup' from npm 

  api.addFiles(['mongo-s3-backup.js','../../mongo-s3-backup.config.json'],['server']);
  api.export('DatabaseBackup','server');
});




Package.onTest(function(api) {

 /* api.use('tinytest');
  api.use('akshay:mongo-s3-backup');
  api.addFiles('mongo-s3-backup-tests.js');*/
});
