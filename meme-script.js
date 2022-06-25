let imageURL = "";
let memes = [];
let id = 0;

function addMeme(topText, bottomText) {
    memes.push({
        topText,
        bottomText,
        imageURL,
        id
    });
    id++;
    refreshContent();
}

function deleteMeme(id) {
    if (!isNaN(id)) {
        memes = memes.filter(m => m.id !== id);
        refreshContent();
    }
}

function refreshContent() {
    let memeContainer = document.querySelector("#meme-container");
    memeContainer.innerHTML = "";

    memes.forEach(meme => {
        let memeDiv = document.createElement("div");
        memeDiv.classList.add("meme");

        let image = document.createElement("img");
        image.src = meme.imageURL;
        image.classList.add("meme-image");

        let topTextP = document.createElement("p");
        topTextP.classList.add("upper-text");

        let bottomTextP = document.createElement("p");
        bottomTextP.classList.add("lower-text");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.id = meme.id;
        deleteButton.innerHTML = "X";
        deleteButton.addEventListener('click', e => {
            const id = parseInt(e.target.id);
            deleteMeme(id);
        })

        topTextP.innerText = meme.topText;
        bottomTextP.innerText = meme.bottomText;
        memeDiv.appendChild(image);
        memeDiv.appendChild(topTextP);
        memeDiv.appendChild(bottomTextP);
        memeDiv.appendChild(deleteButton);
        memeContainer.appendChild(memeDiv);
    });
}

function upload() {
    let upperTextInput = document.querySelector("#upperTextInput");
    let lowerTextInput = document.querySelector("#lowerTextInput");

    addMeme(upperTextInput.value, lowerTextInput.value);
}

document.querySelector("#imageFileUpload").addEventListener('change', (e) => {
    imageURL = URL.createObjectURL(e.target.files[0]);
});