import { socialButtons } from "@/constants/footerData";
import { GoArrowUpRight } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center 4xl:py-7 py-4 sm:px-10 px-4 border-t border-base/10">
      <div className="flex md:flex-row flex-col justify-between items-center w-full text-[12px] xl:text-sm 4xl:text-lg tracking-wider font-light sm:gap-0 gap-5">
        <p className="md:hidden mt-4 font-medium">
          Designed & Developed by Jenny Pieloor
        </p>
        <div className="flex justify-between items-center w-full sm:mt-5 mt-0 font-medium">
          <button className="flex justify-start items-center lg:w-[230px] sm:w-[120px] gap-[3px] hover:gap-[6px] duration-100 active:text-white/60 transition-default">
            <a
              href="https://github.com/devJennyy/kawaii-verse-revamp"
              target="_blank"
            >
              Visit repository
            </a>
            <GoArrowUpRight className="4xl:!mt-[5px] !mt-[3px] text-[15px] 4xl:text-[24px] xl:text-[18px]" />
          </button>
          <p className="md:block hidden font-medium">
            Designed & Developed by Jenny Pieloor{" "}
            <span className="text-neonAqua">Powered by Jikan API</span>
          </p>

          <TooltipProvider>
            <div className="flex 3xl:gap-3 sm:gap-2 gap-1">
              {socialButtons?.map(
                ({ url, id, icon: Icon, label, size, smSize, className }) => (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex justify-center items-center rounded-full border transition-default active:scale-95 hover:border-white/60 hover:text-white/60 ${className}`}
                      >
                        <Icon size={size} className="md:block hidden" />
                        <Icon size={smSize} className="md:hidden" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm py-[2px] px-1 tracking-wide">
                        {label}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Footer;
