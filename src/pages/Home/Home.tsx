// styles
import "./styles.css";

// components
import FirstCol from "../../components/FirstCol";
import MainCol from "../../components/MainCol";
import SecondCol from "../../components/SecondCol";
import { useNoteStore } from "../../store/Notes";
import Header from "../../components/Header";

function Home() {

  useNoteStore();

  return (
    <div className="main-container">
      {/* header display here */}
      <Header />

      <div className="bottom-main-container">
        {/* main category */}
        <FirstCol />

        {/* sub category */}
        <SecondCol />

        {/* main content */}
        <MainCol />
      </div>
    </div>
  )
}

export default Home