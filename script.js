console.log("====================================");
console.log("Connected");
console.log("====================================");

/* *********************************************************** */

const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

//fetch api data
function fetchApiData() {
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => res.categories)
    .catch((error) => console.log("Error in loading API data:", error));
}

fetchApiData()
  .then((data) => {
    console.log(data);

    //category
    const category = document.querySelector(".category");
    console.log(category);

    /* ############# Products Category Section ###############*/

    //creating categories
    data.forEach((item) => {
      //console.log(item.category_name)
      const categoryElement = document.createElement("div");
      categoryElement.classList = item.category_name;
      const productCategory = document.createElement("div");
      productCategory.textContent = item.category_name;
      const productCategoryLogo = document.createElement("img");
      

      if (item.category_name == "Men") {
        productCategoryLogo.src = "./assets/men.svg";
      } else if (item.category_name == "Women") {
        productCategoryLogo.src = "./assets/women.svg";
      } else {
        productCategoryLogo.src = "./assets/kid.svg";
      }

      productCategoryLogo.alt="logo"
      productCategoryLogo.classList="category-logo"


      categoryElement.appendChild(productCategoryLogo);
      categoryElement.appendChild(productCategory);

      //console.log(categoryElement);
      category.appendChild(categoryElement);
    });

    /* ################################################ */

    /* ########### Products Card Section ############## */

    //category card container
    const cardContainer = document.querySelector(".card-container");
    //console.log(cardContainer);

    data.forEach((products) => {
      //console.log(products.category_name);

      const cardCategory = document.createElement("div");
      cardCategory.classList = products.category_name;
      //console.log(cardCategory);

      cardContainer.appendChild(cardCategory);

      products.category_products.forEach((item) => {
        //console.log(item)

        //create card element
        const card = document.createElement("div");
        card.classList = "product-card";
        card.id = item.id;

        //create product card image
        const cardImageContainer = document.createElement("div");

        const cardImage = document.createElement("img");
        cardImage.src = item.image;
        cardImage.alt = "product image";
        cardImage.classList = "product-img";
        cardImageContainer.appendChild(cardImage);
        // console.log(item.badge_text);
        //create badge text when data is there
        if(item.badge_text!==null){
          const productBadge=document.createElement("div");
          productBadge.classList="badge-text"
          productBadge.textContent=item.badge_text;
          cardImageContainer.appendChild(productBadge);
        }

        //create product card title and vendor
        const productTitleVendor = document.createElement("div");
        productTitleVendor.classList = "title-vendor-container";
        // const cardProductTitleContainer=document.createElement("div")
        const cardProductTitle = document.createElement("div");
        cardProductTitle.textContent = item.title;
        const cardProductVendor = document.createElement("div");
        cardProductVendor.textContent = item.vendor;
        const cardProductDot = document.createElement("div");
        //append child element to product title and vendor element container
        productTitleVendor.appendChild(cardProductTitle);
        productTitleVendor.appendChild(cardProductDot);
        productTitleVendor.appendChild(cardProductVendor);
        // cardProductTitleContainer.appendChild(cardProductTitle);

        //create product price, compare price and discount
        const cardProductPriceCompareDiscount = document.createElement("div");
        cardProductPriceCompareDiscount.classList = "product-price-discount";
        const cardProductPrice = document.createElement("div");
        const cardProductComparePriceContainer = document.createElement("div");
        const cardProductComparePrice = document.createElement("div");
        const cardProductComparePriceDash = document.createElement("div");
        const cardProductDiscount = document.createElement("div");
        cardProductPrice.textContent = `Rs ${(item.price)}.00`;
        cardProductComparePrice.textContent = item.compare_at_price;

        const discountAmt = item.compare_at_price - item.price;
        const discount = Math.round((discountAmt / item.price) * 100);

        cardProductDiscount.textContent = `${discount}% Off`;
        //append child elements to product price, compare and discount element container
        cardProductPriceCompareDiscount.appendChild(cardProductPrice);
        cardProductPriceCompareDiscount.appendChild(
          cardProductComparePriceContainer
        );
        cardProductPriceCompareDiscount.appendChild(cardProductDiscount);
        cardProductComparePriceContainer.appendChild(cardProductComparePrice);
        cardProductComparePriceContainer.appendChild(
          cardProductComparePriceDash
        );

        //create add to card button
        const btnContainer = document.createElement("div");
        btnContainer.classList = "btn-container";
        const btnAddToCard = document.createElement("button");
        btnAddToCard.textContent = "Add to Card";
        btnAddToCard.classList = "btn-addtocart";
        //append button element to button container
        btnContainer.appendChild(btnAddToCard);

        //append child elements to card element
        card.appendChild(cardImageContainer);
        card.appendChild(productTitleVendor);
        card.appendChild(cardProductPriceCompareDiscount);
        card.appendChild(btnContainer);

        //append cards to card category container
        cardCategory.appendChild(card);

        //console.log(card);
      });
    });

    /* ################################################ */

    /* #################EVENT HANDLING################# */

    //function to show selected category cards and hide others
    function hideCategoryCard(category){
      //console.log(category)
      const productCardContainer=document.querySelectorAll(".card-container>div")
      //console.log(productCardContainer)
      productCardContainer.forEach((element)=>{
        // console.log(element.classList.value)


        if(element.classList.value!==category){
          // console.log(element)
          //hide other categories cards
          element.style.display="none"
        }else{
          // show selected category cards
          element.style.display="grid"
        }

      })

    }

    //select all divs inside category
    const categoryElements = document.querySelectorAll(".category>div");

    //select category event handling
    categoryElements.forEach((element) => {
      element.addEventListener("click", () => {
        
        element.style.backgroundColor = "black";
        element.style.color = "#ffffff";
        const selectedCategoryLogo=document.querySelector(`.category>.${element.classList.value}>img`)
        selectedCategoryLogo.style.display="block";
        //console.log(element.textContent)

        //hide other categories
        hideCategoryCard(element.classList.value)



        //add default style to other categories
        categoryElements.forEach((item) => {
          const logo=document.querySelectorAll(".category>*>img")

          if (item !== element) {
            item.style.backgroundColor = "#f2f2f2";
            item.style.color = "black";
            const logo=document.querySelector(`.category>.${item !== element && item.classList.value}>img`)
            logo.style.display="none";
          }

        });

      });
    });

    /* ################################################ */
  })
  .catch((error) => console.log(error));

/* *********************************************************** */
