import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {LinkCard} from '../components/LinkCard'
import axios from 'axios'

export const DetailPage = () => {
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      console.log(linkId)
      const {data} = await axios.get(
          `http://localhost:4000/api/link/${linkId}`
      )
      
      console.log('Fetched: '+ data)
      
      setLink(data)
    } catch (e) {}
  }, [linkId])

  useEffect(() => {
    getLink()
  }, [getLink])


  return (
    <>
      { link && <LinkCard link={link} /> }
    </>
  )
}