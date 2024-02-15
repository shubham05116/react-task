import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Toast from './components/Toast';
import ErrorToast from './components/ErrorToast';
import { AsYouType } from 'libphonenumber-js';

function App() {

  //State for handling the input fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //BirthDate State
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Error Messages
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [contactError, setContactError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);

  //Toast Messages
  const [toast, setToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  //star State
  const [showNameStar, setNameShowStar] = useState(false);
  const [showPassStar, setPassShowStar] = useState(false);
  const [showConfirmStar, setConfirmShowStar] = useState(false);
  const [showEmailStar, setEmailShowStar] = useState(false);
  const [showContactStar, setContactShowStar] = useState(false);

  //Password Error messages State:
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(false)

  //Handling Functions for the input fields
  const handleFullName = (e) => {
    const fullNameValue = e.target.value;
    const alphabeticRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

    if (!alphabeticRegex.test(fullNameValue)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    setFullName(fullNameValue);
    if (fullNameValue === "") {
      setNameError(false);
      setNameShowStar(false);
    } else {
      setNameShowStar(true);
    }
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailValue.length === 0) {
      setEmailError(false)
    } else {
      if (!emailRegex.test(emailValue)) {
        setEmailError(true);
      }
      else {
        setEmailError(false);
      }
    }
    setEmail(emailValue)
    if (emailValue.length > 0) {
      setEmailShowStar(true);
    } else {
      setEmailShowStar(false);
    }

  };
  const handlePassword = (e) => {
    const pass = e.target.value;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check for special characters
    let specialCharRegex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g
    const hasSpecialChar = specialCharRegex.test(pass);

    // Check for uppercase letters
    const upperCaseRegex = /[A-Z]/;
    const hasUpperCase = upperCaseRegex.test(pass);

    // Check for lowercase letters
    const lowerCaseRegex = /[a-z]/;
    const hasLowerCase = lowerCaseRegex.test(pass);

    // Check for numbers
    const numberRegex = /\d/;
    const hasNumber = numberRegex.test(pass);

    const hasValidLength = pass.length >= 8;

    // Update state variables based on conditions
    setUpperCase(!hasUpperCase);
    setLowerCase(!hasLowerCase);
    setNumber(!hasNumber);
    setSymbols(!hasSpecialChar);
    setLength(!hasValidLength);

    // Check if the password is empty
    if (pass.length === 0) {
      setPassError(false);
    } else {
      if (!passRegex.test(pass)) {
        setPassError(true);
      } else {
        setPassError(false);
      }
    }
    setPassword(pass);

    if (pass.length > 0) {
      setPassShowStar(true);
    } else {
      setPassShowStar(false);
    }
  };

  const handleContactNumber = (e) => {
    const number = e.target.value;
    const numberRegex = /^(\+?1 ?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // const formattedNumber = number.replace(numberRegex, "($2) $3-$4");
    // console.log(new AsYouType.input(e.target.value)
    // )
    // let formatt = new AsYouType().input(number)
    // Outputs: '+1 213 373 4'

    let formatNumber = new AsYouType('US').input(number)
    if (number.length === 0) {
      setContactError(false);
    } else {
      if (!numberRegex.test(number)) {
        setContactError(true);
      } else {
        setContactError(false);
      }
    }

    setContactNumber(formatNumber);
    if (number.length > 0) {
      setContactShowStar(true);
    } else {
      setContactShowStar(false);
    }
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value !== password) {
      setConfirmPasswordError(true);
    }
    else {
      setConfirmPasswordError(false);
    }
    setConfirmPassword(e.target.value)
    if (e.target.value.length > 0) {
      setConfirmShowStar(true);

    }
    else {
      setConfirmShowStar(false);
    }
  }

  const populateDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(<option key={i} value={i}>{i}</option>);
    }
    return days;
  };

  const populateMonths = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.map((month, index) => (
      <option key={index + 1}>{month}</option>
    ));
  };

  const populateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(<option key={i}>{i}</option>);
    }
    return years;
  };
  const handleDayChange = (e) => {
    setDay(e.target.value);
    if (e.target.value === 'Day') {
      setDayError(true);
      setErrorToast(true)
    }
    else {
      setDayError(false);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    if (e.target.value === 'Month') {
      setMonthError(true);
      setErrorToast(true)
    }
    else {
      setMonthError(false);
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    if (e.target.value === 'Year') {
      setYearError(true);
      setErrorToast(true)
    }
    else {
      setYearError(false);
    }
  };

  //Submit Handler for the form
  const submitHandler = () => {
    let hasEmptyField = false;

    if (fullName === '') {
      setNameError(true);
      hasEmptyField = true;
    }
    if (password === '') {
      setPassError(true);
      hasEmptyField = true;
    }
    if (contactNumber === '') {
      setContactError(true);
      hasEmptyField = true;
    }
    if (confirmPassword === '') {
      setConfirmPasswordError(true);
      hasEmptyField = true;
    }
    if (email === '') {
      setEmailError(true);
      hasEmptyField = true;
    }
    if (day === '') {
      setDayError(true);
      hasEmptyField = true;
    }
    if (month === '') {
      setMonthError(true);
      hasEmptyField = true;
    }
    if (year === '') {
      setYearError(true);
      hasEmptyField = true;
    }

    if (hasEmptyField) {
      setErrorToast(true);
      return;
    }

    // If no empty fields, proceed with other validations
    if (!nameError && !emailError && !contactError && !passError && !confirmPasswordError && !dayError && !monthError && !yearError) {
      setToast(true);
      setErrorToast(false);
    } else {
      setErrorToast(true);
      setToast(false);
    }
  }

  //Cancel Handler for the form
  const cancelHandler = () => {
    setFullName('');
    setEmail('');
    setContactNumber('');
    setPassword('');
    setConfirmPassword('');
    setDay('');
    setMonth('');
    setYear('');
    setNameError(false);
    setEmailError(false);
    setContactError(false);
    setPassError(false);
    setConfirmPasswordError(false);
    setToast(false);
    setErrorToast(false);
    setNameShowStar(false);
    setEmailShowStar(false);
    setContactShowStar(false);
    setPassShowStar(false);
    setConfirmShowStar(false);
    setDayError(false);
    setMonthError(false);
    setYearError(false);
    setUpperCase(false);
  }

  return (
    <div className="App">
      <Header />
      <div className='main-container'>
        <h1 className='title'>Create User Account</h1>
        {
          toast ? <Toast /> : ''
        }
        {
          errorToast ? <ErrorToast /> : ""
        }
        <form noValidate className='form-container' onSubmit={(e) => e.preventDefault()} >
          <div className="input-container">
            <label htmlFor="fullName">Full Name
              {
                showNameStar ? "" : <span className="nameStar">*</span>
              }
              <input formNoValidate
                type="text"
                name='fullName'
                placeholder={`Full Name`}
                value={fullName}
                onChange={handleFullName}
                className={nameError ? 'error-border' : 'input-field'}
                required="required"
              />
            </label><br />
            {
              nameError ?
                <p className="error-message">Enter Your Full Name without Extra spaces
                </p> :
                ""
            }
          </div>

          <div className="input-container">
            <label htmlFor="contactNumber">Contact Number
              {
                showContactStar ? "" : <span className="contactStar">*</span>
              }
              <input formNoValidate
                type="tel"
                pattern='\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}'
                name='contactNumber'
                placeholder='Contact Number'
                value={contactNumber}
                onChange={handleContactNumber}
                className={contactError ? 'error-border' : 'input-field'} />
            </label> <br />
            {
              contactError ?
                <p className="error-message">Enter Your Contact Number in canadian format
                </p> :
                ""
            }
          </div>
          <div className="input-container">
            <label htmlFor="">BirthDate
            </label> <br />
            <div className='date-container' >
              <div className='
            date-error'>
                <select className={dayError ? 'date-border' : 'date'} value={day} onChange={handleDayChange}>
                  <option>Day
                  </option>
                  {populateDays()}
                </select>
                <div>
                  {
                    dayError ?
                      <p className="error-message">Please Choose a Day
                      </p> :
                      ""
                  }
                </div>
              </div>

              <div className="date-error">
                <select className={monthError ? 'date-border' : 'date'} value={month} onChange={handleMonthChange}>
                  <option >Month</option>
                  {populateMonths()}
                </select>
                <div>
                  {
                    monthError ?
                      <p className="error-message">Please Choose a Month
                      </p> :
                      ""
                  }
                </div>
              </div>

              <div className="date-error">
                <select className={yearError ? 'date-border' : 'date'} value={year} onChange={handleYearChange}>
                  <option>Year</option>
                  {populateYears()}
                </select>
                <div>
                  {
                    yearError ?
                      <p className="error-message">Please Choose a Year
                      </p> :
                      ""
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="email">Email
              {showEmailStar ? "" : <span className="emailStar">*</span>}
              <input formNoValidate
                type="email"
                name="email"
                placeholder='Email'
                value={email}
                onChange={handleEmail}
                className={emailError ? 'error-border' : 'input-field'} />
            </label> <br />

            {
              emailError &&
              <p className="error-message">Enter a proper email address
              </p>
            }
          </div>
          <div className="input-container">
            <label htmlFor="">Password
              {showPassStar ? "" : <span className="passStar">*</span>}
              <input
                formNoValidate
                type="password"
                name="password"
                placeholder='Password'
                value={password}
                onChange={handlePassword}
                className={passError ? 'error-border' : 'input-field'}
              />
            </label> <br />

            <div>
              {passError &&
                <p className="error-message">
                  <span className='pass-error'>
                    Password is required
                  </span>
                  <span className='pass-error'>
                    {length && "Length of Password must be 8 or more than 8 "}
                  </span>
                  <span className='pass-error'>
                    {!length && upperCase && "Password must contain at least one uppercase letter. "
                    }
                  </span>
                  <span className='pass-error'>
                    {!length && !upperCase && symbols && "Password must contain at least one special character. "}
                  </span>
                  <span className='pass-error'>
                    {!length && !upperCase && !symbols && lowerCase && "Password must contain at least one lowercase letter. "}
                  </span>
                  <span className='pass-error'>
                    {!length && !upperCase && !symbols && !lowerCase && number && "Password must contain at least one number. "}
                  </span>
                </p>
              }
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password
              {showConfirmStar ? "" : <span className="confirmStar">*</span>}
              <input formNoValidate
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className={confirmPasswordError ? 'error-border' : 'input-field'} />
            </label>
            <br />
            {
              confirmPasswordError ?
                <p className="error-message">Password Doesn't match
                </p> :
                ""
            }
          </div>
        </form>
        <div className='form-button'>
          <button onClick={cancelHandler} className='cancel-btn'>Cancel</button>
          <button onClick={submitHandler} className='submit-btn'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;

