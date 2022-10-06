class Page {

    //VARIAVEIS
    author = document.getElementById("author");
    logo = document.getElementById("logo");
    favicon = document.getElementById("favicon");
    menu = document.getElementById("menu");
    menuMobile = document.getElementById("menu-mobile");
    emphasisBanner1 = document.getElementById("emphasis-banner1");
    emphasisName = document.getElementById("emphasis-name");
    emphasisYear = document.getElementById("emphasis-year");
    emphasisClassification = document.getElementById("emphasis-classification");
    emphasisDuration = document.getElementById("emphasis-duration");
    emphasisDescription = document.getElementById("emphasis-description");
    movies = document.getElementById("movies");

    constructor(jsonPath) {
        fetch(jsonPath)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.erro) {
                    console.log("Erro ao acessar o JSON");
                    return;
                }

                //CONFIGURAÇÕES
                document.title = data.systemSettings.name;
                favicon.setAttribute("href", data.systemSettings.favicon);
                logo.setAttribute('src', data.systemSettings.logo);
                this.author.innerHTML = data.systemSettings.author;


                //MENU
                var listOfMenu = "";
                var listOfMenuMobile = "";
                for (var m = 0; m < data.menu.length; m++) {
                    if (m == 0) {
                        listOfMenu += '<li class="nav-item"> <a href="#" class="nav-link text-reset  d-xl-flex active">' + data.menu[m].name + '</a></li>';
                        listOfMenuMobile += '<li><a href="" class="text-reset active">' + data.menu[m].name + '</a></li>';
                    } else {
                        listOfMenu += '<li class="nav-item"> <a href="#" class="nav-link text-reset  d-xl-flex ">' + data.menu[m].name + '</a></li>';
                        listOfMenuMobile += '<li><a href="" class="text-reset">' + data.menu[m].name + '</a></li>';
                    }
                }
                this.menu.innerHTML = listOfMenu;
                this.menuMobile.innerHTML = listOfMenuMobile;

                //DESTAQUE
                this.emphasisBanner1.setAttribute('src', data.emphasis.banner1);
                this.emphasisName.innerHTML = data.emphasis.name;
                this.emphasisYear.innerHTML = data.emphasis.year;
                this.emphasisClassification.innerHTML = data.emphasis.classification;
                this.emphasisDuration.innerHTML = data.emphasis.duration;
                this.emphasisDescription.innerHTML = data.emphasis.description;
                document.querySelector(".full-banner").style.backgroundImage = 'linear-gradient(black, transparent, transparent), linear-gradient(to bottom,   transparent, transparent, rgb(3 3 3)), linear-gradient(to right, rgb(0, 0, 0), transparent), url(' + data.emphasis.banner2 + ')';

                //SLIDES
                var listOfCategoriesAndMovies = "";
                for (var c = 0; c < data.categories.length; c++) {
                    listOfCategoriesAndMovies += '<div class="pl-4  list-titles">';
                    listOfCategoriesAndMovies += '<h4 class="categories-name">' + data.categories[c].name + '</h4>';
                    listOfCategoriesAndMovies += '</div>';
                    listOfCategoriesAndMovies += '<div class=" carrosel-filmes  flex-nowrap overflow-hidden">';
                    listOfCategoriesAndMovies += '<div class="owl-carousel owl-theme">';
                    for (var m = 0; m < data.categories[c].movies.length; m++) {
                        listOfCategoriesAndMovies += '<div class="container">';
                        listOfCategoriesAndMovies += '<div class="box">';
                        listOfCategoriesAndMovies += '<div class="imgbox">';
                        listOfCategoriesAndMovies += '<a href="#"><img class="rounded" src="' + data.categories[c].movies[m].banner + '" alt="' + data.categories[c].movies[m].name + '"></a>';
                        listOfCategoriesAndMovies += '</div>';
                        listOfCategoriesAndMovies += '<div class="content">';
                        listOfCategoriesAndMovies += '<div>';
                        if (data.categories[c].movies[m].name != null) {
                            listOfCategoriesAndMovies += '<h2>' + data.categories[c].movies[m].name + '</h2>';
                        }
                        listOfCategoriesAndMovies += '</div>';
                        listOfCategoriesAndMovies += '</div>';
                        listOfCategoriesAndMovies += '</div>';
                        listOfCategoriesAndMovies += '</div>';
                    }
                    listOfCategoriesAndMovies += '</div>';
                    listOfCategoriesAndMovies += '</div>';
                }

                this.movies.innerHTML = listOfCategoriesAndMovies;

                $('.owl-carousel').owlCarousel({
                    center: true,
                    items: 2,
                    loop: true,
                    margin: 10,
                    nav: false,
                    dots: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 4
                        },
                        1000: {
                            items: 6
                        }
                    }
                });

            });


        //MOSTAR PAGINA  
        $(window).on("load", function () {
            document.body.style.display = 'block';
        });
    }
}

new Page("database.json");


