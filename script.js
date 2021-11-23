//Keys & Tokens
var youtubeapikey = config.YOUTUBE_API_KEY;
var rapidapikey = config.RAPID_API_KEY;
var openweathermapapikey = config.OPENWEATHERMAP_API_KEY;

//Speechengine
const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    const command = event.results[0][0].transcript.toLowerCase();
    if(command.includes("how are you")){
        speak("I am great thanks");
    }
    else if(command.includes("tell me about")){
        const query = command.split("tell me about ").pop();
        console.log(query);
        fetch("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=" + query)
        .then(response => response.json())
        .then(formattedQuery => {
            console.log(formattedQuery);
            fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=2&explaintext=1&format=json&origin=*&titles=" + formattedQuery[1][0])
            .then(response => response.json())
            .then(data => {
                const dataPageId = Object.getOwnPropertyNames(data.query.pages);
                if(data.query.pages[dataPageId].extract.endsWith("may refer to:")){
                    fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=2&explaintext=1&format=json&origin=*&titles=" + formattedQuery[1][1])
                    .then(response => response.json())
                    .then(data2 => {
                        const dataPageId = Object.getOwnPropertyNames(data2.query.pages);
                        console.log(data2.query.pages[dataPageId].extract);
                        speak(data2.query.pages[dataPageId].extract);
                    })
                }
                else{
                    console.log(data.query.pages[dataPageId].extract);
                    speak(data.query.pages[dataPageId].extract);
                }
            })
        })
    }
    else if(command.includes("weather")){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=" + openweathermapapikey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tempValue = data['main']['temp'];
            const nameValue = data['name'];
            const descValue = data['weather'][0]['main'];    
            console.log(tempValue.toString().slice(0,2) + " " + descValue + " " + nameValue);
            speak(`In ${nameValue} it is ${tempValue.toString().slice(0,2).replace(".", "")} degrees and ${descValue}`);
        })
    }
    else if(command.includes("good morning")){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=" + openweathermapapikey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tempValue = data['main']['temp'];
            const nameValue = data['name'];
            const descValue = data['weather'][0]['main'];    
            console.log(tempValue.toString().slice(0,2) + " " + descValue + " " + nameValue);
            const today = new Date(),
            hours = today.getHours(),
            minutes = today.getMinutes(),
            weekDay = today.getDay();
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            speak("Good morning sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2).replace(".", "") + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
        })
    }
    else if(command.includes("good evening")){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=" + openweathermapapikey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tempValue = data['main']['temp'];
            const nameValue = data['name'];
            const descValue = data['weather'][0]['main'];    
            console.log(tempValue.toString().slice(0,2) + " " + descValue + " " + nameValue);
            const today = new Date(),
            hours = today.getHours(),
            minutes = today.getMinutes(),
            weekDay = today.getDay();
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            speak("Good evening sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2).replace(".", "") + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
        })
    }
    else if(command.includes("good afternoon")){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=" + openweathermapapikey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tempValue = data['main']['temp'];
            const nameValue = data['name'];
            const descValue = data['weather'][0]['main'];    
            console.log(tempValue.toString().slice(0,2) + " " + descValue + " " + nameValue);
            const today = new Date(),
            hours = today.getHours(),
            minutes = today.getMinutes(),
            weekDay = today.getDay();
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            speak("Good afternoon sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2).replace(".", "") + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
        })
    }
    else if(command.includes("goodnight") || command.includes("good night")){
        speak("Sleep well sir, see you tomorrow")
    }
    else if(command.includes("time")){
        const today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes();
        speak(`The time is ${hours} ${minutes}`)
    }
    else if(command.includes("play ")){
        if(document.getElementById("audioPlayer")){
            document.getElementById("audioPlayer").remove();
        }
        const query = command.split("play ").pop();
        fetch("https://www.googleapis.com/youtube/v3/search?key=" + youtubeapikey + "&part=snippet&type=video&q=" + query)
        .then(response => response.json())
        .then(data => {
            const data2 = null;
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(JSON.parse(this.response).link);
                    const audio = document.createElement("audio");
                    audio.id = "audioPlayer";
                    audio.autoplay;
                    audio.src = JSON.parse(this.response).link;
                    document.body.appendChild(audio);
                    document.getElementById("audioPlayer").play();
                }
            });
            xhr.open("GET", "https://youtube-mp36.p.rapidapi.com/dl?id=" + data.items[0].id.videoId);
            xhr.setRequestHeader("x-rapidapi-host", "youtube-mp36.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", rapidapikey);
            xhr.send(data2);
        });
    }
    else if(command == "pause" || command == "mute"){
        document.getElementById("audioPlayer").pause();
    }
    else if(command == "play" || command == "unmute"){
        document.getElementById("audioPlayer").play();
    }
    else if(command.includes("volume")){
        const volumeValue = command.split("volume ").pop().replace("%", "");
        console.log(volumeValue);
        if(document.getElementById("audioPlayer")){
            document.getElementById("audioPlayer").volume = document.getElementById("audioPlayer").volume = volumeValue/100;
        }
    }
    else if(command == "stop"){
        speechSynthesis.cancel();
    }
    else if(command == "go to sleep"){
        sleep("true");
    }
    else if(command == "wake up"){
        sleep("false");
    }
}
recognition.onend = function() {
    console.log("Ended")
    recognition.start();
}

function speak(input){
    document.getElementById("evaIdleAnim").style.display = "none";
    document.getElementById("evaTalkAnim").style.display = "block";
    const voices = speechSynthesis.getVoices();
    var utterance = new SpeechSynthesisUtterance(input);
    utterance.voice = voices[2];
    speechSynthesis.speak(utterance);
    utterance.onend = function(){
        document.getElementById("evaTalkAnim").style.display = "none";
        document.getElementById("evaIdleAnim").style.display = "block";
    }
}

function sleep(input){
    if(input == "true") {
        document.getElementById("evaIdleAnim").style.display = "none";
    }
    else {
        document.getElementById("evaIdleAnim").style.display = "block";
    }
}

function start(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("evaTalkAnim").style.display = "none";
    document.getElementById("evaIdleAnim").style.display = "block";
    setTimeout(() => {
        document.getElementById("evaIdleAnim").style.animation = "none";
    }, 6000);
    recognition.start()
}