$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

var urlize = function(text) {
    return text
        .replace(/ /g, '%20')
        .replace(/"/g, '%22');
}

$(function() {

    templates.compile();

    var she = $.urlParam('she');

    $.ajax({
        url: 'data/' + she + '.json',
        dataType: 'json',
        success: function( data, textStatus, jqxhr ) {
            console.log( data ); // Data returned
            console.log( textStatus ); // Success
            console.log( jqxhr.status ); // 200
            console.log( "Load was performed." );
            $('header > img.photo').attr('src', 'img/' + data.photo);
            $('header > h1.name').text(data.name);
            $('header > article.bio').text(data.bio);
            $('header > article.contact a.fa-twitter').attr('href', 'https://twitter.com/' + data.social.twitter);
            $('header > article.contact a.fa-linkedin').attr('href', data.social.linkedin);
            $('header > p.quote > q').text(data.quote);
            for (var q in data.questions) {
                $('section#entrevista').append(
                    '<article> <question>'
                    + data.questions[q].question
                    + '</question> <answer>'
                    + data.questions[q].answer
                    + '</answer> </article>'
                );
            }
            var urlShareTwitter = 'https://twitter.com/intent/tweet?text='
                + urlize(data.name + ' (@' + data.social.twitter + ') en ellaslegal.tech: "' + data.quote + '"')
                + '&hashtags=feminismo,activismo,legaltech&via=ellaslegaltech';
            $('#comparte > article.contact a.fa-twitter').attr('href', urlShareTwitter);
        }
    });
});
