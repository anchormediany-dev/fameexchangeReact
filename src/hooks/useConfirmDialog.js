// hooks/useConfirmDialog.js
import { useState } from "react";

export const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const ask = (data) => {
    setPayload(data ?? null);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setPayload(null);
  };

  return { open, ask, close, payload, setPayload, setOpen };
};
