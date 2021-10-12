video = ""
status = ""
objects = []



function preload(){
    video = createVideo("video.mp4")
    video.hide()
}
function setup(){
    canvas = createCanvas(500, 350)
    canvas.center()
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status - Detecting"
}

function modelLoaded(){
   status = true
   video.speed(1)
   video.volume(0)
   video.loop()
   console.log("model loaded")
}

function draw(){
    image(video, 0, 0, 500, 350)
    if (status != ""){
        objectDetector.detect(video, gotResult)
        for (i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML =  "Status - Object Detected"
            document.getElementById("number_of_objects").innerHTML = "Objects: " + objects.length

            fill("red")
            percent = floor(objects[i].confidence*100) 
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height + 15)
        }

    }

}


    function gotResult(error, results){
        if (error){
            console.log(error)
        }
        console.log(results)
        objects = results
    }


