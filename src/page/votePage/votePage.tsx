import { Container, Box } from "@mui/system";
import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import "./votePage.css";
import { useEffect, useState } from "react";
import { ImageService } from "../../service/imageService";
import { RandomRes as ImageGetRes } from "../../model/Response/RandomRes";

function VotePage() {
  const imageService = new ImageService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [randomImages, setRandom] = useState<ImageGetRes[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog

  // ตั้งเวลาในการกดโหวตรูปภาพ
  function vote(uid: string, mid: string, date: string) {
    // console.log(localStorage.getItem(`${uid}:${mid}`));

    // เวลาปัจจุบัน
    const time = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // เช็คว่า uid กดโหวต mid นี้หรือยัง
    if (localStorage.getItem(`${uid}:${mid}`) == null) {
      localStorage.setItem(`${uid}:${mid}`, date.toString());
    } else {
      // ถ้ากดโหวตแล้วเช็คว่าเวลาที่โหวตสามารถกดได้อีกหรือไม่
      if (time > localStorage.getItem(`${uid}:${mid}`)!) {
        localStorage.removeItem(`${uid}:${mid}`);
        localStorage.setItem(`${uid}:${mid}`, date.toString());
      } else {
        console.log("ยังโหวตรูปนี้ไม่ได้");
      }
    }
    // setTimeout(() => {
    //   localStorage.removeItem(`${uid}:${mid}`);
    //   console.log(`${uid}:${mid}` + localStorage.getItem(`${uid}:${mid}`));
    // }, sec * 1000);
  }

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
    const response = await imageService.random();
    const images: ImageGetRes[] = response.data;
    setRandom(images);
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
    // if (l < 0) {
    //   await imageService.vote(
    //     win,
    //     (w - Wscore).toString(),
    //     lose,
    //     (Lscore * -1).toString()
    //   );
    // } else {
    //   await imageService.vote(
    //     win,
    //     (w - Wscore).toString(),
    //     lose,
    //     (l - Lscore).toString()
    //   );
    // }
    // แสดงผลการคำนวน
    handleOpenDialog();
    // สุ่มรูปใหม่
    randomImage();

    // test
    if (user != null) {
      const time = new Date(
        new Date().getTime() + 10 * 1000
      ).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      vote(user.uid, win, time);
      // console.log(
      //   new Date().toLocaleTimeString(undefined, {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //     second: "2-digit",
      //   })
      // );
    } else {
      const time = new Date(
        new Date().getTime() + 20 * 1000
      ).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      vote("null", win, time);
      // console.log(
      //   new Date().toLocaleTimeString(undefined, {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //     second: "2-digit",
      //   })
      // );
    }

    //   if (user != null) {
    //     // user ได้ login เข้าระบบ
    //     if (localStorage.getItem(`${user.uid}:${win}`) == null) {
    //       // user ยังไม่ได้โหวตรูปนี้ภายในเวลาที่กำหนด
    //       vote(user.uid, win, 5);
    //     } else {
    //       console.log("ยังกดไม่ได้");
    //     }
    //   } else {
    //     // user ไม่ได้ login เข้าระบบ
    //     if (localStorage.getItem(`null:${win}`) == null) {
    //       // user ยังไม่ได้โหวตรูปนี้ภายในเวลาที่กำหนด
    //       vote("null", win, 5);
    //     } else {
    //       console.log("ยังกดไม่ได้");
    //     }
    //   }
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
                      randomImages[index].path,
                      randomImages[index].name,
                      randomImages[index].score,
                      randomImages[1].mid.toString(),
                      randomImages[1].path,
                      randomImages[1].name,
                      randomImages[1].score
                    );
                  } else {
                    calScore(
                      randomImages[1].mid.toString(),
                      randomImages[1].path,
                      randomImages[1].name,
                      randomImages[1].score,
                      randomImages[0].mid.toString(),
                      randomImages[0].path,
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

      {/* Dialog เมื่อโหวตสำเร็จ */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        onClick={() => handleCloseDialog()}
      >
        <DialogTitle>ผลลัพธ์</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              width: "500px",
              height: "300px",
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
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VotePage;
