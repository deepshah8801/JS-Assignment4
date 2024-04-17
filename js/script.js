const baseURL = 'https://pixabay.com/api/';
const key = '43425921-aee559362f2546797b4e91dae';

let url;

const characterSearch = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('.section');
const studentInfo = document.getElementById('student-info');

submitBtn.addEventListener("click", fetchResults);

document.addEventListener("DOMContentLoaded", function() {
    studentInfo.textContent = 'Deep Shah, 200549992';
});

function fetchResults(event) {
    event.preventDefault();
    url = `${baseURL}?key=${key}&q=${encodeURIComponent(characterSearch.value)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => displayResults(json))
        .catch(error => {
            console.error('Error fetching the data: ', error);
            section.innerHTML = '<p>Error loading results. Please try again.</p>';
        });
}

function displayResults(json) {
    console.log(json);

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let characters = json.hits;
    if (!characters || characters.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No characters found.';
        section.appendChild(para);
    } else {
        for (let i = 0; i < characters.length; i++) {
            const character = characters[i];
            const article = document.createElement('section');
            const column1 = document.createElement('div');
            const column2 = document.createElement('div');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para1 = document.createElement('p');
            const para2 = document.createElement('p');
            const para3 = document.createElement('p');
            const para4 = document.createElement('p');


            link.href = character.pageURL;
            
            para1.textContent = "Tags: " + character.tags;
            para2.textContent = "Uploaded by: "+ character.user;
            para3.textContent = "Likes: "+ character.likes;
            para4.textContent = "Views: " + character.views;


            if (character.previewURL) {
                img.src = character.previewURL;
                img.alt = character.user;

            }
            link.appendChild(img);
            column1.appendChild(link);
            
            column2.appendChild(para1);
            column2.appendChild(para2);
            column2.appendChild(para3);
            column2.appendChild(para4);
            article.appendChild(column1);
            article.appendChild(column2);
            section.appendChild(article);
        }
    }
}
