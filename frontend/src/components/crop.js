// React
import React, { PureComponent } from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// CSS
import 'react-image-crop/dist/ReactCrop.css'

// Libs $ Components
import ReactCrop from 'react-image-crop'
import axios from 'axios';
import CroppedCard from './card'

export default class Crop extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30
    },
    name: "",
    saved: []
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      
      reader.addEventListener('load', () =>
        this.setState({ 
          src: reader.result,
          name: e.target.files[0].name
        }),
        
      );
      reader.readAsDataURL(e.target.files[0]);
      
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImg = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );

      const reader = new FileReader();
      
      reader.addEventListener('load', () =>
        this.setState({ 
          croppedImg: {
            url : croppedImg.url,
            base64: reader.result 
          }
        }),
        
      );

      reader.readAsDataURL(croppedImg.blob);
      
    }
    
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    
    return new Promise((resolve, reject) => {
      
      canvas.toBlob(blob => {
        
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.blob = blob
        this.fileUrl = window.URL.createObjectURL(blob);

        const croppedImg = { 
          blob: this.blob,
          url: this.fileUrl
        }
        
        resolve( croppedImg );
      }, 'image/jpeg');
      
    });
  }

  onClickHandler = () => {
    axios.post("http://localhost:3001/upload", this.state, { 
      })
      .then(res => {
        this.setState({ 
          saved: [...this.state.saved, res.data.saved] 
        })
      })
  }

  render() {
    const { crop, src, saved, name } = this.state;

    return (
      <Row>
          
        <Col xs="6">
          <Card>
            <Card.Header as="h5">Upload Image</Card.Header>
            <Card.Body className="mt-3 mb-3">

              <Form.File 
                id="custom-file"
                label={ name ? name : "Upload image to crop" }
                accept="image/*"
                onChange={this.onSelectFile}
                custom
              />
              
              {src && (
                <>
                  <ReactCrop
                    src={src}
                    crop={crop}
                    className="mt-3"
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                  <Button variant="primary" className="mt-2" onClick={this.onClickHandler}>Save Crop</Button>
                </>
              )}

            </Card.Body>
          </Card>
        </Col>
      
        <Col xs="6">          
          <Card>
            <Card.Header as="h5">Saved Croppings</Card.Header>
            <Card.Body className="mt-3 mb-3">
          
              {saved.length > 0 ? 
                <CroppedCard 
                  saved={saved}
                />
              :
                <Card.Title>Nothing Saved</Card.Title>
              }

            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    );
  }
}
