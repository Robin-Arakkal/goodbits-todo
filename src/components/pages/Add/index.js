/** @format */

import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import todoAction from "../../../actions/todo-action";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const Add = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const todoItem = useSelector((state) => state.todo.todoItem);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm();
  const todos = JSON.parse(localStorage.getItem("todos"));
  const history = useHistory();
  useEffect(() => {
    if (params.id) dispatch(todoAction.todoDetails(params.id));
  }, [dispatch, params.id]);

  const onSubmit = (data) => {
    if (params.id) {
      const updatedData = todos.find((ele) => {
        return ele.id === params.id;
      });
      if (updatedData) {
        updatedData.title = data.title;
        updatedData.description = data.description;
      } else {
        updatedData.push({
          title: data.title,
          description: data.description ? data.description : "",
          status: false,
        });
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      swal({
        title: "Good job!",
        text: "You edited a item",
        icon: "success",
      }).then((isConfirm) => {
        if (isConfirm) {
          history.push("/");
          window.location.reload();
        }
      });
    } else {
      if (todos) {
        data.id = uuidv4();
        localStorage.setItem("todos", JSON.stringify([...todos, data]));
        swal({
          title: "Good job!",
          text: "You added a item",
          icon: "success",
        }).then((isConfirm) => {
          if (isConfirm) {
            history.push("/");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (params.id) reset(todoItem);
  }, [params.id, todoItem]);

  return (
    <>
      <Box sx={{ marginTop: "150px" }}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            {params.id ? "Edit Item" : "Add Item"}
          </Typography>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Title"
            variant="outlined"
            {...register("title", {
              required: "The field is required",
            })}
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            {...register("description")}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            {params.id ? "Update" : "Add"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Add;
