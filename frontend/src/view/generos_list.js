import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ListComponent() {
    const [dataGeneros, setdataGeneros] = useState([]);
    useEffect(() => {
        const url = "http://localhost:3000/genero/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataGeneros(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }, []);

    function LoadFillData() {
        return dataGeneros.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.genero}</td>
                    <td>
                        <Link class="btn btn-outline-info " to={"/genero/update/" + data.id} >Edit</Link>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onClick={() => OnDelete(data.id)}> Delete </button>
                    </td>
                </tr>
            )
        });
    }

    function OnDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover thisimaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                SendDelete(id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });
    }

    function SendDelete(userId) {
        // url do backend
        const baseUrl = "http://localhost:3000/genero/delete"
        // network
        axios.post(baseUrl, {
            id: userId
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your genero has been deleted.',
                        'success'
                    )
                    LoadGeneros()
                }
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }

    useEffect(() => {
        LoadGeneros();
    }, []);
    function LoadGeneros() {
        const url = "http://localhost:3000/genero/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataGeneros(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    return (
        <div>
            <div>
                
                <Link className="btn-add-filme" to="/genero/create" ><img src="../add.png" alt="img adicionar genero" className="logo-image" /></Link>
            </div>
            <table className="table table-hover table-striped load-fill-data-table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Género</th>
                        <th colSpan="2">Controlador</th>
                    </tr>
                </thead>
                <tbody>
                    <LoadFillData />
                </tbody>
            </table>
        </div>
    );
}