import React, {useCallback, useEffect, useState} from 'react'
import {LinksList} from '../components/LinksList'
import axios from 'axios'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const user = sessionStorage.getItem('userId')
    console.log("userID: "+user)
    setUserId(user)
  }, [userId])
  
  const fetchLinks = useCallback(async () => {
    try {
      const {data} = await axios.get(
          `http://localhost:4000/api/link/links/${userId}`
      )

      console.log(data)
      setLinks(data)
    } catch (e) {}
  }, [userId])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  

  return (
    <>
      {<LinksList links={links} />}
    </>
  )
}