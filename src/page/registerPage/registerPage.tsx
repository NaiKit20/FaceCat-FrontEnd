import { CardMedia, Typography, TextField, Button } from "@mui/material";
import { Container, Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useRef } from "react";
import logo from "../../assets/cat.png";
import { UserService } from "../../service/userService";

function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const cfpassRef = useRef<HTMLInputElement>();

  const userservice = new UserService();

  const navigate = useNavigate();

  return (
    <>
      <Container fixed>
        <Box
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
            <Box display={"flex"} flexDirection={"column"}>
              <div>
                <TextField
                  // id="outlined-start-adornment"
                  inputRef={nameRef}
                  placeholder="ชื่อผู้ใช้งาน"
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
                  // id="outlined-start-adornment"
                  inputRef={emailRef}
                  placeholder="อีเมล"
                  sx={{ m: 1, width: "50ch" }}
                  InputProps={{
                    sx: { borderRadius: "50px", bgcolor: "white" },
                    startAdornment: (
                      <EmailIcon
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
                <TextField
                  inputRef={cfpassRef}
                  placeholder="ยืนยันรหัสผ่าน"
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
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white" }}
                  sx={{
                    width: "8pc",
                    color: "black",
                    borderRadius: 50,
                    marginLeft: "140px",
                    marginTop: "10px",
                    fontFamily: "Mitr, sans-serif",
                  }}
                  onClick={async () => {
                    try {
                      if (
                        nameRef.current?.value &&
                        emailRef.current?.value &&
                        passRef.current?.value == cfpassRef.current?.value
                      ) {
                        const res = await userservice.register(
                          nameRef.current!.value,
                          emailRef.current!.value,
                          passRef.current!.value
                        );
                        if (res.status == 201) {
                          console.log(res.data);
                          navigate(-1);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  สมัครสมาชิก
                </Button>
              </div>
              <div>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Mitr, sans-serif",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="body2"
                >
                  หากมีสมาชิกแล้ว
                  <Link
                    to={"/"}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Mitr, sans-serif",
                    }}
                  >
                    เข้าสู่ระบบ
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
export default RegisterPage;
