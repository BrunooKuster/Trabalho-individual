import CadastroCurso from "src/pages/CadastroCurso.js";
import CadastroDePeriodo from "src/pages/CadastroDePeriodo.js";
import CadastroProfessor from "src/pages/CadastroProfessor.js";
import CadastroDeSalas from "src/pages/CadastroDeSalas.js";
import CadastroDeDesafio from "src/pages/CadastroDeDesafio.js";
import CalendarioDeHorarios from "src/pages/CalendarioDeHorarios.js";

function App() {

  

  return (
    <div className="App">
      <CalendarioDeHorarios/>
      <CadastroCurso/>
      <CadastroDePeriodo/>
      <CadastroProfessor/>
      <CadastroDeSalas/>
      <CadastroDeDesafio/>
      
      
    </div>
  );
}

export default App;
