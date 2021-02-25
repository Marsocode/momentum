const citateText = document.getElementById('citate-text');
const citateAuthor = document.getElementById('citate-author');
const changeCitate = document.querySelector('.btn-changeCitate');

async function getCitate() {
  try {
    const url = 'https://favqs.com/api/qotd';
    const res = await fetch(url);
    const data  = await res.json();
    citateText.textContent = `"${data.quote.body}"`;
    if (data.quote.author !== undefined) {
      citateAuthor.textContent = `${data.quote.author}`;
    }
  } catch (e) {
    console.log(e.stack);
  }
}

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

changeCitate.addEventListener("click", getCitate);
document.addEventListener('DOMContentLoaded', getCitate);
