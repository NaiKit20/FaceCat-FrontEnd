import { Container, Box } from "@mui/system";
import { CardMedia, Typography } from "@mui/material";
import "./votePage.css";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { RandomRes as ImageGetRes } from "../../model/Response/RandomRes";
import { useParams } from "react-router-dom";

function VotePage() {
  const params = useParams();
  const uid = params.id;

  const imageService = new ImageService();
  const [randomImages, setRandom] = useState<ImageGetRes[]>([]);
  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const response = await imageService.random(uid!);
      const images: ImageGetRes[] = response.data;
      setRandom(images);
    };
    loadDataAsync();
  }, []);
  // สุ่มรูปภาพใหม่
  async function randomImage() {
    const response = await imageService.random(uid!);
    const images: ImageGetRes[] = response.data;
    setRandom(images);
  }

  return (
    <>
      <Container fixed>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"70px"}
        >
          <Typography
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //   fontWeight: "bold",
              color: "black",
              ml: 2,
              fontFamily: "Mitr, sans-serif",
            }}
            variant="h2"
          >
            คุณชอบอะไร?
          </Typography>
          <div
            style={{
              width: "900px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* สุ่มรูปภาพมาแสดงผล */}
            {randomImages.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  if(index == 0) {
                    console.log(randomImages[index].name + " win");
                    console.log(randomImages[1].name + " lose");
                  }else {
                    console.log(randomImages[1].name + " win");
                    console.log(randomImages[0].name + " lose");
                  }
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    height: 500,
                    borderRadius: 10,
                    backgroundColor: "#FFA928",
                    marginRight: 15,
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 300,
                      width: 300,
                      borderRadius: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    image={"http://localhost:3000/uploads/" + image.path}
                  />
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      color: "black",
                      // ml: 2,
                      fontFamily: "Mitr, sans-serif",
                    }}
                    variant="h2"
                    marginTop={"15px"}
                  >
                    {image.name}
                  </Typography>
                </Box>
              </div>
            ))}
          </div>
        </Box>
      </Container>
    </>
  );
}

export default VotePage;
