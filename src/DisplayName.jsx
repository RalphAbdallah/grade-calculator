import './DisplayName.css'
const DisplayName = ({setSavedButton, value, setValue, onConfirm, resetBlueprint, reloadPage}) => {
  return (<>
    <div className='popup'>
      <div onClick={() => setSavedButton(false)} className='popup-exit'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
      </div>
      <div>
        Course Name
      </div>
      <div>
        <input type="text" value={value} placeholder='Put course name here' onChange={(e) => {setValue(e.target.value);{console.log(e);}}} />
      </div>
      <button onClick={() => {
        if (value.trim() === '') {
          alert('Please enter a valid course name.');
          return;
        }
        else {
          setSavedButton(false); 
          onConfirm(); 
          resetBlueprint(); 
        }
      }}>Confirm</button>
    </div>
    <div className='background-darker'></div>
  </>)
}

export default DisplayName