import {
  Backdrop,
  Modal as BaseModal,
  Box,
  Fade,
  ModalProps,
} from "@mui/material";

import { FC } from "react";

interface IModalProps extends ModalProps {}

export const Modal: FC<IModalProps> = (props) => {
  const { open, children, ...rest } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };

  return (
    <BaseModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...rest}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </BaseModal>
  );
};
