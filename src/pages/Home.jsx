import React, { useState } from 'react'
import Add from '../component/Add'
import View from '../component/View'
import Catergory from '../component/Catergory'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'



function Home() {

  const [uploadVideoServerResponse, setUploadVideoServerResponse] = useState({})


  return (
    <>
    <div className="home">
    <Container>
    <div>
        <div className='add-videos'>
          <Add setUploadVideoServerResponse={setUploadVideoServerResponse} />
          <Link to={'/watchHistory'} style={{ textDecoration: 'none', color: 'blue' }}>Watch History</Link>
        </div>
      </div>

      <Row>
        <Col lg={8}>
          <div className="all_videos">
            <h3>All Videos</h3>
            <View uploadVideoServerResponse={uploadVideoServerResponse} />
          </div>
        </Col>
        <Col lg={4}>
          <div>
            <Catergory />
          </div>
        </Col>

      </Row>

    </Container>
    </div>
    </>
  )
}

export default Home