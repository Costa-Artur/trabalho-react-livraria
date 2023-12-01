import LivroContent from './components/livro/livro-content';


//SEMPRE RODAR "json-server --watch db.json", se nao tiver o json-server rodar "npm install -g json-server"
function App() {
  return (
    <div className="App">
      <LivroContent/>
    </div>
  );
}

export default App;
