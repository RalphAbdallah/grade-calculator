import { useState, useEffect } from 'react'
import './App.css'
import DisplayName from './DisplayName.jsx'
import Saved from './Saved.jsx'

const SAVED_BREAKPOINT = 1130

function App() {
  const [partiel, setPartiel] = useState('')
  const [TC, setTC] = useState('')
  const [TP, setTP] = useState('')
  const [passingGrade, setPassingGrade] = useState(10)
  const [partielPourcentage, setPartielPourcentage] = useState(35)
  const [TCPourcentage, setTCPourcentage] = useState(20)
  const [TPPourcentage, setTPPourcentage] = useState(0)
  const [sum, setSum] = useState('')
  const [savedButton, setSavedButton] = useState(false)
  const [value, setValue] = useState('')
  const [savedData, setSavedData] = useState(JSON.parse(localStorage.getItem('savedData')) || [])
  const [width, setWidth] = useState(window.innerWidth)
  const [isSavedOpen, setIsSavedOpen] = useState(window.innerWidth >= SAVED_BREAKPOINT)

  const [viewOppened, setViewOppened] = useState(false)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width >= SAVED_BREAKPOINT) setIsSavedOpen(true)
    else setIsSavedOpen(false)
  }, [width])

  useEffect(() => {
    localStorage.setItem('savedData', JSON.stringify(savedData))
  }, [savedData])

  useEffect(() => {
    if (width < SAVED_BREAKPOINT) {
      document.body.style.overflow = isSavedOpen ? 'hidden' : ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isSavedOpen, width])

  const deleteItem = (id) => {
    const next = savedData.filter(item => item.id !== id)
    setSavedData(next)
  }

  const viewItem = (id) => savedData.find(item => item.id === id) || null

  const pushData = (subjectValue) => {
    setSavedData(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        savedSubject: subjectValue,
        savedNeeded: sum,
        partiel,
        TC,
        TP,
        partielPourcentage,
        TCPourcentage,
        TPPourcentage,
      },
    ])
  }

  const resetBlueprint = () => {
    setPartiel('')
    setTC('')
    setTP('')
    setPartielPourcentage(35)
    setTCPourcentage(20)
    setTPPourcentage(0)
    setValue('')
    setSum('')
    setPassingGrade(10)
  }

  function calculateFinalNeeded(
    partiel, TC, TP,
    partielPourcentage, TCPourcentage, TPPourcentage,
    passingGrade
  ) {
    const wP  = (Number(partielPourcentage) || 0) / 100
    const wTC = (Number(TCPourcentage) || 0) / 100
    const wTP = (Number(TPPourcentage) || 0) / 100
    const used = wP + wTC + wTP
    if (used >= 1) return { error: 'Total weight must be < 100%' }
    const current =
      (Number(partiel) || 0) * wP +
      (Number(TC) || 0) * wTC +
      (Number(TP) || 0) * wTP
    const pg = Number(passingGrade) || 10
    const remainingW = 1 - used
    const needed = (pg - current) / remainingW
    return { needed: Number.isFinite(needed) ? Number(needed.toFixed(2)) : null }
  }

  const isLarge = width >= SAVED_BREAKPOINT

  return (
    <>
      <div className="header">
        <div className="header-middle">
          Partiel: {partielPourcentage}%, TC: {TCPourcentage}%, TP: {TPPourcentage}%
        </div>

        {!isLarge && (
          <button
            type="button"
            className="header-right"
            aria-label="Toggle saved grades"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsSavedOpen(prev => !prev)}
          >
            <img src="Frame.svg" alt="" />
            

          </button>
        )}
      </div>

      {isLarge && (
        <Saved
          savedData={savedData}
          deleteItem={deleteItem}
          viewItem={viewItem}
          viewOppened={viewOppened}
          setViewOppened={setViewOppened}
        />
      )}

      {!isLarge && isSavedOpen && (
        <div className="saved-overlay"  onClick={() => setIsSavedOpen(false)} aria-hidden="true">
          <div className="saved-overlay-inner" onClick={(e) => e.stopPropagation()}>
            <Saved
              savedData={savedData}
              deleteItem={deleteItem}
              viewItem={viewItem}
              viewOppened={viewOppened}
              setViewOppened={setViewOppened}
            />
          </div>
        </div>
      )}

      <div className="calculator">
        <p className="calculator-title">Final Calculator</p>

        <div className="calculator-inputs">
          <div className="calculator-input-component">
            <input
              type="number"
              className="calculator-input"
              placeholder="Partiel / 20"
              value={partiel}
              onChange={(e) => {
                const num = e.target.value
                if (num === '' || (+num <= 20 && +num >= 0)) setPartiel(num)
              }}
            />
            <input
              className="calculator-input-percentage"
              type="number"
              placeholder="35%"
              value={partielPourcentage === 35 ? '' : partielPourcentage}
              onChange={(e) => {
                const v = e.target.value
                if (v === '') setPartielPourcentage(35)
                else if (+v >= 0 && +v <= 100) setPartielPourcentage(+v)
              }}
            />
          </div>

          <div className="calculator-input-component">
            <input
              type="number"
              className="calculator-input"
              placeholder="TC / 20"
              value={TC}
              onChange={(e) => {
                const num = e.target.value
                if (num === '' || (+num <= 20 && +num >= 0)) setTC(num)
              }}
            />
            <input
              className="calculator-input-percentage"
              type="number"
              placeholder="20%"
              value={TCPourcentage === 20 ? '' : TCPourcentage}
              onChange={(e) => {
                const v = e.target.value
                if (v === '') setTCPourcentage(20)
                else if (+v >= 0 && +v <= 100) setTCPourcentage(+v)
              }}
            />
          </div>

          <div className="calculator-input-component">
            <input
              type="number"
              className="calculator-input"
              placeholder="TP / 20"
              value={TP}
              onChange={(e) => {
                const num = e.target.value
                if (num === '' || (+num <= 20 && +num >= 0)) setTP(num)
              }}
            />
            <input
              className="calculator-input-percentage"
              type="number"
              placeholder="0%"
              value={TPPourcentage === 0 ? '' : TPPourcentage}
              onChange={(e) => {
                const v = e.target.value
                if (v === '') setTPPourcentage(0)
                else if (+v >= 0 && +v <= 100) setTPPourcentage(+v)
              }}
            />
          </div>

          <input
            type="number"
            className="calculator-input input-desired"
            placeholder="Passing Grade (10)"
            value={passingGrade === 10 ? '' : passingGrade}
            onChange={(e) => {
              const v = e.target.value
              if (v === '') setPassingGrade(10)
              else if (+v >= 0 && +v <= 20) setPassingGrade(+v)
            }}
          />
        </div>

        <p className="calculator-answer">{sum}</p>

        <div className="buttons-div">
          <button
            className="calculator-button"
            onClick={() => {
              const { needed, error } = calculateFinalNeeded(
                partiel, TC, TP,
                partielPourcentage, TCPourcentage, TPPourcentage,
                passingGrade
              )
              if (error) setSum(error)
              else setSum(needed)
            }}
          >
            Calculate
          </button>

          <button
            className="save-button"
            onClick={() => {
              setSavedButton(true)
              setSum(calculateFinalNeeded(
                partiel, TC, TP,
                partielPourcentage, TCPourcentage, TPPourcentage,
                passingGrade
              ).needed)
            }}
          >
            Save
          </button>
        </div>

        <div className="display-positioning">
          {savedButton && (
            <DisplayName
              setSavedButton={setSavedButton}
              value={value}
              setValue={setValue}
              onConfirm={() => { pushData(value) }}
              resetBlueprint={resetBlueprint}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
