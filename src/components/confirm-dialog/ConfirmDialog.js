import PropTypes from 'prop-types';
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

export default function ConfirmDialog({ title, content, action, open, onAccept, onClose, ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancelar
        </Button>
        
        {action}

        { (!action && onAccept)  && (
          <Button variant="contained" color="error" onClick={onAccept}>
            Si, estoy de acuerdo
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
