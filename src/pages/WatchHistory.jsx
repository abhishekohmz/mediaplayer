import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteVideoHistory, getAllHisory } from '../services/allAPI'
import { Button, Container } from 'react-bootstrap'
import './WatchHistory.css'

function WatchHistory() {
  //  set state using useState to hold data for history
  const [history, setHistory] = useState([])
  // create async function to load history from json server
  const handleHistory = async () => {
    // make api call
    const { data } = await getAllHisory()
    // set the data to history
    setHistory(data)
  }
  // console.log("history",history)
  // useEffect to load side effect "handleHistory" so that the data will load immediately when the watchHistory page is opened

  const handleDeleteHistory = async (id) => {
    await deleteVideoHistory(id)
    handleHistory()
  }


  useEffect(() => {
    handleHistory()
  }, [])

  return (
    <>
      <div className="watchhistory">
        <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
          <h3>Watch History</h3>
          <Link to={'/home'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-arrow-left"></i> Return Home</Link>
        </div>

        <Container>
          <table className='table'>
            <thead>
              <tr >
                <th>#</th>
                <th>Caption</th>
                <th>Url</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? history?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.caption}</td>
                  <td>{item?.embedLink}</td>
                  <td>{item?.timeStamp}</td>
                  <td><Button variant="outline-danger" onClick={() => handleDeleteHistory(item?.id)}><i className="fa-solid fa-trash "></i> </Button></td>
                </tr>
              )) :
                <p>No History To Display</p>
              }
            </tbody>
          </table>
        </Container>

      </div>
    </>
  )
}

export default WatchHistory