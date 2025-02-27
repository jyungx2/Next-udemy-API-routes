import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      }); // /api/some-feedback-id
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
