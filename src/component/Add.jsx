import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { uploadVideo } from '../services/allAPI';
import './Add.css'


function Add({setUploadVideoServerResponse}) {

  const [video,setVideo]=useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""    
  })
  console.log(video);

  const handleUpload =async()=>{
    const {id,caption,url,embedLink}=video;
    
    if(!id||!caption||!url||!embedLink){
      alert("Incomplete Data")
    }
    else{
      const response = await uploadVideo(video)
      console.log("response",response);
      if(response.status>=200 && response.status<300){
        setUploadVideoServerResponse(response.data)
        alert(`${response.data.id} Sucessfull Uploaded`)
        handleClose()
      }
      else{
        alert("Please Provide Unique ID")
      }
    }

  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEmbedLink=(e)=>{
    const {value}=e.target
    if(value){
      const link =`https://www.youtube.com/embed/${value.slice(-11)}`
      setVideo({...video,embedLink:link})
    }
    else{
      setVideo({...video,embedLink:""})
    }
    
  }

  return (
    <>
    <div className='add d-flex align-items-center'>
      <h4>Upload Videos </h4>
      <Button className='m-2' onClick={handleShow}><i class="fa-solid fa-plus"></i></Button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Enter The Details Below :
          <hr />
          <Form>
            
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
               onChange={(e)=>setVideo({...video,id:e.target.value})}
                type="Text"
                placeholder="Enter Video Id"
                autoFocus
                className='bg-dark text-light border-light'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
              
                type="Text"
                placeholder="Enter Video Caption"
                autoFocus
                className='bg-dark text-light border-light'
                onChange={(e)=>setVideo({...video,caption:e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control 
              type='text' 
              className='bg-dark text-light border-light' 
              onChange={(e)=>setVideo({...video,url:e.target.value})} 
              placeholder='Enter Video Thumbnail'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                onChange={getEmbedLink}
                type="Text"
                placeholder="Enter Video Url"
                autoFocus
                className='bg-dark text-light border-light'
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      {/* <ToastContainer position='top-center' theme='colored' autoClose={2000}/> */}
    </>
  )
}

export default Add

// https://www.youtube.com/watch?v=E6yXA4tmYe0