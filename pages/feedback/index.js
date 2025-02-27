import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // 🚨구글의 firebase와 같은 외부 API가 아닌, 한 프로젝트 내에 있는 api 폴더에 접근하여 데이터를 가져올 때는 fetch()함수를 이용하지 못한다!🚨
  // 대신, api/feedback.js에 있는 로직을 그대로 이곳에 작성해야 함! (필요한 함수들은 임포트하여 쓴다)
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
