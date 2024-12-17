import React,{useState} from 'react';
import {Formik,Form,Field} from 'formik';
import validator from 'validator';
import Button from './Button';

function EmployeeForm() {
    const [messege,setMessege] = useState('');
    
    const handleSubmit = async (values, { resetForm }) => {
        try {
          const response = await fetch(
            "https://fsd-form-zpw7.onrender.com/api/auth/addEmployee",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                employee_id: values.employeeId,
                email: values.email,
                phone_number: values.phone,
                department: values.department,
                date_of_joining: values.dateOfJoining,
                roles: values.role,
              }),
            }
          );
          const data = await response.json();
    
          if (response.ok) {
            setMessege(data.messege);
            console.log("Response is successful");
            setTimeout(()=>setMessege(''),3000);
    
            resetForm(); // Reset form after successful submission
          } else {
            setMessege(data.messege);
            console.log(data.messege);
            setTimeout(()=>setMessege(''),3000);
    
          }
        } catch (err) {
          console.error(err);
          setMessege("An error occurred");
          setTimeout(()=>setMessege(''),3000);
        }
      };
    
      const validateForm = (values) => {
        const errors = {};
    
        if (!values.firstName) {
          errors.firstName = "First Name is required";
        }
    
        if (!values.lastName) {
          errors.lastName = "Last Name is required";
        }
    
        if (!values.employeeId) {
          errors.employeeId = "Employee ID is required";
        } else if (!/^[a-zA-Z0-9]{10}$/.test(values.employeeId)) {
          errors.employeeId = "Employee ID must be 10 alphanumeric characters";
        }
    
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
          errors.email = "Invalid email address";
        }
    
        if (!values.phone) {
          errors.phone = "Phone Number is required";
        } else if (!validator.isMobilePhone(values.phone, "en-IN")) {
          errors.phone = "Invalid Phone Number";
        }
    
        if (!values.department) {
          errors.department = "Department is required";
        }
    
        if (!values.role) {
          errors.role = "Role is required";
        }
    
        if (!values.dateOfJoining) {
          errors.dateOfJoining = "Date of Joining is required";
        } else if (!validator.isDate(values.dateOfJoining)) {
          errors.dateOfJoining = "Invalid date format";
        } else if (new Date(values.dateOfJoining) > new Date()) {
          errors.dateOfJoining = "Future dates are not allowed";
        }
    
        return errors;
      };
  return (
    <div className="container container-fluid" >
      <div className="row wrapper" >
        <div></div>
        <div
          className="col col-md-12 p-2 d-flex justify-content-center"
          
        >
            <div style={outer}> 
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              employeeId: "",
              email: "",
              phone: "",
              department: "",
              dateOfJoining: "",
              role: "",
              picture: "",
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
            
          >
            {(formik) => (
              <Form className="pt-2 pb-5 px-5 shadow-lg" style={box}>
                <div className=""></div>
                {/* First Name and Last Name */}
                <div className="form-group mt-4 d-flex">
                  <div className="me-3">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        formik.touched.firstName && formik.errors.firstName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={
                        formik.touched.lastName && formik.errors.lastName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="employeeId">Employee ID</label>
                  <Field
                    name="employeeId"
                    type="text"
                    className={
                      formik.touched.employeeId && formik.errors.employeeId
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.employeeId && formik.errors.employeeId && (
                    <div className="invalid-feedback">
                      {formik.errors.employeeId}
                    </div>
                  )}
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    name="phone"
                    type="text"
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="invalid-feedback">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="department">Department</label>
                  <Field
                    name="department"
                    as="select"
                    className={
                      formik.touched.department && formik.errors.department
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </Field>
                  {formik.touched.department && formik.errors.department && (
                    <div className="invalid-feedback">
                      {formik.errors.department}
                    </div>
                  )}
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="dateOfJoining">Date of Joining</label>
                  <Field
                    name="dateOfJoining"
                    type="date"
                    className={
                      formik.touched.dateOfJoining &&
                      formik.errors.dateOfJoining
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.dateOfJoining &&
                    formik.errors.dateOfJoining && (
                      <div className="invalid-feedback">
                        {formik.errors.dateOfJoining}
                      </div>
                    )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="role">Role</label>
                  <Field
                    name="role"
                    type="text"
                    className={
                      formik.touched.role && formik.errors.role
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.role && formik.errors.role && (
                    <div className="invalid-feedback">{formik.errors.role}</div>
                  )}
                </div>
                

                <div className="form-group mt-4 d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={() => formik.resetForm()}
                  >
                    Reset
                  </button>
                </div>

                {messege && (
                  <div className="message-container">
                    <p className="alert alert-info">{messege}</p>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          </div>
         
        </div>
      </div>
    </div>
  )
}
const box = {
        backgroundColor: '#aba9a9',
      color: 'black',
      padding: '20px',
      minHeight: '100vh', 
      borderRadius:'20px'
    }
    const outer = {
        border : 'white'
    }


export default EmployeeForm
