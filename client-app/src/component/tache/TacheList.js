import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { deleteTache } from "actions/tache";
import CustomizedDialog from "component/dialog/CustomizedDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeBGColor, generateBackground } from "utils/functions";

export default function TacheList({ filteredResults }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = (id) => {
    if (id) {
      dispatch(deleteTache(id))
        .then((response) => {
          console.log(response.data);
          if (!response.ok) {
            throw new Error("Failed to delete item");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(setIsLoading(false));
    }
    window.location.reload(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
    console.log("Dragging...");
  };

  return (
    <>
      {filteredResults &&
        filteredResults.map((data, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
              }}
            >
              <CardHeader
                titleTypographyProps={{ variant: "subtitle1" }}
                title={data.titre}
                avatar={
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: generateBackground(data.titre),
                    }}
                  >
                    {data.titre?.charAt(0)}
                  </Avatar>
                }
                action={
                  <>
                    <IconButton onClick={handleOpen}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                    <CustomizedDialog
                      text={"Supprimer ".concat(data.titre).concat("?")}
                      description={data.description}
                      open={open}
                      close={handleClose}
                      handleConfirmDelete={() => handleConfirm(data.id)}
                      handleConfirmCancel={handleClose}
                    />
                  </>
                }
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" gutterBottom>
                  {data.description}
                </Typography>
                <Typography>{data.date}</Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <TextField
                  size="small"
                  id="statut"
                  sx={{
                    backgroundColor: changeBGColor(data.statut),
                    width: 200,
                  }}
                  defaultValue={data.statut}
                  disabled
                ></TextField>

                <IconButton
                  aria-label="edit"
                  size="medium"
                  component="a"
                  href={`/updateTache/${data.id}`}
                >
                  <FontAwesomeIcon icon={faPenToSquare} color="#4D4D4D" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </>
  );
}
