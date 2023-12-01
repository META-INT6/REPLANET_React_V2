import React, { useState, useRef, useCallback } from "react";
import '../../assets/css/user.css';
import Swal from "sweetalert2";
import axios from 'axios';

function FindPw() {



    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const smsCodeInputRef = useRef(null);


    const newPasswordInputRef = useRef(null);
    const newpasswordConfirmInputRef = useRef(null);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [smsCode, setSmsCode] = useState('');

    const [emailMsg, setEmailMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");
    const [onFindEmailMsg, setOnFindEmailMsg] = useState("");
    const [onFindPasswordMsg, setOnFindPasswordMsg] = useState("");
    const [onFindPhoneMsg, setOnFindPhoneMsg] = useState("");

    const [isOnCheckEmail, setIsOnCheckEmail] = useState(false);
    const [isOnCheckPhone, setIsOnCheckPhone] = useState(false);
    const [isOnCheckSmsCode, setIsOnCheckSmsCode] = useState(false);

    const [isOnFindEmail, setIsOnFindEmail] = useState(false);
    const [isOnFindPassword, setIsOnFindPassword] = useState(false);
    const [isOnFindPhone, setIsOnFindPhone] = useState(false);


    const resetPassword = (e) => {
        const currPassword = e.target.value;
        setPassword(currPassword);
        if (currPassword != passwordConfirm) {
            Swal.fire("ㄴㄴ")
        }
    };

    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };
    const validatePhone = (phone) => {
        return phone
            .match(/^[0-9].{8,10}$/)
    };

    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    const handleEmail = useCallback(async (e) => {
        const currEmail = e.target.value;
        setEmail(currEmail);
        setEmailMsg("");

        if (!validateEmail(currEmail)) {
            setEmailMsg("이메일 형식이 올바르지 않습니다.")
        } else {
            setEmailMsg("")
        }
    });
    const handlePhone = useCallback((e) => {
        const currPhone = e.target.value;
        setPhone(currPhone);
        if (!validatePhone(currPhone)) {
            setPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.");
        } else {
            setPhoneMsg("문자인증을 진행해 주세요.");
        }

    }, []);


    const handleSendSMS = async () => {
        const enteredPhone = phoneInputRef.current.value;
        const url = `/users/sms`;
        const body = { u_phone: enteredPhone };

        try {
            const response = await axios.post(url, body);
            if (response.status === 200) {
                console.log('인증번호 전송 성공');
                console.log(response.data);
                setSmsCode(response.data);
                Swal.fire("", "입력하신 번호로 인증번호가 전송되었습니다.");

            } else {
                console.error('인증번호 전송 실패');
                Swal.fire("", "전송 실패! 휴대전화 번호를 다시 확인해 주세요.");
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생', error);
            Swal.fire("", "API 호출 중 오류 발생");
        }
    };

    const onCheckEmail = async () => {
        console.log(email);
        const url = "http://localhost:8001/auth/emailcheck/" + email;
        const body = { email: email };

        try {
            const response = await axios.post(url, body);
            if (response.status === 200) {
                console.log('해당 이메일 주소로 가입된 계정이 없습니다.');
                setEmailMsg("해당 이메일 주소로 가입된 계정이 없습니다.");
                setEmail("");
                setIsOnCheckEmail(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('');
                setEmailMsg("");
                setIsOnCheckEmail(true);
            }

            else {
                console.log('예상치 못한 오류가 발생했습니다.');
                setEmailMsg("예상치 못한 오류가 발생했습니다.");
                setIsOnCheckEmail(false);
            }
        }
    };

    const onCheckPhone = async () => {
        console.log(phone);
        const url = "http://localhost:8001/auth/phonecheck/" + phone;
        const body = { phone: phone };

        try {
            const response = await axios.post(url, body);
            if (response.status === 200 && phone != null && isPhoneValid) {
                console.log('해당 휴대전화 번호로 가입된 이메일 계정이 없습니다.');
                setPhoneMsg('해당 휴대전화 번호로 가입된 이메일 계정이 없습니다.');
                setIsOnCheckPhone(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('해당 번호로 문자인증을 진행해 주세요.');
                setPhoneMsg("해당 번호로 문자인증을 진행해 주세요.");
                setIsOnCheckPhone(false);
            }
            else {
                console.log('예상치 못한 오류가 발생했습니다.');
                setPhoneMsg("예상치 못한 오류가 발생했습니다.");
                setIsOnCheckEmail(false);
            }
        }
    };

    const onCheckSmsCode = () => {
        console.log(smsCode);
        if (smsCode == smsCodeInputRef.current.value) {
            Swal.fire("인증 성공");
            setIsOnCheckSmsCode(true);
        } else { Swal.fire("인증 실패"); }
    };


    const onFindEmail = async () => {
        console.log(phone);
        const url = "http://localhost:8001/auth/emailfind/" + phone;
        const body = { phone: phone };

        try {
            const response = await axios.get(url, body);
            console.log(phone);
            console.log(response.data);
            if (response.status === 200 && phone != null && isPhoneValid) {

                setOnFindEmailMsg("회원님의 이메일 계정은 " + response.data + "입니다.");
                setIsOnFindEmail(true);
            }
        } catch (error) {
            if (email == null || phone == null) {
                console.log('fail');
                setOnFindEmailMsg("fail");
                setIsOnFindEmail(false);
            } else if (error.response && error.response.status === 404) {
                console.log('404');
                setOnFindEmailMsg("해당 전화번호로 가입한 계정이 없습니다.");
                setIsOnFindEmail(false);
            }
            else {
                console.log('예상치 못한 오류가 발생했습니다.');
                setOnFindEmailMsg("예상치 못한 오류가 발생했습니다.");
            }
        }
    };

    const onFindPhone = async () => {
        console.log(phone);
        const url = "http://localhost:8001/auth/phonefind/" + email;
        const body = { email: email };

        try {
            const response = await axios.get(url, body);
            if (response.status === 200 && phoneInputRef.current.value === response.data) {
                setPhone(response.data);
                setIsOnFindPhone(true);
                console.log('문자인증을 진행하시면 비밀번호 변경이 가능합니다.');
                setOnFindPhoneMsg('문자인증을 진행하시면 비밀번호 변경이 가능합니다.');
                if (phoneInputRef.current.value !== phone) {
                    setOnFindPhoneMsg("fail");
                    setIsOnFindPhone(false);
                }
            }
        } catch (error) {
            if (error.response && (error.response.status === 404 || phoneInputRef == null || emailInputRef == null)) {
                console.log('필수 입력 항목은 공란일 수 없습니다.');
                setOnFindPhoneMsg("필수 입력 항목은 공란일 수 없습니다.");
                setIsOnFindPhone(false);
            }
            else {
                console.log('계정이 존재하지 않거나 전화번호와 이메일 주소가 일치하지 않습니다.');
                setOnFindPhoneMsg("계정이 존재하지 않거나 전화번호와 이메일 주소가 일치하지 않습니다.");
                setIsOnFindPhone(false);
            }
        }
    };

    return (
        <div className="container-first container-centered text-left">
            <div id="container-user">
                <div className="items-container ic1">
                    <div className="tabs pb-2">
                        <a href="/find"><div className="tab_item ti2" >계정 찾기</div></a>
                        <div className="tab_item ti2 active" >비밀번호 찾기</div>
                    </div>
                    <div>
                        <div className="items-container ic1">
                            <label>이메일 계정과 휴대전화 번호를 입력해 주세요.</label>
                        </div>

                            <div className="items-container ic2">
                                <input className="input" type="email" id="email" ref={emailInputRef} value={email} placeholder="e-mail" onChange={handleEmail} required />
                                <div className="input-group">
                                    <input className="input rounded-0" type="text" id="phone" ref={phoneInputRef} placeholder="- 없이 휴대폰 번호 입력" onChange={handlePhone} required />
                                    <button className="button button-primary" onClick={onFindPhone}>검증</button>
                                </div>
                            </div>

                        <hr />
                        <div className="items-container ic1">
                            <div className="regexMsg">{onFindPhoneMsg}</div>
                            <button type="button" className="button button-primary" name="smsButton" onClick={handleSendSMS} disabled={!isOnFindPhone} >인증번호 요청</button>
                            <div className="input-group">
                                <input className="input" type="text" ref={smsCodeInputRef} required placeholder="인증번호 입력" />
                                <button type="button" className="button button-primary" onClick={onCheckSmsCode} disabled={!isPhoneValid}>인증번호 확인</button>
                            </div>
                            <button className="button button-primary w-100" disabled={!isOnCheckSmsCode} onClick={resetPassword}>찾기</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )

}
export default FindPw;
