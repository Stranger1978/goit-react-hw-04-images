const refs = {
    MAIN_URL: 'https://pixabay.com/api/',
    API_KEY: '37838198-1a117cc0732e6b102a4c5cb6d',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    SAFESEARCH: 'true',
    PER_PAGE: '12',
};

export const ImageApiService = (searchValue, page) => {
    return fetch(`${refs.MAIN_URL}?key=${refs.API_KEY}&q=${searchValue}&image_type=${refs.IMAGE_TYPE}&orientation=${refs.ORIENTATION}&safesearch=${refs.SAFESEARCH}&page=${page}&per_page=${refs.PER_PAGE}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};