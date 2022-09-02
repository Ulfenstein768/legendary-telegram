const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let gotCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = gotCharacters.filter((character) => {
    return (
      character.firstName.toLowerCase().includes(searchString) ||
      character.lastName.toLowerCase().includes(searchString) ||
      character.fullName.toLowerCase().includes(searchString) ||
      character.title.toLowerCase().includes(searchString) ||
      character.family.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://thronesapi.com/api/v2/Characters");
    gotCharacters = await res.json();
    displayCharacters(gotCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
                <img width="300px" src="${character.imageUrl}"></img>
                <h3>Name: ${character.firstName} "${character.title}" ${character.lastName}</h3>
                <h3>Family: ${character.family}</h3>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
