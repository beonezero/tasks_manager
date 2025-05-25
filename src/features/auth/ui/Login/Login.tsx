import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import { createThemeMode } from "@/common/theme/theme.ts"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { loginTC, selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Path } from "@/common/routing"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { selectTheme } from "@/app/app-slice.ts"

export const Login = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = createThemeMode(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn])

  // или

  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main}/>
  // } (не работает этот вариант)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    dispatch(loginTC(data))
    reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Incorrect email address",
                },
              })}
            />

            {errors.email && <span className={s.error}>{errors.email.message}</span>}

            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...register("password", { required: "Password is required" })}
            />

            {errors.password && <span className={s.error}>{errors.password.message}</span>}

            <FormControlLabel
              label={"Remember me"}
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                  )}
                />
              }
            />

            <Button onClick={() => onSubmit} type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
