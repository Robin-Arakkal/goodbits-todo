import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import todoAction from "../../../actions/todo-action";
import swal from "sweetalert";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";

import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";

export default function InteractiveList() {
  const todos = useSelector((state) => state.todo.list);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoAction.todoListing(JSON.parse(localStorage.getItem("todos"))));
  }, [dispatch]);

  const handleDelete = (id) => {
    const data = todos.filter((ele) => {
      return ele.id !== id;
    });

    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.setItem("todos", JSON.stringify(data));
        swal("Deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("cancelled");
      }
    });
  };

  const handleStrike = (id) => {
    const updatedData = todos.find((ele) => {
      return ele.id === id;
    });

    if (updatedData) {
      updatedData.status = true;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, margin: "auto" }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        ToDO List
      </Typography>
      <List>
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <ListItem
              divider
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    sx={{ marginRight: "10px" }}
                  >
                    <AddTaskIcon
                      onClick={() => handleStrike(todo.id)}
                    ></AddTaskIcon>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    sx={{ marginRight: "10px" }}
                  >
                    <EditIcon
                      onClick={() => {
                        history.push(`/edit/${todo.id}`);
                      }}
                    />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ marginRight: "10px" }}
                  >
                    <DeleteIcon onClick={() => handleDelete(todo.id)} />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                className={`${todo.status ? "strikeline" : ""}`}
                primary={todo.title}
                secondary={todo.description}
              />
            </ListItem>
          ))
        ) : (
          <div>
            <Typography variant="h6">Please add items</Typography>
          </div>
        )}
      </List>
      <Button
        variant="outlined"
        onClick={() => {
          history.push(`/add`);
        }}
      >
        Add
      </Button>
    </Box>
  );
}
