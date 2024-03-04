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
import { ImageGetRes } from "../../model/Response/ImageGetRes";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";

function RankPage() {
  const imageService = new ImageService();
  const [images, setImages] = useState<ImageGetRes[]>([]);
  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const response = await imageService.getImages();
      const images: ImageGetRes[] = response.data;
      setImages(images);
    };
    loadDataAsync();
  }, []);
  
  return (
    <>
      <Container fixed>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          sx={{
            width: 680,
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
              variant="h2"
            >
              จัดอันดับ
            </Typography>
          </div>
          <div >
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
                <TableBody >
                  {images.map((image, index) => (
                    
                    <TableRow key={index} >
                      <TableCell>
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          // justifyContent={"center"}
                          alignItems={"center"}
                          sx={{
                            width: 600,
                            height: 130,
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
                              variant="h3"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <CardMedia
                              sx={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                ml: 3,
                              }}
                              image={"http://localhost:3000/uploads/" + image.path}
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
                              variant="h4"
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
                              variant="h3"
                            >
                              <FavoriteIcon color="error" fontSize="inherit" />
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
                              variant="h3"
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