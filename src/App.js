import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Toast from './components/Toast';
import ErrorToast from './components/ErrorToast';
import { AsYouType } from 'libphonenumber-js';

function App() {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  //State for handling the input fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //BirthDate State
  const [day, setDay] = useState(days);
  const [month, setMonth] = useState(months);
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

    const formattedNumber = number.replace(numberRegex, "($2) $3-$4");
    // console.log(new AsYouType.input(e.target.value)
    // )
    // let formatt = new AsYouType().input(number)
    // Outputs: '+1 213 373 4'

    // let formatNumber = new AsYouType('US').input(number)
    if (number.length === 0) {
      setContactError(false);
    } else {
      if (!numberRegex.test(number)) {
        setContactError(true);
      } else {
        setContactError(false);
      }
    }

    setContactNumber(formattedNumber);
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
    const currentDay = new Date().getDate();
    const filteredDays = days.filter((month, index) => index < currentDay);
    // console.log(filteredDays)
    const d = new Date();
    let name = months[d.getMonth()];

    if (year == new Date().getFullYear() && month == name) {
      // console.log(filteredDays)
      return filteredDays.map((day, index) => (
        <option key={index + 1}>{day}</option>
      )
      )
    }
    else if (month == "February") {
      if (year % 4 == 0) {
        const fil = days.filter((day, index) => index < 29)
        return fil.map((day, index) => (
          <option key={index + 1}>{day}</option>
        )
        )
      }
      else {
        const fil = days.filter((day, index) => index < 28)
        return fil.map((day, index) => (
          <option key={index + 1}>{day}</option>
        )
        )

      }
    }
    else if (month == "April" || month == "June" || month == "September" || month == "November") {
      const fil = days.filter((day, index) => index < 30)
      return fil.map((day, index) => (
        <option key={index + 1}>{day}</option>
      )
      )
    }

    else {
      return days.map((day, index) => (
        <option key={index + 1}>{day}</option>
      )
      )
    }

  }

  const populateMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const filteredMonths = months.filter((month, index) => index <= currentMonth);

    if (year == currentDate.getFullYear()) {
      return filteredMonths.map((month, index) => (
        <option key={index + 1}>{month}</option>
      ));
    }

    else {
      return months.map((month, index) => (
        <option key={index + 1}>{month}</option>
      ));
    }

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
    if (day === days) {
      setDayError(true);
      hasEmptyField = true;
    }
    if (month === months) {
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

    console.log({
      fullName,
      email,
      contactNumber,
      password,
      confirmPassword,
      day,
      month,
      year
    
    })
  }

  //Cancel Handler for the form
  const cancelHandler = () => {
    setFullName('');
    setEmail('');
    setContactNumber('');
    setPassword('');
    setConfirmPassword('');
    setDay(days);
    setMonth(months);
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
    <div className=" ">
      <Header />
      <div className='main-container w-[502px] h-[802px] md:mx-auto flex flex-col sm:w[328px] sm:mx-auto '>
        <h1 className='mt-[40px] ml-5 text-[20px] font-bold text-[#2c3642] leading-[30px] mb-[30px] '>Create User Account</h1>
        {
          toast ? <Toast /> : ''
        }
        {
          errorToast ? <ErrorToast /> : ""
        }
        <form noValidate className=' form-container lg:w-[100%] lg:h-[690px] flex flex-col gap-[10px]  rounded-[8px] relative mx-auto' onSubmit={(e) => e.preventDefault()} >
          <div className="input-container w-[422px] h-[83px] my-[10px] text-[#333333] text-[18px] font-semibold leading-[24px]">
            <label htmlFor="fullName">Full Name 
              {/* {
                showNameStar ? "" : <span className="text-[#da1e28] text-[18px] font-bold leading-[27px] pl-[10px] absolute top-[66px] left-[125px]">*</span>
              } */}
              <input formNoValidate
                type="text"
                name='fullName'
                placeholder={`Full Name`}
                value={fullName}
                onChange={handleFullName}
                className={nameError ? 'error-border w-[422px] h-[50px] border-[1px] border-red-600 rounded-[4px] text-lg pl-[4px]' : 'w-[422px] h-[50px] border-[1px] border-[#a5b6cd] rounded-[4px] text-[18px] pl-[5px]  input-field'}
                required="required"
              />
            </label><br />
            {
              nameError ?
                <p className="error-message text-[#da1e28] font-semibold
                 text-[12px] leading-[12px]">Enter Your Full Name without Extra spaces
                </p> :
                ""
            }
          </div>

          <div className=" input-container w-[422px] h-[83px] my-[10px] mx-[30px] text-[#333333] text-[16px] font-bold leading-[24px] sm:w-[355px] sm:mx-0">
            <label htmlFor="contactNumber">Contact Number
              {/* {
                showContactStar ? "" : <span className="text-[#da1e28] text-[18px] font-bold leading-[27px] pl-[10px] absolute top-[172px] left-[175px]">*</span>
              } */}
              <input formNoValidate
                type="tel"
                maxLength="10"
                name='contactNumber'
                placeholder='Contact Number'
                value={contactNumber}
                onChange={handleContactNumber}
                className={contactError ? 'error-border w-[422px] h-[50px] border-[1px] border-red-600 rounded-[4px] text-lg pl-[4px]' : 'w-[422px] h-[50px] border-[1px] border-[#a5b6cd] rounded-[4px] text-[18px] pl-[10px] sm:w-[328px] input-field'} />
            </label> <br />
            {
              contactError ?
                <p className="error-message text-[#da1e28] font-semibold
                 text-[12px] leading-[12px]">Enter Your Contact Number in canadian format
                </p> :
                ""
            }
          </div>
          <div className="input-container w-[422px] h-[83px] my-[10px] mx-[30px] text-[#333333] text-[16px] font-bold leading-[24px] sm:w-[355px] sm:mx-0">
            <label htmlFor="">BirthDate
            </label> <br />
            <div className=' date-container flex mx-auto' >
              <div className='date-error'>
                <select className={dayError ? 'date-border w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#d20808] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px]' : ' date w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#a5b6cd] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px] sm:w-[80px] sm:text-[15px]'} value={day} onChange={handleDayChange}>
                  <option>Day
                  </option>
                  {populateDays()}
                </select>
                <div>
                  {
                    dayError ?
                      <p className=" error-message text-[#da1e28] font-semibold text-[12px] leading-[12px]">Please Choose a Day
                      </p> :
                      ""
                  }
                </div>
              </div>

              <div className=" date-error">
                <select className={monthError ? ' date-border w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#d20808] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px]' : 'date w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#a5b6cd] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px] sm:w-[80px] sm:text-[15px]'} value={month} onChange={handleMonthChange}>
                  <option >Month </option>
                  {populateMonths()}
                </select>
                <div>
                  {
                    monthError ?
                      <p className="error-message text-[#da1e28] font-semibold
                 text-[12px] leading-[12px]">Please Choose a Month
                      </p> :
                      ""
                  }
                </div>
              </div>

              <div className="date-error">
                <select className={yearError ? ' date-border w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#d20808] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px]' : ' date w-[124px] h-[50px] rounded-[4px] border-[1px] border-[#a5b6cd] m-[10px] text-[#b4b4b4] text-[18px] pl-[10px] pr-[10px] font-semibold leading-[27px] sm:w-[80px] sm:text-[15px]'} value={year} onChange={handleYearChange}>
                  <option>Year</option>
                  {populateYears()}
                </select>
                <div>
                  {
                    yearError ?
                      <p className="error-message text-[#da1e28] font-semibold text-[12px] leading-[12px]">Please Choose a Year
                      </p> :
                      ""
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="input-container w-[422px] h-[83px] my-[10px] mx-[30px] text-[#333333] text-[16px] font-bold leading-[24px] sm:w-[355px] sm:mx-0">
            <label htmlFor="email">Email
              {/* {showEmailStar ? "" : <span className="text-[#da1e28] text-[18px] font-bold leading-[27px] pl-[10px] absolute top-[395px] left-[89px]">*</span>} */}
              <input formNoValidate
                type="email"
                name="email"
                placeholder='Email'
                value={email}
                onChange={handleEmail}
                className={emailError ? 'error-border w-[422px] h-[50px] border-[1px] border-red-600 rounded-[4px] text-lg pl-[4px]' : 'w-[422px] h-[50px] border-[1px] border-[#a5b6cd] rounded-[4px] text-[18px] pl-[10px] sm:w-[328px]   input-field'} />
            </label> <br />

            {
              emailError &&
              <p className="error-message text-[#da1e28] font-semibold
                 text-[12px] leading-[12px]">Enter a proper email address
              </p>
            }
          </div>
          <div className="input-container w-[422px] h-[83px] my-[10px] mx-[30px] text-[#333333] text-[16px] font-bold leading-[24px] sm:w-[355px] sm:mx-0">
            <label htmlFor="">Password
              {/* {showPassStar ? "" : <span className="text-[#da1e28] text-[18px] font-bold leading-[27px] pl-[10px] absolute top-[503px] left-[122px]">*</span>} */}
              <input
                formNoValidate
                type="password"
                name="password"
                placeholder='Password'
                value={password}
                onChange={handlePassword}
                className={passError ? 'error-border w-[422px] h-[50px] border-[1px] border-red-600 rounded-[4px] text-lg pl-[4px]' : 'w-[422px] h-[50px] border-[1px] border-[#a5b6cd] rounded-[4px] text-[18px] pl-[10px] sm:w-[328px]  input-field'}
              />
            </label> <br />

            <div>
              {passError &&
                <p className="error-message text-[#da1e28] font-semibold text-[12px] leading-[12px]">
                  <span className='pass-error block text-[10px]'>
                    Password is required
                  </span>
                  <span className='pass-error block text-[10px]'>
                    {length && "Length of Password must be 8 or more than 8 "}
                  </span>
                  <span className='pass-error block text-[10px]'>
                    {!length && upperCase && "Password must contain at least one uppercase letter. "
                    }
                  </span>
                  <span className='pass-error block text-[10px]'>
                    {!length && !upperCase && symbols && "Password must contain at least one special character. "}
                  </span>
                  <span className='pass-error block text-[10px]'>
                    {!length && !upperCase && !symbols && lowerCase && "Password must contain at least one lowercase letter. "}
                  </span>
                  <span className='pass-error block text-[10px]'>
                    {!length && !upperCase && !symbols && !lowerCase && number && "Password must contain at least one number. "}
                  </span>
                </p>
              }
            </div>
          </div>

          <div className="  input-container w-[422px] h-[83px] my-[10px] mx-[30px] text-[#333333] text-[16px] font-bold leading-[24px] sm:w-[355px] sm:mx-0">
            <label htmlFor="confirmPassword">Confirm Password
              {/* {showConfirmStar ? "" : <span className="text-[#da1e28] text-[18px] font-bold leading-[27px] pl-[10px] absolute top-[615px] left-[190px]">*</span>} */}
              <input formNoValidate
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className={confirmPasswordError ? 'error-border w-[422px] h-[50px] border-[1px] border-red-600 rounded-[4px] text-lg pl-[4px]' : 'w-[422px] h-[50px] border-[1px] border-[#a5b6cd] rounded-[4px] text-[18px] pl-[10px] sm:w-[328px] input-field'} />
            </label>
            <br />
            {
              confirmPasswordError ?
                <p className="error-message text-[#da1e28] font-semibold
                 text-[12px] leading-[12px]">Password Doesn't match
                </p> :
                ""
            }
          </div>
        </form>
        <div className='form-button flex justify-center gap-[10px] my-[30px]'>
          <button onClick={cancelHandler} className='cancel-btn py-[11px] px-[34px] rounded-lg border-[1px] border-[#127c95] text-[#127c95] text-[16px] leading-[20px]font-bold cursor-pointer'>Cancel</button>
          <button onClick={submitHandler} className='submit-btn py-[11px] px-[34px] rounded-lg bg-[#127c95] border-[1px] border-[#127c95] text-white text-[16px] leading-[20px]font-bold cursor-pointer'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;

