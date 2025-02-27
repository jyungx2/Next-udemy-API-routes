import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // store that in a db or in a file
    // 데이터를 저장할 파일 경로 설정
    const filePath = path.join(process.cwd(), "data", "feedback.json");

    // 기존 데이터 읽기
    const fileData = fs.readFileSync(filePath); // 파일이 존재하면 기존 데이터를 읽어오고, 존재하지 않으면 빈 배열을 기본값으로 설정
    const data = JSON.parse(fileData); // 기존 데이터를 JSON으로 변환한 후 새로운 피드백을 추가

    // 새로운 데이터 추가
    data.push(newFeedback);

    // 파일에 다시 저장
    fs.writeFileSync(filePath, JSON.stringify(data)); // 데이터 보관할 파일에 데이터를 JSON 스트링화하여 추가 (fs.writeFileSync 함수로 파일을 덮어씀)

    // 성공 응답 반환
    res.stats(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This works!" });
  }
}

export default handler;
