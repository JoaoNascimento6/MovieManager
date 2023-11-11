import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000";

export default function EditComponent() {

    const [dataGeneros, setdataGeneros] = useState("");
    //const [campId, setcampId] = useState("");
    const [campgenero, setcampgenero] = useState("");

    const { generosId } = useParams();
    useEffect(() => {
        const url = baseUrl + "/genero/" + generosId;
        console.log(url)
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataGeneros(data);
                    //setcampId(data.id);
                    setcampgenero(data.genero);
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
        const url = baseUrl + "/genero/update/" + generosId

        const dataput = {
            //id: campId,
            genero: campgenero,
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
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Nome do Género</label>
                    <input type="text" className="form-control"
                        placeholder="Phone"value={campgenero} onChange={(value) =>setcampgenero(value.target.value)} />
                </div>
            </div>
            <button type="submit" class="btn btn-primary" onClick={() => sendUpdate()}>Update</button>
        </div>
    );
}

