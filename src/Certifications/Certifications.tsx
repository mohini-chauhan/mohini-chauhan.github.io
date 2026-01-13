import Card from "../components/Card";
import { certificateData } from "./Crtificates";
import Ceritificate from "../assets/certificateLogo.png";

export default function Certifications() {
  return (
    <Card className="p-4">
      <h4 className="header-foreground">License & Certifications</h4>
      {certificateData?.map((certificate) => (
        <section key={certificate.id} className="w-full flex gap-2 items-center">
            <img className="w-4 h-4" src={Ceritificate} alt="certificateIcon"/>
            <a className="underline" href={certificate.link}>{certificate.title}</a>
        </section>
      ))}
    </Card>
  );
}
