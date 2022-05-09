import { useState } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import './styleform.css';
import DataTable from 'react-data-table-component'

function FormComponent () {
    const [rut, setRut] = useState()
    const [password, setPassword] = useState('test_password')
    const key = 'tel335'
    const secret = 'f68747ae-731f-46f6-92a8-c21180ff7b59'
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({});
    const showMessage = () => {
        alert(`El rut ingresado es ${rut} y el password es ${password}`)
    }
    const columns = [
        {name: 'Vacuna',selector: 'name',sortable: true},
        {name:'local de vacuna',selector: 'local',sortable: true},
        {name: 'Fecha',selector:'fecha',sortable: true},
        {name: 'Dosis',selector: 'dosis',sortable: true}
        ]
        const data = [
            {vacuna:'pfizer', local:'colegio1',fecha:'15/05',dosis: '1'},
            {vacuna:'pfizer', local:'colegio2',fecha:'16/05',dosis: '2'},
            {vacuna:'pfizer', local:'colegio3',fecha:'17/05',dosis: '3'}
        ]

    const table = ( 
        <table className='table table-responsive table-hover'>
        <thead>
            <tr>
                <th>Vacuna</th>
                <th>Fecha</th>
                <th>Dosis</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>Pfizer</td>
            <td>5/7</td>
            <td>1</td>
        </tr>
        </tbody>

        </table>
    )

    const handleSubmit = (event) => {
        fetch('http://127.0.0.1:3000/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id : rut,
                key : key,
                secret : secret
            })
            }).then(res => res.json())
            .then(
              (result) => {
                    //setIsLoaded(true)
                    setItem(result)
                    console.log(result)
                });
        event.preventDefault();
    }
    return (
        <div >
            <Form>
                <section id="section" className='form-res'>
                    <Container>
                        <Row >
                            <Col>
                                <Form.Group>
                                    <label>RUT:</label>
                                    <br />
                                    <Form.Control id="rut" type="text" onChange={(component) => setRut(component.target.value)} />                                    
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Form.Group>
                                    <label>PASSWORD:</label>
                                    <br />
                                    <Form.Control id="password" type='password' onChange={(component) => setPassword(component.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <Button type='button' className = "button"  onClick={handleSubmit} >
                                    <label>Ingresar</label>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1 style={{marginTop:50}}>
                                {item.id}
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <DataTable className='tabla'
                columns={columns}
                data= {item.vacunas}
                title = "Vacunas"
                />
            </Form>
        </div>
    )
}

export default FormComponent