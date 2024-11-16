import React, { useEffect, useRef } from 'react';
import { useWindowsStore } from '../store/WindowsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface WindowProps {
  children: React.ReactNode;
}

export const Window = (props: WindowProps) => {
  const { children } = props;
  const { cerrarVentana } = useWindowsStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    // Abre el diálogo cuando el componente se monta
    if (dialog) {
      dialog.showModal();
    }

    const handleCerrarVentana = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrarVentana();
        dialog?.close();
      }
    };
    
    document.addEventListener('keydown', handleCerrarVentana);

    return () => document.removeEventListener('keydown', handleCerrarVentana);
  }, [cerrarVentana]);

  const handleClose = () => {
    cerrarVentana();
    dialogRef.current?.close();
  };

  return (
    <div className='fixed left-0 top-0 z-50 m-0 flex h-screen w-screen animate-fade-in items-center justify-center bg-neutral-950 backdrop-blur-[2px] md:bg-neutral-950/20'>
      <dialog ref={dialogRef} className='relative h-full w-full animate-fade-in-top rounded-lg border-olive bg-transparent p-4 text-neutral-50 md:h-[570px] md:w-[400px] md:border md:bg-neutral-900'>
        <button
          onClick={handleClose}
          className='top-2 ml-auto flex size-10 items-center justify-center rounded-full border border-olive text-olive'
        >
          <FontAwesomeIcon icon={faXmark} className='size-6 text-olive' />
        </button>
        {children}
      </dialog>
    </div>
  );
};
