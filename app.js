let page = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(page <=1000) {
        page += 1;
        loadMovies();
    }
});

btnAnterior.addEventListener('click', () => {
    if(page > 1 )
    page -= 1;
        loadMovies();
});

const loadMovies = async() => {
   try {
       const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1ced286c17092d2f15215cccaceba085&language=es-COL&page=${page}`);

       if(response.status === 200) {
           const dates = await response.json();

           let movies = '';
           dates.results.forEach(movie => {
                movies += `
                    <div class="movie">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <h3 class="title">${movie.title}</h3>
                    </div>
                `;
           });

           document.querySelector('.container').innerHTML = movies;

       }else if (response.status === 401) {
        console.log('Ingresaste mal la llave')
       }else if (response.status === 404) {
        console.log('Pelicula no encontrada')
       }else {
        console.log('Error: No identificado')
       }
    }catch(error) {
        console.log(error);
    }
} 
    
    

loadMovies()