import Image from "next/image";
import map from "../assets/map.jpg";

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const Background = ({ children, className }: BackgroundProps) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Image
                src={map}
                alt="Background"
                fill
                priority={true}
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative z-10">{children}</div>
        </div>
    )
}

export default Background;