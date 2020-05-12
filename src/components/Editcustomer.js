import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcustomer(props) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '',
    });

    const handleClickOpen = () => {
        console.log(props);
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editCustomer = () => {
        props.editCustomer(customer, props.customer.links[1].href);
        handleClose();
    };

    const handleOnChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };
    return (
        <div>

            <Button color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleOnChange(e)}
                        label="Firstname"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        value={customer.lastname}
                        name="lastname"
                        onChange={e => handleOnChange(e)}
                        label="Lastname"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleOnChange(e)}
                        label="Email"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleOnChange(e)}
                        label="Phone"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleOnChange(e)}
                        label="Address"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleOnChange(e)}
                        label="Postcode"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleOnChange(e)}
                        label="City"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}