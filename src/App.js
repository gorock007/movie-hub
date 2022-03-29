import {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './searchIcon.svg';
//e1772d84

const API_URL = 'http://www.omdbapi.com/?apikey=e1772d84';


const App = () =>{

    const [movies, setMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() =>{
        searchMovies(searchKeyword);
    }, []);
    
    return(
        <div className='app'>
            <h1>MovieHub</h1>  
            <div className='search'>
                <input placeholder='Enter movies or series name' value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value) } //e represents event
                />
                <img src={searchIcon} alt='search'
                 onClick={() => searchMovies(searchKeyword) }
                />
            </div>  

             {movies?.length > 0
                ?(
                    <div className = 'container' >
                        {movies.map((movie) =>(
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>
                ) :(
                    <div className='empty'>
                            <h2>No Movies Found</h2>
                    </div>
                )}  
           
        </div>
    );
}

export default App;