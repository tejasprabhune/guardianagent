fa_url = '<script src="https://kit.fontawesome.com/3b872c980f.js" crossorigin="anonymous"></script>';
document.body.insertAdjacentHTML("beforeend", fa_url);

var cursor_x = -1;
var cursor_y = -1;

function trackMouse(event) {
 cursor_x = event.pageY;
 cursor_y = event.pageX;
}

document.onmousemove = trackMouse;


async function getGeneratedText() {
    const url = "http://127.0.0.1:5000/generate";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.generation;
}

async function getGeneratedImage() {
    const url = "http://127.0.0.1:5000/generateimg";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.generation;
}

function alertImg(src) {
    console.log(text);
    const card = document.createElement("div");

    card.style.width = "300px";
    card.style.height = "auto";
    card.style.backgroundColor = "white";
    card.style.textAlign = "left";
    card.style.zIndex = "99999";
    card.className = "card";

    card.style.color = "#aaa";
    card.style.background = "$fafafa";
    card.style.boxShadow = "0 5px 50px 1px";
    card.style.borderRadius = "0.4em";

    card.style.position = "absolute";
    card.style.top = "0px";
    card.style.left = "0px";

    const cardImg = document.createElement("img");
    cardImg.src = src;
    cardImg.style.paddingTop = "50px";
    cardImg.style.paddingBottom = "50px";
    cardImg.style.paddingRight = "20px";
    cardImg.style.paddingLeft = "20px";
    cardImg.style.width = "100px";

    card.appendChild(cardImg);

    document.body.appendChild(card);
}

function createCard(text, x, y) {
    console.log(text);
    const card = document.createElement("div");

    card.style.width = "300px";
    card.style.height = "auto";
    card.style.backgroundColor = "white";
    card.style.textAlign = "left";
    card.style.zIndex = "99999";
    card.className = "card";

    card.style.color = "#aaa";
    card.style.background = "$fafafa";
    card.style.boxShadow = "0 5px 50px 1px";
    card.style.borderRadius = "0.4em";

    card.style.position = "absolute";
    card.style.top = `${x}px`;
    card.style.left = `${y}px`;

    const cardText = document.createElement("p");
    cardText.innerText = text;
    cardText.style.paddingTop = "50px";
    cardText.style.paddingBottom = "50px";
    cardText.style.paddingRight = "20px";
    cardText.style.paddingLeft = "20px";
    cardText.style.color = "black";

    card.appendChild(cardText);

    document.body.appendChild(card);
}

function createSelectionCard(selection, x, y) {
    const card = document.createElement("div");

    card.style.height = "auto";
    card.style.backgroundColor = "white";
    card.style.textAlign = "center";
    card.style.zIndex = "99999";
    card.className = "selection-card";

    card.style.color = "#ddd";
    card.style.background = "$fafafa";
    card.style.boxShadow = "0px 5px 10px 0px";
    card.style.borderRadius = "0.4em";

    card.style.position = "absolute";
    card.style.top = `${x - 80}px`;
    card.style.left = `${y}px`;

    const cardText = document.createElement("p");
    cardText.innerText = "Guardian!";
    cardText.style.paddingTop = "10px";
    cardText.style.paddingBottom = "10px";
    cardText.style.paddingRight = "10px";
    cardText.style.paddingLeft = "10px";
    cardText.style.color = "black";
    cardText.onmouseover = function() {
        card.style.backgroundColor = "#f0f0f0";
        cardText.style.cursor = "pointer";
    }
    cardText.onmouseout = function() {
        card.style.backgroundColor = "white";
        cardText.style.cursor = "default";
    }

    card.onclick = function() {
        callGuardian(selection, x, y);
    }

    const imageButton = document.createElement("p");
    imageButton.innerText = "Generate Image!";
    imageButton.style.paddingTop = "10px";
    imageButton.style.paddingBottom = "10px";
    imageButton.style.paddingRight = "10px";
    imageButton.style.paddingLeft = "10px";
    imageButton.style.color = "black";
    imageButton.onmouseover = function() {
        imageButton.style.cursor = "pointer";
    }
    imageButton.onmouseout = function() {
        imageButton.style.cursor = "default";
    }

    imageButton.onclick = function() {
      /*var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
         }
      }
      xmlHttp.open("POST", theUrl, true); 
      xmlHttp.send(JSON.stringify(data));*/
        genImg(prompt, x, y);
    }

    card.appendChild(cardText);
    card.appendChild(imageButton);

    document.body.appendChild(card);
}

async function callGuardian(selection, x, y) {
    console.log("Guardian: ", selection);
    const rawResponse = await fetch('http://127.0.0.1:5000/guardian', {
        method: 'POST',
        mode: "no-cors",
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: selection })
    }).then(response => {
        getGeneratedText().then((text) => {
            console.log(text);
            createCard(text, x, y);
        });
    });
}

async function genImg(prompt, x, y) {
    console.log("Img Prompt: ", prompt);
    const rawResponse = await fetch('http://127.0.0.1:5000/guardian', {
        method: 'POST',
        mode: "no-cors",
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: prompt })
    }).then(response => {
        getGeneratedImage().then((bytes) => {
            //console.log(text);
            alertImg("data:image/png;base64," + bytes, x, y);
        });
    });
}

async function sendEmbedding(url) {
    const rawResponse = await fetch('http://127.0.0.1:5000/embedding', {
        method: 'POST',
        mode: "no-cors",
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    });
}

function removeAllSelectionCards() {
    var elements = document.getElementsByClassName("selection-card");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeAllCards() {
    var elements = document.getElementsByClassName("card");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

document.addEventListener("selectionchange", debounce(function (event) {
    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
    if (selection && /\S/.test(selection)) {
        removeAllSelectionCards();
        removeAllCards();
        console.log(selection, cursor_x, cursor_y);
        createSelectionCard(selection, cursor_x, cursor_y);
    }

    sendEmbedding(window.location.href);
}, 250));

/*getGeneratedText().then((text) => {
    console.log(text);
    createCard(text, 30, 30);
});*/

document.body.addEventListener('keydown', function(e) {
    if (e.key == "Escape") {
        removeAllSelectionCards();
        removeAllCards();
    }
});
