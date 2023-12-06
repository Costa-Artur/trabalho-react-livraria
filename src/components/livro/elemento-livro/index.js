import './livro.css'

function Livro (props) {
    const handleDeleteClick = () => {
        fetch(`http://localhost:3000/livros/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    props.onDelete(props.id);
                } else {
                    console.error('Falha ao excluir o livro.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    };

    return(
        <tr className='livro__container' key={props.id}>
            <td className='livros-table__acoes'><button onClick={handleDeleteClick} className='livros-acoes__delete'>Delete</button></td>
            <td className='livros-table__title'>{props.titulo}</td>
            <td className='livros-table__resumo'>{props.resumo}</td>
            <td className='livros-table__editora'>{props.editora}</td>
            <td className='livros-table__autores'>
                <ul>
                    {props.autores.map(autor => {
                        return (
                            <li key={autor.nome}>
                                <p>{autor.nome}</p>
                            </li>
                        )
                    })}
                </ul></td>
        </tr>
    )
}
export default Livro;