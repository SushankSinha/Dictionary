let audio;
let audio1;
const container = document.querySelector(".container");

volume = container.querySelector(".audio button");

function myFunc() {

  let word = document.getElementById("word").value;

  const wordList = word.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toLowerCase()
  );

  let promise = fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${wordList}`
  );
  promise
    .then((data) => data.json())
    .then((res) => {
      res.forEach((obj) => {

        document.getElementById("word").value = "";

        let dictionary = obj;
        let meaningOfWord = dictionary.meanings[0].definitions[0].definition;
        console.log(dictionary);
        let wordPartOfSpeech1 = dictionary.meanings[0].partOfSpeech;

        let mp3 = obj.phonetics[0].audio;
          volume.addEventListener("click", ()=> {
            let audio = new Audio(mp3);
            audio.play();      
          })
        
          document.getElementById(
            "meaning"
          ).innerHTML = `<b> ${wordList.toUpperCase()}</b> <br> ${wordPartOfSpeech1}`;
          document.getElementById("definition").innerHTML = `<b>Meaning</b> ${meaningOfWord} <hr>`;
          
          obj.meanings.forEach((data) => {
            let exapmles = [];
            data.definitions.forEach((res) => {
              let example = res.example;
              exapmles.push(example);
              if(exapmles == "" || exapmles == undefined){
                document.getElementById("examples").innerHTML = "";
              }else{
              document.getElementById("examples").innerHTML = `<b> Example</b> : ${exapmles.slice(0,1)}`;
              }

            });
          });
        });
    });
  }
