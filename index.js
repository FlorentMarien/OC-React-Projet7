function displaylistingredient(){
    document.getElementsByClassName("blockfiltres-filtresChecked")[0].innerHTML = "";
    arrayFiltreActive.forEach((pointer)=>{
        pointer.forEach((element)=>{
            document.getElementsByClassName("blockfiltres-filtresChecked")[0].appendChild(getBtnElement(element));    
        })
    })
}
function changeFiltre(){
    document.getElementById("btn-ingredient").innerHTML = "";
    document.getElementById("btn-appareils").innerHTML = "";
    document.getElementById("btn-ustensiles").innerHTML = "";
    arrayFiltre = [[],[],[]];
    recipes.forEach((element)=>{
        element.ingredients.forEach((ingredient) => {
            if(arrayFiltre[0].includes(ingredient.ingredient) === false) {
                arrayFiltre[0].push(ingredient.ingredient);
            }
        })
        
        element.ustensils.forEach((ustensils) => {
            if(arrayFiltre[2].includes(ustensils) === false) {
                arrayFiltre[2].push(ustensils);
            }
        })
    })
    displayFiltre(4);
}
function displayFiltre(category){
    let z = 0;
    let y = 0;
    if(category === 1 || category === 4){
            y=0;
            document.getElementById("btn-ingredient").innerHTML = "";
            arrayFiltre[0].forEach((element)=>{
                let labelandcheckbox = getCheckboxandlabel(element, z, y)
                z++;
                if(arrayFiltreActive[0].indexOf(element) >= 0) labelandcheckbox[0].checked = true; 
                document.getElementById("btn-ingredient").appendChild(labelandcheckbox[0]);
                document.getElementById("btn-ingredient").appendChild(labelandcheckbox[1]);
            })
    }
    if(category === 2 || category === 4){
            y=1;
            document.getElementById("btn-appareils").innerHTML = "";
            arrayFiltre[1].forEach((element)=>{
                let labelandcheckbox = getCheckboxandlabel(element, z, y)
                z++;
                if(arrayFiltreActive[1].indexOf(element) >= 0) labelandcheckbox[0].checked = true; 
                document.getElementById("btn-appareils").appendChild(labelandcheckbox[0]);
                document.getElementById("btn-appareils").appendChild(labelandcheckbox[1]);
            })
    }
    if(category === 3 || category === 4){
            y=2;
            document.getElementById("btn-ustensiles").innerHTML = "";
            arrayFiltre[2].forEach((element)=>{
                let labelandcheckbox = getCheckboxandlabel(element, z, y)
                z++;
                if(arrayFiltreActive[2].indexOf(element) >= 0) labelandcheckbox[0].checked = true; 
                document.getElementById("btn-ustensiles").appendChild(labelandcheckbox[0]);
                document.getElementById("btn-ustensiles").appendChild(labelandcheckbox[1]);
            })
    }
}
function searchFiltre(e, category){
    if(category === 1){
        arrayFiltre = [[],arrayFiltre[1],arrayFiltre[2]];
        recipes.forEach((element)=>{
            element.ingredients.forEach((ingredient) => {
                if(arrayFiltre[0].indexOf(ingredient.ingredient) === -1) {
                    if(ingredient.ingredient.includes(document.getElementById("input-search-ingredient").value)){
                        arrayFiltre[0].push(ingredient.ingredient);
                    }
                }
            })
        })
        displayFiltre(1);
    }
    if(category === 2){
        arrayFiltre = [arrayFiltre[0],[],arrayFiltre[2]];
        recipes.forEach((element)=>{
            /* A FAIRE */
        })
        displayFiltre(2);
    }
    if(category === 3){
        arrayFiltre = [arrayFiltre[0],arrayFiltre[1],[]];
        recipes.forEach((element)=>{
            element.ustensils.forEach((ustensils) => {
                if(arrayFiltre[2].indexOf(ustensils) === -1) {
                    if(ustensils.includes(document.getElementById("input-search-ustensiles").value)){
                        arrayFiltre[2].push(ustensils);
                    }
                }
            })
        })
        displayFiltre(3);
    }
}
function addactivefiltre(e,y){
    if(!arrayFiltreActive[y].includes(e.target.name)) arrayFiltreActive[y].push(e.target.name);
    else arrayFiltreActive[y].splice(arrayFiltreActive[y].indexOf(e.target.name),1);
    displaylistingredient();
}
function getCheckboxandlabel(element, x, y){
    let inputcheckbox = document.createElement("input");
    inputcheckbox.id = "btncheck"+x+"-"+y;
    inputcheckbox.className = "btn-check";
    inputcheckbox.type = "checkbox";
    inputcheckbox.autocomplete = "off";
    inputcheckbox.name = element;
    inputcheckbox.addEventListener("click",function(e){addactivefiltre(e,y)});
    let labelcheckbox = document.createElement("label");
    labelcheckbox.className = "btn btn-filtrecolor";
    labelcheckbox.setAttribute("for","btncheck"+x+"-"+y);
    labelcheckbox.textContent = element;
    return [inputcheckbox,labelcheckbox];

}
function getBtnElement(element){
   let btn = document.createElement("button");
   btn.className = "btn filtrecolor-checked";
   btn.type = "button";
   btn.ariaExpanded = "false";
   btn.textContent = element;
   btn.name = "checked-"+element;
   let i = document.createElement("i");
   i.className="fa-solid fa-xmark";
   i.addEventListener("click",function(){
    deleteBtnElement(element);
   })
   btn.appendChild(i);
   return btn;
}
function deleteBtnElement(x){
    if(document.getElementsByName(x)[0] !== undefined) document.getElementsByName(x)[0].checked = false;
    arrayFiltreActive.forEach((element)=>{
        if(element.indexOf(x) >= 0){
            element.splice(element.indexOf(x),1);
        }
    });
    displaylistingredient(); 
}
function getCardRecette(element){
    let article = document.createElement("article");
    article.className = "recettes-card";
    let img = document.createElement("img");
    img.className = "recettes-card-img";
    img.src = "assets/PhotosRecettes/"+element.image;
    let divtime = document.createElement("div");
    divtime.className = "recettes-card-time";
    divtime.textContent = element.time+"min";
    divcontent = document.createElement("div");
    divcontent.className = "recettes-card-recettes";
    let p = document.createElement("p");
    p.className = "recettes-card-recettes-title";
    p.textContent= element.name;
    divcontent_mid = document.createElement("div");
    let pCategoryRecette = document.createElement("p");
    pCategoryRecette.className = "recettes-card-recettes-category";
    pCategoryRecette.textContent = "Recettes";
    let pRecettes = document.createElement("p");
    pRecettes.className = "recettes-card-recettes-text";
    pRecettes.textContent = element.description;
    divcontent_mid.appendChild(pCategoryRecette);
    divcontent_mid.appendChild(pRecettes);
    
    let section = document.createElement("section");
    section.className = "recettes-card-recettes-section";
    
    
    element.ingredients.forEach((element)=>{
        let div = document.createElement("div")
        let pIngredientTitle = document.createElement("p");
        let pIngredientQuantity = document.createElement("p");
        pIngredientTitle.textContent = element.ingredient;
        pIngredientQuantity.className = "recettes-card-recettes-ingredient";
        let unit = element.unit === undefined ? "" : " "+element.unit;
        let quantity = element.quantity === undefined ? "" : " "+element.quantity;
        pIngredientQuantity.textContent = quantity + unit;
        div.appendChild(pIngredientTitle);
        div.appendChild(pIngredientQuantity);
        section.appendChild(div);
    });
    divcontent_bottom = document.createElement("div");
    let pCategoryIngredient = document.createElement("p");
    pCategoryIngredient.className = "recettes-card-recettes-category";
    pCategoryIngredient.textContent = "Ingredients";
    divcontent_bottom.appendChild(pCategoryIngredient);
    divcontent_bottom.appendChild(section);
    divcontent.appendChild(p);
    divcontent.appendChild(divcontent_mid);
    divcontent.appendChild(divcontent_bottom);
    article.appendChild(img);
    article.appendChild(divtime);
    article.appendChild(divcontent);
    return article
}
function displayCardRecette(){
    recipes.forEach((element)=>{
        document.getElementById("container-recettes-card").appendChild(getCardRecette(element));
    })
}
let arrayFiltre = [[],[],[]];
let arrayFiltreActive = [[],[],[]];
changeFiltre();

// Display a retirer 
displaylistingredient();


document.getElementById("input-search-ingredient").addEventListener("input",function(e){
    if(e.target.value === "") changeFiltre();
    else searchFiltre(e,1);
})
/*
document.getElementById("input-search-appareils").addEventListener("input",function(e){
    searchFiltre(e);
})
*/
document.getElementById("input-search-ustensiles").addEventListener("input",function(e){
    if(e.target.value === "") changeFiltre();
    else searchFiltre(e,3);
})

/* Recipes data include at the top of html index */
displayCardRecette();
//Get data jso
