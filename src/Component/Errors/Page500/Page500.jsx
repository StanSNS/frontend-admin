import './Page500.css'
import {PiSmileySadBold} from "react-icons/pi";
import {HiStatusOffline} from "react-icons/hi";

export default function Page500() {
    return (
        <div className="text-center min-vh-100 p-5 mt-5">
            <HiStatusOffline className="outOfOrderIcon"/>
            <h1>Опа...<PiSmileySadBold className="mb-1 ms-2 errorColor"/></h1>
            <h2 className="fw-bold">Изглежда, че нещо се обърка на нашия уебсайт.</h2>
            <h3 className="fw-bold">Имаме проблем със сървъра, който вече се разглежда от нашия технически екип. </h3>
            <h3 className="fw-bold">Благодарим ви за търпението и ще се постараем да възстановим функционалността в най-кратък срок.</h3>
        </div>
    )
}