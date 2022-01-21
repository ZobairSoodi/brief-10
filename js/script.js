var res;
var temp = [];
var current_page = 1;
var search_input = document.getElementById("search");
var pag_div = document.getElementById("pag");

///////////// get data from json file /////////////
/////////////// and store it in res ///////////////
(
    function getData(){
        $.ajax(
            {
                url: "js/DB.json",
                success: function(data){
                    res = data;
                    add_pag_btn(res)
                    pag_btn(current_page);
                }
            }
        )
    }
)();
///////////////////////////////////////////////////



///////////// Sort by Label/Category//////////////
function sort_T(e, direction){
    var sort_var = e.parentElement.innerText.trim();
    if(direction == "desc"){
        res.sort(function(a,b){
            if(a[sort_var].toUpperCase() > b[sort_var].toUpperCase())return -1
        })
    }
    else{
        res.sort(function(a,b){
            if(a[sort_var].toUpperCase() < b[sort_var].toUpperCase())return -1
        })
    }
    pag_btn(current_page);
}
///////////////////////////////////////////////////



///////////////// Sort by Id/Price/////////////////
function sort_T_num(e, direction){
    var sort_var = e.parentElement.innerText.trim();
    if(direction == "desc"){
        res.sort(function(a,b){
            return a[sort_var] - b[sort_var]
        })
    }
    else{
        res.sort(function(a,b){
            return b[sort_var] - a[sort_var]
        })
    }
    pag_btn(current_page);
}
///////////////////////////////////////////////////



//////////// Fill table with json data ////////////
function fill(result){
    result.forEach(el => {
        var ul = document.createElement("ul");
        el.availablity.forEach(av => {
            var li = document.createElement("li");
            li.innerHTML = av;
            ul.appendChild(li);
        });
        $("tbody").append(`<tr>
            <td>${el.id}</td>
            <td>${el.label}</td>
            <td>${el.price}</td>
            <td>${el.category}</td>
            <td>${ul.innerHTML}</td>
            <td><ul>
                <li>RS : ${el.provider.RS}</li>
                <li>address : ${el.provider.address}</li>
            </ul></td>
        </tr>`);
    })
}
///////////////////////////////////////////////////



/////////// search by **!!EVERYTHING!!** //////////
$("#search").on("keyup", function(){
    var temp2 = [];
    res.forEach(el => {
        var inp = search_input.value.trim();
        if((el.label.indexOf(inp)!=-1)||(el.category.indexOf(inp)!=-1)||(el.id == inp)||(el.price == inp)){
            temp2.push(el);
        }
    });
    $("tbody").html("");
    add_pag_btn(temp2);
    temp2 = temp2.slice(0, 5);
    fill(temp2);
})
///////////////////////////////////////////////////



/////////// add the pagination buttons ////////////
function add_pag_btn(r){
    var num_of_pages = Math.ceil(r.length/5);
    pag_div.innerHTML = "";
    for(var i = 1; i <= num_of_pages; i++){
        pag_div.innerHTML += `<input type="button" value="${i}" onclick="pag_btn(this.value)">`
    }
}
///////////////////////////////////////////////////



////////////// !!EPIC PAGINATION!! ////////////////
function pag_btn(e){
    var temp2 = []
    res.forEach(el => {
        var inp = search_input.value.trim();
        if((el.label.indexOf(inp)!=-1)||(el.category.indexOf(inp)!=-1)||(el.id == inp)||(el.price == inp)){
            temp2.push(el);
        }
    });
    var start = (Number(e)-1)*5;
    temp = temp2.slice(start, start + 5);
    current_page = Number(e);
    $("tbody").html("");
    fill(temp);
}
///////////////////////////////////////////////////

var nav = document.getElementById("nav_body");
var menu_btn = document.getElementById("menu_btn");
var media_query = window.matchMedia("(max-width:700px)");
var is_active = false;
menu_btn.addEventListener("click",function(){
    
    if(nav.style.display == "none" || nav.style.display == ""){
        nav.style.display = "flex";
        is_active = true;
    }
    else{
        nav.style.display = "none";
        is_active = false;
    }
})

window.addEventListener("resize", function(){
    if(window.innerWidth<700){
        if(is_active){
            nav.style.display = "flex";
        }
        else{
            nav.style.display = "none";
        }
    }
    else{
        nav.style.display = "flex";
    }

})