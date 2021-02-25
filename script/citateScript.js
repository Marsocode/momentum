const citateText = document.getElementById('citate-text');
const citateAuthor = document.getElementById('citate-author');
const changeCitate = document.querySelector('.btn-changeCitate');

async function getCitate() {
  try {

    const url = 'https://type.fit/api/quotes';

    const res = await fetch(url);

    const data  = await res.json();
    let citate = data[getRandomInt(data.length)];
    while (data[getRandomInt(data.length)].length >= 80) {
      citate = data[getRandomInt(data.length)];
    }
    citateText.textContent = `"${citate.text}"`;
    if (citate.author != null) {
      citateAuthor.textContent = `${citate.author}`;
    }
  } catch (e) {
    console.log(e.stack);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

changeCitate.addEventListener("click", getCitate);
document.addEventListener('DOMContentLoaded', getCitate);
