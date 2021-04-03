function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? "좋아요 취소" : "좋아요";
  return React.createElement(
    "button",
    { onClick: () => setLiked(!liked) },
    text
  );
}

const domConatiner1 = document.getElementById("root1");
ReactDOM.render(React.createElement(LikeButton), domConatiner1);
const domConatiner2 = document.getElementById("root2");
ReactDOM.render(React.createElement(LikeButton), domConatiner2);
const domConatiner3 = document.getElementById("root3");
ReactDOM.render(React.createElement(LikeButton), domConatiner3);
