import Card from "./Card";
import heroImg from "../assets/programming-background-collage.png";
import profilePic from "../assets/profilePic.webp";
import Button from "./Button";
export default function ProfileCard() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Mohini_Resume.pdf';
    link.download = 'Mohini_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
      <Card className="flex flex-col justify-center items-center p-0 pb-6 gap-4">
        <section className="h-[150px] relative w-full">
          <img
            src={heroImg}
            alt="hero-img"
            className="rounded-t-lg w-full h-full object-cover"
          />
          <img
            src={profilePic}
            alt="Profile"
            className="absolute w-20 h-20 rounded-full left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </section>
        <section className="p-4 pt-8 text-center">
          <h2 className="text-xl font-bold header-foreground">Mohini Chauhan</h2>
          <p className="text-sm">
            Developer who turns concepts into clicakble reality.
          </p>
        </section>
        <Button
          label="Download Resume"
          onClick={handleDownloadResume}
          customClassName="m-auto"
        />
      </Card>
  );
}
