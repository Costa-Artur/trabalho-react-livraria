import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CriarLivroForm() {
    const [novoLivro, setNovoLivro] = useState({
        titulo: '',
        resumo: '',
        editora: '',
        autores: [{ nome: '' }], // Inicialmente, um autor vazio
    });

    const handleChange = (campo) => (event) => {
        setNovoLivro({ ...novoLivro, [campo]: event.target.value });
    };

    const handleAutorChange = (index) => (event) => {
        const novosAutores = [...novoLivro.autores];
        novosAutores[index] = { nome: event.target.value };
        setNovoLivro({ ...novoLivro, autores: novosAutores });
    };

    const adicionarAutor = () => {
        setNovoLivro({ ...novoLivro, autores: [...novoLivro.autores, { nome: '' }] });
    };

    const handleCriarLivro = () => {
        // Envie os dados do novo livro para a API
        fetch('http://localhost:3000/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoLivro),
        })
            .then(response => response.json())
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.error('Erro ao criar o livro:', error);
            });
    };

    return (
        <div>
            <h2>Criar Novo Livro</h2>
            <TextField
                label="Título"
                value={novoLivro.titulo}
                onChange={handleChange('titulo')}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Resumo"
                value={novoLivro.resumo}
                onChange={handleChange('resumo')}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <TextField
                label="Editora"
                value={novoLivro.editora}
                onChange={handleChange('editora')}
                fullWidth
                margin="normal"
            />

            {/* Campos de entrada para autores */}
            {novoLivro.autores.map((autor, index) => (
                <TextField
                    key={index}
                    label={`Autor ${index + 1}`}
                    value={autor.nome}
                    onChange={handleAutorChange(index)}
                    fullWidth
                    margin="normal"
                />
            ))}

            {/* Botão para adicionar novo autor */}
            <Button variant="outlined" onClick={adicionarAutor}>
                Adicionar Autor
            </Button>

            <Button variant="contained" color="primary" onClick={handleCriarLivro}>
                Criar Livro
            </Button>
        </div>
    );
}

export default CriarLivroForm;
