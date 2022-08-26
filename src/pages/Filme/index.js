import './filme.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify'

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '4f76b4adaf3710ab64c9754a8afac6da',
                    language: 'pt-BR',
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)
                    console.log(response.data)
                })
                .catch(() => {
                    alert("Filme não encontrado!!!")
                    navigate("/", { replace: true });
                    return;
                })
        };

        loadFilme();

        return () => {
            console.log("O COMPONENTE FOI DESMONTADO")
        }

    }, [id, navigate])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@streamking");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn("Esse filme já existe na lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@streamking", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");

    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className='containerFilme'>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={`Titulo de ${filme.title}`} />
            <div className='genresContainer'>
                <span>{filme.genres[0].name}</span>
            </div>
            <a href="#detailsContainer">
                <div className='rolldownContainer'>
                    <span className='rolldown'>\/</span>
                </div>
            </a>
            <div className='detailsContainer' id='detailsContainer'>
                <h1>{filme.title}</h1>
                <p>{filme.overview}</p>
                <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>
                <div className='areaButton'>
                    <button onClick={() => { salvarFilme() }}>Salvar</button>
                    <a rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank">
                        <button>
                            Trailer
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Filme;