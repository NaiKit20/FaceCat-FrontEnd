import { Box } from "@mui/system";
import "./detailImagePage.css";
import { Button, CardMedia, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { VoteService } from "../../service/voteService";
import { CalScoreRes } from "../../model/Response/calScoreRes";
import { BarChart } from "@mui/x-charts/BarChart";

function DetailImagePage() {
  const params = useParams();
  const navigate = useNavigate();
  const voteService = new VoteService();

  const mid = params.mid;
  const [score, setScore] = useState<CalScoreRes>();

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await voteService.calScore(mid!);
      const data: CalScoreRes = res.data;
      setScore(data);
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          width: 1000,
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
              <div style={{ marginTop: "20px" }}>
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
                width: 600,
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
                  width={650}
                  height={470}
                />
              ) : null}
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
}

export default DetailImagePage;
