import './Sendnotification.css'
import Icon from '@mui/material/Icon';
import { useState } from 'react';
const Sendnotification = ({ phoneNumber}) => {
    // const [phoneNumber, setphoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [ispending, setIspending] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        const body ={phoneNumber, title, type, description}
        setIspending(true)
        fetch('https://credio-api.herokuapp.com/api/v1/admin/send/notifications/single', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then((res) => {
            console.log(res)
            console.log(body)
            setIspending(false)
            setTitle('')
            setType('')
            setDescription('')
        }) .catch(error => console.log(error));
    }
    const isDisabled = !(phoneNumber && title && type && description);
    return ( 
                // <div className="modal-close" onClick={hidemodal}>
                //     <Icon>close</Icon>
                // </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputfield">
                        <p>Phone Number<span>*</span></p>
                        <input
                            type="text"
                            value={phoneNumber} 
                            readOnly 
                            required 
                        ></input>
                    </div>
                    <div className="inputfield">
                        <p>Title<span>*</span></p>
                        <textarea
                            type="text"
                            value={title} onChange={e => setTitle(e.target.value)} 
                            required 
                        ></textarea>
                    </div>
                    <div className="inputfield">
                        <p>Type<span>*</span></p>
                        <select name="" id=""
                            value={type} 
                            onChange={e => setType(e.target.value)}
                        >
                            <optgroup>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="inputfield">
                        <p>Description<span>*</span></p>
                        <textarea
                            type="text"
                            value={description} onChange={e => setDescription(e.target.value)} 
                            required 
                        ></textarea>
                    </div>
                    <div className="form-submit">
                        {!ispending && <button >Send Request</button>}
                        {ispending && <button disabled>Sending .....</button>}
                    </div>
                </form>
    );
}
 
export default Sendnotification;