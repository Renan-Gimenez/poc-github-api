const button = document.querySelector('button');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const info = document.querySelector('.info');
const errorDiv = document.querySelector('.errorDiv');
const reposDiv = document.querySelector('.repos-div');

let username = '';

const clearUl = () => {
    ul.innerHTML = '';
}

const callAPI = () => {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => console.log(data.map((item) => {
        reposDiv.innerText = `${data.length} repositories:`;

        const li = document.createElement('li');
        li.innerText = item.name;
        
            ul.append(li);
            errorDiv.classList.add('hide');
        })))

    .catch(error => {
        info.classList.add('hide');
        errorDiv.classList.remove('hide');
        errorDiv.innerText = 'User Not Found';
    })
}

// const callAPI2 = () => {
//     fetch(`https://api.github.com/users/${username}/repos`)
//     .then(res => res.json())
//     .then(data => data.map((item) => {
//         reposDiv.innerText = `${data.length} repositories:`;

//         if (data.message === 'Not Found') {
//             const li = document.createElement('li');
//             li.innerText = item.name;
            
//             ul.append(li);
//             errorDiv.classList.add('hide');
//         }
//     }))
    
//     .catch(error => {
//         errorDiv.classList.remove('hide');
//         errorDiv.innerText = 'User Not Found';

//         alert("User Not Found");

//         console.log("ERROR")
//         console.log("NAO ACHOU");
//     })
// }

const updateURL = () => {
    reposDiv.innerText = '';
    reposDiv.classList.add('hide');
    errorDiv.classList.remove('hide');
    
    if (username != '') {
        clearUl();
        callAPI();
        
        errorDiv.classList.add('hide');
        reposDiv.classList.remove('hide');
        info.classList.remove('hide');
    } else {
        clearUl();
        
        errorDiv.classList.remove('hide');
        errorDiv.innerText = 'Enter a username';
        reposDiv.classList.add('hide');
        info.classList.add('hide');
    }
}

// const updateURL2 = () => {
//     const endPoint = "https://cfbcursos.repl.co/";

//     fetch(endPoint)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         errorDiv.innerText = `${data.pressao}`;

//     })
// }

// setInterval(updateURL2, 3000);

input.addEventListener("change", (e) => {
    username = e.target.value;
})

input.addEventListener("keyup", (e) => {
    if (e.code === "Escape" || e.code ==="Enter") {
        input.blur();
    }
})

button.addEventListener("click", (e) => {
    updateURL();
    e.preventDefault();
})
