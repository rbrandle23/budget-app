import React, {useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Budget() {
    const ref = useRef(null);
    const [inputText, setInputText] = useState('');
    const [changedText, setChangedText] = useState(inputText);
    const [itemName, setItemName] = useState([]);
    const [updateItem, setUpdateItem] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [updatePrice, setUpdatePrice] = useState(itemPrice);
    const [balance, setBalance] = useState('');

    const handleChange = (event) => {
        setInputText(event.target.value);
    };
    const budgetBtn = () => {
        setChangedText(inputText);
        setBalance(changedText);
    };
    const handleName = (event) => {
        setUpdateItem(event.target.value);
    };
    const handlePrice = (event) => {
        setItemPrice(event.target.value);
    };
    function handleExpense() {
        setItemName([...itemName, updateItem]);
        setUpdateItem('');
        if(Number(updatePrice < changedText)) {
            setUpdatePrice(Number(itemPrice) + Number(updatePrice));
            setBalance(Number(changedText));
        } else {
            let arr = itemName.pop();
            setItemName([arr]);
            alert('Oh snap! Expenses exceeded Total Budget!');
        }
        ref.current.focus();
    }
    const removeExpense = val => {
        setItemName(old => {
            return old.filter(item => item !== val);
        })
        setUpdatePrice(Number(updatePrice - itemPrice));
    }
    
   
  return (
    <Container className='me-auto my-5'>
      <Row className='me-auto'>
        <Col className='col-6'>
            <Card style={{height: '15rem'}} id='card'>
                <Card.Body>
                    <Card.Title>Budget</Card.Title>
                    <Card.Text>
                    <Form.Control type="text" placeholder="Enter Total Amount..." onChange={handleChange} value={inputText}/>
                    </Card.Text>
                    <Button variant="dark" onClick={budgetBtn}>Set Budget</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col className='col-6'>
            <Card style={{height: '15rem'}} id='card'>
                <Card.Body>
                    <Card.Title>Expenses</Card.Title>
                    <Card.Text>
                    <Form.Control type="text" placeholder="Enter Expense Name..." className='my-2' ref={ref} onChange={handleName} value={updateItem}  />
                    <Form.Control type="text" placeholder="Enter Expense Price..." onChange={handlePrice} value={itemPrice}/>
                    </Card.Text>
                    <Button variant="dark" onClick={handleExpense}>Check Amount</Button>
                </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row className='my-5'>
        <Col>
            <Card bg='dark' text='light'>
                <Card.Body>
                    <Row className='text-center'>
                        <Col>
                            <Card.Title>Total Budget</Card.Title>
                            <span>${changedText}</span>
                        </Col>
                        <Col>
                            <Card.Title>Expenses</Card.Title>
                            <span>${updatePrice}</span>
                        </Col>
                        <Col>
                            <Card.Title>Balance</Card.Title>
                            <span>${balance - updatePrice}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
      </Row>
      <Row>
        <Col>
            <Card id='card'>
            <ListGroup variant="flush">
                <ListGroup.Item>Expense List</ListGroup.Item>
                {itemName.map(item => 
                <ListGroup.Item  key={item} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{item}</span>
                    <Button variant="dark" size='sm' onClick={() => removeExpense(item)} >
                        <FontAwesomeIcon icon={faTrash} style={{color: "#fff",}} size='sm'/>
                    </Button>
                </ListGroup.Item>)}
            </ListGroup>
            </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Budget

