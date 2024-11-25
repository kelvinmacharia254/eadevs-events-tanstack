import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

// eslint-disable-next-line react/prop-types
export default function Modal({children,onClose}){
    const dialog = useRef()

    useEffect(()=>{
    //
        const modal = dialog.current
        modal.showModal()

        return () => {
            modal.close()
        }

    },[])
    return createPortal(
        <dialog className="modal" ref={dialog}>
          {children}
        </dialog>,
        document.getElementById('modal')
      );
}