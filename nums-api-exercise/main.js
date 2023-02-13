// 1
const favNumber = 10;
const baseURL = "http://numbersapi.com";


axios.get(`${baseURL}/${favNumber}/trivia?json`).then(res => {
    console.log(res.data.text)
})

// 2
let favNumbers = [8,34,3];
axios.get(`${baseURL}/${favNumbers}/trivia?json`).then(res => {
    for (const numberFact in res.data){
        console.log(`${numberFact}: ${res.data[numberFact]}`)
    }
})

// 3
Promise.all([
            axios.get(`${baseURL}/${favNumber}/trivia?json`),
            axios.get(`${baseURL}/${favNumber}/trivia?json`),
            axios.get(`${baseURL}/${favNumber}/trivia?json`),
            axios.get(`${baseURL}/${favNumber}/trivia?json`)
        ]).then(facts => {
            for(const res of facts){
                document.querySelector('body').insertAdjacentHTML('afterbegin',`<p>${res.data.text}</p>`)
            }
        })

