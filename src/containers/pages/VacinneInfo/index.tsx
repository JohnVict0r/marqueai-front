import React, { useState, useEffect } from 'react'

import './style.css'
import api from '../../../services/api'

function VacinneForm({ match }: any) {
  const [vaccine, setVaccine] = useState<any>({})

  useEffect(() => {
    api
      .get(`/vaccines/${match.params.id}`)
      .then(response => setVaccine(response.data))
  }, [match.params.id])

  return (
    <div id='page-register-vacinne-form' className='container'>
      <main>
        <div>
          <ul>
            <li>
              <strong>Recomendações:</strong> <p>{vaccine.recomendation}</p>
            </li>
            <br />
            <li>
              <strong>Contraindicações:</strong>
              <p> {vaccine.contraindication}</p>
            </li>
            <br />
            <li>
              <strong>Público Alvo:</strong>
              <p>{vaccine.class}</p>
            </li>
          </ul>
          <p className='fonte-info'>Fonte: Ministério da saúde</p>
        </div>
      </main>
    </div>
  )
}

export default VacinneForm
