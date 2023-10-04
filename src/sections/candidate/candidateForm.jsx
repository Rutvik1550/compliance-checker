import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// import { status } from "../../../../utils/const";
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  formItem: {
    marginBottom: 10,
  },
  dialogMain: {
    background: '#00000047',
  },
  closeButton: {
    float: 'right',
  },
}));

const formObj = {
  pin: '',
  firstname: '',
  lastname: '',
  location: '',
  portal: '',
};

function CandidateForm({ openForm, handleClose, data, isEdit }) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  // const [CandidateData, setCandidateData] = useState(formObj);
  const { enqueueSnackbar } = useSnackbar();

  const CandidateSchema = Yup.object().shape({
    pin: Yup.string().required('This field is required'),
    firstname: Yup.string().required('This field is required'),
    lastname: Yup.string().required('This field is required'),
    location: Yup.string().required('This field is required'),
    portal: Yup.string().required('This field is required'),
  });

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: CandidateSchema,
    enableReinitialize: true,
    initialValues: isEdit ? data : formObj,
    onSubmit: async (v, { setSubmitting, setErrors }) => {
      const values = { ...v };
      try {
        // eslint-disable-next-line no-unused-vars
        const dataObj = {
          pin: values.pin,
        };
        console.log(values, 'value::');

        // if(isEdit) {
        //   const res = await editCandidateData(dataObj, data.id);
        //   if (res?.message) {
        //     enqueueSnackbar(res.message, {
        //       variant: "success",
        //     });
        //   }
        // } else {
        //   const res = await addCandidateData(data);
        //   if (res?.message) {
        //     enqueueSnackbar(res.message, {
        //       variant: "success",
        //     });
        //   }
        // }

        handleClose();
      } catch (error) {
        console.log('Error with CandidateForm onSubmit: ', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue } = formik;

  return (
    <div>
      <Dialog className={classes.dialogMain} open={openForm} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="heading2">
            {isEdit ? 'Edit Candidate' : 'Add Candidate'}
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Box className={classes.formItem}>
                <TextField
                  fullWidth
                  label="Pin"
                  value={values.pin}
                  onChange={(e) => {
                    setFieldValue('pin', e.target.value);
                  }}
                  error={Boolean(touched.pin && errors.pin)}
                  helperText={touched.pin && errors.pin}
                  className={classes.formItem}
                />
              </Box>
              <Box className={classes.formItem}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={values.firstname}
                  onChange={(e) => {
                    setFieldValue('firstname', e.target.value);
                  }}
                  error={Boolean(touched.firstname && errors.firstname)}
                  helperText={touched.firstname && errors.firstname}
                  className={classes.formItem}
                />
              </Box>
              <Box className={classes.formItem}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={values.lastname}
                  onChange={(e) => {
                    setFieldValue('lastname', e.target.value);
                  }}
                  error={Boolean(touched.lastname && errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  className={classes.formItem}
                />
              </Box>
              <Box className={classes.formItem}>
                <TextField
                  fullWidth
                  label="Location"
                  value={values.location}
                  onChange={(e) => {
                    setFieldValue('location', e.target.value);
                  }}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                  className={classes.formItem}
                />
              </Box>
              <Box className={classes.formItem}>
                <FormControl fullWidth>
                  <InputLabel id="portal-select-label">Portal</InputLabel>
                  <Select
                    labelId="portal-select-label"
                    id="portal-select"
                    name="portal"
                    value={values.portal}
                    label="Portal"
                    fullWidth
                    onChange={(e) => {
                      setFieldValue('portal', e.target.value);
                    }}
                    error={Boolean(errors.portal && touched.portal)}
                    helperText={errors.portal && touched.portal}
                  >
                    <MenuItem value="nmc">NMC</MenuItem>
                    <MenuItem value="dbs">DBS</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            sx={{ boxShadow: 'none' }}
            pending={isSubmitting}
            onClick={handleSubmit}
            variant="contained"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
CandidateForm.propTypes = {
  openForm: PropTypes.any,
  handleClose: PropTypes.any,
  data: PropTypes.any,
  isEdit: PropTypes.bool,
};

export default CandidateForm;
