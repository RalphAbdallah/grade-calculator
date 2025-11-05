
import { useState } from 'react'
import './saved.css'
import ViewDetails from './ViewDetails'
import capitalizeWord from './utils/capitalize.js'

const Saved = ({savedData, deleteItem, viewItem}) => {
  const [selectedData, setSelectedData] = useState('')
  const [viewOppened, setViewOppened] = useState(false)
  const handleViewDetails = (data) => {
    setSelectedData(data)
    setViewOppened(true)
  } 
  return (
    <> 
      <div className='saved-component'>
        <p className='saved-title'>Saved Two</p>
        {(selectedData && viewOppened) && <ViewDetails itemData={selectedData} setViewOppened={setViewOppened}/>}
        <div>
          {savedData.map(subject => (
            <div key={subject.id} className='saved-object'>
              <div className='saved-object-left'>
                <span className='saved-object-left-title'>{capitalizeWord(subject.savedSubject)} : </span><a style={{padding:0}}>{subject.savedNeeded}</a> 
              </div>
              <div className='saved-object-right'>
                <div className='svg-icon'>
                  <svg onClick={() => {handleViewDetails(viewItem(subject.id))}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div className='svg-icon'>
                  <svg onClick={() => {deleteItem(subject.id)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"className="lucide lucide-eraser-icon lucide-eraser"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Saved
