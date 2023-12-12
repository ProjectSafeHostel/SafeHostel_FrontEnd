import { Link } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { UserGroupIcon, UserPlusIcon, ShoppingCartIcon, GiftIcon } from "@heroicons/react/24/solid";



export function Home() {

  return (
    <div className="flex justify-between p-4">
      <Card>
        <Link to="/doador" className="flex items-center hover:text-black transition-colors">
          <Button className="w-80 h-80 bg-blue-500 justify-center flex items-center">
            <CardBody>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-medium"
              >
                Doadores
              </Typography>
              <UserGroupIcon className="h-40 w-40" color="white" />
            </CardBody>
          </Button>
        </Link>
      </Card>

      <Card className="w-80 h-80 flex items-center justify-center bg-blue-500 ">
        <Link to="/cliente" className="flex items-center hover:text-black transition-colors">
          <Button className="w-80 h-80 bg-blue-500 justify-center flex items-center">
            <CardBody>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-medium"
              >
                Clientes
              </Typography>
              <UserPlusIcon className="h-40 w-40" color="white" />
            </CardBody>
          </Button>
        </Link>
      </Card>

      <Card className="w-80 h-80 flex items-center justify-center bg-blue-500 ">
        <Link to="/estoque" className="flex items-center hover:text-black transition-colors">
          <Button className="w-80 h-80 bg-blue-500 justify-center flex items-center">
            <CardBody>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-medium"
              >
                Produtos
              </Typography>
              <ShoppingCartIcon className="h-40 w-40" color="white" />
            </CardBody>
          </Button>
        </Link>
      </Card>

      <Card className="w-80 h-80 flex items-center justify-center bg-blue-500 ">
        <Link to="/doacao" className="flex items-center hover:text-black transition-colors">
          <Button className="w-80 h-80 bg-blue-500 justify-center flex items-center">
            <CardBody>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-medium"
              >
                Doações
              </Typography>
              <GiftIcon className="h-40 w-40" color="white" />
            </CardBody>
          </Button>
        </Link>
      </Card>
    </div>
  );
}
