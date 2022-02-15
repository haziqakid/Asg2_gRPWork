/* APOD js */
//const apiKey = "Tz3uI31nekYqEeaaVRPt13ecvGbKh3nQW7dKt0AR";
const apodUrl = "https://api.nasa.gov/planetary/apod";
const afeedUrl = "https://api.nasa.gov/neo/rest/v1/feed";


function handleAFeedData({element_count, near_earth_objects}, afeedElement, afeedTable){
    

    afeedElement.innerHTML = Object.keys(near_earth_objects).map(date=>{
        return near_earth_objects[date].map(asteroid=>{
            const id        = asteroid.id;
            const name      = asteroid.name;
            const dangerous = asteroid.is_potentially_hazardous_asteroid;
            const magnitude = asteroid.absolute_magnitude_h;
            const min       = asteroid.estimated_diameter.meters.estimated_diameter_min;
            const max       = asteroid.estimated_diameter.meters.estimated_diameter_max;
            const close_approach_data = asteroid.close_approach_data.shift();
            const miss_distance = close_approach_data.miss_distance.kilometers;

            return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dangerous ? "YES" : "NO"}</td>
                <td>${magnitude}</td>
                <td>${min}</td>
                <td>${max}</td>
                <td>${miss_distance}</td>
                <td>${date}</td>
            </tr>`

        }).join("");

    }).join("");

    if(afeedElement.innerHTML === ""){
        afeedTable.className = "striped hide"
    } else{
        afeedTable.className = "striped";
    }


}

function contentLoaded(){
    const apodElement = document.getElementById("apod");
    const startElement = document.getElementById("start");
    const afeedElement = document.getElementById("afeed");
    const afeedTable   = document.getElementById("afeedTable");

    /** Apod */

    fetch(`${apodUrl}?api_key=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{

        let media = "";
        if(data.media_type === "image"){
            media = `<img class="responsive-img" src="${data.hdurl}">`
        } else {
            media = `<div class="video-container">
                        <iframe src="${dat.hdurl}" width="560" height="315"></iframe>
                    </div>`
        }

        apodElement.innerHTML = (`
            <div class="card-image">
                ${media}
                <span class="card-title">${data.title}</span>
            </div>
            <div class="card-content">
                <p>
                    ${data.explanation}
                </p>
                <p>${(new Date(data.date)).toDateString()}</p>
                <p>© ${data.copyright}</p>
            </div>
            <div class="card-action">
                <a target="_blank" href="https://www.nasa.gov/">Find more @ Nasa</a>
            </div>
        `)
    }).catch(handleError);

    /** Asteroid Feed */
    const elems = document.querySelectorAll('.datepicker');
    const instances = M.Datepicker.init(elems, {
        autoClose: true,
        defaultDate: new Date(),
        format: 'yyyy-mm-dd'
    });

    start.addEventListener("change", function(){

        fetch(`${afeedUrl}?start_date=${this.value}&api_key=${apiKey}`)
        .then(res=>res.json())
        .then(data=>handleAFeedData(data, afeedElement, afeedTable))
        .catch(handleError);

        console.log(this.value);
    })

}


function handleError(error){
    console.warn(error.message);
}





window.addEventListener("DOMContentLoaded", contentLoaded)

let speed = 20;

document.getElementById('speed-slider').addEventListener('input', function(e){
    speed = parseInt(e.target.value);
})

class Star {
    constructor(){
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = this.pz = random(width*2);      
    }

    update(){
        this.z = this.z - speed;
        if(this.z < 1){
            this.z = this.pz = width*2;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    show(){
        fill(255);
        noStroke();

        const r = map(this.z, 0, width, 16, 0);
        
        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);
        const px = map(this.x / this.pz, 0, 1, 0, width);
        const py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z; 

        stroke(255);
        line(px, py, sx, sy)
    }
}

const stars = [];

function setup(){
    frameRate(30);
    createCanvas(windowWidth, windowHeight);
    canvas.style.position = "fixed";
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.zIndex = -100;
    for(let i = 0; i < 1000; i++){
        stars.push(new Star())
    }
}

function draw(){
    background(0);
    translate(width/2, height/2);
    stars.forEach(star=>{star.update();star.show();});
}

function windowResize(){
    canvasResize(windowWidth, windowHeight)
}