function changelistingredient(e){
    arrayFiltreActive = [[],[],[]];
    document.getElementById("btn-ingredient").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                arrayFiltreActive[0].push(element);
            }
        }
    })
    document.getElementById("btn-appareils").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                arrayFiltreActive[1].push(element);
            }
        }
    })
    document.getElementById("btn-ustensiles").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                arrayFiltreActive[2].push(element);
            }
        }
    })
    changeFiltre();
    displaylistingredient();
}
function displaylistingredient(){
    document.getElementsByClassName("blockfiltres-filtresChecked")[0].innerHTML = "";
    arrayFiltreActive.forEach((pointer)=>{
        pointer.forEach((element)=>{
            document.getElementsByClassName("blockfiltres-filtresChecked")[0].appendChild(getBtnElement(element));    
        })
    })
}
function changeFiltre(){
    /* x = pointerIngredient w = pointerUstensiles & y=type 1->ingredient 2->Appareils 3->Ustensiles */
    let x = 0;
    let w = 0;
    let y=1;
    recipes.forEach((element)=>{
        element.ingredients.forEach((ingredient) => {
            if(arrayFiltre[0].includes(ingredient.ingredient) === false) {
                arrayFiltre[0].push(ingredient.ingredient);
                y=1;
                let labelandcheckbox = getCheckboxandlabel(ingredient.ingredient, x, y)
                x++;
                document.getElementById("btn-ingredient").appendChild(labelandcheckbox[0]);
                document.getElementById("btn-ingredient").appendChild(labelandcheckbox[1]);
            }
        })
        
        element.ustensils.forEach((ustensils) => {
            if(arrayFiltre[2].includes(ustensils) === false) {
                arrayFiltre[2].push(ustensils);
                y=3;
                let labelandcheckbox = getCheckboxandlabel(ustensils, w, y)
                w++;
                document.getElementById("btn-ustensiles").appendChild(labelandcheckbox[0]);
                document.getElementById("btn-ustensiles").appendChild(labelandcheckbox[1]);
            }
        })
    })
}
function getCheckboxandlabel(element, x, y){
    let inputcheckbox = document.createElement("input");
    inputcheckbox.id = "btncheck"+x+"-"+y;
    inputcheckbox.className = "btn-check";
    inputcheckbox.type = "checkbox";
    inputcheckbox.autocomplete = "off";
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
    
   let findlabel = document.getElementsByTagName('label');
   let y=0;
   let elementlabel;
   while(y<findlabel.length){
    if(findlabel[y].htmlFor === element.id) {
        elementlabel=findlabel[y];
        y = findlabel.length;
    }
    y++;
   }
   btn.textContent = elementlabel.textContent;
   btn.id = "checked-"+elementlabel.textContent;
   let i = document.createElement("i");
   i.className="fa-solid fa-xmark";
   i.addEventListener("click",function(){
    deleteBtnElement(element);
   })
   btn.appendChild(i);
   return btn;
}
function deleteBtnElement(element){
    document.getElementById(element.id).checked = false;
   changelistingredient(); 
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
changelistingredient();
window.addEventListener("change",function(e){changelistingredient(e)}); 

/* Recipes data include at the top of html index */
console.log(recipes);
displayCardRecette();
//Get data jso
