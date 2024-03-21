import {
  AppBar,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cat.png";
import { useEffect, useRef, useState } from "react";
import { UserService } from "../service/userService";
import { GetSystemRes } from "../model/Response/GetSystemRes";

function Header_Admin() {
  const user = JSON.parse(localStorage.getItem("objUser")!);

  const navigate = useNavigate();
  const userService = new UserService();

  const limitRef = useRef<HTMLInputElement>();

  const [system, setSystem] = useState<GetSystemRes>();
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog

  // Function เปิด dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  // Function ปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function navigateToLoginPage() {
    localStorage.removeItem("objUser");
    navigate("/");
  }
  function navigateToUserAllPage() {
    navigate(`/admin`);
  }
  function navigateToRankingPage() {
    navigate(`rank`);
  }

  async function getSystem() {
    const res = await userService.getSystemByUid(user.uid);
    const data: GetSystemRes = res.data;
    setSystem(data);
  }

  async function setLimit() {
    try {
      await userService.updateSystemLimit(user.uid, limitRef.current!.value);
      await getSystem();
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  }

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      getSystem();
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#FFA928" }}>
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
            onClick={navigateToUserAllPage}
          >
            บัญชีผู้ใช้งาน
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
              mr: 2,
              fontFamily: "Mitr, sans-serif",
            }}
            onClick={() => {
              handleOpenDialog();
            }}
          >
            เวลาการโหวต
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
            ล็อกเอาท์
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dialog แก้ไขเวลาในการโหวต */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>แก้ไขเวลาในการโหวต</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={limitRef}
            sx={{ m: 1, width: "40ch" }}
            InputProps={{
              sx: { borderRadius: "50px", bgcolor: "white" },
              readOnly: false,
              defaultValue: system?.limit,
            }}
          />
        </DialogContent>
        <DialogActions>
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
              if (limitRef.current?.value) {
                setLimit();
              }
            }}
          >
            แก้ไขข้อมูล
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header_Admin;
