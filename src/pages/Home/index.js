import './home.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';

///movie/now_playing?api_key=4f76b4adaf3710ab64c9754a8afac6da&language=pt-BR

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '4f76b4adaf3710ab64c9754a8afac6da',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0, 12))
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        loadFilmes();
    }, [])

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className='container'>
            <div className='headerTitle'>
                <div>
                    <h1>Filmes em Cartaz</h1>
                    <p>Clique no filme abaixo para conhecer mais sobre!</p>
                </div>
            </div>
            <div className='listaFilmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={`Titulo de ${filme.title}`} /></Link>
                            <Link className="button" to={`/filme/${filme.id}`}>{filme.title}</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;