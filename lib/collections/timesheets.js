Timesheets = new Meteor.Collection('timesheets')
Timesheets.initEasySearch(['type', 'description'])

timesheetSchema = new SimpleSchema({
    'teamId': {
        type: String,
        autoValue: setTeamId
    },
    'duration': {
        type: String,
        optional: true
    },
    'type': {
        type: String,
        allowedValues: ['Conf', 'Drafting', 'Research', 'Court Hearing', 'Misc.'],
        optional: true
    },
    'caseId': {
        type: String,
        autoform: {
            type: "selectize",
            options: function () {
                var options = [];
                _.each(Projects.find().fetch(), function (element) {
                    options.push({label: element.name, value: element._id})
                });
                return options;
            }
        },
        optional: false
    },
    'description': {
        type: String,
        max: 1000,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        },
        optional: true
    },
    'taskId': {
        type: String,
        optional: false
    },
    'userId': {
        type: String,
        optional: true
    }
});

Timesheets.attachSchema(timesheetSchema);