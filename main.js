var prediction1="";
var prediction2="";
camera=document.getElementById("camera");
Webcam.set({
width:360,
height:250,
image_format:'png',
png_quality:90
});


Webcam.attach('#camera');


function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'">'
    });
}
console.log("ml5:",ml5.version);

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VyRpJ-3sW/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelisloaded");
}
function functioncheck(){
    img=document.getElementById('captured_img');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
     gesture=results[0].label;
    toSpeak="";

    if(gesture=="amazing"){
            toSpeak="This looks Amazing";
            document.getElementById("update_emoji").innerHTML="&#128076;";
    }
    else if(gesture=="Best"){
        toSpeak="This is The best";
        document.getElementById("update_emoji").innerHTML="&#128077;";
}
else if(gesture=="Victory"){
    toSpeak="This is Victory";
    document.getElementById("update_emoji").innerHTML="&#9996;";
}
speak();
}

}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak();
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}