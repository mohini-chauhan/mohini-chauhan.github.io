import linkedinIcon from "../assets/linkedin.png";
import gmailIcon from "../assets/gmail.png";

const contactInformation = [
  {
    icon: linkedinIcon,
    alt: "LinkedIn",
    link: "https://linkedin.com/in/mohinii",
  },
  {
    icon: gmailIcon,
    alt: "Gmail",
    link: "mailto:chauhanmohinii18@gmail.com",
  },
];

export default function Footer() {
  return (
    // Added bg-background so content doesn't bleed through
    // Added z-50 to ensure it stays on top of other elements
    <footer className="fixed bottom-0 w-full border-t border-border bg-background/80 backdrop-blur-md z-50 p-1">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left: Copyright */}
        <p className="text-xs text-muted-foreground">
          © 2026 • Designed & Built by Mohini Chauhan
        </p>

        {/* Right: Contact Icons */}
        <section className="flex gap-4">
          {contactInformation.map(({ icon, alt, link }) => (
            <a
              key={alt}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <img src={icon} alt={alt} className="w-5 h-5 grayscale hover:grayscale-0 transition-all" />
            </a>
          ))}
        </section>
      </div>
    </footer>
  );
}