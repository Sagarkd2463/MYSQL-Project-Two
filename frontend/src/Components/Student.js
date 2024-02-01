import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Student = () => {
    const [id, setId] = useState('');
    const [student_name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [fee, setFee] = useState("");

    const [user, setUsers] = useState([]);


    useEffect(() => {
        (async () => await load())();
    }, []);

    //getting all the students
    async function load() {
        const result = await axios.get("http://localhost:3001/api/student/");
        setUsers(result.data.data);
        console.log(result.data);
    }

    //creating a student
    async function save(event) {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/api/student/add",
                {
                    student_name: student_name,
                    course: course,
                    fee: fee,
                });

            alert("Student Registation Successful!!");

            load();
        }
        catch (err) {
            alert("User Registation Failed!!");
        }
    }

    //editing a student details
    async function editStudent(student) {
        setName(student.student_name);
        setCourse(student.course);
        setFee(student.fee);

        setId(student.id);
    }

    //deleting a student 
    async function deleteStudent(id) {

        await axios.delete("http://localhost:3001/api/student/delete/" + id);
        alert("Student deleted Successfully!!");
        load();
    }

    //updating a student record
    async function update(event) {
        event.preventDefault();

        try {

            await axios.put("http://localhost:3001/api/student/update/" + user.find(u => u.id === id).id || id,
                {
                    id: id,
                    student_name: student_name,
                    course: course,
                    fee: fee
                });
            alert("Registation Updated!!");
        }
        catch (err) {
            alert(" Registation Failed!!");
        }
    }


    return (
        <div>
            <h1 className='text-center'>Student Details</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="student_id" hidden
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                        />
                        <label htmlFor=''>Student Name</label>
                        <input type="text" className="form-control" id="name"
                            value={student_name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=''>Course</label>
                        <input type="text" className="form-control" id="course"
                            value={course}
                            onChange={(event) => {
                                setCourse(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=''>Fee</label>
                        <input type="text" className="form-control" id="fee"
                            value={fee}
                            onChange={(event) => {
                                setFee(event.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <button className="btn btn-primary mt-4 me-3 mb-4 rounded-1" onClick={save}>Register</button>
                        <button className="btn btn-warning mt-4 mb-4 rounded-1" onClick={update}>Update</button>
                    </div>
                </form>
            </div>

            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Id</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Course</th>
                        <th scope="col">Fee</th>

                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                {
                    user?.map((student, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{student.id} </th>
                                <td>{student.student_name}</td>
                                <td>{student.course}</td>
                                <td>{student.fee}</td>
                                <td>
                                    <button type="button" className="btn btn-warning ms-2" onClick={() => editStudent(student)} >Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Student;