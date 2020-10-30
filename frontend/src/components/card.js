import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function CroppedCard(props) {
    return (
        <>
            { props.saved.map(( { name, x, y, width, height, unit }, i ) => (
                <Card key={i} className="mb-3">
                    <Card.Header as="h5">{name}</Card.Header>
                    <Card.Img variant="top" src={"images/" + name} />
                    <Card.Body>
                    <hr/>
                    <Card.Title>Cropping Details</Card.Title>

                    <Card.Text>
                        <Badge pill variant="info">Unit: {unit}</Badge>{' '}
                        <Badge pill variant="info">Height: {height}</Badge>{' '}
                        <Badge pill variant="info">Width: {width}</Badge>{' '}
                        <Badge pill variant="info">x: {x}</Badge>{' '}
                        <Badge pill variant="info">y: {y}</Badge>{' '}
                    </Card.Text>

                    </Card.Body>
                </Card>
            ))}
        </>
    )
}
