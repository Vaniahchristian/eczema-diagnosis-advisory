// src/pages/patient/EducationContent.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  LocalHospital as MedicalIcon,
  Warning as WarningIcon,
  Healing as HealingIcon,
  Info as InfoIcon,
  LiveHelp as FAQIcon,
} from '@mui/icons-material';

const EducationContent = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const educationSections = [
    {
      title: 'Understanding Eczema',
      icon: <InfoIcon />,
      content: [
        {
          subtitle: 'What is Eczema?',
          text: 'Eczema (atopic dermatitis) is a chronic inflammatory skin condition characterized by dry, itchy skin. It commonly appears in childhood but can affect people of all ages.',
        },
        {
          subtitle: 'Types of Eczema',
          list: [
            'Atopic Dermatitis',
            'Contact Dermatitis',
            'Dyshidrotic Eczema',
            'Nummular Eczema',
            'Seborrheic Dermatitis',
          ],
        },
      ],
    },
    {
      title: 'Common Symptoms',
      icon: <WarningIcon />,
      content: [
        {
          subtitle: 'Primary Symptoms',
          list: [
            'Dry, sensitive skin',
            'Intense itching',
            'Red, inflamed skin',
            'Rough, leathery patches',
            'Oozing or crusting',
            'Areas of swelling',
          ],
        },
        {
          subtitle: 'Trigger Factors',
          list: [
            'Stress',
            'Allergens',
            'Irritants',
            'Weather changes',
            'Certain fabrics',
            'Hot/cold temperatures',
          ],
        },
      ],
    },
    {
      title: 'Treatment Options',
      icon: <HealingIcon />,
      content: [
        {
          subtitle: 'Medical Treatments',
          list: [
            'Topical corticosteroids',
            'Topical calcineurin inhibitors',
            'Antihistamines',
            'Phototherapy',
            'Systemic medications',
          ],
        },
        {
          subtitle: 'Self-Care Measures',
          list: [
            'Regular moisturizing',
            'Gentle skin care routine',
            'Avoiding triggers',
            'Wet wrap therapy',
            'Stress management',
          ],
        },
      ],
    },
    {
      title: 'When to See a Doctor',
      icon: <MedicalIcon />,
      content: [
        {
          subtitle: 'Seek Medical Attention If:',
          list: [
            'Skin infection signs appear',
            'Sleep is severely disrupted',
            'Daily activities are affected',
            'Over-the-counter treatments fail',
            'Symptoms worsen or spread',
          ],
        },
      ],
    },
    {
      title: 'Frequently Asked Questions',
      icon: <FAQIcon />,
      content: [
        {
          subtitle: 'Common Questions',
          faqs: [
            {
              question: 'Is eczema contagious?',
              answer: 'No, eczema is not contagious. It cannot be spread from person to person.',
            },
            {
              question: 'Can eczema be cured?',
              answer: 'While there is no cure for eczema, symptoms can be effectively managed with proper treatment and care.',
            },
            {
              question: 'Will my child outgrow eczema?',
              answer: 'Many children outgrow eczema, but some may continue to experience symptoms into adulthood.',
            },
          ],
        },
      ],
    },
  ];

  const filteredSections = searchQuery
    ? educationSections.map(section => ({
        ...section,
        content: section.content.filter(item =>
          JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(section => section.content.length > 0)
    : educationSections;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Educational Resources
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search educational content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{ mb: 3 }}
      />

      {/* Content Sections */}
      <Grid container spacing={3}>
        {filteredSections.map((section, index) => (
          <Grid item xs={12} key={section.title}>
            <Accordion
              defaultExpanded={index === 0}
              sx={{
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {React.cloneElement(section.icon, { sx: { mr: 2 } })}
                  <Typography variant="h6">{section.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {section.content.map((content, contentIndex) => (
                  <Box key={contentIndex} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                      {content.subtitle}
                    </Typography>
                    {content.text && (
                      <Typography paragraph>{content.text}</Typography>
                    )}
                    {content.list && (
                      <List>
                        {content.list.map((item, itemIndex) => (
                          <ListItem key={itemIndex}>
                            <ListItemIcon>
                              <InfoIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                    {content.faqs && (
                      <Box>
                        {content.faqs.map((faq, faqIndex) => (
                          <Card
                            key={faqIndex}
                            variant="outlined"
                            sx={{ mb: 2 }}
                          >
                            <CardContent>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 'bold', mb: 1 }}
                              >
                                {faq.question}
                              </Typography>
                              <Typography color="text.secondary">
                                {faq.answer}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EducationContent;
