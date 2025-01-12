import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Message as MessageIcon,
  VideoCall as VideoCallIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const mockPatients = [
  {
    id: 1,
    name: 'John Doe',
    age: 35,
    lastVisit: '2025-01-10',
    condition: 'Atopic Dermatitis',
    severity: 'Moderate',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 28,
    lastVisit: '2025-01-11',
    condition: 'Contact Dermatitis',
    severity: 'Severe',
    status: 'Follow-up Required',
  },
  // Add more mock patients as needed
];

const PatientList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSeverityFilterChange = (event) => {
    setFilterSeverity(event.target.value);
  };

  // Filter and sort patients
  const filteredPatients = mockPatients
    .filter((patient) => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = filterSeverity === 'all' || patient.severity.toLowerCase() === filterSeverity.toLowerCase();
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'lastVisit') {
        return new Date(b.lastVisit) - new Date(a.lastVisit);
      } else if (sortBy === 'severity') {
        const severityOrder = { 'Severe': 3, 'Moderate': 2, 'Mild': 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return 0;
    });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Patient List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="name">Sort by Name</MenuItem>
                <MenuItem value="lastVisit">Sort by Last Visit</MenuItem>
                <MenuItem value="severity">Sort by Severity</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                value={filterSeverity}
                onChange={handleSeverityFilterChange}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Severities</MenuItem>
                <MenuItem value="mild">Mild</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="severe">Severe</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>
                    <Chip
                      label={patient.severity}
                      color={
                        patient.severity === 'Severe' ? 'error' :
                        patient.severity === 'Moderate' ? 'warning' : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={patient.status}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" title="View Profile">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" title="Send Message">
                      <MessageIcon />
                    </IconButton>
                    <IconButton size="small" title="Start Video Call">
                      <VideoCallIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPatients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default PatientList;
