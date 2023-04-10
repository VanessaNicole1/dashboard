import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, onSubmit, methods, ...props }) {
  return (
    <Form {...methods}>
      <form {...props} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
