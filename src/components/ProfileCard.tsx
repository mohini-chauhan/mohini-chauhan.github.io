import Card from "./Card";
import heroImg from "../assets/programming-background-collage.png";
import profilePic from "../assets/profilePic.webp";
import Button from "./Button";

export default function ProfileCard() {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/Mohini_Resume.pdf";
    link.download = "Mohini_Chauhan_Frontend_Engineer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Card className="flex flex-col justify-center items-center p-0 pb-6 gap-4">
      <section className="h-[150px] relative w-full">
        <img
          src={heroImg}
          alt="Hero background"
          className="rounded-t-lg w-full h-full object-cover"
        />
        <img
          src={profilePic}
          alt="Mohini Chauhan"
          className="absolute w-20 h-20 rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white"
        />
      </section>

      <section className="p-4 pt-8 text-center space-y-2">
        <h2 className="text-xl font-bold header-foreground">Mohini Chauhan</h2>

        {/* Role */}
        <p className="text-sm font-medium text-muted-foreground">
          Senior Software Engineer (Frontend)
        </p>

        {/* Summary */}
        <p className="text-[13px] leading-relaxed">
          I build scalable, high-performance, and accessible web interfaces,
          translating complex requirements into clean, production-ready UI using
          modern JavaScript frameworks.
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
