import { Box } from "@mui/system";
// import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Button, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { ImageGetRes } from "../../model/Response/ImageGetRes";
import { useParams } from "react-router-dom";
import { UserService } from "../../service/userService";
import { UserGetByIDReq } from "../../model/Response/UserGetByIdReq";

function UserInfoPage() {
  const params = useParams();
  const navigate = useNavigate();
  const imageService = new ImageService();
  const userService = new UserService();

  const user:string = params.uid!;
  const [images, setImage] = useState<ImageGetRes[]>([]);
  const [info, setInfo] = useState<UserGetByIDReq>();

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await imageService.getImagesByUid(user);
      const data: ImageGetRes[] = res.data;
      setImage(data);

      const resInfo = await userService.getByUid(user);
      const dataInfo: UserGetByIDReq = resInfo.data;
      setInfo(dataInfo);
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          width: 1300,
          height: 550,
          borderRadius: 10,
          marginTop: 10,
          backgroundColor: "#FFA928",
          display: "flex",
        }}
      >
        <div
          style={{
            justifyContent: "start",
            flexDirection: "column",
            display: "flex",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              justifyContent: "start",
              display: "flex",
              marginLeft: "50px",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                ml: 2,
                fontFamily: "Mitr, sans-serif",
              }}
              variant="h4"
            >
              ข้อมูลส่วนตัว
            </Typography>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "60px",
            }}
          >
            <div
              content="Data Profile"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ flexGrow: 1, display: "flex" }}>
                <CardMedia
                  sx={{
                    height: 120,
                    width: 120,
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid white",
                  }}
                  image={info?.image}
                  component="img"
                />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                <div>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      ml: 2,
                      fontFamily: "Mitr, sans-serif",
                    }}
                    variant="h5"
                  >
                    ชื่อผู้ใช้
                  </Typography>
                </div>
                <div>
                  <TextField
                    // placeholder="NameUser"
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: true,
                      startAdornment: (
                        <>
                          <h3>{info?.name}</h3>
                        </>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            content="Image"
            style={{
              flexDirection: "row",
              display: "flex",
              marginLeft: "100px",
              marginTop: "50px",
              width: "1100px"
            }}
          >
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={2.4} key={index}>
                  <CardMedia
                    sx={{
                      height: 160,
                      width: 160,
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid white",
                    }}
                    onClick={() => {
                      navigate(`/home/profile/${image.mid}`);
                    }}
                    image={image.path}
                  />
                </Grid>
              ))}

              {/* <Grid item xs={1.8}>
                <div style={{ backgroundColor: "white", borderRadius: 15 }}>
                  <Box
                    sx={{
                      height: 160,
                      width: 160,
                      borderRadius: 5,
                      borderColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddPhotoAlternateOutlinedIcon
                      sx={{
                        height: 100,
                        width: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    />
                  </Box>
                </div>
              </Grid> */}
            </Grid>
          </div>
        </div>
      </Box>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "end",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#FFA928" }}
          sx={{
            width: "8pc",
            color: "white",
            borderRadius: 3,
            mr: 2,
            fontFamily: "Mitr, sans-serif",
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          ย้อนกลับ
        </Button>
      </div>
    </>
  );
}

export default UserInfoPage;
