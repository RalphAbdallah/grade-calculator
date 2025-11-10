import { useState } from 'react'
import './saved.css'
import ViewDetails from './ViewDetails'
import capitalizeWord from './utils/capitalize.js'

const Saved = ({ savedData, deleteItem, viewItem }) => {
  const [selectedData, setSelectedData] = useState('')
  const [viewOppened, setViewOppened] = useState(false)

  const handleViewDetails = (data) => {
    setSelectedData(data)
    setViewOppened(true)
  }

  return (
    <>
      <div className="saved-component">
        <p className="saved-title">Saved Grades</p>
        {(selectedData && viewOppened) && (
          <ViewDetails itemData={selectedData} setViewOppened={setViewOppened} />
        )}
        <div className="saved-list">
          {savedData.map(subject => (
            <div key={subject.id} className="saved-object">
              <div className="saved-object-left">
                <span className="saved-object-left-title">
                  {capitalizeWord(subject.savedSubject)}:
                </span>
                <span className="saved-needed">{subject.savedNeeded}</span>
              </div>
              <div className="saved-object-right">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="View details"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleViewDetails(viewItem(subject.id))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className="icon-button"
                  aria-label="Delete saved item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => deleteItem(subject.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/>
                    <path d="m5.082 11.09 8.828 8.828"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {savedData.length === 0 && (
            <div className="saved-empty">No saved items yet.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Saved
