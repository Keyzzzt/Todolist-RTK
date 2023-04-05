import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../store/reducers/reducers/authReducer'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../01_Base'

export const Login = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useTypedSelector((state) => state.auth)
  const formik = useFormik({
    validate: (values) => {
      const errors: any = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 6) {
        errors.lastName = 'Must be 6 characters or more'
      }
      return errors
    },
    initialValues: {
      email: 'lucky.station.dev@gmail.com',
      password: 'zzxxcc',
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(login(values))
    },
  })
  if (isLoggedIn) {
    return <Navigate to="/" />
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField {...formik.getFieldProps('email')} label="Email" margin="normal" />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField {...formik.getFieldProps('password')} type="password" label="Password" margin="normal" />
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              <FormControlLabel label={'Remember me'} control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />} />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}
