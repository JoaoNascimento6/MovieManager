import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState } from "react";

export default function EditComponent() {
    const [campgenero, setcampgenero] = useState("");

    return (
        <div class="container p-3 my-3 bg-dark text-white">  <label>Insere um novo genero</label>

            <div className="form-row justify-content-center">
                <div className="form-group margens" >


                    <label htmlFor="inputgenero"></label>
                    <input type="text" className="form-control" placeholder="terror,fantasia,ação..." value={campgenero} onChange={value => setcampgenero(value.target.value)} />

                </div>

            </div>

            <button type="submit" className="btn btn-primary" onClick={() => sendSave()}>Guardar Genero</button>
        </div>

    );

    function sendSave() {
        if (campgenero === "") {
            alert("Escolhe um genero")
        }
        else {
            const baseUrl = "http://localhost:3000/genero/create"
            const datapost = {
                genero: campgenero,
            }
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