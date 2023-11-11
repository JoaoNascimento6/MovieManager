import 'bootstrap/dist/css/bootstrap.min.css'; //importa o arquivo minificado CSS do framework Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';//importa a versão minificada da biblioteca JavaScript do Bootstrap.
import axios from 'axios';//importa a biblioteca Axios, que é um cliente HTTP promise-based
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditComponent() {

    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [campGenero] = useState("");
    const [generosList, setGenerosList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const url = "http://localhost:3000/genero";
                const response = await axios.get(url);
                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    alert("Error web service");
                }
            } catch (error) {
                alert("Error server: " + error);
            }
        };

        fetchGeneros();
    }, []);


    return (

        <div class="container p-3 my-3 bg-dark text-white">
            <div className="form-row justify-content-left">
            <label>Insere um novo filme</label>
                <div className="form-group margens">
                    <label htmlFor="inputTitulo"></label>
                    <input type="text" className="form-control" placeholder="Titulo" value={campTitulo} onChange={value => setcampTitulo(value.target.value)} />
                </div>

                <div className="form-group margens">
                    <label htmlFor="inputDescricao"></label>
                    <input type="text" className="form-control" placeholder="Descricao" value={campDescricao} onChange={value =>
                        setcampDescricao(value.target.value)} />
                </div>



                <div className="form-group margens">
                    <label htmlFor="inputFoto"></label>
                    <input type="text" className="form-control" id="inputFoto" placeholder="Foto" value={campFoto} onChange={(value) => setcampFoto(value.target.value)} />
                </div>

                <div className="form-group margens">
                    <label htmlFor="inputState"></label>
                    <select
                        id="inputState"
                        className="form-control"
                        value={generosList}
                        onChange={(event) => setGenerosList(event.target.value)}
                    >
                        <option value="">Selecione um gênero</option>
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>
                                {genero.genero}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group margens data">
                    <label htmlFor="inputData"></label>
                    <DatePicker
                        id="inputData"
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione a data"
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={() => sendSave()}>Guardar Filme</button>
        </div>
    );

    function sendSave() {
        if (campGenero === 0) {
            alert("Escolhe o Genero")
        }
        else if (campTitulo === "") {
            alert("Insere um titulo")
        }
        else if (campDescricao === "") {
            alert("Insere uma Descrição")
        }
        else if (campFoto === "") {
            alert("Upload de um banner")
        }
        else {
            // __________________url que recebe os dados _______________
            const baseUrl = "http://localhost:3000/filme/create"

            //____________Cria um objeto ________
            const datapost = {
                descricao: campDescricao,
                ano: startDate,
                titulo: campTitulo,
                foto: campFoto,
                generoId: generosList
            }
            //___________Envia os dados para o servidor _______________
            axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }

}
