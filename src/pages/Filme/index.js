import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import {toast} from 'react-toastify';


function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       async function loadFilme(){
        await api.get(`/movie/${id}`, {
            params : {
                api_key: "00a0af8cc8e6c9de35c08977412a6864",
                language: "pt-BR",
            }
        })
        .then((response) =>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(() =>{
            console.log("filme nao encontrado")
            navigate("/", {replace: true})
            return
        })
       } 
       loadFilme();

       return () => {
        console.log('o componente foi desmontado')
       }

    },[navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@gabriflix");
        let filmesSalvo = JSON.parse(minhaLista) || [];
        
        const hasFilme = filmesSalvo.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Este filme ja esta na sua lista")
            return;
        }

        filmesSalvo.push(filme);
        localStorage.setItem('@gabriflix', JSON.stringify(filmesSalvo));
        toast.success("Filme salvo com sucesso!")

    }


    if(loading){
        return(
            <div className='filme-info'>
                Carregando Detalhes...
            </div>
        );
    }

    return(
        <div className='filme-info'>

            <h1>{filme.title}</h1>
            
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliacao: {filme.vote_average} /10</strong>


            <div className='areaBtn'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
            
        </div>
    );
}

export default Filme;