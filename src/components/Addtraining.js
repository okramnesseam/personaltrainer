import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', activity: '', duration: '', customer: ''
    });



    const handleClickOpen = () => {
        setTraining({ ...training, duration: '', customer: props.customer.links[0].href })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };


    const saveTraining = () => {
        props.addTraining(training);
        handleClose();
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Add training for customer
             </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleOnChange(e)}
                        label="For example (YYYY-MM-DD)"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        value={training.activity}
                        name="activity"
                        onChange={e => handleOnChange(e)}
                        label="Activity"
                        fullWidth
                    /> <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleOnChange(e)}
                        label="Duration"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                     </Button>
                    <Button onClick={saveTraining} color="primary">
                        Save
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}