music="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
score_leftWristY= 0;
score_rightWrist= 0;
function preload(){
    music=loadSound('music.mp3');
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    posenet= ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Model Loaded!');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftWristY= results[0].pose.keypoints[9].score;
        score_rightWrist= results[0].pose.keypoints[10].score;
        console.log('score_right wrist: '+score_rightWrist);
        console.log('score left wrist: '+score_leftWristY);
    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log('leftWristX = '+leftWristX+' leftWristY = '+leftWristY);
    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log('rightWristX = '+rightWristX+' rightWristY = '+rightWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke('#ff0000');
    if(score_leftWristY > 0.2){
        circle(leftWristX, leftWristY, 20);
        number_leftWristY= Number(leftWristY);
        remove_decimal_leftWristY= floor(number_leftWristY);
        volume= remove_decimal_leftWristY/500;
        document.getElementById('volume').innerHTML="Volume: "+volume;
        music.setVolume(volume);    
    }

    fill("#ff0000");
    stroke('#ff0000');
    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY> 0 && rightWristY<=100){
            document.getElementById('speed').innerHTML= 'speed= 0.5x';
            music.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<200){
            document.getElementById('speed').innerHTML= 'speed= 1x';
            music.rate(1); 
        }
        else if(rightWristY>200 && rightWristY<300){
            document.getElementById('speed').innerHTML= 'speed= 1.5x';
            music.rate(1.5); 
        }
        else if(rightWristY>300 && rightWristY<400){
            document.getElementById('speed').innerHTML= 'speed= 2x';
            music.rate(2); 
        }
        else if(rightWristY>400 && rightWristY<500){
            document.getElementById('speed').innerHTML= 'speed= 2.5x';
            music.rate(2.5); 
        }
        }
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}