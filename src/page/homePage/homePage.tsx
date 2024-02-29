import { Box } from "@mui/system";
import Header from "../../component/Header";
import { CardMedia, TextField, Typography } from "@mui/material";

function HomePage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: 1700,
          height: 700,
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
              variant="h3"
            >
              ข้อมูลส่วนตัว
            </Typography>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "100px",
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
                    height: 140,
                    width: 140,
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="src/img/profile.jpg"
                />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  marginLeft: "50px",
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
                    sx={{ m: 1, width: "50ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      startAdornment: 
                      <>
                        <h3>Prapanpong</h3>
                      </>,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  marginLeft: "50px",
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
                    // placeholder="Gmail"
                    sx={{ m: 1, width: "50ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      startAdornment: 
                      <>
                        <h3>Prapanpong@gmail.com</h3>
                      </>,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  marginLeft: "50px",
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
                    // placeholder="Password"
                    sx={{ m: 1, width: "50ch" }}
                    InputProps={{
                      sx: { borderRadius: "50px", bgcolor: "white" },
                      startAdornment: 
                      <>
                        <h3>1234</h3>
                      </>,
                    }}
                  />
                </div>
              </div>
            </div>
            <div content="Image"></div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default HomePage;