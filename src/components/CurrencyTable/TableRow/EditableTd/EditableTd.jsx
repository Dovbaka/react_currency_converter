import React, {useState} from "react";
import editIcon from "../../../../assets/images/edit.svg"
import styles from "../../CurrencyTable.module.css"

function TableRow({id, value, collumName, editCurrency}) {

    let [hover, setHover] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(value);

    const deactivateEditMode = () => {
        if (text < value * 1.1 && text > value * 0.9) {
            editCurrency(id, text, collumName);
        }
        setEditMode(false);
    }

    const onStatusChange = (e) => {
        setText(e.currentTarget.value);
    }

    const enterPress = (e) => {
        if (e.keyCode === 13) {
            deactivateEditMode();
        }
    }

    return <td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {!editMode && Number(value).toFixed(1)}
        {hover && <img src={editIcon} alt={"icon"}
                       className={styles.editIcon} onClick={() => setEditMode(true)}/>}

        {editMode && <input className={styles.editInput} autoFocus={true} value={text}
                            onKeyDown={enterPress} onBlur={deactivateEditMode} onChange={onStatusChange}/>}
    </td>
}

export default TableRow;