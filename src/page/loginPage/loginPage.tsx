import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/cat.png";
import { useRef, useState } from "react";
import { UserService } from "../../service/userService";
import { UserPostRes } from "../../model/Response/UserPostRes";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();

  const userservice = new UserService();

  const navigate = useNavigate();

  // Loading
  const [isLoad, setLoad] = useState(false);

  return (
    <>
      <Container fixed>
        <Box
          margin={"0 auto"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          sx={{
            width: 500,
            height: 650,
            borderRadius: 5,
            backgroundColor: "#FFA928",
          }}
        >
          <div>
            <Box
              marginTop={"50px"}
              sx={{
                width: 150,
                height: 150,
                borderRadius: 20,
                bgcolor: "white",
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardMedia
                  sx={{
                    height: 130,
                    width: 130,
                    borderRadius: 20,
                    // display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 1.5,
                  }}
                  image={logo}
                />
              </div>
            </Box>
            <div>
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Mitr, sans-serif",
                }}
                variant="h4"
                marginTop={"5px"}
              >
                Face Cat
              </Typography>
            </div>
          </div>
          <div>
            <Box display={"flex"} flexDirection={"column"} margin={"50px"}>
              <div>
                <TextField
                  // id="outlined-start-adornment"
                  inputRef={emailRef}
                  placeholder="อีเมล"
                  sx={{ m: 1, width: "50ch" }}
                  InputProps={{
                    sx: { borderRadius: "50px", bgcolor: "white" },
                    startAdornment: (
                      <PersonIcon
                        fontSize="large"
                        sx={{ color: "black", marginRight: "20px" }}
                      />
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  inputRef={passRef}
                  placeholder="รหัสผ่าน"
                  sx={{ m: 1, width: "50ch" }}
                  type="password"
                  autoComplete="current-password"
                  InputProps={{
                    sx: { borderRadius: "50px", bgcolor: "white" },
                    startAdornment: (
                      <LockIcon
                        fontSize="large"
                        sx={{ color: "black", marginRight: "20px" }}
                      />
                    ),
                  }}
                />
              </div>
              <div>
                {isLoad ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress style={{ color: "white" }} />
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "white" }}
                    sx={{
                      width: "8pc",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      borderRadius: 50,
                      marginLeft: "140px",
                      marginTop: "30px",
                    }}
                    onClick={async () => {
                      try {
                        if (emailRef.current?.value && passRef.current?.value) {
                          setLoad(true)
                          const res = await userservice.login(
                            emailRef.current.value,
                            passRef.current.value
                          );
                          setLoad(false)
                          const login: UserPostRes[] = res.data;
                          if (res.status == 200) {
                            if (login[0].type < 1) {
                              // user
                              // เก็บข้อมูลผู้ใช้ใน localStorage เมื่อแก้ไขข้อมูล
                              localStorage.removeItem("objUser");
                              const user = {
                                uid: login[0].uid,
                                email: login[0].email,
                                pass: passRef.current.value,
                                image: login[0].image,
                                name: login[0].name,
                              };
                              localStorage.setItem(
                                "objUser",
                                JSON.stringify(user)
                              );
                              navigate("/home");
                            } else {
                              // admin
                              // เก็บข้อมูลผู้ใช้ใน localStorage เมื่อแก้ไขข้อมูล
                              localStorage.removeItem("objUser");
                              const user = {
                                uid: login[0].uid,
                                email: login[0].email,
                                pass: passRef.current.value,
                                image: login[0].image,
                                name: login[0].name,
                              };
                              localStorage.setItem(
                                "objUser",
                                JSON.stringify(user)
                              );
                              navigate("/admin");
                            }
                          }
                        }
                      } catch (error) {
                        setLoad(false)
                        console.log(error);
                        alert("ไม่พบข้อมูลผู้ใช้งาน!!!")
                      }
                    }}
                  >
                    เข้าสู่ระบบ
                  </Button>
                )}
              </div>
              <div>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Mitr, sans-serif",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="body2"
                >
                  หากยังไม่มีสมาชิกสมัครเลย
                  <Link to={"/register"} style={{ marginLeft: "10px" }}>
                    สมัครสมาชิก
                  </Link>
                </Typography>
              </div>
              <div>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Mitr, sans-serif",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="body2"
                >
                  ยังไม่เป็นสมาชิกก็สามารถ
                  <Link to={"/home"} style={{ marginLeft: "10px" }}>
                    เยี่ยมชมเว็ปไซต์
                  </Link>
                </Typography>
              </div>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
}
export default LoginPage;
