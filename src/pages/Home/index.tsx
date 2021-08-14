import { HeroImage, ListName } from './style';
import { useEffect, useState } from 'react';
import { List } from '../../components/List';
import axios from 'axios';

export default function Home() {
    const [trendingTVs, setTrendingTVs] = useState(Object);
    const [existsTVs, setExistsTVs] = useState(Boolean);
    const [trendingMovies, setTrendingMovies] = useState(Object);
    const [existsMovies, setExistsMovies] = useState(Boolean);
    const api = {
        key: process.env.REACT_APP_IMDB_API_KEY,
        base: 'https://api.themoviedb.org/3/',
        lang: 'en-US',
    };

    function getTrendingMovies() {
        axios
            .get(`${api.base}trending/movie/day?api_key=${api.key}&page=1`)
            .then(res => {
                setTrendingMovies(res.data.results);
                setExistsMovies(true);
            })
            .catch(error => {
                console.log(`Houve um erro: ${error}`);
            });
    }

    function getTrendingTVs() {
        axios
            .get(`${api.base}trending/tv/day?api_key=${api.key}&page=1`)
            .then(res => {
                setTrendingTVs(res.data.results);
                setExistsTVs(true);
            })
            .catch(error => {
                console.log(`Houve um erro: ${error}`);
            });
    }

    useEffect(() => {
        getTrendingMovies();
        getTrendingTVs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            {existsMovies ? (
                <HeroImage>
                    <img
                        src={`https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}`}
                        alt="Hero Image"
                    />
                </HeroImage>
            ) : (
                ''
            )}

            <ListName id="Movies">
                <h2>TOP 10 - Trending Movies Today</h2>
            </ListName>
            {existsMovies ? (
                <List listRenderWith={trendingMovies} isMovie={true} />
            ) : (
                ''
            )}

            <ListName id="TVs">
                <h2>TOP 10 - Trending TVs Today</h2>
            </ListName>

            {existsTVs ? (
                <List listRenderWith={trendingTVs} isMovie={false} />
            ) : (
                ''
            )}
        </main>
    );
}
