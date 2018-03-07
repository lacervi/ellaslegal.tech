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
            if (data.social.linkedin == null) {
                $('header > article.contact a.fa-linkedin').css('display', 'none');
            } else {
                $('header > article.contact a.fa-linkedin').attr('href', data.social.linkedin);
            }
            $('header > p.quote > q').text(data.quote);
            for (var q in data.questions) {
                var theQuestion = data.questions[q].question;
                var theAnswer = data.questions[q].answer;
                if (theAnswer instanceof Array) {
                    theAnswer = '<p>' + theAnswer.join('</p><p>') + '</p>';
                }
                $('section#entrevista').append(
                    '<article> <question>'
                    + theQuestion
                    + '</question> <answer>'
                    + theAnswer
                    + '</answer> </article>'
                );
            }
            var urlShareTwitter = 'https://twitter.com/intent/tweet?text='
                + urlize(data.name + ' (@' + data.social.twitter + ') en ellaslegal.tech: "' + data.quote + '"')
                + '&hashtags=feminismo,activismo,legaltech&via=ellaslegaltech';
            var urlShareLinkedin = 'https://www.linkedin.com/shareArticle?mini=true&url='
                + window.location.href + '&title='
                + urlize(data.name + ' (@' + data.social.twitter + ') en ellaslegal.tech')
                + '&summary=' + urlize(data.quote)
                + '&source=ellaslegal.tech';
            var urlShareEmail = 'mailto:?to=&subject='
                + urlize(data.name + ' (@' + data.social.twitter + ') en ellaslegal.tech')
                + '&body=' + urlize('Mira lo que dice ' + data.name + ' (@' + data.social.twitter + ') en ellaslegal.tech: ' + window.location.href)
            $('#comparte > article.contact a.fa-twitter').attr('href', urlShareTwitter);
            $('#comparte > article.contact a.fa-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);
            $('#comparte > article.contact a.fa-linkedin').attr('href', urlShareLinkedin);
            $('#comparte > article.contact a.fa-envelope').attr('href', urlShareEmail);
        }
    });
});
