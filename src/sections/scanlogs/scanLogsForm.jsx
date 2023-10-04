import React from 'react';
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
  Autocomplete,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// import { status } from "../../../../utils/const";
import { useSnackbar } from 'notistack';
import { addTrigger } from 'src/utils/api/scanLogs';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  formItem: {
    marginBottom: 10,
    marginTop: 10
  },
  dialogMain: {
    background: '#00000047',
  },
  closeButton: {
    float: 'right',
  },
}));

const formObj = {
  candidateIds: [],
};

function ScanLogsForm({ openForm, handleClose, data, isEdit, candidateList }) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  // const [ScanLogsData, setScanLogsData] = useState(formObj);
  const { enqueueSnackbar } = useSnackbar();

  const ScanLogsSchema = Yup.object().shape({
    candidateIds: Yup.array().required('This field is required'),
  });

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: ScanLogsSchema,
    enableReinitialize: true,
    initialValues: isEdit ? data : formObj,
    onSubmit: async (v, { setSubmitting, setErrors }) => {
      const values = { ...v };
      try {
        // eslint-disable-next-line no-unused-vars
        const dataObj = {
          candidateIds: values.candidateIds,
        };
        const res = await addTrigger(dataObj);
        if (res?.data?.message) {
          enqueueSnackbar(res.data.message, {
            variant: 'success',
          });
        }

        handleClose();
      } catch (error) {
        console.log('Error with ScanLogsForm onSubmit: ', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue } = formik;

  return (
    <div>
      <Dialog className={classes.dialogMain} open={openForm} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="heading2">{isEdit ? 'Edit ScanLogs' : 'Add ScanLogs'}</Typography>
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
                <Autocomplete
                  multiple
                  id="Candidate"
                  options={candidateList}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  onChange={(e, value) => {
                    setFieldValue(
                      'candidateIds',
                      value.map((item) => item.id)
                    );
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Candidate" placeholder="" />
                  )}
                />
                {/* <FormControl fullWidth>
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
                </FormControl> */}
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
            Trigger
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ScanLogsForm.propTypes = {
  openForm: PropTypes.any,
  handleClose: PropTypes.any,
  data: PropTypes.any,
  isEdit: PropTypes.bool,
  candidateList: PropTypes.array,
};

export default ScanLogsForm;
