import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from 'react';

function CadastroProfessor() {
  const [abrirPaginaDeProfessor, setAbrirPaginaDeProfessor] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nomeDoProfessor:'',
    matricula:'',
    telefoneCelular:'',
    desafioAssociado: null
  })
  const handleClose = () => setAbrirPaginaDeProfessor(false);
  const handleShow = () => setAbrirPaginaDeProfessor(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem('professor') != null) {
      let valorFinal = JSON.parse(localStorage.getItem('professor'))
      valorFinal.push(dadosFormulario)
      localStorage.setItem('professor', JSON.stringify(valorFinal))
    } else {
      localStorage.setItem('professor', JSON.stringify([dadosFormulario]))
    }
    setDadosFormulario({
      nomeDoProfessor:'',
      matricula:'',
      telefoneCelular:'',
      desafioAssociado: null
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastro de Professor
      </Button>

      <Modal show={abrirPaginaDeProfessor} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="CadastroProfessor"> 
            <Form.Group controlId="nomeDoProfessor">
              <Form.Label>Nome do Professor</Form.Label>
              <Form.Control onChange={handleInputChange} name="nomeDoProfessor" value={dadosFormulario.nomeDoProfessor} type="text"/>
            </Form.Group>
            <Form.Group controlId="matricula">
              <Form.Label>Matricula</Form.Label>
              <Form.Control onChange={handleInputChange} name="matricula" value={dadosFormulario.matricula} type= "number"/>
            </Form.Group>
            <Form.Group controlId= "telefoneCelular">
              <Form.Label>Telefone Celular</Form.Label>
              <Form.Control onChange={handleInputChange} name="telefoneCelular" value={dadosFormulario.telefoneCelular} type="number"/>
            </Form.Group>
            <Button variant="primary" type="submit" >enviar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
    

export default CadastroProfessor;