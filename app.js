const endpoint = "https://itunes.apple.com/search?term=";
const searchData = document.querySelector("#search");
const searchResult = document.querySelector("#result");
const resultEmpty = document.createElement("p");
  resultEmpty.innerText = "Result empty... Please try with different search.";
const loader = document.createElement ("p");
  loader.innerText = "LOADING... please wait...";
const message = document.querySelector("#message");


searchData.addEventListener("keyup", (event) => {
  const searchValue = event.target.value;

  message.innerHTML = "";
  message.appendChild(loader);

  fetch(endpoint + searchValue)
    .then(response => response.json())
    .then((data) => {
      message.innerHTML = "";
      searchResult.innerHTML= "";
      if (data.resultCount === 0) {
        message.appendChild(resultEmpty);
      }
      else {
        data.results.forEach((song) => {
          const createLi = songObject => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${songObject.trackName} - ${songObject.artistName}`;
            return listItem;
          };
          const li = createLi(song);
          searchResult.appendChild(li);
        });
      }
    })
    .catch(error => displayError(error));
});