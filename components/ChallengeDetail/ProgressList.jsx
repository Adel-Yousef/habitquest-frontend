import React from 'react'

function ProgressList({progress}) {

    const statusNames = {
        'D': 'Done',
        'P': 'Partial',
        'S': 'Skipped'
    }

  return (
    <div>
        <h3>Your Progress:</h3>
        {
            progress && progress.length > 0
            ?
            progress.map(prog => {
                return(
                    <p key={prog.id}> {prog.date} - {statusNames[prog.status]} </p>
                )
            })
            :
            <p>No Progress logged yet</p>
        }
    </div>
  )
}

export default ProgressList