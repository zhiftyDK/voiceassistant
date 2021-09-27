const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    const command = event.results[0][0].transcript.toLowerCase();
    if(command.includes("eva") || command.includes("either")){
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
                    console.log(data.query.pages[dataPageId].extract);
                    speak(data.query.pages[dataPageId].extract);
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
                speak(`In ${nameValue} it is ${tempValue.toString().slice(0,2)} degrees and ${descValue}`);
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
                speak("Good morning sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2) + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
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
                speak("Good evening sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2) + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
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
                speak("Good afternoon sir, the time is" + hours + " " + minutes + ", the weather in " + nameValue + " is " + tempValue.toString().slice(0,2) + " degrees and " + descValue + ", have a great " + weekDays[weekDay] + " sir");
            })
        }
        else if(command.includes("goodnight") || command.includes("good night")){
            speak("Sleep well sir, see you tomorrow")
        }
        else if(command.includes("calculate")){
            const calculation = command.split("calculate ").pop();
            if(calculation.includes("x")){
                const formattedMultiplication = calculation.replace("x", "*");
                console.log(formattedMultiplication);
                const calculated = eval(formattedMultiplication);
                console.log(`The answer is ${calculated}`);
                speak(`The answer is ${calculated}`);
            }
            else{
                console.log(calculation);
                const calculated = eval(calculation);
                console.log(`The answer is ${calculated}`);
                speak(`The answer is ${calculated}`);
            }
        }
        else if(command.includes("time")){
            const today = new Date(),
            hours = today.getHours(),
            minutes = today.getMinutes();
            speak(`The time is ${hours} ${minutes}`)
        }
        else if(command.includes("play")){
            const query = command.split("play ").pop();
            fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCk4DztX4RNPfT_QPrFoXNlsugabfg78mY&part=snippet&type=video&q=" + query)
            .then(response => response.json())
            .then(data => {
                speak("Playing " + query)
                window.open("https://www.youtube.com/watch?v=" + data.items[0].id.videoId);
            })
        }
        else if(command.includes("ugly")){
            speak("Shut up you idiot");
        }
        else if(command.includes("tidal")){
            window.open("tidal:")
            speak("Opening tidal");
        }
    }
}
recognition.onend = function() {
    setTimeout(() => {
        console.log("Ended")
        recognition.start();
    }, 1000);
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

function start(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("evaTalkAnim").style.display = "none";
    document.getElementById("evaIdleAnim").style.display = "block";
    setTimeout(() => {
        document.getElementById("evaIdleAnim").style.animation = "none";
    }, 6000);
    recognition.start()
}