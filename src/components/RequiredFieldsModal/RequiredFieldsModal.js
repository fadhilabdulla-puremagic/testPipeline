import "./modal.css";

import { React, useState } from "react";
// 

import { Container, Row, Col, Button, Form  } from 'react-bootstrap';



export const RequiredFieldsModal = ({ requiredFields , handleShow, actionDone, referralCodes }) => {
  const ErrorDisplay = ({ message }) => {
    return (
      <div className="error-display">
        <p>{message}</p>
      </div>
    );
  };

  const [loading, setLoading] = useState(false);

//   const fields = [
//     { name: 'child_first_name', label: 'First Name', type: 'text' },
//     { name: 'child_last_name', label: 'Last Name', type: 'text' },
//     { name: 'child_dob', label: 'Date of Birth', type: 'date' },
//     { name: 'child_age', label: 'Age', type: 'number' },
//     { name: 'address', label: 'Address', type: 'text' },
//     { name: 'enrolled', label: 'Enrolled', type: 'select', options: ['Yes', 'No'] }
//   ];

const fields = [
    ...requiredFields
];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'select' ? field.options[0] : '';
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = formData[field.name];

      if(!value.replace(/\s/g, '').length){
        newErrors[field.name] = `Please enter valid value for ${field.label}`;
      }
      if(field.name === 'child_first_name' || field.name === 'child_last_name'){
        if(!/^[a-zA-Z]+$/.test(value)){
          newErrors[field.name] = `Only alphates are allowed for ${field.label}`;
        } 
      }
      if (field.type === 'text' && !value) {
        newErrors[field.name] = `${field.label} is required`;

      } else if (field.type === 'number') {
        if (!value) {
          newErrors[field.name] = `${field.label} is required`;
        } else if (isNaN(value) || value <= 0) {
          newErrors[field.name] = `${field.label} must be a positive number`;
        }
      }

      if(field.name === 'referral_code' && (!newErrors.hasOwnProperty('referral_code'))){
        if(referralCodes && Array.isArray(referralCodes) && referralCodes.length){
          if(! referralCodes.includes(value)){
            newErrors[field.name] = `Please enter valid Referral Code or Contact us.`;
          }
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
  
      localStorage.setItem('requiredFields', JSON.stringify(formData, null, 2))
        actionDone()
        // handleShow()
    }
  };
  return (
    <div className="instructor-modal-overlay">
      <div className="instructor-modal">
        <div className="instructor-modal-content">
        <button
            className="instructor-modal-close-modal"
            onClick={() => handleShow()}
          >
            X
          </button>
        <Container>
      <h3>SUMMER CAMP</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          {fields.map((field) => (
            <Col md="12" key={field.name}>
              <Form.Group className="mt-3">
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'select' ? (
                  <Form.Control
                    as="select"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="m-0"
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    isInvalid={!!errors[field.name]}
                    className="m-0"
                  />
                )}
                {field.type !== 'select' && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button type="submit" variant="success" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
    </div>
    </div>
  );

};
