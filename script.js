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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=f4e80e2071fcae0bd7c122d2f82fd284")
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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=f4e80e2071fcae0bd7c122d2f82fd284")
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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=f4e80e2071fcae0bd7c122d2f82fd284")
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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Silkeborg&units=metric&appid=f4e80e2071fcae0bd7c122d2f82fd284")
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
        fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCk4DztX4RNPfT_QPrFoXNlsugabfg78mY&part=snippet&type=video&q=" + query)
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
            xhr.setRequestHeader("x-rapidapi-key", "da4b723be6msha2b57cbd3339f2ap17c0c6jsn33b74a15587f");
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
    else if(command.includes("my location")){
        navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});
        function success(position){
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lon + "," + lat + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiY29kZXpoaWZ0eSIsImEiOiJja3djbWJyZm0xanR3MnFwMnp2cTAyNDBrIn0.QNlyBRhAhJJqX8Yr7tDTfw")
            .then(response => response.json())
            .then(data => {
                const locationTown = data.features[2].place_name;
                console.log(locationTown);
                toggleMap(lon, lat);
                setTimeout(() => {
                    speak("You are located in " + locationTown);
                }, 3000);
            });
        }
        function error(error){
            console.log(error)
        }
    }
    else if(command.includes("find ")) {
        const query = command.split("find ").pop();
        fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ query + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiY29kZXpoaWZ0eSIsImEiOiJja3djbWJyZm0xanR3MnFwMnp2cTAyNDBrIn0.QNlyBRhAhJJqX8Yr7tDTfw")
        .then(response => response.json())
        .then(data => {
            console.log(data.features[1].center);
            const lon = data.features[1].center[0];
            const lat = data.features[1].center[1];
            toggleMap(lon, lat);
        });
    }
    else if(command.includes("close map")){
        toggleMap();
    }
}

recognition.onend = function() {
    console.log("Ended")
    recognition.start();
}

function speak(input){
    document.querySelector(".evaBot").src = "./animations/talkAnim.mp4";
    const voices = speechSynthesis.getVoices();
    var utterance = new SpeechSynthesisUtterance(input);
    utterance.voice = voices[2];
    speechSynthesis.speak(utterance);
    utterance.onend = function(){
        document.querySelector(".evaBot").src = "./animations/idleAnim.mp4";
    }
}

function toggleMap(lon, lat){
    if(map.getSource('dot-point')){
        map.removeLayer('layer-with-pulsing-dot');
        map.removeSource('dot-point');
        map.removeImage('pulsing-dot');
    }
    if(document.querySelector(".evaBot").classList.contains("evaVideo") || document.querySelector(".evaBot").classList.contains("evaBigVideo")){
        document.querySelector(".evaBot").classList.add("evaSmallVideo");
        document.querySelector(".evaBot").classList.remove("evaVideo");
        document.querySelector(".evaBot").classList.remove("evaBigVideo");
        document.querySelector(".mapboxgl-map").classList.remove("mapAnim");
        setTimeout(() => {
            document.getElementById("map").style.visibility = "visible";
            map.jumpTo({
                center: [
                    10.5549,
                    45.1764
                ],
                zoom: 2,
                essential: true
            });
            document.querySelector(".mapboxgl-map").classList.add("mapAnim");
        }, 3000);
        setTimeout(() => {
            flyTo(lon, lat)
        }, 5000);
    }
    else if(document.querySelector(".evaBot").classList.contains("evaSmallVideo")){
        if(lon == null && lat == null) {
            document.querySelector(".evaBot").classList.add("evaBigVideo");
            document.querySelector(".evaBot").classList.remove("evaSmallVideo");
            document.getElementById("map").style.visibility = "hidden";
        }
        else {
            flyTo(lon, lat);
        }
    }
}

function sleep(input){
    if(input == "true") {
        document.querySelector(".evaBot").style.display = "none";
    }
    else {
        document.querySelector(".evaBot").style.display = "block";
    }
}

function start(){
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".evaBot").style.display = "block";
    recognition.start()
}