import { AppBar, Button, CardMedia, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cat.png";

function HeaderGuest() {
  // const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();

  function navigateToLoginPage() {
    localStorage.removeItem("objUser");
    navigate("/");
  }
  function navigateToVotePage() {
    navigate(`/home`);
  }
  function navigateToRankingPage() {
    navigate(`/home/rank`);
  }
 
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: "#FFA928",
            justifyContent: "end",
            height: 80,
          }}
        >
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Box
              //   marginTop={"50px"}
              sx={{
                width: 70,
                height: 70,
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
                    height: 58,
                    width: 70,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0.8,
                  }}
                  image={logo}
                />
              </div>
            </Box>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "black",
                ml: 2,
                fontFamily: "Mitr, sans-serif",
              }}
              variant="h4"
              marginTop={"15px"}
            >
              Face Cat
            </Typography>
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "white" }}
            sx={{
              width: "8pc",
              color: "black",
              fontWeight: "Bold",
              borderRadius: 3,
              mr: 2,
              fontFamily: "Mitr, sans-serif",
            }}
            onClick={navigateToVotePage}
          >
            หน้าแรก
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "white" }}
            sx={{
              width: "8pc",
              color: "black",
              fontWeight: "Bold",
              borderRadius: 3,
              mr: 2,
              fontFamily: "Mitr, sans-serif",
            }}
            onClick={navigateToRankingPage}
          >
            จัดอันดับ
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "white" }}
            sx={{
              width: "8pc",
              color: "black",
              fontWeight: "Bold",
              borderRadius: 3,
              fontFamily: "Mitr, sans-serif",
            }}
            onClick={navigateToLoginPage}
          >
            ล็อกอิน
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderGuest;
