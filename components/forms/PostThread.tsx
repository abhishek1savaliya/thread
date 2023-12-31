'use client'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'
import { ThreadValidation } from "@/lib/validations/thread";
import { usePathname, useRouter } from "next/navigation"
import { createThread } from "@/lib/actions/createThread.actions"

interface Props {
  userId: string;
}

function PostThread({ userId }:Props) {
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })

    const onSubmit = async (values:z.infer<typeof ThreadValidation>) => {
        await createThread({ 
            text: values.thread,
            author:userId,
            communityId:null,
            path: pathname
         })

         router.push("/")
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <div className="w-full">
                                <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
                                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1 mt-3">
                                    <Textarea
                                        rows={15}
                                        {...field}
                                        className="w-full p-2 text-sm bg-dark-3 border border-dark-4 text-light-1"
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </div>
                        )}
                    />
                    <Button type="submit" className="bg-primary-500 p-2 text-white">
                        Post Thread
                    </Button>
                </form>
            </Form>

        </>
    );
}

export default PostThread