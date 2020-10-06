import { Button } from "@material-ui/core");
import AddIcon from '@material-ui/icons/Add';

function AddObject(props) {
  let typeOfVar;
  if (props.object === "store") {
    typeOfVar
  } else if (props.object === "list") {

  } else { // props.object === listitem

  }
  return (
    <>
      <Button type="button" onClick>
        <AddIcon></AddIcon>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  )
}