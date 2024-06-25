const submitButton = document.getElementById('submit-data');
const divContainer = document.querySelector('.show-container');

submitButton.addEventListener("click", async (event)=>{
    event.preventDefault()
    let inputData = document.getElementById('input-show').value;
    let stringData = await fetchData(inputData);
    //await fetchData(inputData);
    createElements(stringData);
});

async function fetchData(inputData){
    try{
        let response = await fetch("https://api.tvmaze.com/search/shows?q=" + inputData);
        let jsonData = await response.json(); // to  get only the json data, not the whole response
        //console.log(jsonData);
        return JSON.stringify(jsonData);
    }
    catch{
        console.log("Error!");
    }
    
}

function createElements(stringData) {
    let listData = JSON.parse(stringData); // string to array of objects
    let imgURL = ''
    let title = ''
    let summary = ''

    divContainer.innerHTML = ''; // to clear the previous search results

    listData.forEach(element => {
        if (element.show.image) {
            imgURL = element.show.image.medium
        }
        else {
            imgURL = 'https://via.placeholder.com/210x295'
        }

        title = element.show.name
        summary = element.show.summary
        
        let divData = document.createElement('div');
        divData.classList.add("show-data");

        let div = document.createElement('div');
        div.classList.add("show-info"); 
        let img = document.createElement('img');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');

        img.src = imgURL;
        h1.innerText = title;
        p.innerHTML = summary;

        div.appendChild(h1);
        div.appendChild(p);
        divData.appendChild(img);
        divData.appendChild(div); 
        divContainer.appendChild(divData);
    });
}