class Page {

    storeName = document.getElementById("store-name");
    categories = document.getElementById("categories");
    adsTitle = document.getElementById("adsTitle");
    adsSubtitle = document.getElementById("adsSubtitle");
    secondTitle = document.getElementById("second-title");
    secondSubtitle = document.getElementById("second-subtitle");
    products = document.getElementById("products");
    author = document.getElementById("author");

    ads = document.getElementById("ads");

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

                document.title = data.systemSettings[0].storeName;

                this.storeName.innerHTML = data.systemSettings[0].storeName;

                var listOfCategories = "";

                for (var c = 0; c < data.categories.length; c++) {
                    listOfCategories += ' <a class="p-2 text-muted" href="#">' + data.categories[c].name + '</a>';
                }

                this.categories.innerHTML = listOfCategories;

                this.adsTitle.innerHTML = data.adsTitle;
                this.adsSubtitle.innerHTML = data.adsSubtitle;
             
                this.ads.classList.remove('text-white');
                this.ads.classList.remove('bg-dark');
                this.ads.style.backgroundColor = data.adsBackgroundColor;
                this.ads.style.color = data.adsFontColor;

                this.secondTitle.innerHTML = data.secondTitle;
                this.secondSubtitle.innerHTML = data.secondSubtitle;

                var listOfProducts = "";
            
                for (var p = 0; p < data.products.length; p++) {
                    listOfProducts += '<div class="col-md-4">';
                    listOfProducts += '<div class="card mb-4 shadow-sm p-3">';
                    listOfProducts += '<img class="card-img-top pb-2" src="'+data.products[p].imagePath+'">';
                    listOfProducts += '<div class="card-body border-top">';
                    listOfProducts += '<h6 class="card-text">'+data.products[p].name+'</h6>';
                    listOfProducts += '<h2 class="">'+data.products[p].price+'</h2>';
                    listOfProducts += '<p class="card-text">'+data.products[p].payment+'</p>';
                    listOfProducts += '<div class="d-flex justify-content-between align-items-center">';
                    listOfProducts += '<div class="btn-group">';
                    listOfProducts += '<button type="button" class="btn btn-sm btn-outline-secondary">Comprar</button>';
                    listOfProducts += '<button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-cart-shopping"></i> Adicionar</button>';
                    listOfProducts += '</div>';
                    listOfProducts += '</div>';
                    listOfProducts += '</div>';
                    listOfProducts += '</div>';
                    listOfProducts += '</div>';
                }

                products.innerHTML = listOfProducts;




                this.author.innerHTML = data.systemSettings[0].author;
            });

            $(window).on("load", function () {
                document.body.style.display = 'unset';
            });
    }
}

new Page("database.json");