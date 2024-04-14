import { Button } from "../ui/button";
import { FindIcon } from "../ui/icons/find";
import { Input } from "../ui/input";

export const MainPage = () => {
  return (
    <main className="mt-20">
      <div className="mx-auto w-fit p-1">
        <h1 className="text-3xl font-bold">ZOV Market</h1>
        <span className="text-center">
          Удобный, простой, функциональный маректплейс для продажи.
        </span>
      </div>
      <div className="flex gap-1 mt-20 w-fit mx-auto sm:mt-52">
        <Input type="text" placeholder="Поиск" />
        <Button variant="outline">
          <FindIcon />
        </Button>
      </div>
    </main>
  );
};
