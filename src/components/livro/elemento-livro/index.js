import './livro.css'

function Livro (props) {
    const handleDeleteClick = () => {
        // Faça a requisição para deletar o livro com base no ID
        fetch(`http://localhost:3000/livros/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // Se a exclusão foi bem-sucedida, chame a função de exclusão passada como propriedade
                    props.onDelete(props.id);
                } else {
                    // Se houve um problema com a exclusão, lide com isso de acordo com sua lógica
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
                            <li key={autor.id}>
                                <p>{autor.nome}</p>
                            </li>
                        )
                    })}
                </ul></td>
        </tr>
    )
}
export default Livro;