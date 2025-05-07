// import React, { useEffect, useState } from 'react';
// import { parseGames } from '../api/gameAPI'; // Ensure this is a named export

// function TestPage() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         const result = await parseGames("-JV7mHmwp80fDq3o1ojGb9WIiN6x2");
//         setUserData(result);
//         console.log(result);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >

//       <h1>{userData}</h1>
//     </div>
//   );
// }

// export default TestPage;
