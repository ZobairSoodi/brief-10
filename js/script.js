var res;
var temp = [];
var current_page = 1;
var search_input = document.getElementById("search");
var pag_div = document.getElementById("pag");

///////////// get data from json file /////////////
/////////////// and store it in res ///////////////
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
getData();
///////////////////////////////////////////////////



///////////// Sort by Label/Category//////////////
function sort_T(e, direction){
    var sort_var = e.parentElement.innerText.trim(); 
    res.sort(function(a,b){
        if(a[sort_var].toUpperCase() < b[sort_var].toUpperCase())return -1
    })
    if(direction == "desc"){
        res.reverse();
    }
    pag_btn(current_page);
}
///////////////////////////////////////////////////



///////////////// Sort by Id/Price/////////////////
function sort_T_num(e, direction){
    var sort_var = e.parentElement.innerText.trim();
    res.sort(function(a,b){
        return a[sort_var] - b[sort_var]
    })
    if(direction == "desc"){
        res.reverse();
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
        })
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
search_input.addEventListener("keyup", function(){
    var temp = [];
    res.forEach(el => {
        var inp = search_input.value.trim();
        if((el.label.indexOf(inp)!=-1)||(el.category.indexOf(inp)!=-1)||(el.id == inp)||(el.price == inp)){
            temp.push(el);
        }
    });
    pag_btn(current_page);
})
///////////////////////////////////////////////////



/////////// add the pagination buttons ////////////
function add_pag_btn(r){
    var num_of_pages = Math.ceil(r.length/5);
    for(var i = 1; i <= num_of_pages; i++){
        pag_div.innerHTML += `<input type="button" value="${i}" onclick="pag_btn(this.value)">`
    }
}
///////////////////////////////////////////////////



////////////// !!EPIC PAGINATION!! ////////////////
function pag_btn(e){
    var start = (Number(e)-1)*5;
    temp = res.slice(start, start + 5);
    current_page = Number(e);
    $("tbody").html("");
    fill(temp);
}
///////////////////////////////////////////////////