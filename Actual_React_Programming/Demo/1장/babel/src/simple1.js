function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? "좋아요 취소" : "좋아요";
  return <button onClick={() => setLiked(!liked)}>{text}</button>;
  // return React.createElement(
  //   "button",
  //   { onClick: () => setLiked(!liked) },
  //   text
  // );
}

function Container() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <LikeButton />
      <div>
        <span>현재카운트</span>
        <span style={{ marginRight: 10, color: "green" }}>{count}</span>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  );
  // return React.createElement(
  //   "div",
  //   null,
  //   React.createElement(LikeButton),
  //   React.createElement(
  //     "div",
  //     { style: { marginTop: 20 } },
  //     React.createElement("span", null, "현재 카운트: "),
  //     React.createElement("span", { style: { marginRight: 10 } }, count),
  //     React.createElement(
  //       "button",
  //       { onClick: () => setCount(count + 1) },
  //       "증가"
  //     ),
  //     React.createElement(
  //       "button",
  //       { onClick: () => setCount(count - 1) },
  //       "감소"
  //     )
  //   )
  // );
}

const domContainer = document.getElementById("root");
ReactDOM.render(React.createElement(Container), domContainer);
