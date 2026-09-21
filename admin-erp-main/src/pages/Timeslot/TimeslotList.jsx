
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


function TimeslotList() {

    let navigate = useNavigate();

    let [timeslots, setTimeslots] = useState([])
    const [show, setShow] = useState(false)
    let [isDelete, setIsDelete] = useState(false)
    let [searchBySession, setSearchBySession] = useState('')


    // Get all Timeslots
    useEffect(() => {

        axios({
            url: 'http://localhost:3000/timeslots',
            method: 'get',

            // THIS IS WHERE YOU ADD IT
            params: {
                session: searchBySession
            }

        }).then((res) => {
            
            if (res.data.success) {

                console.log(res.data.data)
                setTimeslots(res.data.data)
            }

        }).catch((error) => {

            console.log(error)

        })

    }, [isDelete, searchBySession])


    // Search Timeslot
    function searchTimeslot(subjectSession) {

        setSearchBySession(subjectSession)
         axios({
                    
                    url: 'http://localhost:3000/timeslot/search/' + session,
                    method: 'get',
                    params: {
                        session: searchBySession
                    }
        
                }).then((res) => {
        
                    if (res.data.success) {
                        setTimeslots(res.data.data);
                        // setCourses(result.data.data || []); 
                    }
        
                }).catch((error) => {
                    console.log(error);
                })
    }


    // Close success modal
    const handleClose = () => {

        setShow(false)
        setIsDelete(true)

    }


    // Go to Edit Timeslot
    function goToEdit(id) {

        console.log("Navigating to edit timeslot with ID:", id)

        navigate('/edit/timeslot/' + id)

    }


    // Go to Add Timeslot
    function goToAddTimeslotPage() {

        navigate('/add/timeslot')

    }


    // Delete Timeslot
    function goToDelete(id) {

        axios({

            url: 'http://localhost:3000/delete/timeslot/' + id,
            method: 'delete'

        }).then((result) => {

            if (result.data.success) {

                setShow(true)

            }

        }).catch((err) => {

            console.log(err.message)

        })

    }


    return (

        <>

            <h3 className="text-center mb-4 py-2 text-primary fw-bold">
                LIST OF TIMESLOTS
            </h3>


            {/* Search */}

            <InputGroup className="mb-3">

                <InputGroup.Text>
                    <i className="bi bi-search"></i>
                </InputGroup.Text>

                <Form.Control
                    type="text"
                    placeholder=" Type Session to search"
                    onChange={(e) => searchTimeslot(e.target.value)}
                />

            </InputGroup>


            {/* Add Timeslot */}

            <button
                className="btn btn-success ms-3 mt-2 float-end"
                onClick={goToAddTimeslotPage}
            >
                Add Time Slot +
            </button>


            {/* Timeslot Table */}

            <table className="table text-center table-hover mt-5">

                <thead>

                    <tr>

                        <th>Session</th>

                        <th>Lecture No</th>

                        <th>Lecture Time</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        timeslots.map((timeslot) => (

                            <tr key={timeslot._id}>

                                <td>
                                    {timeslot.session}
                                </td>

                                <td>
                                    {timeslot.lecture_no}
                                </td>

                                <td>
                                    {timeslot.lecture_time}
                                </td>

                                <td>

                                    <i
                                        className="bi bi-pencil me-3"
                                        onClick={() => goToEdit(timeslot._id)}
                                        style={{ cursor: 'pointer' }}
                                    ></i>

                                    <i
                                        className="bi bi-trash"
                                        onClick={() => goToDelete(timeslot._id)}
                                        style={{ cursor: 'pointer' }}
                                    ></i>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>


            {/* Success Modal */}

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
                    Timeslot has been Deleted successfully 👍
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="danger"
                        onClick={handleClose}
                    >
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </>

    )

}


export default TimeslotList

