import { CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGetByIDReq } from "../../model/Response/UserGetByIdReq";
import { UserService } from "../../service/userService";

function AdminUserPage() {
  const navigate = useNavigate();
  const userService = new UserService();

  const [users, setUser] = useState<UserGetByIDReq[]>([]);

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await userService.getAll();
      const data: UserGetByIDReq[] = res.data;
      setUser(data);
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {users.length > 8 ? (
        <div
          style={{ marginTop: "300px", widows: "100px", height: "100px" }}
        ></div>
      ) : null}
      <Grid sx={{ flexGrow: 1, border: "1px solid red" }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container display={"flex"} justifyContent="center" spacing={8}>
            {users.map((user, index) => (
              <Grid key={index} item>
                <Paper
                  onClick={() => navigate(`info/${user.uid}`)}
                  sx={{
                    height: 250,
                    width: 200,
                    borderRadius: 10,
                    bgcolor: "#FFA928",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <CardMedia
                      sx={{
                        height: 100,
                        width: 100,
                        borderRadius: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "30px",
                        border: "2px solid white",
                      }}
                      component="img"
                      image={user.image}
                    />
                  </div>
                  <div style={{ flexGrow: 1, display: "flex" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                      }}
                      variant="h4"
                    >
                      {user.name}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminUserPage;
