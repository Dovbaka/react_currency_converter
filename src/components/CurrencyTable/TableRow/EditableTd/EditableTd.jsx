import React, {useState} from "react";
import editIcon from "../../../../assets/images/edit.svg"
import saveIcon from "../../../../assets/images/save.svg"
import closeIcon from "../../../../assets/images/close.svg"
import styles from "../../CurrencyTable.module.css"

function TableRow({id, value, collumName, editCurrency}) {

    let [hover, setHover] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(value);
    const enableSaveIcon = text > value * 0.9 && text < value * 1.1;

    const editData = () => {
        if (text > value * 0.9 && text < value * 1.1) {
            editCurrency(id, text, collumName);
        }
    }

    const onStatusChange = (e) => {
        setText(e.currentTarget.value);
    }

    return <td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {!editMode && Number(value).toFixed(1)}
        {hover && !editMode && <img src={editIcon} alt={"icon"}
                                    className={styles.icon + " " + styles.editIcon}
                                    onClick={() => setEditMode(true)}/>}

        {editMode && <div>
            <input className={styles.editInput} autoFocus={true} value={text}
                   onChange={onStatusChange}/>
            {enableSaveIcon &&
            <img src={saveIcon} alt={"icon"} className={styles.icon + " " + styles.saveIcon}
                 onClick={() => {
                     editData();
                     setEditMode(false);
                 }}/>}
            {!enableSaveIcon &&
            <img src={saveIcon} alt={"icon"}
                 className={styles.icon + " " + styles.saveIcon + " " + styles.disableIcon}/>}
            <img src={closeIcon} alt={"icon"}
                 className={styles.icon + " " + styles.closeIcon} onClick={() => setEditMode(false)}/>
        </div>}
    </td>
}

export default TableRow;