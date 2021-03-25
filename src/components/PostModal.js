import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { updateCurrentPost } from '../redux/currentPost-reducer'
import { useForm } from 'react-hook-form'
import { indigo } from '@material-ui/core/colors'
import { createPost } from '../redux/posts-reducer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
  titleInput: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px ',
    textAlign: 'center',
  },
  form_input: {
    marginBottom: theme.spacing(5),
    height: theme.spacing(4),
  },
  form_input_textarea: {
    marginBottom: theme.spacing(5),
    height: theme.spacing(40),
  },
  form_input_button: {
    alignSelf: 'center',
    width: theme.spacing(10),
    padding: theme.spacing(1),
    fontWeight: 'bold',
    backgroundColor: indigo[200],
    borderRadius: '5px',
  },
}))

export const PostModal = ({ userId, id, title, body, currentAction }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const { register, handleSubmit, errors } = useForm()

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitUpdate = (data, e) => {
    dispatch(updateCurrentPost(userId, id, data.title, data.body))
    setOpen(false)
  }

  const onSubmitCreate = (data, e) => {
    dispatch(createPost(userId, data.title, data.body))
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {currentAction}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAction === 'Edit' && (
              <form
                onSubmit={handleSubmit(onSubmitUpdate)}
                className={classes.form}
              >
                <label>Title</label>
                <input
                  className={classes.form_input}
                  name="title"
                  defaultValue={title}
                  ref={register}
                  type="text"
                />
                <label>Body</label>
                <textarea
                  className={classes.form_input_textarea}
                  name="body"
                  defaultValue={body}
                  ref={register({ required: true })}
                  type="input"
                />
                {errors.exampleRequired && <p>This field is required</p>}

                <input
                  className={classes.form_input_button}
                  type="submit"
                  value="Save"
                />
              </form>
            )}
            {currentAction === 'Create a new post' && (
              <form
                onSubmit={handleSubmit(onSubmitCreate)}
                className={classes.form}
              >
                <label>Title</label>
                <input
                  className={classes.form_input}
                  name="title"
                  defaultValue="test"
                  ref={register}
                  type="text"
                />
                <label>Body</label>
                <textarea
                  className={classes.form_input_textarea}
                  name="body"
                  ref={register({ required: true })}
                  type="input"
                />
                {errors.exampleRequired && <p>This field is required</p>}

                <input
                  className={classes.form_input_button}
                  type="submit"
                  value="Save"
                />
              </form>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
