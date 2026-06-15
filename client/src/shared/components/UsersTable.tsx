import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export function UsersTable({ users }: { users: User[] }) {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <div className='flex flex-row flex-wrap items-center gap-12'>
                <Avatar>
                  <AvatarImage
                    className='m-2 rounded-lg'
                    src={user.avatar}
                    alt='User avatar image'
                    width={40}
                    height={40}
                  />
                  <AvatarFallback>{`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}</AvatarFallback>
                </Avatar>
              </div>

              <TableCell className='font-medium'>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className='flex flex-row flex-wrap items-center gap-12'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className='rounded-lg'>
          <AvatarImage
            src='https://github.com/evilrabbit.png'
            alt='@evilrabbit'
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src='https://github.com/maxleiter.png'
              alt='@maxleiter'
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src='https://github.com/evilrabbit.png'
              alt='@evilrabbit'
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
