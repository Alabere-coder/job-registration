import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Header = () => {
  return (
    <>
      <div className="bg-black h-12 flex justify-around items-center">
        <p className="text-yellow-200 flex items-center">
          <MdEmail />
          alabere4real247@gmail.com
        </p>
        <div className="text-yellow-200 flex space-x-4">
          <FaFacebook />
          <FaSquareXTwitter />
        </div>
      </div>
    </>
  );
};

export default Header;
