import { Container, Box } from "@mui/system";
import {
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import "./votePage.css";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { Random, RandomImageRes } from "../../model/Response/RandomImageRes";

function VotePage() {
  const imageService = new ImageService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [randomImages, setRandom] = useState<RandomImageRes>();
  const [random, setRan] = useState<Random[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog
  const [objCal, setObjCal] = useState({
    win: "",
    wImg: "",
    Ew: 0,
    wScore: 0,
    wSum: 0,
    wNew: 0,
    lose: "",
    lImg: "",
    El: 0,
    lScore: 0,
    lSum: 0,
    lNew: 0,
  });

  const [result1, setResult1] = useState<string[]>([]);
  const [result2, setResult2] = useState<string[]>([]);

  // บันทึกข้อมูลการกดโหวตลงใน localstorage ว่า uid กดโหวต mid ไหนและเวลาที่สามารถกดได้อีก
  function vote(uid: string, mid: string, date: string) {
    localStorage.setItem(`${uid}:${mid}`, date.toString());
  }

  // Function เปิด dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function ปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // สุ่มรูปภาพใหม่
  async function randomImage() {
    // เก็บค่าข้อมูลที่จะสุ่ม
    const data: Random[] = [];
    // เวลาปัจจุบัน
    const time = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    // ดึงข้อมูลรูปภาพทั้งหมดที่จะนำมาสุ่ม
    const response = await imageService.random();
    const images: RandomImageRes = response.data;
    setRandom(images);
    // เก็บรูปภาพที่ยังไม่ถูกโหวต
    images.random.forEach((image) => {
      // user login
      if (user != null) {
        // เช็คว่ารูปที่ i ถูกโหวตหรือยัง
        if (localStorage.getItem(`${user.uid}:${image.mid}`) != null) {
          if (time > localStorage.getItem(`${user.uid}:${image.mid}`)!) {
            // รูปที่ i นั้นกดโหวตไปแล้ว แต่ถึงเวลาที่สามารถโหวตได้อีก จึงลบข้อมูลการกดโหวตออก
            localStorage.removeItem(`${user.uid}:${image.mid}`);
          }
        } else {
          // รูปภาพที่ยังไม่กดโหวต
          data.push(image);
        }
      } else {
        // เช็คว่ารูปที่ i ถูกโหวตหรือยัง
        if (localStorage.getItem(`null:${image.mid}`) != null) {
          if (time > localStorage.getItem(`null:${image.mid}`)!) {
            // รูปที่ i นั้นกดโหวตไปแล้ว แต่ถึงเวลาที่สามารถโหวตได้อีก จึงลบข้อมูลการกดโหวตออก
            localStorage.removeItem(`null:${image.mid}`);
          }
        } else {
          // รูปภาพที่ยังไม่กดโหวต
          data.push(image);
        }
      }
    });
    // สุ่มรูปภาพ
    const image1: Random = data[Math.floor(Math.random() * data.length)];
    let image2: Random = data[Math.floor(Math.random() * data.length)];
    // สุ่มอีกรูปใหม่จนกว่ารูปทั้ง2 ไม่ใช่รูปของคนคนเดียวกัน
    if (data.length > 1) {
      while (image1.mid == image2.mid) {
        image2 = data[Math.floor(Math.random() * data.length)];
      }
      setRan([image1, image2]);
    } else {
      setRan([]);
    }
  }

  // คำนวนคะแนนการโหวต
  async function calScore(
    win: string,
    wImg: string,
    Wname: string,
    Wscore: number,
    lose: string,
    lImg: string,
    Lname: string,
    Lscore: number
  ) {
    const K: number = 20;
    // ค่าคาดหวัดผลลัพธ์
    const Ew: number = 1 / (1 + 10 ** ((Lscore - Wscore) / 400));
    const El: number = 1 / (1 + 10 ** ((Wscore - Lscore) / 400));
    // คะแนนล่าสุด
    const w: number = Math.floor(Wscore + K * (1 - Ew));
    const l: number = Math.floor(Lscore + K * (0 - El));
    // เก็บการคำนวน
    setResult1([
      `E${Wname}=1/(1+10^(${Lscore}-${Wscore})/400) = ${Ew.toFixed(2)}`,
      `R${Wname} ทั้ง 2 กรณี โดยที่มีค่า K=20`,
      `(ชนะ) ${Wscore}+20(1-${Ew.toFixed(2)}) = ${Math.floor(Wscore + K * (1 - Ew))}`,
      `(แพ้) ${Wscore}+20(0-${Ew.toFixed(2)}) = ${Math.floor(Wscore + K * (0 - Ew))}`
    ]);
    setResult2([
      `E${Lname}=1/(1+10^(${Wscore}-${Lscore})/400) = ${El.toFixed(2)}`,
      `R${Lname} ทั้ง 2 กรณี โดยที่มีค่า K=20`,
      `(ชนะ) ${Lscore}+20(1-${El.toFixed(2)}) = ${Math.floor(Lscore + K * (1 - El))}`,
      `(แพ้) ${Lscore}+20(0-${El.toFixed(2)}) = ${Math.floor(Lscore + K * (0 - El))}`
    ]);
    // ผลการคำนวน
    setObjCal({
      win: Wname,
      wImg: wImg,
      Ew: Ew,
      wScore: Wscore,
      wSum: w - Wscore,
      wNew: w,
      lose: Lname,
      lImg: lImg,
      El: El,
      lScore: Lscore,
      lSum: l - Lscore,
      lNew: l,
    });
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
    // แสดงผลการคำนวน
    handleOpenDialog();
    // บันทึกว่า uid กดโหวต mid ไหนโดยบันทึกเวลาบอกด้วยว่าสามารถกดโหวตได้อีกตอนไหน
    if (user != null) {
      const time = new Date(
        new Date().getTime() + randomImages!.limit * 1000
      ).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      vote(user.uid, win, time);
    } else {
      const time = new Date(
        new Date().getTime() + randomImages!.limit * 1000
      ).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      vote("null", win, time);
    }
    // สุ่มรูปใหม่
    randomImage();
  }

  // InitState
  useEffect(() => {
    const loadDataAsync = async () => {
      randomImage();
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

          {random.length <= 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={100} style={{ color: "black" }} />
            </div>
          ) : (
            <div
              style={{
                width: "900px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* สุ่มรูปภาพมาแสดงผล */}
              {random?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (index == 0) {
                      calScore(
                        random[index].mid.toString(),
                        random[index].path,
                        random[index].name,
                        random[index].score,
                        random[1].mid.toString(),
                        random[1].path,
                        random[1].name,
                        random[1].score
                      );
                    } else {
                      calScore(
                        random[1].mid.toString(),
                        random[1].path,
                        random[1].name,
                        random[1].score,
                        random[0].mid.toString(),
                        random[0].path,
                        random[0].name,
                        random[0].score
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
          )}
        </Box>
      </Container>

      {/* Dialog เมื่อโหวตสำเร็จ */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        onClick={() => handleCloseDialog()}
        fullScreen
        sx={{
          margin: "0 auto",
          marginTop: "100px",
          width: "700px", // ปรับความกว้างตามที่ต้องการ
          height: "500px", // ปรับความสูงตามที่ต้องการ
        }}
      >
        <DialogTitle>ผลลัพธ์</DialogTitle>
        <DialogContent>
          <div
            style={{
              margin: "0 auto",
              padding: "0",
              display: "flex",
              width: "90%",
              height: "400px",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
                component="img"
                image={objCal.wImg}
              />
              <h4
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {objCal.win} (ชนะ)
              </h4>
              <br />
              <p>ค่าคาดหวังคือ: {objCal.Ew.toFixed(2)}</p>
              <p>คะแนนเดิมมีอยู่: {objCal.wScore}</p>
              <p>ได้คะแนนเพิ่มขึ้น: {objCal.wSum}</p>
              <p>คะแนนใหม่ที่ได้คือ: {objCal.wNew}</p>

              <br />
              <h4>คำนวนจาก</h4>
              <p>
              {result1[0]}
              </p>
              <p>
              {result1[1]}
              </p>
              <p>
              {result1[2]}
              </p>
              <p>
              {result1[3]}
              </p>
            </Box>
            <hr />
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
                component="img"
                image={objCal.lImg}
              />
              <h4
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {objCal.lose} (แพ้)
              </h4>
              <br />
              <p>ค่าคาดหวังคือ: {objCal.El.toFixed(2)}</p>
              <p>คะแนนเดิมมีอยู่: {objCal.lScore}</p>
              <p>คะแนนลดลง: {objCal.lSum}</p>
              {objCal.lNew < 0 ? (
                <p>คะแนนใหม่ที่ได้คือ: 0</p>
              ) : (
                <p>คะแนนใหม่ที่ได้คือ: {objCal.lNew}</p>
              )}

              <br />
              <h4>คำนวนจาก</h4>
              <p>
              {result2[0]}
              </p>
              <p>
              {result2[1]}
              </p>
              <p>
              {result2[2]}
              </p>
              <p>
              {result2[3]}
              </p>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VotePage;
