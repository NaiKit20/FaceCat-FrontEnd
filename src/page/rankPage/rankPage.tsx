import { Box, Container } from "@mui/system";
import {
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./rankPage.css";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { RankTodayYestRes } from "../../model/Response/RankTodayYestRes";
import { useNavigate } from "react-router-dom";

function RankPage() {
  const imageService = new ImageService();
  const [rank, setRank] = useState<RankTodayYestRes>();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const response = await imageService.rankImages();
      const ranks: RankTodayYestRes = response.data;
      setRank(ranks);
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container
        fixed
        sx={{ display: "flex", justifyContent: "space-between", width: "120%" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          sx={{
            width: 570,
            height: 630,
            borderRadius: 15,
            marginTop: "70px",
            backgroundColor: "#FFA928",
          }}
        >
          <div
            style={{
              justifyContent: "start",
              display: "flex",
              margin: "30px",
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
              วันนี้
            </Typography>
          </div>
          <div>
            <TableContainer
              style={{
                maxHeight: 450,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Table
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TableBody>
                  {rank?.today.slice(0, 10).map((image, index) => (
                    <TableRow key={index}>
                      <TableCell
                        onClick={() => {
                          if (user != null) {
                            navigate(`info/${image.uid}`);
                          }
                        }}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                          sx={{
                            width: 500,
                            height: 110,
                            borderRadius: 10,
                            //   marginTop: "50px",
                            backgroundColor: "white",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#FFA928",
                                fontFamily: "Mitr, sans-serif",
                                ml: 5,
                              }}
                              variant="h4"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <CardMedia
                              sx={{
                                height: 80,
                                width: 80,
                                borderRadius: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                ml: 3,
                              }}
                              image={image.path}
                            />
                          </div>
                          <div style={{ flexGrow: 1, display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                ml: 2,
                              }}
                              variant="h5"
                              overflow={"hidden"}
                            >
                              {image.name}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 2,
                              }}
                              variant="h4"
                            >
                              {image.result}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 2,
                              }}
                              variant="h3"
                            >
                              <FavoriteIcon
                                color="error"
                                fontSize="inherit"
                                sx={{ fontSize: "40px" }}
                              />
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 3,
                              }}
                              variant="h4"
                            >
                              {image.score}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          sx={{
            width: 570,
            height: 630,
            borderRadius: 15,
            marginTop: "70px",
            backgroundColor: "#FFA928",
          }}
        >
          <div
            style={{
              justifyContent: "start",
              display: "flex",
              margin: "30px",
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
              เมื่อวาน
            </Typography>
          </div>
          <div>
            <TableContainer
              style={{
                maxHeight: 450,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Table
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TableBody>
                  {rank?.yesterday.slice(0, 10).map((image, index) => (
                    <TableRow key={index}>
                      <TableCell
                        onClick={() => {
                          if (user != null) {
                            navigate(`info/${image.uid}`);
                          }
                        }}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                          sx={{
                            width: 500,
                            height: 110,
                            borderRadius: 10,
                            //   marginTop: "50px",
                            backgroundColor: "white",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#FFA928",
                                fontFamily: "Mitr, sans-serif",
                                ml: 5,
                              }}
                              variant="h4"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <CardMedia
                              sx={{
                                height: 80,
                                width: 80,
                                borderRadius: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                ml: 3,
                              }}
                              image={image.path}
                            />
                          </div>
                          <div style={{ flexGrow: 1, display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                ml: 2,
                              }}
                              variant="h5"
                              overflow={"hidden"}
                            >
                              {image.name}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 2,
                              }}
                              variant="h4"
                            ></Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 2,
                              }}
                              variant="h3"
                            >
                              <FavoriteIcon
                                color="error"
                                fontSize="inherit"
                                sx={{ fontSize: "40px" }}
                              />
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Mitr, sans-serif",
                                mr: 3,
                              }}
                              variant="h4"
                            >
                              {image.score}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default RankPage;
