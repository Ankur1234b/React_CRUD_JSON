import React from 'react'
import {useEffect,useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
export default function Emplisting() {
  const navigate = useNavigate();
  const [empdata, empdatachange] = useState(null);

  const LoadDetail = (id) => {
      navigate("/employee/detail/" + id);
  }
  const LoadEdit = (id) => {
      navigate("/employee/edit/" + id);
  }
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
        fetch("http://localhost:3000/employee/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = "http://localhost:3000/employee";
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        empdatachange(resJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="container">
    <div className="card">
    <div className='card-title'>
        <h2>Employee Listing</h2>
    </div>
    <div className='card-body'>
    <div className="divbtn">
                        <Link to="/employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
    <table className="table table-dark">
  <thead className='text-white'>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
        <tbody>

        {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger mx-2">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
        </tbody>
     </table>
    </div>
    </div>
    </div>
  )
}
