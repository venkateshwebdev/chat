import { collection, deleteDoc ,doc} from "@firebase/firestore";
import { async } from "@firebase/util";
import { useContext, useState } from "react";
import { db } from "./firebase";
import "./modal.css"
import ModalContext from "./modalcontext";
const Modal = (props) => {
    const cont = useContext(ModalContext)
    const [isDelete,setIsDelete] = useState(false)
    const deleteItem = async()=>{
        await deleteDoc(doc(db,"messages",cont.delId))
        cont.setModal(false)
    }
    return ( 
        <div className="modil-container">
            <div className="delmsg">Delete Message?</div>
            <div className="delitem"><button onClick={()=>cont.setModal(false)}>Cancel</button><button onClick={deleteItem}>Delete</button></div>
        </div>
     );
}
 
export default Modal;