import './favoritos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@streamking");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function movieExclude(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id) !== id
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@streamking", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!");
    }

    return (
        <div className='meus-filmes'>
            <div className='headerTitle'>
                <h1>Meus Favoritos</h1>
            </div>

            <div className='DivOffFilmes'>
                {filmes.length === 0 && <Link to='/'>Você não possui nenhum filme salvo</Link>}
            </div>
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div className='buttonAreaDetails'>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={() => movieExclude(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;