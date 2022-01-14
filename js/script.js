var res;

///////////// get data from json file /////////////
/////////////// and store it in res ///////////////
function getData(){
    $.ajax(
        {
            url: "js/DB.json",
            success: function(data){
                res = data;
                fill()
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
    $("tbody").html("");
    fill();
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
    $("tbody").html("");
    fill();
}
///////////////////////////////////////////////////


//////////// Fill table with json data ////////////
function fill(){
    res.forEach(el => {
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