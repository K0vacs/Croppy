import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar'
import Container from 'react-bootstrap/Container';
import Crop from './components/crop'

export default function App() {
  return (
    <div className="App">

      <Navbar />

      <Container fluid>
            <Crop />
      </Container>
      
    </div>
  );
}
