import Default from "./Default";
import '../../assets/css/footer.css';

function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container">
        <div className="items-container ic2 text-center">
          <div className="item">
            <h3>Replanet</h3>
            <hr />
            <ul>
              <li>재단법인 리플래닛</li>
              <li>대표 : 박지영, 전승재, 이효진, 김유빈, 김민주, 이영현</li>
              <li>Tel : 02-123-4567</li>
              <li>사업자등록번호 : 105-82-15013 04393</li>
              <li>주소 : 서울시 용산구 장문로 60 (동빙고동)</li>
            </ul>
          </div>
          <div className="item">
            <h3>Contact Us</h3>
            <hr />
            <ul>
              <li><a href="mailto:replanetorg@gmail.com" className="text-white">replanetorg@gmail.com</a></li>
              <li>고객센터 운영시간 : 오전9시 ~ 오후6시</li>
              <li>점심시간 : 오후12시 ~ 오후1시</li>
              <li>휴일 : 토요일, 일요일, 공휴일</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;

