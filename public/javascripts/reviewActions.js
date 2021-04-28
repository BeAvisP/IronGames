window.onload = () => {
  const axiosHandler = new AxiosHandler("http://localhost:3000");

  let removeReview = document.querySelectorAll(".remove-review");
  const container = document.querySelector(".review-container");

  const callRemove = () => {
    removeReview.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.children[0].innerHTML;
        axiosHandler
          .removeReview(id)
          .then((res) => {
            container.innerHTML = "";
            res.data.forEach(
              ({
                _doc: {
                  user: { _id, name },
                  comment,
                  created_at,
                  downvote,
                  upvote,
                  _id: reviewID
                },
                sessionUserRev,
              }) => {
                container.innerHTML += `
            <a href="/profile/${_id}">${name}</a>
            ${comment}
            ${
              sessionUserRev
                ? `
            <form action="/review/${reviewID}/edit" method="GET">
            <button type="submit"><i class="far fa-edit"></i></button>
            </form>
            <button class="remove-review">Eliminar <span class="hide">${reviewID}</span></button>
            `
                : ``
            }
            ${created_at}
            ${
              !sessionUserRev
                ? `<form action="/review/${_id}/upvote" method="POST">
            <button type="submit"><i class="far fa-thumbs-up"></i>${upvote}</button>
            </form>
            <form action="/review/${_id}/downvote" method="POST">
            <button type="submit"><i class="far fa-thumbs-down"></i>${downvote}</button>
            </form>`
                : ``
            }
            `;
              }
            );
            removeReview = document.querySelectorAll(".remove-review");
            console.log(removeReview);
            callRemove();
          })
      });
    });
  };
  callRemove();
};
