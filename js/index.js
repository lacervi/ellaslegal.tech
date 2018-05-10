var them = [

    {
        id: 'paloma-llaneza',
        name: 'Paloma Llaneza',
        category: 'ciberseguridad',
        published: true
    },
    {
        id: 'andrea-ortega',
        name: 'Andrea Ortega',
        category: 'startups',
        published: true
    },
    {
        id: 'laura-fauqueur',
        name: 'Laura Fauqueur',
        category: 'innovación',
        published: true
    },
    {
        id: 'cris-carrascosa',
        name: 'Cris Carrascosa',
        category: 'blockchain',
        published: true
    },
    {
        id: 'alice-hlidkova',
        name: 'Alice Hlidkova',
        category: 'blockchain',
        published: true
    },
    {
        id: 'barbara-roman',
        name: 'Bárbara Román',
        category: '',
        published: false
    },
    {
        id: 'amy-chan',
        name: 'Amy Chan',
        category: null,
        published: false
    },
    {
        id: 'sonsoles-valero',
        name: 'Sonsoles Valero',
        category: 'tecnología',
        published: true
    },
    {
        id: 'sara-molina',
        name: 'Sara Molina',
        category: 'innovación',
        published: true
    },
    {
        id: 'amanda-guglieri',
        name: 'amanda guglieri',
        category: 'tecnología',
        published: true
    },
    {
        id: 'ruth-benito',
        name: 'Ruth Benito',
        category: null,
        published: false
    },
    {
        id: 'mjesus-glez-espejo',
        name: 'María Jesús González Espejo',
        category: 'innovación',
        published: true
    },
    {
        id: 'eva-bruch',
        name: 'Eva Bruch',
        category: 'innovación',
        published: true
    },
    {
        id: 'catherine',
        name: 'Catherine',
        category: null,
        published: false
    },
    {
        id: 'molly',
        name: 'Molly',
        category: null,
        published: false
    },
    {
        id: 'gizem',
        name: 'Gizem',
        category: null,
        published: false
    },
    {
        id: 'yessica-sampayo',
        name: 'Yéssica Vázquez Sampayo',
        category: 'startups',
        published: true
    },
    {
        id: 'estela-alberte',
        name: 'estela alberte',
        category: 'startups',
        published: true
    },
    {
        id: 'dori-fuentes',
        name: 'Dori fuenres',
        category: null,
        published: false
    },
    {
        id: 'margaret-hagan',
        name: 'Margaret Hagan',
        category: null,
        published: false
    },
    {
        id: 'elen-irazabal',
        name: 'Elen Irazabal',
        category: 'tecnología',
        published: true
    },
    {
        id: 'ruth-sala',
        name: 'Ruth sala',
        category: 'legal',
        published: true
    },
    {
        id: 'astrid-baldissera',
        name: 'Astrid Baldissera',
        category: 'startups',
        published: true
    },
    {
        id: 'lorena-sanchez',
        name: 'Lorena Sánchez',
        category: 'ciberseguridad',
        published: true
    },
    {
        id: 'maria-gonzalez',
        name: 'María González Moreno',
        category: 'legal',
        published: true
    },
];

var filters = [ 'legal', 'ciberseguridad', 'tecnología', 'innovación', 'startups', 'blockchain' ];

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

    for (var i in filters) {
        var filter = filters[i];
        $('article.categories').append(
            '<a href="" class="off" data-category="' + filter + '">' + filter + '</a>'
        );
    }

    for (var i in them) {
        var she = them[i];
        var img_src = './img/unknown.png';
        var link = '';
        var category = she.category != null ? she.category : '';
        if (she.published) {
            img_src = './img/' + she.id + '.jpg';
            link = './entrevista.html?she=' + she.id;
            $('section#ellas').append(
                '<article id="' + she.id + '">'
                    + '<a href="' + link + '" title="' + she.name + '">'
                    + '<img src="' + img_src + '" alt="">'
                    + '<span class="name">' + she.name + '</span>'
                    + '<span class="category">' + category + '</span>'
                    + '</a>'
                    + '</article>'
            );
        }
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

    $('article.categories a').click(function(e) {
        e.preventDefault();
        var category = $(this).data('category');
        if ($(this).hasClass('on')) {
            $('article.categories a[data-category=' + category + ']').removeClass('on');
            $('article.categories a[data-category=' + category + ']').addClass('off');
            $('section#ellas > article').removeClass('filtering');
        } else {
            $('article.categories a').removeClass('on');
            $('article.categories a').addClass('off');
            $('article.categories a[data-category=' + category + ']').removeClass('off');
            $('article.categories a[data-category=' + category + ']').addClass('on');
            for (var i in them) {
                var she = them[i];
                $('article#' + she.id).addClass('filtering');
                if (she.category == category) {
                    $('article#' + she.id).removeClass('filtered');
                } else {
                    $('article#' + she.id).addClass('filtered');
                }
            }
        }
    });
});
