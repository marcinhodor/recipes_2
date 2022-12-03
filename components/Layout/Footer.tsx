import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-center w-full h-12 mt-2 text-sm border-t md:mt-4">
      <a
        className="flex items-center justify-center gap-2 hover:text-blue-600"
        href="https://github.com/marcinhodor/recipes_2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Created by Marcin Hodor
        <Image src="/link-svgrepo-com.svg" width={15} height={15} />
      </a>
    </footer>
  );
};

export default Footer;
