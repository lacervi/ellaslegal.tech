var templates = {};

templates.compile = function() {
    $('#templates').children().each(function() {
        var templateName = $(this).attr('id');
        var tag = $(this).prop("tagName");
        templates[templateName] = Hogan.compile(
            '<' + tag + ' id="' + templateName + '-{{id}}" class="' + templateName + '">'
            + $(this).html()
            + '</' + tag + '>'
        );
    })
}
