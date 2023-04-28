let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyFormContainer.addEventListener('submit', addNewToy);

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    createCard(toys);
  })

  function createCard(toys) {
    let toyCollection = document.querySelector('#toy-collection')
    toys.forEach((toy) => {
      let toyCard = document.createElement('div');
      let toyName = document.createElement('h2');
      let toyImage = document.createElement('img');
      let toyLikes = document.createElement('p');
      let likeBtn = document.createElement('button');
      toyCard.className = "card";
      toyName.innerText = toy.name;
      toyImage.src = toy.image;
      toyImage.className = "toy-avatar";
      toyLikes.innerText = toy.likes;
      likeBtn.className = "like-btn";
      likeBtn.id = toy.id;
      likeBtn.innerText = "Like ❤"
      likeBtn.addEventListener('click', () => {
        toy.likes += 1;
        toyLikes.innerText = toy.likes;
        handleLikes(toy, likeBtn);
        }
      )
      toyCard.appendChild(toyName);
      toyCard.appendChild(toyImage);
      toyCard.appendChild(toyLikes);
      toyCard.appendChild(likeBtn);
      toyCollection.appendChild(toyCard);
    })
  }

  function addNewToy(e) {
    e.preventDefault();
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    postNewToy(toyObj);
    renderNewToyCard(toyObj);
    e.target.reset();
  }

  function renderNewToyCard(toyObj) {
    let toyCollection = document.querySelector('#toy-collection')
    let toyCard = document.createElement('div');
    let toyName = document.createElement('h2');
    let toyImage = document.createElement('img');
    let toyLikes = document.createElement('p');
    let likeBtn = document.createElement('button');
    toyCard.className = "card";
    toyName.innerText = toyObj.name;
    toyImage.src = toyObj.image;
    toyImage.className = "toy-avatar";
    toyLikes.innerText = toyObj.likes;
    likeBtn.className = "like-btn";
    likeBtn.id = toyObj.id;
    likeBtn.innerText = "Like ❤"
    toyCard.appendChild(toyName);
    toyCard.appendChild(toyImage);
    toyCard.appendChild(toyLikes);
    toyCard.appendChild(likeBtn);
    toyCollection.appendChild(toyCard);
    }

  function postNewToy (toyObj) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
  }

  function handleLikes (toyObj, likeBtn) {
    fetch(`http://localhost:3000/toys/${likeBtn.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
  }
});
