import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Step from './Step';

function Home() {
const navigate = useNavigate();
  const formFields = {
    1: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name' },
      { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter your email-id' },
      { name: 'dob', label: 'DOB', type: 'date', placeholder: '(DD/MM/YYYY)' },
    ],
    2: [
      { name: 'streetaddress', label: 'Street-Address', type: 'text', placeholder: 'Enter your street address' },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city name' },
      { name: 'statename', label: 'StateName', type: 'select', options: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
      ] },
      { name: 'zip', label: 'Zip', type: 'text', placeholder: 'Enter zip code for your address' },
    ],
    3: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
      { name: 'password', label: 'Password', type: 'text', placeholder: 'Enter password' },
      { name: 'confirmpassword', label: 'ConfirmPassword', type: 'text', placeholder: 'Re-enter password' },
    ],
  };

  const [formNo, setFormNo] = useState(1);
  const [state, setState] = useState({
    name: '',
    email: '',
    dob: '',
    streetaddress: '',
    city: '',
    statename: '',
    zip: '',
    username: '',
    password: '',
    confirmpassword:'',
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const validateStep = () => {
    const currentFields = formFields[formNo];
    for (const field of currentFields) {
      switch (field.name) {
        case 'name':
        case 'city':
        case 'statename':
          if (!state[field.name] || state[field.name].length < 3) {
            toast.error(`${field.label} is required and must be at least 3 characters.`);
            return false;
          }
          break;
        case 'email':
          const emailRegex = /^\S+@\S+\.\S+$/;
          if (!state[field.name] || !emailRegex.test(state[field.name])) {
            toast.error(`Please enter a valid email address for ${field.label}.`);
            return false;
          }
          break;
        case 'dob':
          // You can add more specific date validation if needed
          if (!state[field.name]) {
            toast.error(`${field.label} is required.`);
            return false;
          }
           // Calculate age based on the provided date
           const birthDate = new Date(state[field.name]);
           const currentDate = new Date();
           const age = currentDate.getFullYear() - birthDate.getFullYear();
 
           // Check if age is greater than 10
           if (age <= 10 || age>=150) {
             toast.error(`You must be at least 11 years old`);
             return false;
           }
          break;
        case 'streetaddress':
          if (!state[field.name] || state[field.name].length < 5) {
            toast.error(`${field.label} is required and must be at least 5 characters.`);
            return false;
          }
           
          break;
        case 'zip':
          const zipRegex = /^\d{6}$/;
          if (!state[field.name] || !zipRegex.test(state[field.name])) {
            toast.error(`${field.label} is required and must be a valid numeric format (6 digits).`);
            return false;
          }
          break;
        case 'username':
        case 'password':
          if (!state[field.name] || state[field.name].length < 6) {
            toast.error(`${field.label} is required and must be at least 6 characters.`);
            return false;
          }
          break;
        case 'confirmpassword':
          if (!state[field.name] || state[field.name] !== state.password) {
            toast.error(`Passwords do not match.`);
            return false;
          }
          break;
        // Add more cases for other fields if needed
        default:
          break;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) {
      setFormNo(formNo + 1);
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const finalSubmit = () => {
    if (validateStep()) {
      toast.success('Form submit success');
    navigate('/success');
    }
  };

  return (
    <div className="w-screen h-screen bg-cyan-200 flex justify-center items-center">
      <ToastContainer />
      <div className="card w-[370px] rounded-md shadow-md bg-white p-5">
        {/* Steps indicator */}
        <div className="flex justify-center items-center">
          {Object.keys(formFields).map((step, index, array) => (
            <React.Fragment key={step}>
              <div
                className={`w-[35px] my-3 text-white rounded-full ${
                  formNo - 1 === index || formNo - 1 === index + 1 || formNo === array.length
                    ? 'bg-blue-500'
                    : 'bg-slate-400'
                } h-[35px] flex justify-center items-center`}
              >
                {step}
              </div>
              {index !== array.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${
                    formNo === index + 2 || formNo === array.length ? 'bg-blue-500' : 'bg-slate-400'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form fields */}
        <Step fields={formFields[formNo]} state={state} inputHandle={inputHandle} />

        {/* Navigation buttons */}
        <div className="mt-4 gap-3 flex justify-center items-center">
          {formNo !== 1 && (
            <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
              Previous
            </button>
          )}
          {formNo !== Object.keys(formFields).length && (
            <button onClick={next} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
              Next
            </button>
          )}
          {formNo === Object.keys(formFields).length && (
            <button onClick={finalSubmit} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;