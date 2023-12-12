import React, { useContext } from "react";
import SafeHostLogo from "../assets/SafeHost-Logo.svg";
import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import { Navbar, Typography } from "@material-tailwind/react";
import { AuthContext } from "../contexto/auth";

function NavList() {


  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/" className="flex items-center hover:text-black transition-colors">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/cliente" className="flex items-center hover:text-black transition-colors">
          Clientes
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/doador" className="flex items-center hover:text-black transition-colors">
          Doadores
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/estoque" className="flex items-center hover:text-black transition-colors">
          Produtos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/doacao" className="flex items-center hover:text-black transition-colors">
          Doacoes
        </Link>
      </Typography>

    </ul>
  );
}

export function Header() {
  const [setOpenNav] = React.useState(false);
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="flex mx-auto max-w-full px-6 py-5 bg-blue-900 border-0 rounded-none">
      <div className=" items-center inline-flex px-4">
        <img src={SafeHostLogo} alt='Logo do SafeHost' className="w-10 h-8" />
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          SafeHost
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>

      </div>

      <div className="w-full">
        <button onClick={handleLogout} className="flex items-center hover:text-black transition-colors ml-auto">
          <ArrowRightOnRectangleIcon color="white" className="h-8 w-8" />
        </button>
      </div>
    </Navbar>
  );
}