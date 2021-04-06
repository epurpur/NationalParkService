var searchInput = $('#park-search-input');
var searchBtn = $('.search-button');

searchBtn.on("click", () => {
    getNpsData();
    console.log(fullName);
});

var fullName = "";



// var url = "https://developer.nps.gov/api/v1/parks?parkCode=fobu&api_key=4eqRjnFCnxWx7DY3KDrv1DW73hwKeHabImKsqdEi";

function getNpsData(uniqueParkCode) {
    // fullName = searchInput.val();
    url = `https://developer.nps.gov/api/v1/parks?parkCode=${uniqueParkCode}&api_key=4eqRjnFCnxWx7DY3KDrv1DW73hwKeHabImKsqdEi`;

    console.log(url);

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(results) {
            console.log("results", results);




            var parkName = $('#park-name');
            var parkDesignation = $('#designation');
            var parkDescription = $('#description');
            var parkFee = $('#entrance-fee');
            var parkActivities = $('#activities');
            var parkImg = $('#img-link');
            var printSavedSearches = $('#saved-searches');

            var searchButton1 = $('.search-button1');
            var searchButton2 = $('.search-button2');
            var searchButton3 = $('.search-button3');
            var searchButton4 = $('.search-button4');
            var searchButton5 = $('.search-button5');


            parkName.text(" " + results.data[0].fullName);

            var parkNameText = results.data[0].fullName

            parkDesignation.text(" " + results.data[0].designation);

            // pushes activities into an array
            var activitiesText = [];
            var allActivities = results.data[0].activities;
            for (var i = 0; i < allActivities.length; i++) {
                //gets text of the object and pushes into the array
                activitiesText.push(" " + allActivities[i].name);

            }
            //sets text to the webpage
            parkActivities.text(activitiesText);

            parkImg.attr("src", results.data[0].images[0].url);
            // parkImg.style.height = 5;
            // parkImg.style.width = 5;

            parkDescription.text(" " + results.data[0].description);

            parkFee.text(" " + "$" + results.data[0].entranceFees[0].cost);



            //Saves park code and park name to local storage in an array of arrays
            //prints array to button under previously viewed

            var savedSearches = [uniqueParkCode, parkNameText];

            if (localStorage.getItem('savedSearchArray') == null) {
                localStorage.setItem('savedSearchArray', '[]');
            }

            var retrievedData = JSON.parse(localStorage.getItem('savedSearchArray'));
            retrievedData.push(savedSearches);

            localStorage.setItem('savedSearchArray', JSON.stringify(retrievedData));

            var newRetrievedData = [];
            for (var i = 0; i < retrievedData.length; i++) {
                newRetrievedData.push(retrievedData[i][1]);

                console.log(newRetrievedData);

            }

            searchButton1.text(newRetrievedData[0]);
            searchButton2.text(newRetrievedData[1]);
            searchButton3.text(newRetrievedData[2]);
            searchButton4.text(newRetrievedData[3]);
            searchButton5.text(newRetrievedData[4]);


        });

};

$(document).on("click", "#saved-search-button", function() {
    var uniqueParkName = $(this).data("#park-name");


    getNpsData(uniqueParkName);
});





//upon loading the document, get make API request
document.onload = getNpsMapData()

function getNpsMapData() {
    //makes API getch request to get NPS data for all 466 National Park Service sites
    var nps_api = "qds1ol7rZxTkBjYfmL11kwzK1q3eY7kwxODYb7qE"
    var url = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${nps_api}`
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            parseNPSData(data);

        });
}

function parseNPSData(npsData) {
    //parses data for all NPS 
    npsData = npsData.data;
    console.log(npsData);
    var parsedDataArray = [];
    var designations = []
    for (var i = 0; i < npsData.length; i++) {
        //get all unique designation values 
        var dataPackage = [];

        var name = npsData[i].fullName;
        var parkCode = npsData[i].parkCode;
        var lat = npsData[i].latitude;
        var lon = npsData[i].longitude;
        var designation = npsData[i].designation;
        designations.push(designation); //DELETE LATER
        //add items to dataPackage
        dataPackage.push(name, parkCode, lat, lon, designation);
        //add dataPackage to parsedDataArray
        parsedDataArray.push(dataPackage);
    }
    //draw markers on map
    drawMapMarkers(parsedDataArray);
    // //get all unique designations for parks, monuments, etc   DELETE THIS LATER
    // let uniqueItems = [...new Set(designations)]

}
/**
 * LEAFLET MAP
 */
// green marker will be used for national parks
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
// violet marker will be used for national monuments
var violetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
// red marker will be used for national historic sites
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
// gold marker will be used for national recreation areas
var goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function drawMapMarkers(markerData) {
    /**
     * Draws map markers on leaflet map 
     * 
     * green marker for National Parks
     * violet marker for National Monuments
     * red marker for National Historic Sites
     * gold marker for National Recreation Area
     * blue marker for any other designation
     * 
     * popups are associated with each marker and allow user to click to see more information
     */
    console.log(markerData);
    for (var i = 0; i < markerData.length; i++) {
        if (markerData[i][4] == 'National Park') {
            var marker = L.marker([markerData[i][2], markerData[i][3]], { icon: greenIcon }).addTo(map);
            marker.bindPopup(`<div id="popup">${markerData[i][0]}</div><br><button class="popup-button" data-parkcode=${markerData[i][1]}>View More</button>`);
        } else if (markerData[i][4] == 'National Monument') {
            var marker = L.marker([markerData[i][2], markerData[i][3]], { icon: violetIcon }).addTo(map);
            marker.bindPopup(`<div id="popup">${markerData[i][0]}</div><br><button class="popup-button" data-parkcode=${markerData[i][1]}>View More</button>`);
        } else if (markerData[i][4] == 'National Historic Site') {
            var marker = L.marker([markerData[i][2], markerData[i][3]], { icon: redIcon }).addTo(map);
            marker.bindPopup(`<div id="popup">${markerData[i][0]}</div><br><button class="popup-button" data-parkcode=${markerData[i][1]}>View More</button>`);
        } else if (markerData[i][4] == 'National Recreation Area') {
            var marker = L.marker([markerData[i][2], markerData[i][3]], { icon: goldIcon }).addTo(map);
            marker.bindPopup(`<div id="popup">${markerData[i][0]}</div><br><button class="popup-button" data-parkcode=${markerData[i][1]}>View More</button>`);
        } else {
            var marker = L.marker([markerData[i][2], markerData[i][3]]).addTo(map);
            marker.bindPopup(`<div id="popup">${markerData[i][0]}</div><br><button class="popup-button" data-parkcode=${markerData[i][1]}>View More</button>`);
        }
    }
}
//set initial view of map
var map = L.map('mapid').setView([37.697948, -97.314835], 4); //12 sets initial location over middle of country at zoom level 5
//link to Leaflet tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXB1cnB1ciIsImEiOiJja24wYXlkZnEwbTNqMm9tbGdoM3R1OXE0In0.TCaPhnKXLVLFpJeUS1AKJQ'
}).addTo(map);
//map zoom on click to zoom level 7
map.on('popupopen', function(centerMarker) {
    const zoomLvl = 7;
    let cM = map.project(centerMarker.popup._latlng);

    cM.y -= centerMarker.popup._container.clientHeight / zoomLvl
        // console.log(map.unproject(cM));
    map.setView(map.unproject(cM), zoomLvl, { animate: true });
});

//Event Listener for our 'View More' button in the map marker
//Will use the data-parkCode attribute to make a an API request for that site



$(document).on("click", ".popup-button", function() {
    console.log($(this).data("parkcode"));

    var uniqueParkCode = $(this).data('parkcode');

    getNpsData(uniqueParkCode);


});