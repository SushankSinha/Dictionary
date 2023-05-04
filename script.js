const container = document.querySelector(".container");
let audio;
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

          volume.addEventListener("click", ()=> {
            audio = new Audio(obj.phonetics[0].audio);
            audio.play();
          });

          obj.meanings.forEach((data) => {
            let database = [];
            // let mean;
            // console.log((data.definitions[0].definition))
            data.definitions.forEach((res) => {
              let mean = res.definition.split("");

              database.push(mean.join(""));
              
              // console.log(mean)
              console.log(database[0])

              // let definitions = obj[0].meanings[0].definitions[0];
              // document.querySelector(".meaning span").innerText = data.definitions[0].definition; 
            });
          });

          obj.meanings.forEach((data) => {
            let speech = [];
            let res = data.partOfSpeech
            speech.push(res)

            document.getElementById(
              "meaning"
            ).innerHTML = `<b> ${wordList.toUpperCase()}</b> <br> ${speech} / ${obj.phonetics[1].text}`;
            // console.log(speech);
          });

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
