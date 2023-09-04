import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import apiService from '../../services/api';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const schoolData = JSON.parse(localStorage.getItem('schoolData'));
  const [selectedSchool, setSelectedSchool] = useState(schoolData && schoolData._id ? schoolData : null);
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminData'));
    const data = {adminId: admin._id};
    fetchSchools(data);
    // Set the selected school based on the stored schoolData
    setSelectedSchool(schoolData && schoolData._id ? schoolData : null);
  }, []);

  
  const fetchSchools = async() => {
    const { getSchools } = apiService.school;
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const data = {adminId: adminData._id};
    const response = await getSchools(data);
    console.log(response.data.schools);
    setSchools(response.data.schools);
    
  };

  const handleSwitchSchool = (school) => {
    setSelectedSchool(school);
    apiService.school.changeSchool(adminData._id, school._id)
    .then((response) => {
      console.log('Switched school:', response.data.school);
      localStorage.setItem('schoolData', JSON.stringify(response.data.school));
      //reload the page
      window.location.reload();
    })


    // Update the localStorage with the selected school 
  //  localStorage.setItem('schoolData', JSON.stringify(school));
    // Perform the necessary actions to switch to the selected school
  };
 

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        School List
      </Typography>
      <List>
        {/* {schools && schools.map((school) => (
          <React.Fragment key={school._id}>
            <ListItem>
              <ListItemText primary={school.name} secondary={school.location} />
              <Button
                variant="outlined"
                color="primary"
                disabled={selectedSchool._id === school._id}
                onClick={() => handleSwitchSchool(school)}
              >
                {selectedSchool?._id === school._id ? 'Selected' : 'Switch'}
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))} */}
        {
          !schools ? <p>No schools found</p> : schools.map((school) => {
            return (
              <React.Fragment key={school._id}>
                <ListItem>
                  <ListItemText primary={school.name} secondary={school.location} />
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={selectedSchool._id === school._id}
                    onClick={() => handleSwitchSchool(school)}
                  >
                    {selectedSchool?._id === school._id ? 'Selected' : 'Switch'}
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          }
          )


        }
      </List>
    </div>
  );
};

export default SchoolList;