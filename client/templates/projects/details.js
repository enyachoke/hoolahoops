// TODO: Really ugly code here. It's late and i'm tired. Copy pasting. Need to remove this asap. haha LOL
Template.projectDetails.helpers({
    'lawyers': function () {
        debugger;
        var post = this;
        console.log("inside post", this);
        var cursor = Meteor.users.find({_id: {$in: this.lawyerIds}});
        console.log(cursor.fetch());
        return cursor;
    },
    'clients': function () {
        var post = this;
        console.log("inside client helper", this);
        ;
        return Meteor.users.find({_id: {$in: this.clientIds}});
    },
    'court': function () {
        return Courts.findOne({_id: this.courtId});
    },
    'orders': function () {
        return Orders.find({caseId: this._id});
    },
    'feed': function () {

        (function () {
            if (typeof Object.defineProperty === 'function') {
                try {
                    Object.defineProperty(Array.prototype, 'sortBy', {value: sb});
                } catch (e) {
                }
            }
            if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

            function sb(f) {
                for (var i = this.length; i;) {
                    var o = this[--i];
                    this[i] = [].concat(f.call(o, o, i), o);
                }
                this.sort(function (b, a) {
                    for (var i = 0, len = a.length; i < len; ++i) {
                        if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
                    }
                    return 0;
                });
                for (var i = this.length; i;) {
                    this[--i] = this[i][this[i].length - 1];
                }
                return this;
            }
        })();
        var hearings = Hearings.find({'caseId': this._id}).fetch();
        var meetings = Meetings.find({'caseId': this._id}).fetch();
        var tasks = Tasks.find({'caseId': this._id}).fetch();
        // var feed = hearings.concat( meetings, tasks);
        var feed = []
        hearings.forEach(function (h) {
            feed.push({
                data: h,
                type: 'Hearing',
                desc: ":" + Meteor.users.findOne({_id: h.lawyerId}).name,
                date: h.date.format('{dd}-{month}-{yy}'),
                hearing: true
            });
        });
        meetings.forEach(function (h) {
            debugger;
            feed.push({
                data: h,
                type: 'Meeting',
                desc: ":" + h.agenda,
                date: h.date.format('{dd}-{month}-{yy}')
            });
        })
        tasks.forEach(function (h) {
            feed.push({
                data: h,
                type: 'Task',
                desc: ":" + h.desc,
                date: h.date.format('{dd}-{month}-{yy}')
            });
        })

        debugger;
        return feed.sortBy(function (o) {
            return o.data.date
        });
    }
});

Template.projectDetails.events({
    'click .delete': function (event) {
        if (confirm("Confirm Delete?")) {
            Materialize.toast('Project Deleted!', 1500);
            Projects.remove(this._id, function(){
                Router.go('projects');
            });
        }
    },
    'click #order-trigger': function (event, template) {
        var modal = $(template.find('#order-modal'));
        var lean_overlay = $(template.find('#lean-overlay'));
        $(document).on('keyup.leanOrder', function (e) {
            if (e.keyCode === 27) {   // ESC key
                closeModal(template);
            }
        });
        $([modal[0], lean_overlay[0]]).css({
            display: "block",
            opacity: 0
        });
        modal.css({top: "1%"});
        velocity_settings = {
            duration: 300,
            queue: false,
            ease: "easeOutCubic"
        };
        lean_overlay.velocity({opacity: 0.9}, velocity_settings);
        modal.velocity({top: "5%", opacity: 1}, velocity_settings);
    },
    'click #lean-overlay,.owl-wrapper': function (event, template) {
        console.log(event.currentTarget, event.target);
        if (event.currentTarget == event.target)
            closeModal(template);
    }
});

Template.projectDetails.rendered = function () {
    $(document).ready(function () {
        $("#order-slide").owlCarousel({
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: false,
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            navigation: true
        });
    });
}
var closeModal = function (template) {
    var modal = $(template.find('#order-modal'));
    var lean_overlay = $(template.find('#lean-overlay'));
    $(document).off('keyup.leanOrder');
    lean_overlay.velocity({opacity: 0}, {
        duration: 250,
        queue: false,
        ease: "easeOutQuart"
    });
    modal.fadeOut(250, function () {
        modal.css({top: 0});
        lean_overlay.css({display: "none"});
    });
}