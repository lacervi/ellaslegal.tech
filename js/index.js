var them = [

    {
        id: 'paloma-llaneza',
        name: 'Paloma Llaneza',
        published: false
    },
    {
        id: 'andrea-ortega',
        name: 'Andrea Ortega',
        published: false
    },
    {
        id: 'cris-carrascosa',
        name: 'Cris Carrascosa',
        published: true
    },
    {
        id: 'eva-bruch',
        name: 'Eva Bruch',
        published: false
    },
    {
        id: 'alice-hidkova',
        name: 'Alice hidkova',
        published: false
    },
    {
        id: 'laura-fauqueur',
        name: 'Laura Fauqueur',
        published: false
    },
    {
        id: 'barbara-roman',
        name: 'Bárbara Román',
        published: false
    },
    {
        id: 'estela-alberte',
        name: 'estela alberte',
        published: false
    },
    {
        id: 'amy-chan',
        name: 'Amy Chan',
        published: false
    },
    {
        id: 'sonsoles-valero',
        name: 'Sonsoles Valero',
        published: false
    },
    {
        id: 'sara-molina',
        name: 'Sara Molina',
        published: false
    },
    {
        id: 'amanda-guglieri',
        name: 'amanda guglieri',
        published: false
    },
    {
        id: 'astrid-baldisera',
        name: 'Astrid Baldisera',
        published: false
    },
    {
        id: 'ruth-sala',
        name: 'Ruth sala',
        published: false
    },
    {
        id: 'ruth-benito',
        name: 'Ruth Benito',
        published: false
    },
    {
        id: 'mjesus-glez-espejo',
        name: 'María Jesús González Espejo',
        published: true
    },
    {
        id: 'catherine',
        name: 'Catherine',
        published: false
    },
    {
        id: 'molly',
        name: 'Molly',
        published: false
    },
    {
        id: 'gizem',
        name: 'Gizem',
        published: false
    },
    {
        id: 'yesica-sampayo',
        name: 'Yesica Sampayo',
        published: false
    },
    {
        id: 'dori-fuentes',
        name: 'Dori fuenres',
        published: false
    },
    {
        id: 'margaret-hagan',
        name: 'Margaret Hagan',
        published: false
    },

];

$(function() {

    var header = new Headhesive('.search-bar', {
        offset: 500,
        classes: {
            clone: 'headhesive',
            stick: 'headhesive--stick',
            unstick: 'headhesive--unstick'
        },
        throttle: 250,
        onInit: function() {
            console.log('init');
        },
        onStick: function() {
            console.log('stick');
        },
        onUnstick: function() {
            console.log('unstick');
        },
        onDestroy: function() {
            console.log('destroy');
        }
    });

    for (var i in them) {
        var she = them[i];
        var img_src = './img/unknown.png';
        var link = '';
        if (she.published) {
            img_src = './img/' + she.id + '.jpg';
            link = './entrevista.html?she=' + she.id;
        }
        $('section#ellas').append(
            '<article id="' + she.id + '">'
                + '<a href="' + link + '" title="' + she.name + '">'
                + '<img src="' + img_src + '" alt="">'
                + '<span>' + she.name + '</span>'
                + '</a>'
                + '</article>'
        );
    }

    $('input.search-box').keyup(function(e) {
        var toSearch = $(this).val();
        $('input.search-box').val(toSearch);
        for (var i in them) {
            var she = them[i];
            if (toSearch.trim() == '') {
                $('article#' + she.id).removeClass('searching');
            } else {
                $('article#' + she.id).addClass('searching');
                if (she.name.toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                    $('article#' + she.id).addClass('match');
                } else {
                    $('article#' + she.id).removeClass('match');
                }
            }
        }
    });

});
