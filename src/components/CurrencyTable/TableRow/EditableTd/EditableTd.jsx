import React, {useState} from "react";
import editIcon from "../../../../assets/images/edit.svg"
import saveIcon from "../../../../assets/images/save.svg"
import closeIcon from "../../../../assets/images/close.svg"
import styles from "../../CurrencyTable.module.css"

export default function EditableTd({id, value, collumName, editCurrency}) {

    let [hover, setHover] = useState(false); //observe for mouse over on cell
    let [editMode, setEditMode] = useState(false);//show input if editMode true
    let [text, setText] = useState(value);//input text
    const enableSaveIcon = text > value * 0.9 && text < value * 1.1;// validate input data

    const onStatusChange = (e) => {
        setText(e.currentTarget.value);
    }

    return <td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {!editMode && Number(value).toFixed(1) } {/* show short version of cell value */}
        {hover && !editMode && <img src={editIcon} alt={"icon"} /* show editIcon on hover*/
                                    className={styles.icon + " " + styles.editIcon}
                                    onClick={() => setEditMode(true)}/>}

        {editMode && <div>
            <input className={styles.editInput} autoFocus={true} value={text}
                   onChange={onStatusChange}/>
            {enableSaveIcon && /*true if text passes validation*/
            <img src={saveIcon} alt={"icon"} className={styles.icon + " " + styles.saveIcon}
                 onClick={() => {
                     editCurrency(id, text, collumName);
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
