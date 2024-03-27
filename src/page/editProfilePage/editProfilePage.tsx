import {
  Typography,
  CardMedia,
  TextField,
  Grid,
  Button,
  Alert,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { Box, styled } from "@mui/system";
// import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserService } from "../../service/userService";
import { ImageService } from "../../service/imageService";
import { ImageGetRes } from "../../model/Response/ImageGetRes";

function EditProfilePage() {
  const navigate = useNavigate();
  const userService = new UserService();
  const imageService = new ImageService();
  // Loading
  const [isLoad, setLoad] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("objUser")!)
  );

  const [images, setImage] = useState<ImageGetRes[]>([]);
  const [imageDelete, setImageDelete] = useState<string>(" ");

  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const passCfRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const imageNameRef = useRef<HTMLInputElement>();

  // dialog
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [alertShow, setAlertShow] = useState("แน่ใจนะว่าจะแก้ไข");

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
      // console.log("Uploadding...");
      const res = await userService.avatar(event.target.files[0], user.uid);
      // console.log("Success");
      // แก้ไขข้อมูลใน localstorage
      user.image = res.data["result"];
      localStorage.setItem("objUser", JSON.stringify(user));
      setUser(JSON.parse(localStorage.getItem("objUser")!));
    }
  }

  // ทำงานเมื่อกดเพิ่มรูป
  async function selectFileImage(event: ChangeEvent<HTMLInputElement>) {
    if (imageNameRef.current?.value != "") {
      if (event.target.files) {
        // เพิ่มรูปภาพ
        setLoad(true);
        await imageService.insert(
          event.target.files[0],
          user.uid,
          imageNameRef.current!.value
        );
        setLoad(false);
        loadImages();
      }
    }
  }

  async function loadImages() {
    const res = await imageService.getImagesByUid(user.uid);
    const data: ImageGetRes[] = res.data;
    setImage(data);
  }

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await imageService.getImagesByUid(user.uid);
      const data: ImageGetRes[] = res.data;
      setImage(data);
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
                      border: "2px solid white",
                    }}
                    component={"img"}
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
                    sx={{ m: 1, width: "25ch" }}
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
                    sx={{ m: 1, width: "30ch" }}
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
                    sx={{ m: 1, width: "30ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: false,
                      // defaultValue: user.pass,
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
                    ยืนยันรหัสผ่าน
                  </Typography>
                </div>
                <div>
                  <TextField
                    inputRef={passCfRef}
                    sx={{ m: 1, width: "30ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      readOnly: false,
                      // defaultValue: user.pass,
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
              marginTop: "50px",
            }}
          >
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={2.3} key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      width: "90%",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: 10,
                        borderRadius: 100,
                      }}
                      color="error"
                      onClick={async () => {
                        setImageDelete(image.mid.toString());
                        setDialogDelete(true);
                      }}
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
                      marginTop: "-30px",
                    }}
                    image={image.path}
                  />
                </Grid>
              ))}

              {images.length < 5 ? (
                <Grid item xs={1.8} style={{ marginTop: "30px" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 15,
                    }}
                  >
                    <Box
                      sx={{
                        height: 160,
                        width: 160,
                        borderRadius: 5,
                        borderColor: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {isLoad ? (
                        <CircularProgress style={{ color: "black" }} />
                      ) : (
                        <>
                          <TextField
                            inputRef={imageNameRef}
                            sx={{ m: 1, width: "80%" }}
                            InputProps={{
                              sx: { borderRadius: "30px", bgcolor: "white" },
                              readOnly: false,
                            }}
                            placeholder="ใส่ชื่อก่อน!"
                          />
                          <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            sx={{ borderRadius: "30px", width: "80%" }}
                          >
                            เพิ่มรูปภาพ
                            <VisuallyHiddenInput
                              type="file"
                              accept="image/*"
                              onChange={selectFileImage}
                            />
                          </Button>
                        </>
                      )}
                    </Box>
                  </div>
                </Grid>
              ) : null}
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
            setAlertShow("แน่ใจนะว่าจะแก้ไข");
            setDialogEdit(true);
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
        open={dialogEdit}
        onClose={() => setDialogEdit(false)}
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
                    passRef.current?.value &&
                    passCfRef.current?.value &&
                    (passRef.current?.value == passCfRef.current?.value)
                  ) {
                    const res = await userService.update(
                      user.uid,
                      nameRef.current?.value,
                      emailRef.current?.value,
                      passRef.current?.value
                    );
                    if (res.status == 200) {
                      // เก็บข้อมูลผู้ใช้ใน localStorage เมื่อ update สำเร็จ
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
                  } else {
                    setAlertShow("ข้อมูลไม่ถูกต้อง");
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
          {alertShow}
        </Alert>
      </Dialog>

      {/* ยืนยันการลบรูป */}
      <Dialog
        open={dialogDelete}
        onClose={() => {
          setDialogDelete(false);
        }}
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
                  await imageService.delete(imageDelete);
                  loadImages();
                  setDialogDelete(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              ลบ
            </Button>
          }
        >
          แน่ใจนะว่าจะลบรูปนี้
        </Alert>
      </Dialog>
    </>
  );
}

export default EditProfilePage;
