What it does:
parses jsdoc comments and creates a meteor app for documentation.
the config. file for this is 'jsdoc.json'
it will create the meteor app in ../doc-app  (doc-app folder on level up the project directory)


Setup  :

	npm install -g meteor-jsdoc
	// this npm package builds the doc-app. 


Building documentaion:
	
	meteor-jsdoc build



Using docs-app:

	option 1: from project directoty 

			  meteor jsdoc-start

			  //the documentation app runs on localhost:3333



	option 2: open doc-app folder and run like any meteor app

				meteor -p 9000



	to close the app run:
				meteor-jsdoc stop


Adding documentation :
	
	note: locus refers to where the function/class/object may be used
		  same as in meteor official docs where it lists "where: Client"

		  Markdown supported in @summary, @example & description in @param.


	quick js-doc overview : 
		http://www.2ality.com/2011/08/jsdoc-intro.html  | only look at the examples, no setup needed.
		https://code.google.com/p/jsdoc-toolkit/wiki/DocExamples

	simple example: 

	/**
	 * @summary Solves equations of the form a * x = b
	 * @param {Number} value for a
	 * @param {Number} value for b
	 * @returns {Number} Returns the value of x for the equation.
	 */
	globalNS.method1 = function (a, b) {
	    return b / a;
	};


	Meteor.method example
		open file 'methods.js' 
		search function 'createNewUser'


		  
	example 1:

	/**
	 * @summary Constructor for a Collection
	 * @locus Anywhere
	 * @instancename collection
	 * @class
	 * @param {String} name The name of the collection.  If null, creates an unmanaged (unsynchronized) local collection.
	 * @param {Object} [options]
	 * @param {Object} options.connection The server connection that will manage this collection. Uses the default connection if not specified.  Pass the return value of calling [`DDP.connect`](#ddp_connect) to specify a different server. Pass `null` to specify no connection. Unmanaged (`name` is null) collections cannot specify a connection.
	 * @param {String} options.idGeneration The method of generating the `_id` fields of new documents in this collection.  Possible values:
	 - **`'STRING'`**: random strings
	 - **`'MONGO'`**:  random [`Mongo.ObjectID`](#mongo_object_id) values
	The default id generation technique is `'STRING'`.
	 * @param {Function} options.transform An optional transformation function. Documents will be passed through this function before being returned from `fetch` or `findOne`, and before being passed to callbacks of `observe`, `map`, `forEach`, `allow`, and `deny`. Transforms are *not* applied for the callbacks of `observeChanges` or to cursors returned from publish functions.
	 */
	Mongo.Collection = function (name, options) {
	  /** ... **/
	};


	example 2 :

	/**
	 * @summary Find the documents in a collection that match the selector.
	 * @locus Anywhere
	 * @method find
	 * @memberOf Mongo.Collection
	 * @instance
	 * @param {MongoSelector} [selector] A query describing the documents to find
	 * @param {Object} [options]
	 * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
	 * @param {Number} options.skip Number of results to skip at the beginning
	 * @param {Number} options.limit Maximum number of results to return
	 * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
	 * @param {Boolean} options.reactive (Client only) Default `true`; pass `false` to disable reactivity
	 * @param {Function} options.transform Overrides `transform` on the  [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
	 * @returns {Mongo.Cursor}
	 */
	find: function (/* selector, options */) {
	  /** ... **/
	}


	note:when building the package will parse the comments to generate the app.

	run meteor-jsdoc build 

	tip: create an alias for stopping->building->starting doc-app
	add the following line at end of .bashrc

	alias docsReload='meteor-jsdoc stop; meteor-jsdoc build; meteor-jsdoc start;'



*************************************
more package info: https://www.npmjs.com/package/meteor-jsdoc




FIXME : examples not indented  :/