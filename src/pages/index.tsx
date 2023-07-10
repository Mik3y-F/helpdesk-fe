import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100),
});

export default function Home() {
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("login", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(values);
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-50 my-auto h-full min-h-screen w-full bg-slate-50">
        <div className="mx-auto my-auto max-w-2xl pt-40">
          <Card>
            <CardHeader>
              <CardTitle>Sign-in</CardTitle>
              <CardDescription>Sign in to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void form.handleSubmit(onSubmit)(event);
                  }}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size={"lg"} className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {status === "authenticated" && (
          <div>
            <p>Signed in as {session.user.email}</p>
            <Button
              size={"lg"}
              onClick={() => {
                signOut()
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
