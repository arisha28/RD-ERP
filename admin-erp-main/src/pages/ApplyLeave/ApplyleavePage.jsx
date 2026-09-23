import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from "react"
import axios from "axios"

function ApplyLeavePage() {
let [sessions, setSessions] = useState([])
let [session, setSession] = useState('')
let [leave_name, setLeave_name] = useState('')
let [from , setFrom] = useState('')
let [to, setTo] = useState('')
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [numberOfLeaves, setNumberOfLeaves] = useState(0);

  useEffect(()=>{
    axios({
      url: 'http://localhost:3000/session/for/leave',
      method: 'get',
    }).then((res)=> {
      setSessions(res.data.data)
    }).catch((err)=> {
      alert(err)
    })
  },[])
  function applyLeave() {
    let data = {
        session: session,
        leave_name: leave_name,
        from: from,
        to: to
    }
    axios({
        url: 'http://localhost:3000/add/leave',
        method: 'POST',
        data: data
    }).then((res)=> {
        alert("data added successfullyy...")

    }).catch((err)=> {
        console.log(err)
    })
  }
  function calculateLeaves(from, to) {
    if (!from || !to) {
        setNumberOfLeaves(0);
        return;
    }

    const start = new Date(from);
    const end = new Date(to);

    if (end < start) {
        setNumberOfLeaves(0);
        return;
    }

    const difference = end - start;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    setNumberOfLeaves(days);
}
    return(
      <>
    
     <Container>
            <Row>
                <Col>
                    <Form>
                        <h3 className="mt-3 text-center text-danger">APPLY FOR LEAVE FORM</h3>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Session</Form.Label>
                            <Form.Select >
                                <option>---SelectSession---</option>
                                {
                                    sessions.map((session)=>
                                    <option value={session._id}>{session.session}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Type of Leave</Form.Label>
                    <Form.Select >
                                <option>---SelectLeave---</option>
                                {
                                    sessions.map((session)=>
                                    <option value={session._id}>{session.leave_name}</option>
                                    )
                                }
                            </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Leave From</Form.Label>
                    <Form.Control type="date" value={fromDate} onChange={(e)=> {
                        setFromDate(e.target.value);
                        calculateLeaves(e.target.value, toDate)
                    }} ></Form.Control>
                </Form.Group>
            </Row>
            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>Leave To</Form.Label>
                    <Form.Control type="date" value={toDate} onChange={(e) => {
                        setToDate(e.target.value)
                        calculateLeaves(fromDate, e.target.value)
                    }} ></Form.Control>
                </Form.Group>
            </Row>
            <Row className="mt-2">
                <Form.Group>
                    <Form.Label>No of Leaves</Form.Label>
                    <Form.Control type='number' value={numberOfLeaves} readOnly></Form.Control>
                </Form.Group>
            </Row>
            
            <Button className="mt-2" variant="success" onClick={applyLeave}>Apply Leave</Button>
        </Container>
    </>

  );
}
export default ApplyLeavePage