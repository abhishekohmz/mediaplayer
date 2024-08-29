import React, { useState } from 'react'
import './Videocard.css'
import { Button, Card, Modal } from 'react-bootstrap'
import { addToHistory, deleteVideo } from '../services/allAPI';

function VideoCard({ displayData, setDelVideo, insideCategory }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const handleShow = async () => {
    setShow(true);
    //make api call http://localhost:4000/history
    const { caption, embedLink } = displayData;
    let today = new Date()
    let timeStamp = (new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today))
    console.log(timeStamp);
    let videoDetails = { caption, embedLink, timeStamp }
    await addToHistory(videoDetails)
  }

  // Delete video
  const removeVideo = async (id) => {
    // Api call
    // const response =
    await deleteVideo(id)
    setDelVideo(displayData.id)
  }

  // drag video
  const dragStarted = (e, id) => {
    e.dataTransfer.setData("videoId", id)
    console.log("drag started video ID:", +id);
  }


  return (
    <>
      <div className='videocard' >
        <Card className='border-box' draggable onDragStart={(e) => dragStarted(e, displayData?.id)}>
          <Card.Img className='img img-fluid' onClick={handleShow} variant="top" src={displayData?.url} />
          <Card.Body >
            <Card.Title >{displayData?.caption}
              {insideCategory ? "" : <Button variant="outline-danger" onClick={() => removeVideo(displayData?.id)} ><i className="fa-solid fa-trash "></i> </Button>}
            </Card.Title>
          </Card.Body>
        </Card>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="526" src={`${displayData?.embedLink}?autoplay=1`} title={`${displayData?.caption}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default VideoCard