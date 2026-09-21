import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Form,Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function LeaveEdit() {
    let params = useParams();
    let id = params.id
    let navigate = useNavigate();
    let [leave, setLeave] = useState({
        session: '',
        leave_Name: '',
        leave_ShortName: '',
        no_of_leaves: '',
        applicant: ''
    })
    useEffect(()=> {
        axios({
            url: 'http://localhost:3000/leave/for/edit/' + id,
            method: 'get'
        }).then((res)=> {
            setLeave(res.data.data)
        }).catch((err)=> {
            alert(err)
            console.log(err)
        })
    },[])
    function editLeave() {
        axios({
            url: 'http://localhost:3000/edit/leave/' + id,
            method: 'put',
            data: leave
        }).then((res)=> {
            alert('data has been successfullyyy updatedd...')
            navigate('/leaves')
        }).catch((err)=> {
            alert(err)
        })
    }
    function manageUpdate(e) {
        let name = e.target.name;
        let value = e.target.value;
        setLeave((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    return(
        <Container>
            <Form>
                <h3 className="text-center mb-4 py-2 text-primary fw-bold ">EDIT LEAVE</h3>
                <Row>
                     <Col>
                        <Form.Group>
                            <Form.Label>Session</Form.Label>
                            <Form.Select name="session" value={leave.session} onChange={manageUpdate} required>
                                <option value="2024-25">2024-25</option>
                                <option value="2025-26">2025-26</option>
                                <option value="2026-27">2026-27</option>
                                <option value="2027-28">2027-28</option>
                            </Form.Select>
                        </Form.Group>
                     </Col>
                     <Row className="mt-2">
                        <Form.Group>
                        <Form.Label>Leave Name</Form.Label>
                        <Form.Select name="leave_Name" value={leave.leave_Name} onChange={manageUpdate} required>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Earned Leave">Earned Leave</option>
                            <option value="Medical / Sick Leave">Medical / Sick Leave</option>
                            <option value="Maternity and Paternity Leave">Maternity and Paternity Leave</option>
                            <option value="On-Duty Leave">On-Duty Leave</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mt-2">
                        <Form.Group>
                        <Form.Label>Leave Short Name</Form.Label>
                        <Form.Select name="leave_ShortName" value={leave.leave_ShortName} onChange={manageUpdate} required>
                            <option value="CL">CL</option>
                            <option value="EL">EL</option>
                            <option value="M/SL">M/S L</option>
                            <option value="M/PL">M/P L</option>
                            <option value="OD-L">OD-L</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                     <Row className="mt-2">
                    <Form.Group>
                        <Form.Label>Number Of leave</Form.Label>
                        <Form.Control type="text" name="no_of_leaves" value={leave.no_of_leaves} onChange={manageUpdate}></Form.Control>
                    </Form.Group>
                    </Row>
                    <Row className="mt-2">
                        <Form.Group>
                        <Form.Label>Applicant</Form.Label>
                        <Form.Select name="applicant" value={leave.applicant} onChange={manageUpdate} required>
                            <option value="Teaching Staff">Teaching Staff</option>
                            <option value="Non Teaching Staff">Non Teaching Staff</option>
                            <option value="Student">Student</option>
                            <option value="Others">Others</option>
                        </Form.Select>
                        </Form.Group>
                    
                    </Row>
                </Row>

            </Form>
            <Button className="mt-2" variant="success" onClick={editLeave}>EDIT Leave</Button>
        </Container>
    )
}
export default LeaveEdit