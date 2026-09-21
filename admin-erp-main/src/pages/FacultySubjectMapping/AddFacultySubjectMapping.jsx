
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


function AddFacultySubjectMapping() {

    let navigate = useNavigate()

    let [show, setShow] = useState(false)
    let [showForm, SetShowForm] = useState(true)
    let [showSpinner, setShowSpinner] = useState(false)
    let [buttonDisabled, setButtonDisabled] = useState(false)
    let [lists, setLists] = useState([])
    let [session, setSession] = useState("")
    let [firstName, setFirstName] = useState("")
    let [course, setCourse] = useState("")
    let [branch, setBranch] = useState("")
    let [section, setSection] = useState("")
    let [semester, setSemester] = useState("")
    let [subject, setSubject] = useState("")


    // Add Timeslot
    let doAddFacultymapping = (e) => {

        // Prevent form from refreshing the page
        e.preventDefault()

        setButtonDisabled(true)
        SetShowForm(false)
        setShowSpinner(true)

        axios({
            url: 'http://localhost:3000/add/faculty/subject/mapping',
            method: 'post',
            data: {
                session,
                firstName,
                course,
                branch,
                section,
                semester,
                subject
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
        navigate('/facultySubjectMapping')

    }


    return (
        <>

            {showForm && (

                <Container className="mt-5">

                    <h3 className="text-center mb-4 py-2 text-primary fw-bold">
                        ADD NEW FACULTY SUBJECT MAPPING
                    </h3>

                    <hr />


                    <Form onSubmit={doAddFacultymapping}>
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
                                <Form.Label>Faculty Name</Form.Label>
                                <Form.Select
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                >
                                <option>---SelectFirstname---</option>
                                            {
                                                lists.map((list)=>
                                                <option value={list._id}>{list.firstName}</option>
                                                )
                                            }
                            </Form.Select>
                </Form.Group>
                            </Col>


                    <Col md={6}>
                        
                        <Form.Group className="mb-3">
<Form.Label>Faculty Name</Form.Label>
                                <Form.Select
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                >
                                <option>---SelectCourses---</option>
                                            {
                                                lists.map((list)=>
                                                <option value={list._id}>{list.course}</option>
                                                )
                                            }
                            </Form.Select>
                        <Form.Label>
                          Branch
                        </Form.Label>

                                
                        <Form.Select
                            onChange={(e) => setBranch(e.target.value)}
                            required
                                    >
                            
                            <option>---SelectBranch---</option>
                                {
                                    lists.map((list)=>
                                    <option value={list._id}>{list.branch}</option>
                                    )
                                }
                        </Form.Select>

                                </Form.Group>


                            </Col>

                        </Row>


                        
                        
                                 <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Section</Form.Label>
                    <Form.Select onChange={(e)=> setSection(e.target.value)}>
                        
                                    <option value="">-- Select Section--</option>
                                    <option value="2024-25">A</option>
                                    <option value="2025-26">B</option>
                                    <option value="2026-27">C</option>
                                    <option value="2027-28">D</option>
                    </Form.Select>                </Form.Group>
            </Row>
            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Semester
                                    </Form.Label>

                                    <Form.Select onChange={(e)=> setSemester(e.target.value)}>
                        
                                    <option value="">-- Select Semester--</option>
                                    <option value="2024-25">1st</option>
                                    <option value="2025-26">2nd</option>
                                    <option value="2026-27">3rd</option>
                                    <option value="2027-28">4th</option>
                    </Form.Select>

                                </Form.Group>

                            </Col>

            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Subject</Form.Label>
                    <Form.Select onChange={(e)=> setSubject(e.target.value)}>
                        
                                    <option value="">-- Select Year--</option>
                                    <option value="2024-25">2024-25</option>
                                    <option value="2025-26">2025-26</option>
                                    <option value="2026-27">2026-27</option>
                                    <option value="2027-28">2027-28</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            

                        <div className="d-flex gap-2 mt-4">

                            <Button
                                onClick={() => navigate('/facultySubjectMapping')}
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
                                Add faculty Subject Mapping
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


export default AddFacultySubjectMapping
