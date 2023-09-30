import PropTypes from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// _mock
import { _addressBooks } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import FormProvider from 'src/components/hook-form';
//
import ComplianceNewEditDetails from './compliance-new-edit-details';
import ComplianceNewEditAddress from './compliance-new-edit-address';
import ComplianceNewEditStatusDate from './compliance-new-edit-status-date';

// ----------------------------------------------------------------------

export default function ComplianceNewEditForm({ currentCompliance }) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const NewComplianceSchema = Yup.object().shape({
    complianceTo: Yup.mixed().nullable().required('Compliance to is required'),
    createDate: Yup.mixed().nullable().required('Create date is required'),
    dueDate: Yup.mixed()
      .required('Due date is required')
      .test(
        'date-min',
        'Due date must be later than create date',
        (value, { parent }) => value.getTime() > parent.createDate.getTime()
      ),
    // not required
    taxes: Yup.number(),
    status: Yup.string(),
    discount: Yup.number(),
    shipping: Yup.number(),
    complianceFrom: Yup.mixed(),
    totalAmount: Yup.number(),
    complianceNumber: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      complianceNumber: currentCompliance?.complianceNumber || 'INV-1990',
      createDate: currentCompliance?.createDate || new Date(),
      dueDate: currentCompliance?.dueDate || null,
      taxes: currentCompliance?.taxes || 0,
      shipping: currentCompliance?.shipping || 0,
      status: currentCompliance?.status || 'draft',
      discount: currentCompliance?.discount || 0,
      complianceFrom: currentCompliance?.complianceFrom || _addressBooks[0],
      complianceTo: currentCompliance?.complianceTo || null,
      items: currentCompliance?.items || [
        {
          title: '',
          description: '',
          service: '',
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
      totalAmount: currentCompliance?.totalAmount || 0,
    }),
    [currentCompliance]
  );

  const methods = useForm({
    resolver: yupResolver(NewComplianceSchema),
    defaultValues,
  });

  const {
    reset,

    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSave.onFalse();
      router.push(paths.dashboard.compliance.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSave.onFalse();
    }
  });

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSend.onFalse();
      router.push(paths.dashboard.compliance.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <ComplianceNewEditAddress />

        <ComplianceNewEditStatusDate />

        <ComplianceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentCompliance ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

ComplianceNewEditForm.propTypes = {
  currentCompliance: PropTypes.object,
};
