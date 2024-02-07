import React, { useState } from 'react';
import axios from 'axios';

export default function AddTeacherFormLayout(){
 
    const [formData, setFormData] = useState({
        nameTextbox: '',
        typeRadio: '',
        pictureTextbox: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/dashboard/postTeacher', formData);
            alert('Data submitted successfully');
        } catch (error) {               
            console.error('There was an error submitting the data!', error);
        }
    };

    return(
        <div className='flex justify-center items-center'>
            <form className="flex flex-col gap-4 p-4 w-[46rem]" onSubmit={handleSubmit}>
                <h1 className="font-bold">Create a Teacher Profile</h1>
                <div className="grid grid-cols-3 grid-rows-2 border-2 gap-y-8 p-4">
                    <div>
                        <label>First Name</label>
                        <input type='text' name='nameTextbox' className="border p-4 rounded w-26 flex items-center space-x-4" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Middle Name</label>
                        <input type='text' name='middleNameTextbox' className="border p-4 rounded w-26 flex items-center space-x-4" disabled={true} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type='text' name='lastNameTextbox' className="border p-4 rounded w-26 flex items-center space-x-4" disabled={true} onChange={handleChange}/>
                    </div>
                    <div className='col-span-2'>
                        <label>Picture</label>
                        <input type='text' name='pictureTextbox' className="border p-4 rounded w-26 flex items-center space-x-4" onChange={handleChange}/>
                    </div>
                    <div>   
                        <h2 className="font-semibold">Type</h2>
                        <label className="flex gap-4">Faculty
                            <input type="radio" name="typeRadio" value="Faculty" onChange={handleChange} />
                        </label>
                        <label className="flex gap-4"> Non-Faculty
                            <input type="radio" name="typeRadio" value="Non-Faculty" onChange={handleChange}/>
                        </label>
                    </div>
                </div>
                <div className="flex">
                    <button className="p-4 bg-green-600 rounded-lg ml-auto" type="submit"> Post </button>
                </div>
            </form>
        </div>
)}