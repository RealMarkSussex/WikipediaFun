let searchUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl =
    'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;

function startSearch() {
    try {
        userInput = document.getElementById('userinput');
        userInput2 = document.getElementById('userinput2');
        if (userInput.value === userInput2.value) {
            return;
        }
        counter = 0;
        console.log(userInput.value)
        fetchWikipedia(userInput.value);
    }
    catch {
        startSearch();
    }
}

function fetchWikipedia(term) {
    try {
        counter++;
        document.getElementById('count').innerHTML = counter;
        let url = searchUrl + term;
        fetch(url + "&origin=*")
            .then(res => res.json())
            .then(result => {
                useWikipedia(result);
            });
    }
    catch {
        startSearch();
    }
}

function useWikipedia(data) {
    try {
        console.log(data);
        let len = data[1].length;
        let index = Math.floor(Math.random() * (len - 1) + 1);
        console.log(index);
        let title = data[1][index];
        let label = document.createElement("label");
        label.innerHTML = title;
        let breakLine = document.createElement("br");
        document.getElementsByTagName('body')[0].appendChild(breakLine);
        document.getElementsByTagName('body')[0].appendChild(label);
        console.log('Querying: ' + title);
        let url = contentUrl + title;
        fetch(url + "&origin=*")
            .then(res => res.json())
            .then(result => {
                doAgain(result);
            });
    }
    catch {
        startSearch();
    }
}

function doAgain(data) {
    try {
        let page = data.query.pages;
        let pageId = Object.keys(data.query.pages)[0];
        console.log(pageId);
        let content = page[pageId].revisions[0]['*'];
        console.log(content);
        let wordRegex = /\b\w{4,}\b/g;
        let words = content.match(wordRegex);
        let word = words[Math.floor(Math.random() * words.length)];
        fetchWikipedia(word);
        console.log(word);
    }
    catch {
        startSearch();
    }
}