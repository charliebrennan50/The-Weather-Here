var mymap = L.map('mapid').setView([0, 0], 2);
updateMap();
getData();

async function getData() {

    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for (item of data) {
        const dateString = new Date(item.timestamp).toLocaleString();
        let popupText = `Location: ${item.location} Date: ${dateString} Note: ${item.notes}`
        var marker = L.marker([item.latitude, item.longitude]).addTo(mymap).bindPopup(popupText);
    }
}

getList();
async function getList(){
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');
        root.className = 'root-div';
        const loc = document.createElement('p');
        loc.textContent = ` Location: ${item.location}`;
        const geo = document.createElement('p');
        geo.textContent = `Coordinates:  ${item.latitude}, ${item.longitude}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        const date = document.createElement('h2');
        date.textContent = `Date: ${dateString}`;
        const conditions = document.createElement('p');
        conditions.textContent = `Conditions: ${item.conditions}`;
        const temperature = document.createElement('p');
        temperature.textContent =  `Temperature: ${Math.round(item.temperature)} °F`;
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${item.humidity}`;
        const notes = document.createElement('p');
        notes.textContent  = `${item.notes}`
        root.append( date, geo, loc, conditions, temperature, humidity, notes);
        document.body.append(root);
    }
    console.log(data);
}

function updateMap() {

    //Code to setup map tiles useing mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hhcmxpZWJyZW5uYW41MCIsImEiOiJja2VnejBjMWswbGoyMzBxcTFhYW00ZmkwIn0.UN50EPaU0pu2JV131L422g'
    }).addTo(mymap);

}