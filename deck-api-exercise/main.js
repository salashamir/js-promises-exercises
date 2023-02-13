// 1.
const base_url = "https://deckofcardsapi.com/api/deck";

const getCardFromShuffledDeck = () => {
    axios.get(`${base_url}/new/draw?count=1`).then(res => {
        const {value,suit} = res.data.cards[0];
        console.log(value,suit);
    }).catch(e => console.error(e));
}

// getCardFromShuffledDeck();

// 2.
const getTwoCardsSequentially = async () => {
    let firstCard;
    await axios.get(`${base_url}/new/draw/?count=1`).then(res => {
        const deckID = res.data.deck_id;
        firstCard = res.data.cards[0];
        console.log("FIRST CARD: ", firstCard);
        return axios.get(`${base_url}/${deckID}/draw/`)
    }).then(res => {
        const secondCard = res.data.cards[0];
        console.log("SECON CARD", secondCard);
        [firstCard, secondCard].forEach(card => {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        })
    })
    .catch(err => {
        console.error(err);
    })
}

// getTwoCardsSequentially();

// 3.
const cardBtn = document.querySelector('.card-btn');
const cardsGallery = document.querySelector('.cards-gallery');
let deckID = null;
let drawnCard;

axios.get(`${base_url}/new/shuffle/`).then(res => {
    deckID = res.data.deck_id;
})


cardBtn.addEventListener("click", () => {
    axios.get(`${base_url}/${deckID}/draw/?count=1`).then(res => {
        const cardImg = res.data.cards[0].image;
        cardsGallery.insertAdjacentHTML("beforeend",`<img class="card-img" src="${cardImg}" />`);
        console.log(res.data.remaining);
        if (res.data.remaining === 0){
            cardBtn.classList.add('hidden');
        };
    });
});
