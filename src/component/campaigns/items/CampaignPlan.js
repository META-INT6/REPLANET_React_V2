import 'moment/locale/ko';
function CampaignPlan({ campaign }) {
    //날짜 
    const date = new Date(campaign.endDate[0], campaign.endDate[1] - 1, campaign.endDate[2]);
    const endDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    return (
        campaign && (
            <div>
                <h2 className="">기부금 사용 계획</h2>
                <div className="button button-primary" style={{width: '10%', textAlign:'center'}}>
                    {campaign.campaignCategory}
                </div>

                <div className="">
                    <div className="" style={{width: '50%'}}>
                        <div className="">
                            <div className="">
                                <h3 className="">총 목표 금액</h3>
                                <h6>{campaign.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h6>
                            </div>
                        </div>
                    </div>
                    <div className="" style={{width: '50%'}}>
                        <div className="">
                            <div className="">
                                <h3 className="">캠페인 마감일</h3>
                                <h6>{endDate}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="" style={{width: '50%'}}>
                        <div className="">
                            <div className="">
                                <h3 className="">단체명</h3>
                                <h6>{campaign.organization? campaign.organization.member.memberName : "익명의 기부자"}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="" style={{width: '50%'}}>
                        <div className="">
                            <div className="">
                                <h3 className="">단체 연락처</h3>
                                <h6>{campaign.organization? campaign.organization.member.phone : "익명의 기부자"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default CampaignPlan;