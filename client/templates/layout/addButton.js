Template.addButton.rendered = function () {
    var template = this;
    $(document).off('.fixedActionBtn', '.fixed-action-btn');
    var opened = false;
    $(document).on('click.fixedActionBtn', '.fixed-action-btn', function () {
        var elements = $(template.findAll('ul li'));
        if (!opened) {
            $(template.find('.fixed-action-btn .large.mdi-content-add'))
                .switchClass("mdi-content-add", "mdi-navigation-close");
            elements.velocity(
                {scaleY: ".4", scaleX: ".4", translateY: "40px"},
                {duration: 0});

            var time = 0;
            elements.css("display", "block");
            elements.reverse().each(function () {
                $(this).velocity(
                    {opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},
                    {duration: 80, delay: time});
                time += 40;
            });
            opened = true;
        }
        else {
            var time = 0;
            elements.velocity("stop", true);
            $(template.find('.fixed-action-btn .large.mdi-navigation-close'))
                .switchClass("mdi-navigation-close", "mdi-content-add");
            elements.velocity(
                {opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},
                {duration: 80}, function(){
                    elements.css("display", "none");
                });
            opened = false;
        }
    });
}