
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
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"


function TimeslotEdit() {

    let navigate = useNavigate()
    let { id } = useParams()

    let [show, setShow] = useState(false)
    let [showForm, SetShowForm] = useState(true)
    let [showSpinner, setShowSpinner] = useState(false)
    let [buttonDisabled, setButtonDisabled] = useState(false)

    let [session, setSession] = useState("")
    let [lecture_no, setLecture_no] = useState("")
    let [lecture_time, setLecture_time] = useState("")


    // Get Timeslot by ID
    useEffect(() => {

        axios({
            url: 'http://localhost:3000/timeslot/' + id,
            method: 'get'
        })
        .then(result => {

            console.log(result.data)

            if (result.data.success) {

                let timeslot = result.data.data

                setSession(timeslot.session)
                setLecture_no(timeslot.lecture_no)
                setLecture_time(timeslot.lecture_time)

            }

        })
        .catch(error => {

            console.log(error)

        })

    }, [id])


    // Update Timeslot
    function doEditTimeslot(e) {

        e.preventDefault()

        setButtonDisabled(true)
        SetShowForm(false)
        setShowSpinner(true)


        axios({
            url: 'http://localhost:3000/edit/timeslot/' + id,
            method: 'put',
            data: {
                session,
                lecture_no,
                lecture_time
            }
        })
        .then(result => {

            console.log(result.data)

            if (result.data.success) {
                setShow(true)
            }

            setButtonDisabled(false)
            setShowSpinner(false)
            SetShowForm(true)

        })
        .catch(error => {

            console.log(error)

            setButtonDisabled(false)
            setShowSpinner(false)
            SetShowForm(true)

        })

    }


    // Close modal
    function handleClose() {

        setShow(false)
        navigate('/timeslots')

    }


    return (

        <>

            {showForm && (

                <Container className="mt-5">

                    <h3 className="text-center mb-4 py-2 text-primary fw-bold">
                        EDIT TIMESLOT
                    </h3>

                    <hr />


                    <Form onSubmit={doEditTimeslot}>

                        <Row>

                            <Col md={6}>

                               
                                    <Form.Group className="mb-3">
                  <Form.Label>Session</Form.Label>
                  <Form.Select
                    value={session}
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
                            value={lecture_no}
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
                                        Lecture Time
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        value={lecture_time}
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
                                Update Timeslot
                            </Button>

                        </div>

                    </Form>

                </Container>

            )}


            {showSpinner && (

                <div className="d-flex justify-content-center align-items-center vh-100">

                    <Spinner
                        animation="border"
                        role="status"
                    >

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
                    Timeslot updated successfully 👍
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


export default TimeslotEdit

