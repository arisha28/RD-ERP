import axios from "axios"
import { useEffect, useState } from "react"
import { Button, InputGroup, Table, Form, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
function FacultySubjectMappingList() {
    let navigate = useNavigate();
    let [lists , setLists] = useState([])
    const [show, setShow] = useState(false)
    let [isDelete,  setIsDelete] = useState(false)
    let [searchByFirstName,  setSearchByFirstName] = useState('')
    useEffect(() => {
        axios(() => {
            axios({
                url: "http://localhost:3000/facultySubjectMapping",
                method: 'get',
                params:{
                    firstName: searchByFirstName
                }
            }).then((res)=> {
                if(res.data.success) {
                    console.log(res.data.data);
                    setLists(res.data.data)
                }
            }).catch((err)=> {
                console.log(err);
                
            })
        })
    }, [isDelete, searchByFirstName])
    function seacrhFacultySubjectMapping() {
        axios({
            url: 'http://localhost:3000/faculty/subject/mapping/search' + firstName,
            method: 'get',
            params: {
                firstName: searchByFirstName
            }
        }).then((res)=> {
            if(res.data.success) {
                setLists(res.data.data)
            }
        }).catch((err) => {
            console.log(err);
            
        })
    }
    const handleClose = () => {
        setShow(false)
        setIsDelete(true)
    }
    function goToEdit(id) {
        console.log("Navigating To Edit Faculty subject mapping", id);
        navigate('/edit/faculty/subject/mapping' + id)
    }
    function goToAddFacultySubjectMapping() {
        navigate('/add/faculty/subject/mapping')
    }
    function goToDelete(id) {
        axios({
            url: "http://localhost:3000/delete/faculty/subject/mapping/" + id,
            methos: 'delete'
        }).then((res) => {
            if(res.data.data) {
                setShow(true)
            }
        }).catch((err) => {
            console.log(err.message);
            
        })
    }
    return(
        <>
        
        <h3 className="text-center mb-4 py-2 text-primary fw-bold">
            LIST OF FACULTY SUBJECT MAPPING
        </h3>
        <InputGroup>
        <InputGroup.Text>
        <i className="bi bi-search"></i>
        </InputGroup.Text>

        <Form.Control type="text" placeholder=" type to search" onChange={(e) => seacrhFacultySubjectMapping(e.target.value)}>

        </Form.Control>
        </InputGroup>
        <Button className="btn btn-success ms-3 mt-2 float-end" onClick={goToAddFacultySubjectMapping}>
            Add Faculty Subject Mapping
        </Button>

        <Table>
            <thead>
                <tr>
                    <th>Session</th>
                    <th>Faculty</th>
                    <th>Course</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Section</th>
                </tr>
            </thead>
            <tbody>
                {
                    lists.map((list) => (
                        <tr key={list._id}>
                            <td>{list.session}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                  <i
                                        className="bi bi-pencil me-3"
                                        onClick={() => goToEdit(list._id)}
                                        style={{ cursor: 'pointer' }}
                                    ></i>

                                    <i
                                        className="bi bi-trash"
                                        onClick={() => goToDelete(list._id)}
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    )
}
export default FacultySubjectMappingList