import { Box } from "@mui/system";
import "./detailImagePage.css";
import {
  Button,
  CardMedia,
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
import { useEffect, useRef, useState } from "react";
import { VoteService } from "../../service/voteService";
import { CalScoreRes } from "../../model/Response/calScoreRes";
import { BarChart } from "@mui/x-charts/BarChart";
import { ImageService } from "../../service/imageService";

function DetailImagePage() {
  const params = useParams();
  const navigate = useNavigate();
  const voteService = new VoteService();
  const imageService = new ImageService();
  const nameRef = useRef<HTMLInputElement>();

  const user = JSON.parse(localStorage.getItem("objUser")!);
  const mid = params.mid;
  const [score, setScore] = useState<CalScoreRes>();
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog

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
              />
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
    </>
  );
}

export default DetailImagePage;
