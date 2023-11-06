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
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentValidation } from "@/lib/validations/thread";
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { addCommentToThread } from "@/lib/actions/createThread.actions"
// import { createThread } from "@/lib/actions/createThread.actions"

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId),pathname)

        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <div className="w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                <Image
                                    src={currentUserImg}
                                    alt="Profile Image"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />

                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input
                                    type="text"
                                    placeholder="Comment..."

                                    {...field}
                                    className="no-focus text-light-1 outline-none "
                                />
                            </FormControl>
                        </div>
                    )}
                />
                <Button type="submit" className="bg-primary-500 p-2 text-white">
                    Reply
                </Button>
            </form>
        </Form>
    )

}

export default Comment

