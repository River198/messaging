// react imports
import React, { useEffect } from "react";

// mui imports
import { makeStyles } from "@mui/styles";
import {
  Alert,
  Box,
  Button,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

// context imports
import { useAuth } from "../../Contexts/AuthContext";

// react-spinners-kit imports
import { CircleSpinner } from "react-spinners-kit";

const useStyles = makeStyles({
  // styles
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#e1ffc7",
  },
  formContainer: {
    minWidth: "400px",
    maxWidth: "90vw",
    background: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    marginTop: "40px",
    width: "100%",
  },
});

export const SignIn = () => {
  const { signIn, loading, disabled, error, setError } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);
  return (
    // the container for all children of this component
    <Box
      className={classes.root}
      style={{
        background: loading && "white !important",
      }}
    >
      {
        // using a tenary to make the app show as loading when the user is yet to be authenticated or after they are authenticated
        loading ? (
          <CircleSpinner size={30} color="#686769" loading={loading} />
        ) : (
          <Paper className={classes.formContainer}>
            <Typography variant="h3" sx={{ marginTop: "30px" }}>
              Sign In
            </Typography>
            <FormGroup className={classes.formGroup}>
              {/* using the signin function and disabled state variable from the auth context */}
              <Button disabled={disabled} onClick={signIn} variant="contained">
                Sign In with Google
              </Button>
              {/* display an error alert if there's an error */}
            </FormGroup>
            {error && (
              <FormGroup className={classes.formGroup}>
                <Alert severity="error">{error}</Alert>
              </FormGroup>
            )}
          </Paper>
        )
      }
    </Box>
  );
};
