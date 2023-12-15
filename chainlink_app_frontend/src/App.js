import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Card, Button, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({pairs: ''});

  const { pairs } = item;

  const contractAddress ='0x44CDAC65cefDbf3054E6AA7cB3f277E216129CDD';
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "pair",
          "type": "int256"
        }
      ],
      "name": "getChainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const provider = new ethers.BrowserProvider(window.ethereum);
  const smartContract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async () => {
    if(pairs==="BTC/USD"){
      const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(1);
      setStoredPrice('$' + (parseInt(contractPrice) / 100000000).toFixed(2));
      } else if(pairs==="ETH/USD"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(2);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000).toFixed(2));
      } else if(pairs==="LINK/USD"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(3);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000).toFixed(2));        
      } else if(pairs==="BTC/ETH"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(4);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000).toFixed(2));
      }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
    <Image width='300px' height='300px' fluid className='mt-5' src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'/>
    <br/>
    <div>
    <Card style={{ width: '25rem' }} className='mt-5 shadow bg-body rounded' border="dark" bg="secondary">
      <Card.Header a3='h3'>Conversion Pairs List</Card.Header>
      <Card.Body>
      <div className='col'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='pairs'>
          <Form.Label>Select Cryptocurrency Pair to Get Rate:</Form.Label>
          <Form.Select onChange={handleChange} value={pairs} className='form-select'>
            <option value=''>Select value</option>
            <option value='BTC/USD'>BTC/USD</option>
            <option value='ETH/USD'>ETH/USD</option>
            <option value='LINK/USD'>LINK/USD</option>
            <option value='BTC/ETH'>BTC/ETH</option>
          </Form.Select>
          </Form.Group>
        </Form>
        <div className='mt-5'>
          <Button type='submit' onClick={getPair} size='sm' variant='outline-info'>
            Get Answer from Chainlink Oracle
          </Button>
        </div>
        </div>
      </Card.Body>
    </Card>
        <div>
          <Card style={{ width: '25rem' }} className='mt-5 shadow bg-body rounded' border="dark" bg="secondary">
            <Card.Header a3='h3'>Result</Card.Header>
            <Card.Body>
              <div className='col'>
                <h5> {pairs} ={'>'} {storedPrice} </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
    </div>
    </div>
  );
}

export default App;