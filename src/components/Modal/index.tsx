import * as React from 'react';
import {Modal as ModalMui, Box, Button, Typography} from '@mui/material';

const style = (rest: any) => {
  return {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    ...rest
  }
};

interface IModal {
  stylesModal?: {};
  isOpen: boolean;
  onClose(): void;
  children?: React.ReactNode
}

export function Modal({isOpen, onClose, stylesModal, children}: IModal) {
  return (
    <div>
      <ModalMui
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style(stylesModal)}>
          {children}
        </Box>
      </ModalMui>
    </div>
  );
}
