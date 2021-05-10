import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
      },
    },
  }))
export default function EditProfile(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Title');
    const [content, setContent] = React.useState(props.text)

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(content)
      console.log("THIS IS PROPS: +++++++++", props)
      
      
      props.editTweet(content, props._id)


      
    }

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit Tweet
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            
            <DialogTitle id="form-dialog-title">Edit Tweet</DialogTitle>
            <DialogContent>
                    <div>
                        <TextField
                        onChange={(e)=> setContent(e.target.value) }
                        id="outlined-multiline-static"
                        label="content"
                        multiline
                        rows={4}
                        name="content"
                        defaultValue= {content}
                        variant="outlined"
                        />
                    </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} type="submit" color="primary">
                Submit
            </Button>
            </DialogActions>
          </form>

        </Dialog>
        </div>
    );
}