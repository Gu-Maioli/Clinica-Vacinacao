import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";
import TabelaV from "./TabelaV";


const Vacina = () => {
    const [valor, setValor] = useState();
    const [listaVacina, setListaVacina] = useState()
    const [ editVacina, setEditVacina] = useState({
        idVacina: 0,
        nomeVacina: "",
        quantidade: "",
        codigoLote: ""
    })
    const mudarValores = (valor) => {
        setValor(prevValor => ({
            ...prevValor,
            [valor.target.name]: valor.target.value,
        }))
    }


    useEffect(()=>{
        Axios.get("http://localhost:3001/getVacina").then((response)=> {
            setListaVacina(response.data)
        })
    }, [])


    const clickButton= () =>{
        if(editVacina.idVacina == 0){
            Axios.post("http://localhost:3001/cadastrarVacina",{
                nomeVacina: valor.nomeVacina,
                quantidade: valor.quantidade,
                codigoLote: valor.codigoLote

            }).then(()=>{
                setListaVacina([ ...listaVacina,{
                    nomeVacina: valor.nomeVacina,
                    quantidade: valor.quantidade,
                    codigoLote: valor.codigoLote
                }
            ])
            })
        }
        else{
            Axios.put("http://localhost:3001/editarVacina",{
                idVacina: editVacina.idVacina,
                nomeVacina: valor.nomeVacina,
                quantidade: valor.quantidade,
                codigoLote: valor.codigoLote

            }).then(() => {
                setListaVacina( listaVacina.map((value)=>{
                    return value.idVacina == editVacina.idVacina
                    ? {
                        nomeVacina: valor.nomeVacina,
                        quantidade: valor.quantidade,
                        codigoLote: valor.codigoLote
                    }
                    : value;
                }))
            })
        }
    }

    return (
        <>
            <div className="container">
            <h1>Gerenciar Vacina</h1>

            <div className="input-group mb-3">
                <input className="form-control" hidden defaultValue={editVacina.idVacina} type='text' name='idVacina'/>
                <input className="form-control" defaultValue={editVacina.nomeVacina} type='text' name='nomeVacina' placeholder='Nome Vacina' onChange={mudarValores} />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" defaultValue={editVacina.quantidade} type='text' name='quantidade' placeholder='Quantidade' onChange={mudarValores} />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" defaultValue={editVacina.codigoLote} type='text' name='codigoLote' placeholder='Codigo Lote' onChange={mudarValores} />
            </div>
            <div className="">
                <button className="btn btn-success" onClick={ () => clickButton() }>Cadastrar</button>
            </div>
            <br/>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="th-nomeVacinaId">Nome Vacina</th>
                            <th className="th-quantidadeId">Quantidade</th>
                            <th className="th-codigoLoteId">Codigo Lote</th>
                            <th className="th-acoesId">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {typeof listaVacina != "undefined" && listaVacina.map(item => {                        
                            return(
                                <TabelaV
                                    idVacina={item.idVacina}
                                    nomeVacina={item.nomeVacina}
                                    codigoLote={item.codigoLote}
                                    quantidade={item.quantidade}
                                    setLista={setListaVacina}
                                    listaFunc={listaVacina}
                                    editFunc={setEditVacina}
                                />
                            )
                        })}
                    </tbody>

                </table>
            </div>
            <br/>
            </div>
        </>
    );
}

export default Vacina;