import { NavLink } from "react-router-dom";

export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.endDate && new Date(review.endDate) <= currentDate;

  if(reviewExists) {
    return (
      <NavLink to={`/reviews/${review.campaignCode}`}>
            <div className="item-thumb rounded-3 mb-1 v-2 v-1 ">
              <img className="v-2 v-3" src={`/reviewImgs/${review.reviewFileList[0].fileSaveName}`} />
            </div>
            <h4>{review.reviewTitle}</h4>
            <h6>{review.orgName}</h6>
        </NavLink>
    )
  } else if (!reviewExists && isEndDateValid) {
    return (
          <div>
            <h4>{review.campaignTitle}</h4>
            <h6>{review.orgName}</h6>
            <NavLink to={`/reviews/reviewRegist/${review.campaignCode}`}>리뷰 등록하기</NavLink>
          </div>
    );
  }


}
