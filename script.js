const wrapper = document.querySelector(".wrapper"),
searchinput = document.querySelector("input"),
volumeicon = document.querySelector(".fa-volume-up"),
synonyms = document.querySelector(".synonyms .list"),
removeicon = document.querySelector(".material-icons"),
infoText = document.querySelector(".info-text");
let audio;

function data( result, word ) {
    if(result.title === "No Definitions Found"){
        wrapper.classList.remove("active"); 
        infoText.innerHTML =`can't find the meaning of <span>"${word}"</span>.<br> Please try another word.`
    }else{

        console.log(result);
        wrapper.classList.add("active"); 
        document.querySelector(".word p").innerText = "";
        document.querySelector(".word span").innerText ="";
        document.querySelector(".meaning span").innerText = "";
        document.querySelector(".example span").innerText = "";

        let defination = result[0].meanings[0].definitions[0];
        let phonetics;
        try {
            if(result[0].phonetics[0].text === undefined){
                phonetics = `${result[0].meanings[0].partOfSpeech}   ${result[0].phonetics[1].text}`;
            } else{
                phonetics = `${result[0].meanings[0].partOfSpeech}   ${result[0].phonetics[0].text}`;
            }
            
            
        } catch (error) {
             phonetics = `${result[0].meanings[0].partOfSpeech} /unavailable/`
        }
        
       


        synonyms.innerHTML ="";
        if(result[0].meanings[0].synonyms[0] === undefined){
            let tag =`<span>No synonyms found!</span>`;
            synonyms.insertAdjacentHTML("beforeend",tag);
            setTimeout(() => {synonyms.parentElement.style.display ="none"}, 3000);
        }else{
            synonyms.parentElement.style.display ="block"
            for (let i = 0; i < 5; i++){
                if(result[0].meanings[0].synonyms[i] !== undefined){
                    let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]}</span>`
                    synonyms.insertAdjacentHTML("beforeend",tag);
                }
                
            }
    
        }
       

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText =phonetics;
        document.querySelector(".meaning span").innerText = defination.definition;
        document.querySelector(".example span").innerText = defination.example;
        if(result[0].phonetics[0] !== undefined){
            audio = new Audio(result[0].phonetics[0].audio);
        }
        
    }
    
}

function search(wor){
    wrapper.classList.remove("active"); 
    searchinput.value = wor;
    fetchApi(wor);
}


function fetchApi(word){
    infoText.innerHTML = `Searching the meaning of <span> "${word}"</span>`;
    let url =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result,word));
}


searchinput.addEventListener("keyup" , e =>{
    wrapper.classList.remove("active"); 
    if(e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeicon.addEventListener("click", () => {
    console.log("vol clicked")
    console.log(audio)

    if(audio !== undefined || audio !== ""){
        audio.play();
    }
   
})
removeicon.addEventListener("click", () => {
    wrapper.classList.remove("active"); 
    searchinput.value = "";
    searchinput.focus();
})