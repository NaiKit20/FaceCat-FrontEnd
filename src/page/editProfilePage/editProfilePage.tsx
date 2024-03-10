import {
  Typography,
  CardMedia,
  TextField,
  Grid,
  Button,
  Alert,
  Dialog,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ChangeEvent, useRef, useState } from "react";
import { UserService } from "../../service/userService";

function EditProfilePage() {
  const navigate = useNavigate();
  const userService = new UserService();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("objUser")!)
  );

  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  // dialog
  const [dialog, setDialog] = useState(false);

  // upload file ตั้งค่า styled ให้ input ไม่แสดงผลให้เห็นแต่ยังใช้งานได้
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // ทำงานเมื่อกดเปลี่ยนรูป avatar ของ user
  async function selectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      // แก้ไขรูป user
      console.log("Uploadding...");
      const res = await userService.avatar(event.target.files[0], user.uid);
      console.log("Success");
      // แก้ไขข้อมูลใน localstorage
      user.image = res.data["result"];
      localStorage.setItem("objUser", JSON.stringify(user));
      setUser(JSON.parse(localStorage.getItem("objUser")!));
    }
  }

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
              marginLeft: "80px",
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
                <Box>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        height: 30,
                        width: 20,
                        borderRadius: 20,
                      }}
                      color="primary"
                      onClick={() => {
                        console.log("avatar");
                      }}
                    >
                      <ModeEditIcon
                        sx={{
                          height: 20,
                          width: 20,
                        }}
                      />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                      />
                    </Button>
                  </div>

                  <CardMedia
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid red",
                    }}
                    image={user.image}
                  />
                </Box>
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
                    inputRef={nameRef}
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: false,
                      defaultValue: user.name,
                    }}
                  />
                </div>
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
                    อีเมล
                  </Typography>
                </div>
                <div>
                  <TextField
                    inputRef={emailRef}
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: false,
                      defaultValue: user.email,
                    }}
                  />
                </div>
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
                    รหัสผ่าน
                  </Typography>
                </div>
                <div>
                  <TextField
                    inputRef={passRef}
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: false,
                      defaultValue: user.pass,
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
              // justifyContent: "space-between",
              marginLeft: "100px",
              marginTop: "10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2.3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                    }}
                    color="error"
                  >
                    <ClearIcon
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  </Button>
                </div>
                <CardMedia
                  sx={{
                    height: 160,
                    width: 160,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="src/img/cat2.jpg"
                />
              </Grid>

              <Grid item xs={2.3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                    }}
                    color="error"
                  >
                    <ClearIcon
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  </Button>
                </div>
                <CardMedia
                  sx={{
                    height: 160,
                    width: 160,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="src/img/cat3.jpg"
                />
              </Grid>
              <Grid item xs={2.3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                    }}
                    color="error"
                  >
                    <ClearIcon
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  </Button>
                </div>
                <CardMedia
                  sx={{
                    height: 160,
                    width: 160,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="src/img/R.jpg"
                />
              </Grid>
              <Grid item xs={2.3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                    }}
                    color="error"
                  >
                    <ClearIcon
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  </Button>
                </div>
                <CardMedia
                  sx={{
                    height: 160,
                    width: 160,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="src/img/fox2.png"
                />
              </Grid>
              <Grid item xs={1.8}>
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
                      marginTop: "55px",
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
              </Grid>
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
          marginTop: "30px",
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
          onClick={async () => {
            setDialog(true);
          }}
        >
          บันทึก
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "white" }}
          sx={{
            width: "8pc",
            color: "black",
            borderRadius: 3,
            mr: 2,
            fontFamily: "Mitr, sans-serif",
          }}
          onClick={() => navigate(-1)}
        >
          ยกเลิก
        </Button>
      </div>

      {/* ยืนยันการแก้ไข */}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={async () => {
                try {
                  if (
                    nameRef.current?.value &&
                    emailRef.current?.value &&
                    passRef.current?.value
                  ) {
                    const res = await userService.update(
                      user.uid,
                      nameRef.current?.value,
                      emailRef.current?.value,
                      passRef.current?.value
                    );
                    if (res.status == 200) {
                      // เก็บข้อมูลผู้ใช้ใน localStorage เมื่อ login สำเร็จ
                      const userUpdate = {
                        uid: user.uid,
                        email: emailRef.current?.value,
                        pass: passRef.current?.value,
                        image: user.image,
                        name: nameRef.current?.value,
                      };
                      localStorage.setItem(
                        "objUser",
                        JSON.stringify(userUpdate)
                      );
                      // ย้อนกลับไปหน้า profile
                      navigate(-1);
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              แก้ไข
            </Button>
          }
        >
          แน่ใจนะกว่าจะแก้ไข
        </Alert>
      </Dialog>
    </>
  );
}

export default EditProfilePage;
