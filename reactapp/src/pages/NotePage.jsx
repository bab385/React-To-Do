import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
//import CSRFToken from '../components/CsrfToken';


const NotePage = () => {

    let {id} = useParams()
    const navigate = useNavigate()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id]) //need to add the , [id] or it will go into an infinite loop

    let getNote = async () => {
        if (id === 'new') return

        let response = await fetch(`/api/notes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        console.log(response)
        let data = await response.json()
        setNote(data)
        //console.log(data)
    }
    
    let updateNote = async () => {
      fetch(`/api/notes/${id}/`, {
        credentials: 'include',
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
    }

    let createNote = async () => {
      fetch(`/api/notes/`, {
        credentials: 'include',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
    }

    let deleteNote = async () => {
      fetch(`/api/notes/${id}/`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      navigate('/')
    }

    let handleSubmit = () => {
      console.log('NOTE:', note)
      if(id !== 'new' && note.body === ''){
        console.log('here')
        deleteNote()
      } else if(id !== 'new') {
        console.log('there')
        updateNote()
      } else if(id === 'new' && note.body !== null) {
        console.log('last one')
        createNote()
      }
      navigate('/')
    }

    let handleChange = (value) => {
      setNote(note => ({ ...note, 'body': value}))
      //console.log('Handle Change', note)
    }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit}/>
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
