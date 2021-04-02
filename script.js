

var searchInput = $('#park-search-input');
var searchBtn = $('.search-button');

searchBtn.on("click", () => {
    getNpsData();
    console.log(fullName);
});

var fullName = searchInput.val();


var url = "https://developer.nps.gov/api/v1/parks?q-"+ fullName +"&api_key=4eqRjnFCnxWx7DY3KDrv1DW73hwKeHabImKsqdEi";

function getNpsData(){
    url = "https://developer.nps.gov/api/v1/parks?q-"+ fullName +"&api_key=4eqRjnFCnxWx7DY3KDrv1DW73hwKeHabImKsqdEi";



    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(results){
        console.log(results);
    })

}
//`https://developer.nps.gov/api/v1/parks?limit=500&api_key=qds1ol7rZxTkBjYfmL11kwzK1q3eY7kwxODYb7qE` 



// National Parks nps API
// nps_api = "qds1ol7rZxTkBjYfmL11kwzK1q3eY7kwxODYb7qE"
// // url = `https://developer.nps.gov/api/v1/parks?parkCode=shen&api_key=${nps_api}`    //makes api request to just one park
// url = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${nps_api}`           //makes api request to all parks
// function getNpsData() {
//     fetch(url)
//         .then(function(response) {
//             return response.json()
//         })
//         .then(function(data) {
//             console.log(data);
//         })
// }
// getNpsData()