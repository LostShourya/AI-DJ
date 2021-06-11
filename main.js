leftscore="";
rightscore=""; 
leftX="";
rightX="";
leftY="";
rightY="";
song1="";
song2="";
song1_status="";
song2_status="";
function preload(){
song1=loadSound("music.mp3")
song2=loadSound("song.mp3")
}
function setup(){
    canvas=createCanvas(500,400)
    canvas.position(400,180)
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video,model_loaded)
    posenet.on('pose',gotposes)
}
function model_loaded(){
    console.log("Model loaded")
}
function gotposes(results){
    if(results.length>0){
        console.log(results)
        leftscore=results[0].pose.keypoints[9].score
        rightscore=results[0].pose.keypoints[10].score
        leftX=results[0].pose.leftWrist.x
        rightY=results[0].pose.rightWrist.y
        leftY=results[0].pose.leftWrist.y
        rightX=results[0].pose.rightWrist.x

    }
}
function draw(){
    image(video,0,0,500,400)
    fill("red")
    stroke("red")
    if(rightscore>0.2){
        circle(rightX,rightY,40)
        song2.stop()
        if(song1_status==false){
            song1.play()
            document.getElementById("song").innerHTML="Harry potter theme is playing"
        }
    }
    if(leftscore>0.2){
        circle(leftX,leftY,40)
        song1.stop()
        if(song2_status==false){
            song2.play()
            document.getElementById("song").innerHTML="Hall of fame is playing"
        }
    }
}
function play(){
    song.play()
    song.setVolume(1)//1 is the maximum volume available
    song.rate(1)//rate can be more/less then 1 like 0.5,1.25,2.5 etc

}