import { Component } from "react";
import './livro-content.css';
import Livro from "../elemento-livro";
import CriarLivroForm from "../criar-livro-form";

//SEMPRE RODAR "json-server --watch db.json", se nao tiver o json-server rodar "npm install -g json-server"
class LivroContent extends Component {
    state = {
        livros: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/livros')
            .then(response => response.json())
            .then(response => this.setState({livros: response}))
    }

    handleLivroDelete = livroId => {
        const novaListaLivros = this.state.livros.filter(livro => livro.id !== livroId);
        this.setState({ livros: novaListaLivros });
    };

    render() {
        const {livros} = this.state


        return(
            <div className="livros-content__container">
                <div className="livros-header__container">
                    <h1 className="livros-header__text">Catálogo de Livros</h1>
                </div>

                <div className="livros-table__container">
                    <table className="livros-content__table">
                        <thead className="livros-table__head">
                            <tr>
                                <th className="livros-table-head__item livros-table__acoes"></th>
                                <th className="livros-table-head__item livros-table__title">Titulo</th>
                                <th className="livros-table-head__item livros-table__resumo">Resumo</th>
                                <th className="livros-table-head__item livros-table__editora">Editora</th>
                                <th className="livros-table-head__item livros-table__autores">Autores</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => {
                                return(
                                        <Livro 
                                            id={livro.id} 
                                            titulo={livro.titulo} 
                                            resumo={livro.resumo} 
                                            editora={livro.editora} 
                                            autores={livro.autores} 
                                            key={livro.id}
                                            onDelete={this.handleLivroDelete}
                                        />
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="livros-content__create">
                    <CriarLivroForm/>
                </div>
            </div>
        )
    }
}
export default LivroContent;