import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from 'react';

function CadastroCurso() {
  const [abrirPaginaDoCurso, setAbrirPaginaDoCurso] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nomeCurso: '',
    nomeCoordenador: '',
    dataInicio: ''
  });

  const handleClose = () => setAbrirPaginaDoCurso(false);
  const handleShow = () => setAbrirPaginaDoCurso(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

 
 const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem('curso') != null) {
      let valorFinal = JSON.parse(localStorage.getItem('curso'))
      valorFinal.push(dadosFormulario)
      localStorage.setItem('curso', JSON.stringify(valorFinal))
    } else {
      localStorage.setItem("curso", JSON.stringify([dadosFormulario]))
    }
    setDadosFormulario({
      nomeCurso: '',
      nomeCoordenador: '',
      dataInicio: ''
    });
  };

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Cadastro de Curso
    </Button>

    <Modal show={abrirPaginaDoCurso} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="CadastroDeCurso"> 
          <Form.Group controlId="nomeCurso">
            <Form.Label>Nome do curso</Form.Label>
            <Form.Control onChange={handleInputChange} name="nomeCurso" value={dadosFormulario.nomeCurso} type="text"/>
          </Form.Group>
          <Form.Group controlId="dataInicio">
            <Form.Label>Data de início de curso</Form.Label>
            <Form.Control onChange={handleInputChange} name="dataInicio" value={dadosFormulario.dataInicio} type="date"/>
          </Form.Group>
          <Form.Group controlId="nomeCoordenador">
            <Form.Label>Nome do coordenador do curso</Form.Label>
            <Form.Control onChange={handleInputChange} name="nomeCoordenador" value={dadosFormulario.nomeCoordenador} type="text"/>
          </Form.Group>
          <Button variant="primary" type="submit" >enviar</Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
    );
}

export default CadastroCurso;
  