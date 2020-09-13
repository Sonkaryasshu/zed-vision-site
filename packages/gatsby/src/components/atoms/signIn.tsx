import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mainPadding: {
    padding: theme.spacing(2),
    minWidth: "400px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: React.FC<{ email?: string }> = ({ email }) => {
  const classes = useStyles();

  const SignUpComp = () => (
    <Paper className={classes.mainPadding} elevation={2}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={(e) => console.log("onChange", e.target.value)}
          autoComplete="email"
          autoFocus
          // {...(!!email ? { value: email } : {})}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignUpComp />
    </Container>
  );
};

export default SignIn;
