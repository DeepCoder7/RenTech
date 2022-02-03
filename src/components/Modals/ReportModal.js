import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  Button,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Modal from 'react-modal';

const ReportModal = (props) => {
  const [descRp, setDescRp] = useState('');
  const [textArea, setTextArea] = useState(false);
  
  const { isReportOpen, setIsReportOpen } = props;

  const handleChange = (e) => {
    if (e.target.value === 'other') {
      setTextArea(true);
      setDescRp(e.target.value);
    } else {
      setDescRp(e.target.value);
      setTextArea(false);
    }
  };

  const handleTextArea = (e) => {
    setDescRp(e.target.value);
  };

  const handleReport = (e) => {
    e.preventDefault();
    console.log(descRp);
    props.submitReport(descRp);
    setIsReportOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isReportOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(115,115,115,0.2)',
          },
          content: {
            width: '20rem',
            marginTop: '10%',
            marginX: 'auto',
            height: '350px',
          },
        }}
      >
        <Button
          style={{ position: 'absolute', right: '14px', top: '20px' }}
          color='secondary'
          onClick={() => {
            setIsReportOpen(false);
          }}
        >
          <Close />
        </Button>

        <form onSubmit={handleReport}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Report Product</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='repoOption'
              onChange={handleChange}
              value={descRp}
            >
              <FormControlLabel
                value='Spam or misleading'
                control={<Radio />}
                label='Spam or misleading'
              />
              <FormControlLabel
                value='Hateful or abusive content'
                control={<Radio />}
                label='Hateful or abusive content'
              />
              <FormControlLabel
                value='Violent or repulsive content'
                control={<Radio />}
                label='Violent or repulsive content'
              />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
            {textArea && (
              <TextField
                id='outlined-multiline-static'
                label='Description'
                multiline
                onChange={handleTextArea}
                rows={3}
                fullWidth
                placeholder='Desc'
                variant='outlined'
              />
            )}
          </FormControl>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setIsReportOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Report
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ReportModal;
