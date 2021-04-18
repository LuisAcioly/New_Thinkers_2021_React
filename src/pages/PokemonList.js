import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import axios from "axios";

const PokemonList = () => {
    const [list, setList] = useState([]);

    async function getLists() {
        const res = await axios.get("http://localhost:3004/pokemonlists");
        setList(res.data);
    }

    useEffect(() => {
        getLists();
    }, [])


    return (
        <>
        <PageHeader  title="Nome do treinador: " subTitle="Ash Ketchum" />
        
        <p style={{marginLeft: 25}}>Olá eu sou Ash Ketchum da região de Kanto e sou um treinador pokemon</p>
        </>
    );
};

export default PokemonList;