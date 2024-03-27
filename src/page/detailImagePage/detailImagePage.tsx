import { Box } from "@mui/system";
import "./detailImagePage.css";
import {
  Button,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { LineChart } from "@mui/x-charts/LineChart";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { VoteService } from "../../service/voteService";
import { CalScoreRes } from "../../model/Response/calScoreRes";
import { BarChart } from "@mui/x-charts/BarChart";
import { ImageService } from "../../service/imageService";
import imageUp from "../../assets/draw.png";

function DetailImagePage() {
  const params = useParams();
  const navigate = useNavigate();
  const voteService = new VoteService();
  const imageService = new ImageService();

  const nameRef = useRef<HTMLInputElement>();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const mid = params.mid;
  const [score, setScore] = useState<CalScoreRes>();
  const [isLoad, setIsLoad] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog

  // ทำงานเมื่อกดเพิ่มรูป
  async function selectFileImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setIsLoad(true);
      // ลบรูปเดิมออกก่อน
      await imageService.delete(score!.mid.toString());
      // เพิ่มรูปภาพ
      await imageService.insert(
        event.target.files[0],
        score!.uid.toString(),
        score!.name
      );
      navigate(-1);
    }
  }

  // สั่งเปิดเลือกไฟล์
  const openFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // Function เปิด dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  // Function ปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const loadDataAsync = async () => {
    const res = await voteService.calScore(mid!);
    const data: CalScoreRes = res.data;
    setScore(data);
  };

  // InitState
  useEffect(() => {
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          width: 1050,
          height: 550,
          borderRadius: 10,
          backgroundColor: "#FFA928",
          display: "flex",
        }}
      >
        <div
          style={{
            justifyContent: "start",
            flexDirection: "row",
            display: "flex",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              // marginLeft: "50px",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                marginLeft: "50px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "white" }}
                sx={{
                  height: "63px",
                  width: "50px",
                  color: "black",
                  borderRadius: 20,
                  fontFamily: "Mitr, sans-serif",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <KeyboardArrowLeftIcon sx={{ width: "50px", height: "50px" }} />
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "60px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {isMouseOver ? (
                <>
                  <CardMedia
                    component="img"
                    image={imageUp}
                    alt=""
                    sx={{
                      height: 180,
                      width: 180,
                      borderRadius: 40,
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid black",
                    }}
                    onMouseOut={() => setIsMouseOver(false)}
                    onClick={() => {
                      openFileInput();
                    }}
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={selectFileImage}
                  />
                </>
              ) : (
                <CardMedia
                  component="img"
                  image={score?.path}
                  alt=""
                  sx={{
                    height: 180,
                    width: 180,
                    borderRadius: 40,
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid white",
                  }}
                  onMouseOver={() => {
                    if(user.uid == score?.uid) {
                      setIsMouseOver(true);
                    }
                  }}
                />
              )}

              <div
                style={{ marginTop: "20px" }}
                onClick={() => {
                  if (user.uid == score?.uid) {
                    handleOpenDialog();
                  }
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                  }}
                  variant="h3"
                >
                  {score?.name}
                </Typography>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "50px",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                width: 650,
                height: 450,
                borderRadius: 10,
                backgroundColor: "white",
                display: "flex",
              }}
            >
              {score != undefined ? (
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: score.date,
                    },
                  ]}
                  series={[{ data: score.score }]}
                  width={700}
                  height={470}
                />
              ) : null}
            </Box>
          </div>
        </div>
      </Box>

      {/* Dialog แก้ไขเวลาในการโหวต */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>แก้ไขชื่อรูป</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={nameRef}
            sx={{ m: 1, width: "40ch" }}
            InputProps={{
              sx: { borderRadius: "50px", bgcolor: "white" },
              readOnly: false,
              defaultValue: score?.name,
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
            onClick={async () => {
              if (nameRef.current?.value) {
                await imageService.putImagesEdit(
                  score!.mid.toString(),
                  nameRef.current?.value
                );

                loadDataAsync();
                handleCloseDialog();
              }
            }}
          >
            แก้ไขข้อมูล
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog LoadEdit */}
      <Dialog open={isLoad}>
        <DialogContent>
        <CircularProgress style={{ color: "black" }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DetailImagePage;
