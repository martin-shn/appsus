
const URL = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}';

export const googleService = {
    getBooks,
    rebuildGoogleBook,
}

let tempData = {
    query:'',
    data:null
};

function getBooks(query){
    if (tempData.query!==query) {
        return axios
            .get(URL.replace('${query}', query))
            .then((res) => {
                const data = res.data.items;
                console.log('from url: ',data);
                tempData = {query,data}
                return Promise.resolve(data);
            })

            .catch((err) => {
                console.log('Error with google api: ', err);
                return Promise.reject('Error with google api: ', err);
            });
    } else {
        console.log('from cache: ', tempData.data);
        return Promise.resolve(tempData.data);
    }
}

function rebuildGoogleBook(googleBook){
    return {
        "id": googleBook.id,
        "title": googleBook.volumeInfo.title,
        "subtitle": '',
        "authors": googleBook.volumeInfo.authors,
        "publishedDate": googleBook.volumeInfo.publishedDate,
        "description": googleBook.volumeInfo.description,
        "pageCount": googleBook.volumeInfo.pageCount,
        "categories": googleBook.volumeInfo.categories,
        "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
        "language": googleBook.volumeInfo.language,
        "listPrice": {
          "amount": 0,
          "currencyCode": "EUR",
          "isOnSale": false
        }
      }
}
