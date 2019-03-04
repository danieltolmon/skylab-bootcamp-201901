import React from 'react'
import './index.sass'

function Feedback ({message, level}) {
    return <section className={`feedback feedback--${level?` feedback--${level} d-flex flex-row align-items-center`:''}`}>
        {level === 'warn'? <i class="fas fa-exclamation-triangle p-2"></i> : <i></i>}
            <p className='text-center p-2'>{message}</p>
    </section>
}

export default Feedback