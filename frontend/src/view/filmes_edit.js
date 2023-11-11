import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = "http://localhost:3000";

export default function EditComponent() {

    const [campId, setcampId] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringGenero, setstringGenero] = useState("");
    const [selectGenero, setselectGenero] = useState("");
    const { filmesId } = useParams();
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

    useEffect(() => {
        const url = baseUrl + "/filme/" + filmesId;
        console.log(url)
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setcampId(data.id);
                    setcampTitulo(data.titulo);
                    setcampDescricao(data.descricao);
                    setcampFoto(data.foto);
                    setstringGenero(data.genero.genero);
                    setselectGenero(data.generoId);
                    setStartDate(data.ano);
                    console.log(JSON.stringify(data.genero.genero))
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }, []);

    function sendUpdate() {
        // url de backend
        const url = baseUrl + "/filme/update/" + filmesId
        const dataput = {
            id: campId,
            titulo: campTitulo,
            ano: startDate,
            descricao: campDescricao,
            foto: campFoto,
            generoId: selectGenero
        }
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    return (

        <div>

            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Titulo</label>
                    <input type="email" className="form-control" placeholder="Email" value={campTitulo} onChange={(value) =>
                        setcampTitulo(value.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Descricao</label>
                    <input type="text" className="form-control" placeholder="Phone" value={campDescricao} onChange={(value) =>
                        setcampDescricao(value.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Foto</label><input type="text" className="form-control" id="inputAddress"
                        placeholder="1234 Main St"
                        value={campFoto} onChange={(value) =>
                            setcampFoto(value.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputData">Data</label>
                    <DatePicker
                        id="inputData"
                        className="form-control"
                        value={startDate}
                        defaultDate={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione a data"
                    />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Genero</label>
                    <select
                        id="inputState"
                        className="form-control"
                        value={selectGenero}
                        onChange={(event) => setselectGenero(event.target.value)}
                    >
                        <option value="">Selecione um gênero</option>
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>
                                {genero.genero}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <button className="form-group col-md-6" type="submit" class="btn btn-primary" onClick={() => sendUpdate()}>Update</button>
        </div>
    );
}

