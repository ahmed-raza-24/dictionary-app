const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  const inpWord = document.getElementById("inp-word").value.trim();

  if (inpWord === "") {
    result.innerHTML = `<h3 class="error">Please enter a word!</h3>`;
    return;
  }

  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const meaning = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const phonetic = data[0].phonetic || "";
      const example =
        data[0].meanings[0].definitions[0].example || "No example available.";
      
      const audioSrc =
        data[0].phonetics.find((p) => p.audio)?.audio || "";

      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
          <p>${partOfSpeech}</p>
          <p>/${phonetic}</p>
        </div>
        <p class="word-meaning">${meaning}</p>
        <p class="word-example">${example}</p>
      `;

      if (audioSrc) {
        sound.setAttribute("src", audioSrc.startsWith("https") ? audioSrc : `https:${audioSrc}`);
      } else {
        console.log("No audio found for this word");
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
