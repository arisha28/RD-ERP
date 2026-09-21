import { InputGroup, Form, Button, Table, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function LeaveList() {
    let [leaves, setLeaves] = useState([])
    let navigate = useNavigate()
    let [searchByApplicant, setSearchByApplicant] = useState('')
    
    useEffect(()=>{
        axios({
            url: 'http://localhost:3000/leaves',
            method: 'get',
            params: {
                applicant: searchByApplicant
            }
        }).then((res) => {
            setLeaves(res.data.data)
        }).catch((err)=> {
            alert(err)
        })
    },[searchByApplicant])
    function searchApplicant(leaveApplicant) {
        setSearchByApplicant(leaveApplicant)
        axios({
            url: 'http://localhost:3000/leave/search/' + applicant,
            method: 'get',
            params: {
                applicant: searchByApplicant
            }
        }).then((res)=> {
            setLeaves(res.data.data)
        }).catch((err)=> {
            alert(err)
        })
    }
    function goToAddLeavePage(){
        navigate('/add/leave')
    }
    function getleaveForEdit(id) {
        navigate('/edit/leave/' + id)
    }
    return(
        
        <>
         <h3 className="text-center mb-4 py-2 text-primary fw-bold">LEAVE LIST</h3>

            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control type="text" placeholder=" Type Applicant to search" onChange={(e)=> searchApplicant(e.target.value)} />
            </InputGroup>
             <button className="btn btn-success ms-3 mt-2 float-end" onClick={goToAddLeavePage}>Add Leave +</button>
             <Table>
                <thead>
                    <tr>
                        <th>Session</th>
                        <th>Leave Name/Type</th>
                        <th>Leave Short-Name</th>
                        <th>No of Leaves</th>
                        <th>Applicant</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaves.map((leave)=>
                        <tr>
                            <td>{leave.session}</td>
                            <td>{leave.leave_Name}</td>
                            <td>{leave.leave_ShortName}</td>
                            <td>{leave.no_of_leaves}</td>
                            <td>{leave.applicant}</td>
                            
                            <td>
                                    <Button variant="" size="sm" onClick={()=> {getleaveForEdit(leave._id)}} ><i class="bi bi-pen"></i></Button>
                                </td>
                        </tr>
                        )
                    }
                </tbody>
             </Table>
        </>

    )
}
export default LeaveList