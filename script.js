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

        console.log(obj.word)

        audio = new Audio(obj.phonetics[0].audio);
        audio1 = new Audio(obj.phonetics[1].audio);
          volume.addEventListener("click", ()=> {
            audio.play();
            audio1.play();        
          });
        
        
          document.getElementById(
            "meaning"
          ).innerHTML = `<b> ${wordList.toUpperCase()}</b> <br> ${obj.meanings[0].partOfSpeech}/  ${obj.meanings[1].partOfSpeech}/ ${obj.phonetics[1].text}`;
          document.getElementById("definition").innerHTML = `<b>Meaning</b> : ${(obj.meanings[0].definitions[0].definition)} <hr>`;
          
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
