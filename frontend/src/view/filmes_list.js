import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ListComponent() {

    const [dataFilmes, setdataFilmes] = useState([]);
    useEffect(() => {
        const url = "http://localhost:3000/filme/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataFilmes(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }, []);

    function LoadFillData() {
        return dataFilmes.map((data, index) => {
            return (
                <tr class='list' key={index}>
                    <th>{data.id}</th>
                    <td>{data.titulo}</td>
                    <td>{data.descricao}</td>
                    <td>{data.genero.genero}</td>
                    <td>{data.foto}</td>
                    <td>{data.ano}</td>
                    <td>
                        <Link class="btn btn-outline-info " to={"/filme/update/" + data.id} >Edit</Link>
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
        const baseUrl = "http://localhost:3000/filme/delete"
        // network
        axios.post(baseUrl, {
            id: userId
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your filme has been deleted.',
                        'success'
                    )
                    LoadFilmes()
                }
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }

    useEffect(() => {
        LoadFilmes();
    }, []);
    function LoadFilmes() {
        const url = "http://localhost:3000/filme/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataFilmes(data);
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
            <div> <Link className="btn-add-filme" to="/filme/create"> <img src="../play (1).png" alt="img adicionar genero" className="logo-image" /></Link></div>
            <table className="table table-hover table-striped load-fill-data-table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Filme</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Género</th>
                        <th scope="col">Imagem</th>
                        <th scope="col">Data</th>
                        <th colSpan="2">Action</th>

                    </tr>
                </thead>
                <tbody>
                    <LoadFillData />
                </tbody>
            </table>
        </div>

    );
}