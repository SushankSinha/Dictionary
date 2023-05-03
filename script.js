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

          audio = new Audio(obj.phonetics[0].audio);

          volume.addEventListener("click", () => {
            volume.style.color = "#4D59FB";
            audio.play();
            setTimeout(() => {
              volume.style.color = "#999";
            }, 5000);
          });

          obj.meanings.forEach((data) => {
            let database = [];
            data.definitions.forEach((res) => {
              let mean = res.definition;
              // console.log(mean);
              database.push(mean);

              document.getElementById("definition").innerHTML = `<b> Meaning</b> : ${database} <hr>`;
            });
          });

          obj.meanings.forEach((data) => {
            let speech = [];
            let res = data.partOfSpeech
            speech.push(res)

            document.getElementById(
              "meaning"
            ).innerHTML = `<b> ${wordList.toUpperCase()}</b> [${speech}]`;
            
            console.log(speech);
          });

          obj.meanings.forEach((data) => {
            let exapmles = [];
            data.definitions.forEach((res) => {
              let example = res.example;
              exapmles.push(example);

              document.getElementById("examples").innerHTML = `<b> Example</b> : ${exapmles} <hr>`;
            });
          });

        }
      );
    });
}
