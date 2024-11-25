import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

// eslint-disable-next-line react/prop-types
export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;

    if(!modal.open){
       modal.showModal();
    }


    return () => {
        if(!modal.open){
            modal.close(); // needed to avoid error being thrown
        }
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}