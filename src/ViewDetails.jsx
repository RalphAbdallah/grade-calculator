import React from 'react'
import './index.css'
import './ViewDetails.css'
import capitalizeWord from './utils/capitalize.js';
const ViewDetails = ({itemData, setViewOppened}) => {
  console.log(itemData);
  return (
    <>
    <div className='view-component'>
      <p className='view-title'><span className='view-title-subject'>Subject Title: </span> {capitalizeWord(itemData.savedSubject)}</p>
      <div className='view-exams'>
        <p className='view-exam'>Partiel: <span className='grade-exam'>{itemData.partiel}</span><span className='over20'>/20</span> {itemData.partielPourcentage}<span className='percentage'>%</span></p>
        <p className='view-exam'>TC: <span className='grade-exam'>{itemData.TC}</span><span className='over20'>/20</span> {itemData.TCPourcentage}<span className='percentage'>%</span></p>
        <p className='view-exam'>TP: <span className='grade-exam'>{itemData.TP}</span><span className='over20'>/20</span> {itemData.TPPourcentage}<span className='percentage'>%</span></p>
      </div>
      <div className='view-grade-needed'>
        {itemData.savedNeeded}
      </div>
      <div className='view-component-button'>
        <button onClick={() => setViewOppened(false)}>Go back</button>
      </div>
    </div>
    <div className='background-darker'></div>
    </>
    
  )
}

export default ViewDetails