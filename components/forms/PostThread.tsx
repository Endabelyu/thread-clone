'use client';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validation/thread';
import { createThread } from '@/lib/actions/thread.action';
// import { updateUser } from '@/lib/actions/user.actions';
// import { userValidation } from '@/lib/validation/user';
interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const route = useRouter();
  const path = usePathname();
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: path,
    });
    route.push('/ ');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border-dark-4 bg-dark-3 text-light-1 ">
                <Textarea
                  rows={15}
                  // placeholder="Input Your Name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
