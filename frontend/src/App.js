import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import FilmeCreate from './view/filmes_create';
import FilmeList from './view/filmes_list';
import FilmeEdit from './view/filmes_edit';

import GeneroCreate from './view/generos_create';
import GeneroList from './view/generos_list';
import GeneroEdit from './view/generos_edit';

import './App.css'; // Importe o arquivo CSS que será criado

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <img src="../video-camera.ico" alt="Logo do Site" className="logo-image" />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto"> {}
              <li className="nav-item active">
                <Link className="btn btn-success" to="/filme/list">Listar Filmes</Link>
              </li>
              
              <li className="nav-item active">
                <Link className="btn btn-success" to="/genero/list">Listar Generos</Link>
              </li>
              
            </ul>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/filme/list" element={<FilmeList />} />
              <Route path="/filme/create" element={<FilmeCreate />} />
              <Route path="/filme/update/:filmesId" element={<FilmeEdit />} />
              <Route path="/genero/list" element={<GeneroList />} />
              <Route path="/genero/create" element={<GeneroCreate />} />
              <Route path="/genero/update/:generosId" element={<GeneroEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
