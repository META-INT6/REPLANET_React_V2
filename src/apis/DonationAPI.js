import { GET_PAYS_BY_MEMBER_WITH_DATE, 
        GET_DONATION_BY_PAY_CODE, 
        GET_POINT_OF_MEMBER, 
        POST_POINT_DONATION } from "../modules/DonationModule";
import axios from "axios";

export function callGetAllPaysByMemberWithDateAPI(startDate, endDate) {
    // 기부(결제) 내역을 전체, 날짜검색을 가능하게 하는 API
    const requestURL = endDate
    ? `http://localhost:8001/paysByMemberWithDate?startDate=${startDate}&endDate=${endDate}`
    : 'http://localhost:8001/paysByMemberWithDate'

    return async function getAllPays(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data.reverse();
            console.log('(callGetAllPaysByMemberAPI) result : ', result);
            dispatch({ type: GET_PAYS_BY_MEMBER_WITH_DATE, payload: result });
        } catch (error) {
            console.error('(callGetAllPaysByMemberAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetDonationByPayCodeAPI(payCode) {
    // 기부 직후 기부 상세 내역 보여주는 API
    console.log('callGetDonationByPayCodeAPI(payCode) payCode : ', payCode);

    const requestURL = `http://localhost:8001/donations/payCode=${ payCode }`

    return async function getDonationByTid(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetDonationByPayCodeAPI) result : ', result);
            dispatch({ type: GET_DONATION_BY_PAY_CODE, payload: result });
        } catch (error) {
            console.error('(callGetDonationByPayCodeAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetPointByMemberAPI() {
    // 멤버의 현재 가용포인트를 조회해오는 API
    const requestURL = `http://localhost:8001/users/point`

    return async function getPointByMember(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetPointByMemberAPI) result : ', result);
            dispatch({ type: GET_POINT_OF_MEMBER, payload: result });
        } catch (error) {
            console.error('(callGetPointByMemberAPI) API 요청 실패! : ', error);
        }
    }
}

export function callPostPointDonationAPI(data, campaignInfo) {
    // 포인트로만 기부했을때 발동하는 API
    const pointDonationURL = `http://localhost:8001/pointDonation/${campaignInfo.campaignCode}`

    return async function postPointDonation(dispatch) {
        try {
            const response = await axios.post(pointDonationURL, data);
            const result = response.data;
            console.log('(callPostPointDonationAPI) result : ', result);
            dispatch({ type: POST_POINT_DONATION, payload: result });
        } catch (error) {
            console.error('(callPostPointDonationAPI) API 요청 실패! : ', error);
        }
    }
}

export function callPostKakaoPayAPI(data, campaignInfo) {
    // 카카오페이API를 사용하기 위한 API
    const kakaoPayURL = `http://localhost:8001/kakaoPay/${campaignInfo.campaignCode}`

    return async function postKakaoPay(dispatch) {
        try {
            const response = await axios.post(kakaoPayURL, data);
            const redirectURL = response.data.replace('redirect:', '');
            window.location.href = redirectURL;
        } catch (error) {
            console.error('(callPostKakaoPayAPI) API 요청 실패! : ', error);
        }
    }
}