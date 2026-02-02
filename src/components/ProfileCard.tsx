import Card from "./Card";
import heroImg from "../assets/programming-background-collage.png";
import profilePic from "../assets/profilePic.webp";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";

export default function ProfileCard() {
  const { theme } = useTheme();

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/Mohini_Resume.pdf";
    link.download = "Mohini_Chauhan_Frontend_Engineer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Card className="flex flex-col items-center p-0 pb-4 gap-3 overflow-hidden" animateBorder>
      <section className="h-[130px] relative w-full shrink-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-t-xl">
        <img
          src={heroImg}
          alt="Hero background"
          className="absolute inset-0 rounded-t-xl w-full h-full object-cover"
        />
        <img
          src={profilePic}
          alt="Mohini Chauhan"
          className="absolute w-20 h-20 rounded-full left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 border-4 border-white"
        />
      </section>

      <section className="p-3 pt-8 text-center space-y-2">
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

        {/* Work Status & Preferences */}
        <div className="flex justify-center flex-wrap gap-1 pt-1">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] xs:text-xs font-medium rounded-full bg-green-500 text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            Open to Work
          </span>
          <span className={`px-1.5 py-0.5 text-[10px] xs:text-xs font-medium rounded-full ${
            theme === "dark"
              ? "bg-blue-500/20 text-blue-300"
              : "bg-blue-50 text-blue-700"
          }`}>
            Remote
          </span>
          <span className={`px-1.5 py-0.5 text-[10px] xs:text-xs font-medium rounded-full ${
            theme === "dark"
              ? "bg-purple-500/20 text-purple-300"
              : "bg-purple-50 text-purple-700"
          }`}>
            Full-time
          </span>
        </div>
      </section>

      {/* Download Resume Button */}
      <Button
        label="Download Resume"
        onClick={handleDownloadResume}
        customClassName="mx-4"
      />
    </Card>
  );
}
