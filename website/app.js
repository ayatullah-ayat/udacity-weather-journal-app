/* Global Variables */
const KEY = '1ec617cb7cbe7f0ee65e47492d1703e3';
const generate = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();




// Helper Function Start
const fetchApiData = async () => {
    const zipcode = document.getElementById('zip').value;
    if(zipcode == ''){
        alert('Please! put zip code');
        return
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},bd&appid=${KEY}`;
    
    const fetchData = await fetch(url);
    try {
        const jsonData = await fetchData.json();
        console.log(jsonData);
        return jsonData;
    }catch(err){
        console.log(err)
    }
}
// post data to the server
const postDataToTheServer = async (url = '', data = {}) => {
    const post = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// update UI

// data will be injected here
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

const getProjectData = async (url) => {
    const res = await fetch(url)

    try {
        const json = await res.json();
        return json;
    }catch(err) {
        console.log(err)
    }
}

function updateUI(res) {
    date.innerHTML = 'date: ' + res.date;
    temp.innerHTML = 'temp: ' + res.temp;
    content.innerHTML = 'feeling: ' + res.content;

    // after update the text field will be clear
    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';
}
// Helper Function End





// handling api data and and user's data
function apiDataHandler() {
    const content = document.getElementById('feelings').value;
    fetchApiData()
    // then post to the server
    .then(data => {
        const obj = {};
        obj.temp = data.main.temp;
        obj.date = newDate;
        obj.content = content;
        
        postDataToTheServer('/addPost', obj)
        // then get projectData from the server
        .then(res => {
            getProjectData('/all')
            // then update UI
            .then((res) => {
                updateUI(res);
            })
        })
    })
    
}
// set event listener
generate.addEventListener('click', function() {
    apiDataHandler();
})
