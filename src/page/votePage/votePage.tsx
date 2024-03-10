import { Container, Box } from "@mui/system";
import { CardMedia, Typography } from "@mui/material";
import "./votePage.css";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { RandomRes as ImageGetRes } from "../../model/Response/RandomRes";

function VotePage() {
  const imageService = new ImageService();
  const [randomImages, setRandom] = useState<ImageGetRes[]>([]);

  // สุ่มรูปภาพใหม่
  async function randomImage() {
    const response = await imageService.random();
    const images: ImageGetRes[] = response.data;
    setRandom(images);
  }

  async function calScore(
    win: string,
    Wname: string,
    Wscore: number,
    lose: string,
    Lname: string,
    Lscore: number
  ) {
    const K: number = 10;
    // ค่าคาดหวัดผลลัพธ์
    const Ew: number = 1 / (1 + 10 ** ((Lscore - Wscore) / 400));
    const El: number = 1 / (1 + 10 ** ((Wscore - Lscore) / 400));
    // คะแนนล่าสุด
    const w: number = Math.floor(Wscore + K * (1 - Ew));
    const l: number = Math.floor(Lscore + K * (0 - El));
    // ผลการคำนวน
    console.log(
      Wname +
        " ชนะ\nโดยมีค่าคาดหวังอยู่: " +
        Ew +
        "\nคะแนนเดิมมี: " +
        Wscore +
        "\nเพิ่ม: " +
        (w - Wscore).toString() +
        "\nคะแนนเพิ่มขึ้นเป็น: " +
        w
    );
    console.log(
      Lname +
        " แพ้\nโดยมีค่าคาดหวังอยู่: " +
        El +
        "\nคะแนนเดิมมี: " +
        Lscore +
        "\nลด: " +
        (l - Lscore).toString() +
        "\nคะแนนลดลงเหลือ: " +
        l
    );
    // กำหนดไม้ให้ผู้แพ้ไม่มีคะแนนติดลบ โดยให้ลดได้จนถึง 0
    if (l < 0) {
      await imageService.vote(
        win,
        (w - Wscore).toString(),
        lose,
        (Lscore * -1).toString()
      );
    } else {
      await imageService.vote(
        win,
        (w - Wscore).toString(),
        lose,
        (l - Lscore).toString()
      );
    }
    // สุ่มรูปใหม่
    randomImage();
  }

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      const response = await imageService.random();
      const images: ImageGetRes[] = response.data;
      setRandom(images);
    };
    loadDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  if (index == 0) {
                    calScore(
                      randomImages[index].mid.toString(),
                      randomImages[index].name,
                      randomImages[index].score,
                      randomImages[1].mid.toString(),
                      randomImages[1].name,
                      randomImages[1].score
                    );
                  } else {
                    calScore(
                      randomImages[1].mid.toString(),
                      randomImages[1].name,
                      randomImages[1].score,
                      randomImages[0].mid.toString(),
                      randomImages[0].name,
                      randomImages[0].score
                    );
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
                    image={image.path}
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
                    {image.name} {image.score}
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
