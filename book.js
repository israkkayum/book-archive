const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loddingSpiner('block');

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then(res => res.json())
      .then(data => showResult(data.docs));

};

// Spinner
const loddingSpiner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};


const showResult = books => {
    const searchResult = document.getElementById('search-result');
    const matchingResult = document.getElementById('matching-result'); 
    const noResultFound = document.getElementById('no-result-found');

    // Clear field
    searchResult.textContent = '';
    noResultFound.textContent = '';
    matchingResult.innerText = 0;

    let counter = 0;

    // For each loop
    books.forEach(book => {

      // Matching result count
       counter++;
       matchingResult.innerText = counter;

      //  Show result
       const div = document.createElement('div');
       div.innerHTML = `
       <div class="card m-1" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" style="height: 250px;" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text"><span class="text-primary">By</span> ${book.author_name}</p>
                  <p class="card-text">Publisher : ${book.publisher}</p>
                  <p class="card-text"><small class="text-muted">First published in ${book.publish_date[0]}</small></p>
                </div>
              </div>
            </div>
          </div>`;

        searchResult.appendChild(div);
        loddingSpiner('none');
      });

      // Show no found any result message
      if (counter === 0) {
        const div = document.createElement('div');
        div.innerHTML = `<img src="logo/no-result-found.gif" class="img-fluid rounded-start w-auto h-auto" alt="...">`;
        noResultFound.appendChild(div);
        loddingSpiner('none');
      };
};