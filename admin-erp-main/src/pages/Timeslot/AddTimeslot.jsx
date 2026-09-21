
import axios from "axios"
import {
    Modal,
    Button,
    Col,
    Container,
    Row,
    Form,
    Spinner
} from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


function AddTimeslot() {

    let navigate = useNavigate()

    let [show, setShow] = useState(false)
    let [showForm, SetShowForm] = useState(true)
    let [showSpinner, setShowSpinner] = useState(false)
    let [buttonDisabled, setButtonDisabled] = useState(false)

    let [session, setSession] = useState("")
    let [lecture_no, setLecture_no] = useState("")
    let [lecture_time, setLecture_time] = useState("")


    // Add Timeslot
    let doAddTimeslot = (e) => {

        // Prevent form from refreshing the page
        e.preventDefault()

        setButtonDisabled(true)
        SetShowForm(false)
        setShowSpinner(true)

        axios({
            url: 'http://localhost:3000/add/timeslot',
            method: 'post',
            data: {
                session,
                lecture_no,
                lecture_time
            }
        })
        .then(result => {

            if (result.data.success) {
                setShow(true)
            }

            setButtonDisabled(false)
            setShowSpinner(false)
            SetShowForm(true)

        })
        .catch(err => {

            setShowSpinner(false)
            setButtonDisabled(false)
            SetShowForm(true)

            console.log(err.message)
            alert('Something went wrong: ' + err.message)

        })
    }


    // Close modal
    const handleClose = () => {

        setShow(false)
        navigate('/timeslots')

    }


    return (
        <>

            {showForm && (

                <Container className="mt-5">

                    <h3 className="text-center mb-4 py-2 text-primary fw-bold">
                        ADD NEW TIME-SLOT
                    </h3>

                    <hr />


                    <Form onSubmit={doAddTimeslot}>

                        <Row>

                            <Col md={6}>

                                
                                    <Form.Group className="mb-3">
                  <Form.Label>Session</Form.Label>
                  <Form.Select
                    onChange={(e) => setSession(e.target.value)}
                    required
                  >
                    <option value="">-- Select Year--</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                    <option value="2027-28">2027-28</option>
                  </Form.Select>
                </Form.Group>
                            </Col>


                            <Col md={6}>

                                <Form.Group className="mb-3">

                        <Form.Label>
                            Lecture No
                        </Form.Label>

                                
                        <Form.Select
                            onChange={(e) => setLecture_no(e.target.value)}
                            required
                                    >
                            
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </Form.Select>

                                </Form.Group>


                            </Col>

                        </Row>


                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Lecture-Time
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setLecture_time(e.target.value)}
                                        placeholder="eg: 10:00 AM - 11:00 AM"
                                        required
                                    />

                                </Form.Group>

                            </Col>

                        </Row>


                        <div className="d-flex gap-2 mt-4">

                            <Button
                                onClick={() => navigate('/timeslots')}
                                variant="secondary"
                                type="button"
                            >
                                Cancel
                            </Button>


                            <Button
                                disabled={buttonDisabled}
                                variant="success"
                                type="submit"
                            >
                                Add Timeslot
                            </Button>

                        </div>

                    </Form>

                </Container>
            )}


            {showSpinner && (

                <div className="d-flex justify-content-center align-items-center vh-100">

                    <Spinner animation="border" role="status">

                        <span className="visually-hidden">
                            Loading...
                        </span>

                    </Spinner>

                </div>

            )}


            <Modal
                show={show}
                onHide={handleClose}
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Success
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>
                    Timeslot added successfully 👍
                </Modal.Body>


                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </>
    )
}


export default AddTimeslot

