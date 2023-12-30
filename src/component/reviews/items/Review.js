import { NavLink } from "react-router-dom";

export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  const reviewCode = review.reviewCode;
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.campaignEndDate && new Date(review.campaignEndDate) <= currentDate;

  const currentUrl = window.location.href;
  const memberUI = currentUrl.includes('http://localhost:3000/reviews');
  const orgUI = currentUrl.includes('http://localhost:3000/myPageOrg/review');


    return (
      review && (
      reviewExists === true ? (
      <NavLink to={`/reviews/${reviewCode}`}>
        <div style={{width: 300+"px"}}>
            <img className="v-2 v-3 item-thumb rounded-3" src={`/reviewImgs/${review.reviewFileList[0] ? review.reviewFileList[0].fileSaveName : null}`} />
            <h4>{review.reviewTitle}</h4>
            <h6 style={{color: "#706f6f"}}>캠페인: <strong style={{ fontWeight: 'bold' }}>{review.campaign.campaignTitle}</strong></h6>
            <h6 style={{color: "#706f6f"}}>재단 : <strong style={{ fontWeight: 'bold' }}>{review.campaign.organization.member.memberName}</strong></h6>
        </div>
      </NavLink>
      ):(
          <div>
            {memberUI ? 
            <NavLink to={`/campaign/${review.campaignCode}`}>
              <h4><span style={{color: "#706f6f", fontSize: 15+"px"}}>캠페인명 </span><br/>{review.campaignTitle}</h4>
              <h4><span style={{color: "#706f6f", fontSize: 15+"px"}}>재단명</span><br />{review.organization.member.memberName}</h4>
            </NavLink>
            :
            <>
            <h4>{review.campaign.campaignTitle}<br/><h6 style={{color: "#706f6f"}}>캠페인명 </h6></h4>
            <h4>{review.campaign.organization.member.memberName}<br /><h6 style={{color: "#706f6f"}}>재단명</h6></h4>
            <NavLink to={`/reviews/reviewRegist/${review.campaign.campaignCode}`}><button className="button button-primary mr-1">리뷰 등록하기</button></NavLink>
            </>}
            
          </div>
      )
    )
    );
  
}

