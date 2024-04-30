import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createProduct } from "@/lib/actions";

export const ProfileAddProduct = ({ className }: { className?: string }) => {
  const form = useForm<{ title: string; description: string; cost: number }>({
    defaultValues: {
      title: "",
      description: "",
      cost: 0,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>Добавить товар</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление товара</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-5" action={createProduct}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Input type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      required
                      placeholder="0"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Добавить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
