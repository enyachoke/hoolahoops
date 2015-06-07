var configPath='./assets/mongo-s3-backup.config.json';
var fs = Npm.require('fs');
var cp = Npm.require('child_process');
var path= Npm.require('path');

DatabaseBackup = {
	now : function(options){

		
		var commandString= 'mongodb_s3_backup -n '+ configPath;

		function defualtBehavior(){
			// ERROR : execSync not defined

			//synchronously make backup
			/*var output= cp.execSync(commandString);

			console.log(formatting);
			console.log('mongo-s3-backup STDOUT : \n'+ output.toString() +'\n'+ formatting);
			return output.toString();*/
		}

		var formatting= '**********************\n';

		if(options){
			if(options.async===true){			

				var exec = cp.exec ;
				var childProcess = exec(commandString,	
					function(error, stdout, stderr){
						if(error!==null){
							console.log('mongo-s3-backup CRITICAL_ERROR : failed to execute command');
						}				

						console.log(formatting);
						console.log('mongo-s3-backup STDOUT : \n'+ stdout +'\n'+ formatting);
						console.log('mongo-s3-backup STDERR : \n'+ stderr +'\n'+ formatting);


						// parse stdout to get file ID and store in db?
					});
				// -n to run right now
				// NOTE: this is async but it will wait for command to exit to log output

			}else defualtBehavior();

		}else{
			defualtBehavior();			
		}
		
	},
	scheduledProcess : function(){
		var spawn = cp.spawn;

		var scheduledBackupProcess  = spawn('mongodb_s3_backup', [configPath]);

		scheduledBackupProcess.on('error',function(err){
			console.log("CRITICAL_ERROR : database backup process either couldn't be spawned or couldn't be killed");

		});

		scheduledBackupProcess.stdout.pipe(process.stdout);


	},

	setCrontab : function(string){ /*BROKEN :access error when changing file*/
		//format for string e.g.
		// * 1 0 0 0
		var pathToConfig =path.normalize(configPath);
		var obj = JSON.parse(fs.readFileSync(pathToConfig, 'utf8'));
		obj.crontab=string;

		fs.writeFile(pathToConfig, JSON.stringify(obj, null, 4), function(err) {
			// null and 4 are just to write indented json
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("mongo-s3-backup: crontab set to -" + string);
		    }
		}); 		
	}
};