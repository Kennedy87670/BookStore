import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

export const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Book Store"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Book Store
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <IconButton>
              <SettingsIcon className=" cursor-pointer text-2xl text-gray-700 dark:text-white" />
            </IconButton>
            <IconButton>
              <SearchIcon className=" cursor-pointer text-2xl text-gray-700 dark:text-white" />
            </IconButton>
            <IconButton>
              <Link to="/cart">
                <ShoppingCartIcon className=" cursor-pointer text-2xl text-gray-700 dark:text-white" />
              </Link>
            </IconButton>
            <IconButton>
              <PersonIcon className=" cursor-pointer text-2xl text-gray-700 dark:text-white" />
            </IconButton>
          </div>
        </div>
      </nav>
    </header>
  );
};
