Template.addButton.rendered = function () {
    var template = this;
    var lean_overlay = $(template.find('#lean-overlay'));
    $(document).off('.fixedActionBtn', '.fixed-action-btn');
    var opened = false;
    $(document).on('click.fixedActionBtn', '.fixed-action-btn', function () {
        var elements = $(template.findAll('ul li'));
        if (!opened) {
            var time = 0;
            $(template.find('.fixed-action-btn .large.mdi-content-add'))
                .switchClass("mdi-content-add", "mdi-navigation-close");
            elements.velocity(
                {
                    scaleY: ".4",
                    scaleX: ".4",
                    translateY: "40px"
                },
                {
                    duration: 0,
                    complete: function () {
                        var displayButNotVisible = {
                            display: "block",
                            opacity: 0
                        };
                        elements.css(displayButNotVisible);
                        lean_overlay.css(displayButNotVisible)
                        lean_overlay.velocity({opacity: 0.5}, {duration: 200});
                        elements.reverse().each(function () {
                            $(this).velocity(
                                {
                                    opacity: "1",
                                    scaleX: "1",
                                    scaleY: "1",
                                    translateY: "0"
                                },
                                {
                                    duration: 80,
                                    delay: time
                                }
                            );
                            time += 40;
                        });
                    }
                }
            )
            opened = true;
        }
        else {
            var time = 0;
            elements.velocity("stop", true);
            $(template.find('.fixed-action-btn .large.mdi-navigation-close'))
                .switchClass("mdi-navigation-close", "mdi-content-add");
            var doNotDisplay = {
                display: "none",
                opacity: 0
            };
            lean_overlay.velocity(
                {
                    opacity: 0
                },
                {
                    duration: 100,
                    complete: function () {
                        lean_overlay.css(doNotDisplay);
                    }
                }
            );
            elements.velocity(
                {
                    opacity: "0",
                    scaleX: ".4",
                    scaleY: ".4",
                    translateY: "40px"
                },
                {
                    duration: 80,
                    complete: function () {
                        elements.css(doNotDisplay);
                    }
                }
            );
            opened = false;
        }
    });
}