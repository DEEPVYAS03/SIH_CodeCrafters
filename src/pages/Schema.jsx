import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox, Container, Box, Button, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarComponent from './../globalComponents/Sidebar'; // Adjust the path to Sidebar component
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function Schema() {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedproject,setSelectedproject] = useState("");
  const [selectedstructure,setSelectedstructure]=useState("");
  



  const activitiesOptions = ["Agriculture", "Poultry", "Horticulture"];
  const districtOptions = ["Dharampuri", "Tuticorn"];
  const statesOptions = ["Maharashtra", "Gujarat", "Delhi"];
  const villageOptions = ["Village 1", "Village 2", "Village 3"];
  const projectOptions=["WDC 1","WDC 2","WDC 3"];
  const structureoptions=["DAM","WELL","POND"];



  const handleSubmit = (event) => {
    toast.success("Schema Generated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    event.preventDefault();
    console.log("Selected Activities:", selectedActivities);
    console.log("Selected District:", selectedDistrict);
    console.log("Selected State:", selectedState);
    console.log("Selected Village:", selectedVillage);
    console.log("Selected structure",selectedstructure);
    console.log("Selected project",selectedproject);
    console.log("Selected state",selectedState);

  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      <SidebarComponent style={{ flex: 1 }} /> {/* Sidebar on the left */}
      <Container maxWidth="sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box mt={4} p={4} borderRadius="30px" boxShadow="md" bgcolor="#fff" color="#000">
          <Typography variant="h4" align="center" gutterBottom>
            Schema Generation
          </Typography>

          <form onSubmit={handleSubmit}>
            <Autocomplete
              value={selectedState}
              inputValue={selectedState}
              id="states-autocomplete"
              options={statesOptions}
              sx={{ width: 500, marginBottom: 2, borderColor: 'black' }}
              onChange={(event, newValue) => {
                setSelectedState(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select State" />}
            />

            <Autocomplete
              value={selectedDistrict}
              inputValue={selectedDistrict}
              id="district-autocomplete"
              options={districtOptions}
              sx={{ width: 500, marginBottom: 2 }}
              onChange={(event, newValue) => {
                setSelectedDistrict(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select District" />}
            />

            <Autocomplete
              value={selectedVillage}
              inputValue={selectedVillage}
              onInputChange={(event, newInputValue) => {
                setSelectedVillage(newInputValue);
              }}
              id="village-autocomplete"
              options={villageOptions}
              sx={{ width: 500, marginBottom: 2 }}
              onChange={(event, newValue) => {
                setSelectedVillage(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Village" />}
            />

            <Autocomplete
              value={selectedproject}
              inputValue={selectedproject}
              onInputChange={(event, newInputValue) => {
                setSelectedproject(newInputValue);
              }}
              id="village-autocomplete"
              options={projectOptions}
              sx={{ width: 500, marginBottom: 2 }}
              onChange={(event, newValue) => {
                setSelectedproject(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Project" />}
            />


              <Autocomplete
              value={selectedstructure}
              inputValue={selectedstructure}
              onInputChange={(event, newInputValue) => {
                setSelectedstructure(newInputValue);
              }}
              id="village-autocomplete"
              options={structureoptions}
              sx={{ width: 500, marginBottom: 2 }}
              onChange={(event, newValue) => {
                setSelectedstructure(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Structure" />}
            />



            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={activitiesOptions}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              style={{ width: 500, marginBottom: 10 }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Activities" placeholder="Favorites" />
              )}
              onChange={(event, newValue) => {
                setSelectedActivities(newValue);
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <ToastContainer />

          </form>
        </Box>
      </Container>
      {/* <Sidebar style={{ flex: 1, borderLeft: '1px solid #ccc', overflowY: 'auto' }} /> Sidebar on the right without collapse */}
 {/* Sidebar on the right */}
 <Box>

</Box>
    </div>
  );
}

export default Schema;