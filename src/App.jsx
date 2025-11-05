import { useState, useEffect } from 'react'
import './App.css'
import DisplayName from './DisplayName.jsx'
import Saved from './Saved.jsx'

function App() {
  const [partiel, setPartiel] = useState('')
  const [TC, setTC] = useState('')
  const [TP, setTP] = useState('')
  const [passingGrade, setPassingGrade] = useState(10)
  const [partielPourcentage, setPartielPourcentage] = useState(35)
  const [TCPourcentage, setTCPourcentage] = useState(20)
  const [TPPourcentage, setTPPourcentage] = useState(0)
  const [sum, setSum] = useState('')
  const [savedButton,setSavedButton] = useState(false)
  const [value,setValue] = useState('')
  const [savedData, setSavedData] = useState(JSON.parse(localStorage.getItem('savedData')) || [])
  const [width, setWidth] = useState(window.innerWidth)
  const [isNotEnough, setIsNotEnough] = useState(false)
  useEffect(() => {
    document.title = 'ESIB Calculator'
  },[])

  

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width <= 1130 || isLocalStorageEmpty()) {
      setIsNotEnough(true);
    } else {
      setIsNotEnough(false);
    }
  }, [width, savedData]);
  
  const deleteItem = (id) => {
    setSavedData(savedData.filter(item => item.id !== id))
    localStorage.setItem('savedData',JSON.stringify(savedData))
    window.location.reload()
  }
  const viewItem = (id) => {
    let matchingItem = ''
    savedData.forEach(item => {
      if (item.id === id){
        matchingItem = item
      }
    })
    return matchingItem
  }
  useEffect(() => {
    localStorage.setItem('savedData',JSON.stringify(savedData))
  }, [savedData]);
  
  const pushData = (value) => {
    setSavedData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        savedSubject: value,
        savedNeeded: sum,
        partiel,
        TC,
        TP,
        partielPourcentage,
        TCPourcentage,
        TPPourcentage,
      },
    ]);
    console.log('added to saved list');
  };

  const resetBlueprint = () => {
    setPartiel('')
    setTC('')
    setTP('')
    setPartielPourcentage(35)
    setTCPourcentage(20)
    setTPPourcentage('')
    setValue('')
    setSum('')
  }

  function calculateFinalNeeded(
  partiel, TC, TP,
  partielPourcentage, TCPourcentage, TPPourcentage,
  passingGrade,
) {
  const wP = (partielPourcentage || 0) / 100
  const wTC = (TCPourcentage || 0) / 100
  const wTP = (TPPourcentage || 0) / 100
  const used = wP + wTC + wTP
  if (used >= 1){
    setPartielPourcentage(0)
    setTCPourcentage(0)
    setTPPourcentage(0)
    return { error: 'Total weight must be < 100%' }
  } 

  const current =
    (Number(partiel) * wP) +
    (Number(TC) * wTC) +
    (Number(TP) * wTP)

  const remainingW = 1 - used
  const needed = (passingGrade - current) / remainingW
  return { needed: Number.isFinite(needed) ? Number(needed.toFixed(2)) : null }
}

  const isLocalStorageEmpty = () => {
    return localStorage.getItem('savedData') === '[]' ? true : false
  }
  
  return(<>
    <div className='header'>
      <div className='header-middle'>
        Partiel: {partielPourcentage}%, TC: {TCPourcentage}%, TP: {TPPourcentage}%  
      </div> 
      <div className='header-right'>
        {isNotEnough && 
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg>
        }
      </div>
    </div>
    {width > 1130 && !isLocalStorageEmpty() && (
      <Saved savedData={savedData} deleteItem={deleteItem} viewItem={viewItem} />
    )}

    <div className='calculator'>
      <p className='calculator-title'>Final Calculator</p>
      <div className='calculator-inputs'>
        <div className='calculator-input-component'>
          <input type="text" className='calculator-input' placeholder='Partiel / 20' 
            value={partiel} onChange={(e) => {
              let num = e.target.value
              if (num <= 20 && num >= 0){
                setPartiel(Number(num))
              }
            }}/>
          <input className='calculator-input-percentage' type="number" 
            value={partielPourcentage} onChange={(e) => {
              let percentage = e.target.value
              if (percentage <= 100 && percentage >=0){
                setPartielPourcentage(Number(percentage))

                console.log(partielPourcentage);
              }
            }} placeholder='35%' />
        </div>
        <div className='calculator-input-component'>
          <input type="text" className='calculator-input' placeholder='TC / 20' 
            value={TC} onChange={(e) => {
              let num = e.target.value
              if (num <= 20 && num >= 0){
                setTC(Number(num))
              }
            }}/>
          <input className='calculator-input-percentage' type="number" 
            value={TCPourcentage} onChange={(e) => {
              let percentage = e.target.value
              if (percentage <= 100 && percentage >=0){
                setTCPourcentage(Number(percentage))
                checkSumPercentage()
              }
            }} placeholder='20%' />
        </div>
        <div className='calculator-input-component'>
          <input type="text" className='calculator-input' placeholder='TP / 20' 
            value={TP} onChange={(e) => {
              let num = e.target.value
              if (num <= 20 && num >= 0){
                setTP(Number(num))
              }
            }}/>
            
          <input className='calculator-input-percentage' type="number" 
            value={TPPourcentage} onChange={(e) => {
              let percentage = e.target.value
              if (percentage <= 100 && percentage >=0){
                setTPPourcentage(Number(percentage))
                checkSumPercentage()
              }
            }} placeholder='0%' />
        </div>
        
      </div>
      <p className='calculator-answer'>{sum}</p>
      <div className='buttons-div'>
        <button
  className='calculator-button'
  onClick={() => {
    const { needed, error } = calculateFinalNeeded(
      partiel,
      TC,
      TP,
      partielPourcentage,
      TCPourcentage,
      TPPourcentage,
      passingGrade
    );
    if (error) {
      setSum(error);
    } else {
      setSum(needed);
    }
  }}
>
  Calculate
</button>

        <button className='save-button' onClick={() => {setSavedButton(true);calculateFinalNeeded(
          partiel, TC, TP,
          partielPourcentage, TCPourcentage, TPPourcentage,
          passing = passingGrade,
        )}}>Save</button>
      </div>
      <div className='display-positioning'>
        {savedButton && (<DisplayName setSavedButton={setSavedButton} value={value} setValue={setValue} onConfirm={() => {pushData(value)}} resetBlueprint={resetBlueprint} reloadPage={() => {window.location.reload()}} />)}
      </div>
    </div>
  </>
)}

export default App
