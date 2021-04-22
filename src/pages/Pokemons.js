import { useEffect, useState } from "react";
import { FaRegCheckSquare, FaTrashAlt, FaRegSquare } from "react-icons/fa";

const Pokemons = () => {

    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [listFilter, setListFilter] = useState([]);
    const [isOnlyChose, setIsOnlyChose] = useState(false);
    const [filtered, setFiltered] = useState(false)
    const [isEditing, setIsEditing] = useState("");


    function onSubmit(e){
        e.preventDefault();
        console.log(e.target.pokemon.value);
        const pokemon = {
        id: new Date(),
        name: e.target.pokemon.value, 
        status: "Não escolhido",
        };
        setList([...list, pokemon]);
        setListFilter([...list, pokemon]);
        verifyFilter();
    }

    function choose(item){
        const index = list.findIndex(t => t.id === item.id);
        const listTemp = [...list];

        if(item.status === "Não escolhido" && count < 5){
            item.status = "Escolhido";
            listTemp.splice(index, 1, item);
            setCount(count + 1);
            console.log(count);
        }
        else if(item.status === "Não escolhido" && count >= 5){
            alert("Ops! Numero máximo de pokemons escolhidos foi atingido.");
        }
        else{
            item.status = "Não escolhido";
            listTemp.splice(index, 1, item);
            setCount(count - 1);
            console.log(count);
            verifyFilter();
        }

        setList(listTemp);
    }

    function exclude(item){
        const index = list.findIndex(t => t.id === item.id);

        const listTemp = [...list];
        listTemp.splice(index, 1);
        setList(listTemp);

        const indexFilter = listFilter.findIndex(t => t.id === item.id);

        const listFilterTemp = [...list];
        listFilterTemp.splice(indexFilter, 1);
        setListFilter(listFilterTemp);
        verifyFilter();

        if(item.status === "Escolhido"){
        setCount(count - 1);
        console.log(count);
        }
    }

    function filterList() {
        if(filtered){
        const listToFilter = list.filter((item) => {
            return !isOnlyChose ? item.status === "Não escolhido" : true;
        });
        setFiltered(false);
        setListFilter(listToFilter);
        }
        else{
        const listToFilter = listFilter.filter((item) => {
            return !isOnlyChose ? item.status === "Escolhido" : true;
        });
        setFiltered(true);
        setListFilter(listToFilter);
        }
        setIsOnlyChose(!isOnlyChose);
    }

    function verifyFilter(){
        if(filtered){
        const listToFilter = list.filter((item) => {
            return item.status === "Escolhido";
        });
        setListFilter(listToFilter);
        }
    }

    function save(newName, item) {
        const newList = list.map((t) => {
        if (t.id === item.id) t.name = newName;
        return t;
        });
        setList(newList);
        setListFilter(newList);
        setIsEditing("");
    }

    function onKeyDown(e, item) {
        if (e.charCode === 13 || e.keyCode === 13) save(e.target.value, item);
    }

    function onBlur(e, item) {
        save(e.target.value, item);
    }

    return (
        <div className="App">
            <h1>Lista de Pokemons</h1>
        
            <form onSubmit={onSubmit}>
            <input name="pokemon" required/>
            <button style={{marginBottom: 20}} type="submit">Adicionar Pokemon</button>
            </form>
            
            <div>
            <a href="#" onClick={filterList}>
                {isOnlyChose ? "Escolhidos" : "Todos"}
            </a>
            </div>
            <ul>
            {listFilter.map((item, index) => {
                return <li key={index}>
                <button onClick={() => choose(item)}>
                    {item.status === "Escolhido" ? <FaRegCheckSquare /> : <FaRegSquare />}
                </button>
                <span>
                    {isEditing === item.id ? (
                    <input defaultValue={item.name} onBlur={(e) => onBlur(e, item)} onKeyDown={(e) => onKeyDown(e, item)} />
                    ) : (
                    <b onClick={() => setIsEditing(item.id)}>{item.name} | {item.status}</b>
                    )}
                </span>
                <button onClick={() => exclude(item)}>
                    <FaTrashAlt/>
                </button>
                </li>;
            })}
            </ul>
        </div>
    );
};

export default Pokemons;