import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { addCategory, deleteCategory, getAVideo, getAllCategory, updateCategory } from '../services/allAPI';
import VideoCard from './Videocard';
import './Category.css'

function Catergory() {
  const [category, setCategory] = useState("")
  const [allCategories, setAllCategories] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(category);


  const handleAddCategory = async () => {

    if (category) {
      let body = {
        category, allvideos: []
      }
      // Make Api call
      const response = await addCategory(body)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        handleClose()
        setCategory("")
        getCategories()
      }
      else {
        alert("something Went Wrong")
      }
    }
    else {
      alert("Please Provide Category Name")
    }
  }

  const handleDelete = async (id) => {
    await deleteCategory(id)
    getCategories()
  }

  const videoDrop = async (e, categoryId) => {
    console.log("video dropped to " + categoryId)
    const videoId = e.dataTransfer.getData("videoID")
    console.log("video id card", videoId);
    const { data } = await getAVideo(videoId)
    console.log(data);
    const selectedcategory = allCategories?.find(item => item.id === categoryId)
    selectedcategory.allvideos.push(data)
    console.log(selectedcategory)
    // make API call
    await updateCategory(categoryId, selectedcategory)
    getCategories()
  }

  const dragOver = (e) => {
    console.log("drag over category");
    e.preventDefault()

  }



  const getCategories = async () => {
    const { data } = await getAllCategory()
    console.log(data);
    setAllCategories(data)
  }
  console.log(allCategories);

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className="category">
        <div>
          <Button onClick={handleShow} >
            Add New category
          </Button>
          <br />
        </div>


        <Row>
          <div className='category_items'>
            {
              allCategories?.length > 0 ? allCategories?.map(item => (
                <Col className='category_data' md={6}>
                  <div droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => videoDrop(e, item?.id)} className='ontainer m-2 justify-content-evenly'>

                    <div className='bg-body-tertiary category_heading'>
                      <h6 >{item?.category}</h6>
                      <Button variant="outline-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash "></i></Button>
                    </div>
                    <div>
                      <Row className='flex-wrap'>
                        {
                          item?.allvideos &&
                          item?.allvideos.map(
                            card => (
                              <Col md={6}>
                                <VideoCard displayData={card} insideCategory={true} />
                              </Col>
                            )
                          )
                        }
                      </Row>
                    </div>
                  </div>
                  </Col>
              )) : <p>No Category to Display</p>
            }

          </div>

        </Row>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please Fill Details Below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className='text-white'  >Enter Category Name:</Form.Label>
              <Form.Control type='text' className='text-dark' onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category Name:' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddCategory} >Submit</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Catergory