import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const CreatePage = () => {
  const history = useNavigate()
  const [link, setLink] = useState('')
  const [code, setCode] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const user = sessionStorage.getItem('userId')
    console.log("userID: "+user)
    setUserId(user)
  }, [userId, setUserId])

  const pressHandler = async event => {
      event.preventDefault()
      console.log(userId)
      try {
        const {data} = await axios.post(
          'http://localhost:4000/api/link/generate', 
          {
            from: link,
            code,
            userId
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        console.log(data.link)
        if (data.message){
          alert(data.message)
        }else{
          history(`/detail/${data.link._id}`)
        }
      } catch (e) {
        console.error(e)
      }
    
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
        <div className="input-field">
          <input
            placeholder="Введите желаемое сокращение"
            id="code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            
          />
          <label htmlFor="link">Введите сокращение</label>
        </div>
        <div>
          <button type="submit" onClick={pressHandler}>Создать</button>
        </div>
      </div>
    </div>
  )
}