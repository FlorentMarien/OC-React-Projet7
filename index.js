function changelistingredient(e){
    array = [];
    document.getElementById("btn-ingredient").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                array.push(element);
            }
        }
    })
    document.getElementById("btn-appareils").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                array.push(element);
            }
        }
    })
    document.getElementById("btn-ustensiles").childNodes.forEach((element)=>{
        if(element !== Text) {
            if(element.checked === true){
                array.push(element);
            }
        }
    })
    displaylistingredient();
}
function displaylistingredient(){
    document.getElementsByClassName("blockfiltres-filtresChecked")[0].innerHTML = "";
    array.forEach((element)=>{
        document.getElementsByClassName("blockfiltres-filtresChecked")[0].appendChild(getBtnElement(element));
    })
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
let array = [];
changelistingredient();
window.addEventListener("change",function(e){changelistingredient(e)});