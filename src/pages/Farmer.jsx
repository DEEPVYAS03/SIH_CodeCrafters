import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import SidebarComponent from "./../globalComponents/Sidebar"; // Adjust the path to Sidebar component
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

const Farmer = () => {
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const products = [
    {
      id: 1,
      name: "Apple Watch",
      price: "₦350,000",
      category: "Accessories",
      quantity: "7",
      rating: "5",
    },
    {
      id: 2,
      name: "Fitness watch",
      price: "₦10,000",
      category: "Fitness",
      quantity: "23",
      rating: "2",
    },
    {
      id: 3,
      name: "Beach dress",
      price: "₦25,000",
      category: "Clothing",
      quantity: "5",
      rating: "4",
    },
    {
      id: 4,
      name: "Washing machine",
      price: "₦260,000",
      category: "Electronics",
      quantity: "10",
      rating: "4",
    },
    {
      id: 5,
      name: "Blue Jeans",
      price: "₦10,000",
      category: "Clothing",
      quantity: "50",
      rating: "5",
    },
    {
      id: 6,
      name: "Samsung Watch",
      price: "₦270,000",
      category: "Accessories",
      quantity: "7",
      rating: "3",
    },
    {
      id: 7,
      name: "Yoga mat",
      price: "₦15,000",
      category: "Fitness",
      quantity: "15",
      rating: "4",
    },
    {
      id: 8,
      name: "Jumpsuit",
      price: "₦15,700",
      category: "Clothing",
      quantity: "30",
      rating: "5",
    },
    {
      id: 9,
      name: "Hand mixer",
      price: "₦50,000",
      category: "Electronics",
      quantity: "10",
      rating: "4",
    },
    {
      id: 10,
      name: "Pallazo",
      price: "₦12,000",
      category: "Clothing",
      quantity: "4",
      rating: "3",
    },
  ];
  const [farmers, setFarmers] = useState([]);

  // const handleFileUpload = (event) => {
  //   console.log("File uploaded:", event.files);
  // };

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sih-backend.vercel.app/api/admin/users/list"
        );
        setFarmers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleFileUpload = (event) => {
    // Add logic for handling file upload
    console.log("File uploaded:", event.files);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <SidebarComponent style={{ width: "250px" }} />

      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            alignSelf: "flex-start",
            width: "100%",
          }}
        >
          <InputText
            onInput={(e) =>
              setFilters({
                global: {
                  value: e.target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                },
              })
            }
            placeholder="search"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <DataTable
            value={farmers}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            filterDisplay="row"
            filters={filters}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              flex: 1,
            }}
          >
            <Column
              field="_id"
              header="Id"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="first_name"
              header="First Name"
              sortable
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="last_name"
              header="Last Name"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="number"
              header="Phone"
              style={{ width: "15%" }}
            ></Column>
            {/* <Column
              field="rating"
              header="Rating"
              style={{ width: "15%" }}
            ></Column> */}
          </DataTable>
        </div>
        <div style={{ marginTop: "20px", width: "100%", overflowY: "auto" }}>
          <FileUpload
            mode="basic"
            chooseLabel="Choose"
            uploadLabel="Upload"
            cancelLabel="Cancel"
            multiple
            auto
            accept="image/*"
            onUpload={handleFileUpload}
            style={{ marginTop: "20px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Farmer;

// import React, { useState, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { FileUpload } from "primereact/fileupload";
// import { InputText } from "primereact/inputtext";
// import { FilterMatchMode } from "primereact/api";

// const Farmer = () => {
//   const [filters, setFilters] = useState({
//     global: {
//       value: null,
//       matchMode: FilterMatchMode.CONTAINS,
//     },
//   });

// const [farmers, setFarmers] = useState([]);

// const handleFileUpload = (event) => {
//   console.log("File uploaded:", event.files);
// };

// useEffect(() => {
//   // Fetch data from your API
//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://sih-backend.vercel.app/api/admin/users/list");
//       const data = await response.json();
//       setFarmers(data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []); // Empty dependency array means this effect runs once when the component mounts

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* ... other components ... */}
//       <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <div style={{ marginBottom: "20px", alignSelf: "flex-start", width: "100%" }}>
//           <InputText
//             onInput={(e) =>
//               setFilters({
//                 global: {
//                   value: e.target.value,
//                   matchMode: FilterMatchMode.CONTAINS,
//                 },
//               })
//             }
//             placeholder="search"
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           />
//         </div>

//         <div style={{ flex: 1, overflowY: "auto", background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
//           <DataTable
//             value={farmers}
//             paginator
//             rows={5}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             tableStyle={{ minWidth: "50rem" }}
//             filterDisplay="row"
//             filters={filters}
//             style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%", flex: 1 }}
//           >
//             <Column field="first_name" header="First Name" sortable style={{ width: "25%" }}></Column>
//             <Column field="last_name" header="Last Name" style={{ width: "25%" }}></Column>
//             <Column field="number" header="Phone Number" style={{ width: "25%" }}></Column>
//           </DataTable>
//         </div>

//         <div style={{ marginTop: "20px", width: "100%", overflowY: "auto" }}>
//           <FileUpload
//             mode="basic"
//             chooseLabel="Choose"
//             uploadLabel="Upload"
//             cancelLabel="Cancel"
//             multiple
//             auto
//             accept="image/*"
//             onUpload={handleFileUpload}
//             style={{ marginTop: "20px", width: "100%" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Farmer;
