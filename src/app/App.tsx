import { FC, useEffect, useCallback } from 'react'
import { AppBar, Button, CircularProgress, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { DesktopMacOutlined, Menu } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../store/store'
import { ErrorSnackbar } from '../01_Components/ErrorSnackbar/ErrorSnackbar'
import { AppStateType, initializeApp } from './appReducer'
import { TodolistsList } from '../01_Components/TodoList/TodolistsList/TodolistsList'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../01_Components/Login/Login'
import { logout } from '../store/reducers/reducers/authReducer'

type AppProps = {
  demo?: boolean
}
export const App: FC<AppProps> = ({ demo = false }) => {
  // console.log('App   render')
  const dispatch = useDispatch()
  const { status, error, isInitialized } = useSelector<StateType, AppStateType>((state) => state.app)

  useEffect(() => {
    if (isInitialized) return
    dispatch(initializeApp())
  }, [isInitialized, dispatch])

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  if (!isInitialized) {
    return <CircularProgress />
  }
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">To do list</Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
      <Container fixed style={{ paddingTop: '30px' }}>
        <Grid container style={{ paddingTop: '30px' }} spacing={4}>
          <Routes>
            <Route path="/" element={<TodolistsList demo={demo} />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Grid>
      </Container>
    </div>
  )
}
