


// // import { useEffect, useState } from 'react';
// // import Card from 'react-bootstrap/Card';
// // import './App.css';
// // import axios from 'axios';

// // function App() {
// //   const [productDetails, setProductDetails] = useState('');
// //   const [searchValue, setSearchValue] = useState('');
// //   const [result, setResult] = useState();

// //   const handleSearch = async () => {
// //     setSearchValue(productDetails);
// //     try {
// //       // Fetch product details based on the search input (productDetails)
// //       const response = await axios.get(`https://fakestoreapi.com/products/${searchValue}`);
// //       setResult(response.data);  // Set the result to the product data directly
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <>
// //       <div style={{  marginLeft: '20%', marginTop: '5%' }}>
// //         <input
// //           onChange={(e) => setProductDetails(e.target.value)}
// //           className="btn btn-light w-50"
// //           type="text"
// //           placeholder="Enter the product ID"
// //         />
// //         <button onClick={handleSearch} className="btn btn-success ms-5">
// //           Search
// //         </button>
// //       </div>

// //       <div >
// //         {/* If a result is found, display the product information */}
// //         {
// //         result && (
// //           <Card style={{ width: '18rem',marginTop:'10%',marginLeft:'15%' }}>
// //             <Card.Img variant="top" src={result.image} />
// //             <Card.Body>
// //               <Card.Title>{result.title}</Card.Title>
// //               <Card.Text>
// //                 {result.description}
// //               </Card.Text>
// //               <Card.Text>
// //                 <strong>{result.price}</strong>
// //               </Card.Text>
// //             </Card.Body>
// //           </Card>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // export default App;

// import { useState } from 'react';
// import Card from 'react-bootstrap/Card';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [productDetails, setProductDetails] = useState('');
//   const [result, setResult] = useState([]);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     if (!productDetails) {
//       setError('Please enter a product name.');
//       return;
//     }

//     try {
//       setError('');
//       // Fetch all products and filter by product name
//       const response = await axios.get('https://fakestoreapi.com/products');
//       const filteredProducts = response.data.filter((product) =>
//         product.title.toLowerCase().includes(productDetails.toLowerCase())
//       );
      
//       if (filteredProducts.length === 0) {
//         setError('No products found with that name.');
//       } else {
//         setResult(filteredProducts);  // Set the result to filtered products
//       }
//     } catch (err) {
//       console.log(err);
//       setError('An error occurred while fetching data.');
//     }
//   };

//   return (
//     <>
//       <div style={{  marginLeft: '20%', marginTop: '5%' }}>
//         <input
//           onChange={(e) => setProductDetails(e.target.value)}
//           className="btn btn-light w-50"
//           type="text"
//           placeholder="Enter the product name"
//         />
//         <button onClick={handleSearch} className="btn btn-success ms-5">
//           Search
//         </button>
//       </div>

//       <div>
//         {/* Show error message if no result is found */}
//         {error && <p>{error}</p>}

//         {/* If results are found, display the product information */}
//         { 
//         result.length > 0 &&
//          result.map((item) => (
//           <Card key={item.id} style={{ width: '18rem',marginTop:'10%',marginLeft:'15%' }}>
//             <Card.Img variant="top" src={item.image} />
//             <Card.Body>
//               <Card.Title>{item.title}</Card.Title>
//               <Card.Text>{item.description}</Card.Text>
//               <Card.Text>
//                 <strong>{item.price}</strong>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;


import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './App.css';
import axios from 'axios';

function App() {
  const [productDetails, setProductDetails] = useState(''); // User input for product name
  const [result, setResult] = useState([]);  // Store filtered products
  const [error, setError] = useState(''); // Error message state

  // Function to handle search and recommendations
  const handleSearch = async () => {
    if (!productDetails) {
      setError('Please enter a product name.');
      return;
    }

    try {
      setError('');
      // Fetch all products from API
      const response = await axios.get('https://fakestoreapi.com/products');
      
      // Filter products based on the name (case-insensitive match)
      const filteredProducts = response.data.filter((product) =>
        product.title.toLowerCase().includes(productDetails.toLowerCase())
      );
      
      // If no products found, display an error message
      if (filteredProducts.length === 0) {
        setError('No products found with that name.');
      } else {
        // Recommend similar products by matching category or title
        const recommendedProducts = response.data.filter((product) =>
          product.category.toLowerCase() === filteredProducts[0].category.toLowerCase() &&
          product.id !== filteredProducts[0].id // Exclude the product itself
        );

        // Set the search result and recommendations
        setResult({
          mainProduct: filteredProducts[0],  // First match as main product
          recommendations: recommendedProducts // Products with the same category
        });
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <>
      <div style={{ marginLeft: '20%', marginTop: '5%' }}>
        <input
          onChange={(e) => setProductDetails(e.target.value)}
          className="btn btn-light w-50"
          type="text"
          placeholder="Enter mens Womens and Chains"
        />
        <button onClick={handleSearch} className="btn btn-success ms-5">
          Search
        </button>
      </div>

      <div>
        {/* Show error message if no result is found */}
        {error && <p>{error}</p>}

        {/* If a result is found, display the main product information */}
        {result.mainProduct && (
          <Card style={{ width: '18rem', marginTop: '10%', marginLeft: '15%' }}>
            <Card.Img variant="top" src={result.mainProduct.image} />
            <Card.Body>
              <Card.Title>{result.mainProduct.title}</Card.Title>
              <Card.Text>{result.mainProduct.description}</Card.Text>
              <Card.Text>
                <strong>{result.mainProduct.price}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        {/* Display product recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div style={{ marginTop: '5%' }}>
            {/* <h5>Recommended Products:</h5> */}
            {result.recommendations.map((item) => (
              <Card key={item.id} style={{ width: '18rem', marginTop: '10%', marginLeft: '15%'}}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>
                    <strong>{item.price}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

