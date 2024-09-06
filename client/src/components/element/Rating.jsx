export const Rating = ({ rating }) => {
  const safeRating = Math.min(Math.max(rating, 0), 5);

  const ratingArray = Array(5).fill(false);

  for (let index = 0; index < safeRating; index++) {
    ratingArray[index] = true;
  }
  return (
    <>
      {ratingArray.map((value, index) =>
        value ? (
          <i
            key={index}
            className="text-lg bi bi-star-fill text-yellow-500 mr-1"
          ></i>
        ) : (
          <i
            key={index}
            className="text-lg bi bi-star text-yellow-500 mr-1"
          ></i>
        )
      )}
    </>
  );
};
